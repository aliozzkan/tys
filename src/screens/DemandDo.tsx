import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Box, Card, Divider, FileSelector, Text, Button } from "../components";
import { useAuth } from "../hooks/redux-hooks";
import { DemandDoStackProps } from "../navigations/stacks/DemandIssue/DemandIssueDo";
import { Hooks } from "../services";

const DemandDo = (props: DemandDoStackProps<"DemandDo">) => {
  const { user } = useAuth();
  const [datas, setDatas] = useState({
    documents: [] as any[],
  });
  const uploadManager = Hooks.UploadDemandDocument();

  async function handleClickUpload() {
    await uploadManager.fetch({
      completedUserID: user.id,
      demandDocumentID: props.route.params.data.demandDocumentID,
      document: datas.documents[0].base64,
      extension: "jpeg",
    });
  }

  useEffect(() => {
    if (uploadManager.data?.data.success === true) {
      Alert.alert(
        "Başarılı!",
        "Bakım başarıyla gerçekleşti.",
        [
          {
            text: "Tamam",
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
        {
          onDismiss: () => {
            props.navigation.goBack();
          },
        }
      );
    } else if (uploadManager.isRejected || uploadManager.data?.data.success === false) {
      Alert.alert(
        "Hata!",
        uploadManager.data?.data.message || "Bakım yapılırken hata gerçekleşti",
        [
          {
            text: "Tamam",
            onPress: () => {
              uploadManager.onReset();
            },
          },
        ]
      );
    }
  }, [uploadManager.data?.data.success]);

  return (
    <Box flex={1}>
      <Card variant="whiteSpace">
        <Text variant="bodyHeader">{props.route.params.data.documentName}</Text>
        <Divider />
        <FileSelector
          onChange={(files) => {
            setDatas((state: any) => ({ ...state, documents: files }));
          }}
        />
      </Card>
      <Box px="m">
        <Button
          onPress={handleClickUpload}
          label="Dokümanı Yükle"
          colorScheme="orange"
          leftIcon="upload-cloud"
          isLoading={uploadManager.isPending}
        />
      </Box>
    </Box>
  );
};

export default DemandDo;
