import React, { FC, useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Box, Button, Text } from "../";
import { useAuth, useRedux } from "../../hooks/redux-hooks";
import { Hooks } from "../../services";
import TextInput from "./TextInput";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { SET_CAMPUS } from "../../store/app/constants";

type callback = () => void;

interface Props {
  onPressFilter: callback;
  onPressGoToday: callback;
  onPressGoCritic: callback;
  onPressSearch?: callback;
  onPressColorDesc?: callback;
  onPressBarcode?: callback;
  onChangeSearchQuery?: (text: string) => void;
  noCampus?: boolean;
}

const AdvancedListHeader: FC<Props> = (props) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [campusOpen, setCampusOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { project } = useAuth();
  const campusManager = Hooks.CampusList();
  const [
    {
      app: { selectedCampus: selectedCampusId },
    },
    dispatch,
  ] = useRedux();

  useEffect(() => {
    if (props.onChangeSearchQuery) {
      props.onChangeSearchQuery(query);
    }
  }, [query]);

  useEffect(() => {
    campusManager.fetch(project.id);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const renderContent = () => (
    <Box
      style={{
        padding: 16,
        height: 300,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
      backgroundColor="white"
      mx="s"
      borderWidth={1}
      borderBottomWidth={0}
      borderColor="blackAlpha.300"
      borderRadius="l"
      alignItems="center"
    >
      <Box height={5} borderRadius="l" backgroundColor="gray.300" width={100} />
      <Box width="100%" mt="l">
        {campusManager.hasData && (
          <FlatList
            data={[
              { id: -1, name: "Tüm Kampüsler" },
              ...campusManager.data?.data.data,
            ]}
            ItemSeparatorComponent={() => (
              <Box height={1} width="100%" backgroundColor="gray.100" />
            )}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: SET_CAMPUS, payload: item });
                  sheetRef.current?.snapTo(1);
                }}
                key={index}
              >
                <Box width="100%" p="m">
                  <Text textAlign="center">{item.name}</Text>
                </Box>
              </TouchableOpacity>
            )}
          />
        )}
      </Box>
    </Box>
  );

  const sheetRef = React.useRef<any>(null);

  return (
    <>
      <Box
        py="m"
        backgroundColor="gray.50"
        borderBottomColor="blackAlpha.100"
        borderBottomWidth={1}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Box flexDirection="row" alignItems="center">
            {props.onPressBarcode && (
              <Button
                leftIcon="crop"
                marginHorizontal="xs"
                marginLeft="m"
                colorScheme="purple"
                label="Barkod"
                onPress={props.onPressBarcode || undefined}
              />
            )}
            <Button
              leftIcon="arrow-down"
              marginHorizontal="xs"
              colorScheme="blue"
              label="Geçmiş"
              onPress={props.onPressGoCritic || undefined}
            />
            <Button
              leftIcon="clock"
              marginHorizontal="xs"
              colorScheme="orange"
              label="Bugün"
              onPress={props.onPressGoToday || undefined}
            />
            {!props.noCampus && (
              <Button
                leftIcon="home"
                marginHorizontal="xs"
                colorScheme="green"
                label="Tesis"
                onPress={() => setCampusOpen((prev) => !prev)}
              />
            )}
            <Button
              leftIcon="filter"
              marginHorizontal="xs"
              colorScheme="teal"
              iconed
              label=""
              onPress={props.onPressFilter || undefined}
            />
            <Button
              leftIcon="search"
              marginHorizontal="xs"
              colorScheme="red"
              label="Arama Yap"
              iconed
              onPress={() => setOpen((prev) => !prev)}
            />
            {props.onPressColorDesc && (
              <Button
                leftIcon="info"
                marginHorizontal="xs"
                colorScheme="purple"
                iconed
                marginRight="xl"
                label=""
                onPress={props.onPressColorDesc || undefined}
              />
            )}
          </Box>
        </ScrollView>
        {isOpen && (
          <Box padding="m" paddingBottom="zero">
            <TextInput
              label="Arama..."
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
          </Box>
        )}
        {campusOpen && selectedCampusId && (
          <TouchableOpacity onPress={() => sheetRef.current?.snapTo(0)}>
            <Box
              justifyContent="space-between"
              alignItems="center"
              px="m"
              flexDirection="row"
              backgroundColor="white"
              borderWidth={1}
              borderColor="gray.300"
              margin="m"
              mb="zero"
              padding="s"
              borderRadius="s"
            >
              <Text>{selectedCampusId.name}</Text>
              <Ionicons name="chevron-down" />
            </Box>
          </TouchableOpacity>
        )}
      </Box>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={1}
      />
    </>
  );
};

export default AdvancedListHeader;
