import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Text,
  FileSelector,
  Container,
  Divider,
  Button,
} from "../components";
import TextInput from "../components/molecules/TextInput";
import { Hooks } from "../services";
import { FollowDocsIssueStackProps as PageProps } from "../navigations/stacks/FollowDoc/FollowDocDoStack";
import { useAuth } from "../hooks/redux-hooks";
import { Alert } from "react-native";

const FollowDocUpload = (props: PageProps<"FollowDocUpload">) => {
  const uploadManager = Hooks.DoUpdateDocument();
  const { user } = useAuth();
  const [datas, setDatas] = useState<any>({
    documents: [],
    note: "",
  });

  async function handleClickComplete() {
    await uploadManager.fetch({
      documents: [
        ...datas.documents.map((_image: any) => ({
          document: _image.base64,
          extension: "jpeg",
          type: "inventoryPhoto",
        })),
      ],
      explain: datas.note,
      documentMaintenanceID: props.route.params.data.documentMaintenanceID,
      documentMaintenanceDetailID:
        props.route.params.data.documentMaintenanceDetailID,
      secondControlUserID: user.id,
      secondControlUserName: user.username,
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
    } else if (
      uploadManager.isRejected ||
      uploadManager.data?.data.success === false
    ) {
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
    <Container scrollabe keyboardable>
      <Card variant="whiteSpace">
        <Text variant="bodyHeader">Belge</Text>
        <Divider />
        <FileSelector
          onChange={(files) => {
            setDatas((state: any) => ({ ...state, documents: files }));
          }}
        />
      </Card>
      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Bilgiler</Text>
        <Divider />
        <TextInput
          label="Not"
          value={datas.note}
          onChangeText={(text) =>
            setDatas((state: any) => ({ ...state, note: text }))
          }
        />
      </Card>
      <Box mb="xxl" px="m">
        <Button
          label="Yükle"
          colorScheme="purple"
          onPress={handleClickComplete}
          isLoading={uploadManager.isPending}
        />
      </Box>
    </Container>
  );
};

export default FollowDocUpload;
