import React, { FC, useState, useLayoutEffect } from "react";
import { ScrollView, TouchableNativeFeedback } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Box, Text, Card, Checkbox, Divider, Button } from "../components";
import { useAuth } from "../hooks/redux-hooks";
import { Hooks } from "../services";

function FilterTitle({ children }: any) {
  return (
    <Box flexDirection="row" alignItems="center" py="m" mt="m">
      <Text variant="bodyHeader" mr="l">
        {children}
      </Text>
      <Box flex={1}>
        <Divider />
      </Box>
    </Box>
  );
}

const initialValue = {
  maintenanceTypes: [] as any[],
  maintenanceStatus: [] as any[],
  legalStatus: [] as any[],
  counterTypes: [] as any[],
  userTypes: [] as any[],
  periods: [] as any[],
  completeTypes: [] as any[],
  demandGroup: [] as any[],
  onlyMe: [1] as any[]
};

const Filter = (props: any) => {
  const { project, user } = useAuth();
  const maintenanceDescription = Hooks.MaintenanceDescription();
  const legalDescription = Hooks.LegalDescription();
  const demandGroup = Hooks.DemandGroupList();
  const userType = Hooks.UserTypeList();
  const periods = Hooks.PeriodList();
  const [filterData, setFilterData] = useState(
    props.route.params.filterData || initialValue
  );

  useLayoutEffect(() => {
    if (props?.route?.params?.keys?.includes("maintenanceStatus")) {
      maintenanceDescription.fetch();
    }
    if (props?.route?.params?.keys?.includes("legalStatus")) {
      legalDescription.fetch();
    }
    if (props?.route?.params?.keys?.includes("userTypes")) {
      userType.fetch();
    }
    if (props?.route?.params?.keys?.includes("periods")) {
      periods.fetch(project.id);
    }
    if (props?.route?.params?.keys?.includes("demandGroup")) {
      demandGroup.fetch(project.id);
    }
  }, []);

  function handleClickOnFilter(value?: any) {
    props.navigation.navigate(props.route.params.backRoute, {
      filterData: value || filterData,
    });
  }

  function handleChange(key: keyof typeof filterData, value: any) {
    const newValueForKey: any[] = !!filterData[key].includes(value)
      ? filterData[key].filter((item: any) => item !== value)
      : [...filterData[key], value];
    setFilterData((state: any) => ({
      ...state,
      [key]: newValueForKey,
    }));
  }

  return (
    <ScrollView>
      {props?.route?.params?.keys?.includes("onlyMe") && (
        <Box px="l">
          <FilterTitle>Ki??i</FilterTitle>
          <Box>
            <FilterItem
              label="Sadece Ben"
              value={filterData.onlyMe.includes(1)}
              onChange={() => {
                handleChange("onlyMe", 1);
              }}
            />
          </Box>
        </Box>
      )}

      {props?.route?.params?.keys?.includes("completeTypes") && (
        <Box px="l">
          <FilterTitle>Durum</FilterTitle>
          <Box>
            <FilterItem
              label="Ger??ekle??en"
              value={filterData.completeTypes.includes(1)}
              onChange={() => {
                handleChange("completeTypes", 1);
              }}
            />
            <FilterItem
              label="Ger??ekle??meyen"
              value={filterData.completeTypes.includes(2)}
              onChange={() => {
                handleChange("completeTypes", 2);
              }}
            />
          </Box>
        </Box>
      )}
      {props?.route?.params?.keys?.includes("counterTypes") && (
        <Box px="l">
          <FilterTitle>Saya?? T??r??</FilterTitle>
          <Box>
            <FilterItem
              label="Elektrik"
              value={filterData.counterTypes.includes(1)}
              onChange={() => {
                handleChange("counterTypes", 1);
              }}
            />
            <FilterItem
              label="Su"
              value={filterData.counterTypes.includes(2)}
              onChange={() => {
                handleChange("counterTypes", 2);
              }}
            />
            <FilterItem
              label="Do??algaz"
              value={filterData.counterTypes.includes(3)}
              onChange={() => {
                handleChange("counterTypes", 3);
              }}
            />
          </Box>
        </Box>
      )}

      {props?.route?.params?.keys?.includes("maintenanceTypes") && (
        <Box px="l">
          <FilterTitle>Bak??m Tipi</FilterTitle>
          <Box>
            <FilterItem
              label="???? Bak??m"
              value={filterData.maintenanceTypes.includes(1)}
              onChange={() => {
                handleChange("maintenanceTypes", 1);
              }}
            />
            <FilterItem
              label="D???? Bak??m"
              value={filterData.maintenanceTypes.includes(2)}
              onChange={() => {
                handleChange("maintenanceTypes", 2);
              }}
            />
          </Box>
        </Box>
      )}

      {props?.route?.params?.keys?.includes("maintenanceStatus") && (
        <Box px="l">
          <FilterTitle>Bak??m Durumu</FilterTitle>
          {maintenanceDescription.isFullfilled &&
            maintenanceDescription.data?.data.data.map((item, index) => (
              <FilterItem
                key={`${item.statusCode}-${index}`}
                label={item.statusDesc}
                value={filterData.maintenanceStatus.includes(item.statusCode)}
                onChange={() => {
                  handleChange("maintenanceStatus", item.statusCode);
                }}
              />
            ))}
        </Box>
      )}

      {props?.route?.params?.keys?.includes("legalStatus") && (
        <Box px="l">
          <FilterTitle>Periyodik Kontrol Durumu</FilterTitle>
          {legalDescription.isFullfilled &&
            legalDescription.data?.data.data.map((item: any, index: any) => (
              <FilterItem
                key={`${item.statusCode}-${index}`}
                label={item.statusDesc}
                value={filterData.legalStatus.includes(item.statusCode)}
                onChange={() => {
                  handleChange("legalStatus", item.statusCode);
                }}
              />
            ))}
        </Box>
      )}
      {props?.route?.params?.keys?.includes("userTypes") && (
        <Box px="l">
          <FilterTitle>Kullan??c?? Tipi</FilterTitle>
          {userType.isFullfilled &&
            userType.data?.data.data
              .filter((item: any) =>
                user.userTypes
                  .map((_userType) => _userType.id)
                  .includes(item.id)
              )
              .map((item: any, index: number) => (
                <FilterItem
                  key={`${item.id}-${index}`}
                  label={item.name}
                  value={filterData.userTypes.includes(item.id)}
                  onChange={() => {
                    handleChange("userTypes", item.id);
                  }}
                />
              ))}
        </Box>
      )}
      {props?.route?.params?.keys?.includes("periods") && (
        <Box px="l">
          <FilterTitle>Periyot</FilterTitle>
          {periods.isFullfilled &&
            periods.data?.data.data.map((item: any, index: number) => (
              <FilterItem
                key={`${item.id}-${index}`}
                label={item.name}
                value={filterData.periods.includes(item.id)}
                onChange={() => {
                  handleChange("periods", item.id);
                }}
              />
            ))}
        </Box>
      )}
      {props?.route?.params?.keys?.includes("demandGroup") && (
        <Box px="l">
          <FilterTitle>Grup</FilterTitle>
          {demandGroup.isFullfilled &&
            demandGroup.data?.data.data.map((item: any, index: number) => (
              <FilterItem
                key={`${item.id}-${index}`}
                label={item.name}
                value={filterData.demandGroup.includes(item.id)}
                onChange={() => {
                  handleChange("demandGroup", item.id);
                }}
              />
            ))}
        </Box>
      )}
      <Box px="l" pb="xxl" mt="xl">
        <Button
          colorScheme="blue"
          label="Filtre Uygula"
          onPress={() => {
            handleClickOnFilter();
          }}
        />
        <Box mt="m">
          <Button
            variant="bordered"
            colorScheme="red"
            label="Filtreleri Temizle"
            onPress={() => {
              setFilterData(initialValue);
              handleClickOnFilter(initialValue);
            }}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

interface ItemProps {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}
const FilterItem: FC<ItemProps> = (props) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        props.onChange(!props.value);
      }}
    >
      <Box
        mb="xs"
        flexDirection="row"
        backgroundColor="white"
        p="m"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box width={widthPercentageToDP(70) - 30}>
          <Text>{props.label}</Text>
        </Box>
        <Checkbox value={props.value} onChange={props.onChange} />
      </Box>
    </TouchableNativeFeedback>
  );
};

export default Filter;
