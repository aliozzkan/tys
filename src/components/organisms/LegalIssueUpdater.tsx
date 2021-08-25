import React, { FC, useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { ILegal } from "../../models/timeline";
import { Hooks } from "../../services";
import { Box, Text, Card, Divider, FileSelector, DateSelector, Button } from "../";
import TextInput from "../molecules/TextInput";
import { useAuth } from "../../hooks/redux-hooks";
import { useNavigation } from "@react-navigation/native";

interface Props {
  data: ILegal;
}

const LegalIssueUpdater: FC<Props> = (props) => {
  const {user} = useAuth();
  const navigation = useNavigation();
  const [datas, setDatas] = useState({
    documents: [],
    note: "",
    lastDate: "",
  });
  const updateManager = Hooks.DoLegalMaintenance();

  async function handleClickSave() {
    await updateManager.fetch({
      id: props.data.id,
      completedUserID: user.id,
      completedPersonelName: user.name,
      explain: datas.note,
      maintenanceFirm: "",
      secondDate: datas.lastDate,
      answer: true,
      documents: [
        ...datas.documents.map((_image: any) => ({
          photo: _image.base64,
          extension: "jpeg",
          type: "formPhoto",
        }))
      ],
    } as any);
  }

  useEffect(() => {
    if (updateManager.data?.data.success === true) {
      Alert.alert(
        "Başarılı!",
        "Bakım başarıyla gerçekleşti.",
        [
          {
            text: "Tamam",
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        {
          onDismiss: () => {
            navigation.goBack();
          },
        }
      );
    } else if (updateManager.isRejected || updateManager.data?.data.success === false) {
      Alert.alert(
        "Hata!",
        updateManager.data?.data.message || "Bakım yapılırken hata gerçekleşti",
        [
          {
            text: "Tamam",
            onPress: () => {
              updateManager.onReset();
            },
          },
        ]
      );
    }
  }, [updateManager.data?.data.success]);

  return (
    <ScrollView>
      <Box height={20}></Box>
      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Periyodik Kontrol İkinci Formu</Text>
        <Divider />
        <FileSelector
          onlyImage
          onChange={(files) => {
            setDatas((state: any) => ({ ...state, documents: files }));
          }}
        />
      </Card>
      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Periyodik Kontrol İkinci Form Notu</Text>
        <Divider />
        <TextInput
          label="Bakım Notları"
          value={datas.note}
          onChangeText={(text) =>
            setDatas((state: any) => ({ ...state, note: text }))
          }
        />
      </Card>
      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Sonraki Periyodik Kontrol Tarihi</Text>
        <Divider />
        <DateSelector
          mode="backendable"
          onChange={(value: any) => {
            setDatas((state: any) => ({ ...state, lastDate: value }));
          }}
        />
      </Card>
      <Box mb="xxl" px="m">
        <Button
          label="Bakımı Tamamla"
          colorScheme="blue"
          onPress={handleClickSave}
          isLoading={updateManager.isPending}
        />
      </Box>
    </ScrollView>
  );
};

export default LegalIssueUpdater;
