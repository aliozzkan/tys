import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import {
  Card,
  Box,
  Text,
  FileSelector,
  DateSelector,
  Container,
  Divider,
  Button,
} from "../components";
import TextInput from "../components/molecules/TextInput";
import { useAuth } from "../hooks/redux-hooks";
import { FollowDocsIssueStackProps as PageProps } from "../navigations/stacks/FollowDoc/FollowDocDoStack";
import { Hooks } from "../services";
import Moment from "moment";

const FollowDocDo = (props: PageProps<"FollowDocDo">) => {
  const { user } = useAuth();
  const { navigation } = props;
  const [datas, setDatas] = useState<any>({
    documents: [],
    images: [],
    question: null,
    note: "",
    secondDate: "",
  });

  const doManager = Hooks.DoDocumentMaintenance();

  async function handleClickComplete() {
    await doManager.fetch({
      firstControlUserID: user.id,
      firstControlUserName: user.username,
      documentMaintenanceID: props.route.params.data.documentMaintenanceID,
      documents: [
        ...datas.images.map((_image: any) => ({
          document: _image.base64,
          extension: "jpeg",
          type: "inventoryPhoto",
        })),
        ...datas.documents.map((_image: any) => ({
          document: _image.base64,
          extension: "jpeg",
          type: "formPhoto",
        })),
      ],
      explain: datas.note,
      secondDate: !!datas.secondDate
        ? datas.secondDate
        : Moment().format("YYYY-MM-DD"),
      questionAnswer: datas.question ? "uygun" : "uygun değil",
      status: datas.question,
    });
  }

  useEffect(() => {
    if (doManager.data?.data.success === true) {
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
    } else if (doManager.isRejected || doManager.data?.data.success === false) {
      Alert.alert(
        "Hata!",
        doManager.data?.data.message || "Bakım yapılırken hata gerçekleşti",
        [
          {
            text: "Tamam",
            onPress: () => {
              doManager.onReset();
            },
          },
        ]
      );
    }
  }, [doManager.data?.data.success]);

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
        <Text variant="bodyHeader">Belge Takip Kontrol Sorusu</Text>
        <Divider />
        <Text variant="body" mb="xs">
          {props.route.params.data.question}
        </Text>
        <Box flexDirection="row">
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setDatas((state: any) => ({ ...state, question: true }));
            }}
          >
            <Box
              backgroundColor={datas.question ? "green.400" : "transparent"}
              borderWidth={1}
              height={40}
              borderColor="green.500"
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
              <Text color={datas.question ? "white" : "green.500"}>Evet</Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginLeft: 5 }}
            onPress={() => {
              setDatas((state: any) => ({ ...state, question: false }));
            }}
          >
            <Box
              backgroundColor={
                datas.question === false ? "red.400" : "transparent"
              }
              borderWidth={1}
              borderColor="red.500"
              flex={1}
              justifyContent="center"
              alignItems="center"
              height={40}
            >
              <Text color={datas.question === false ? "white" : "red.500"}>
                Hayır
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Card>
      {datas.question === false && (
        <Fragment>
          <Card variant="whiteSpace" marginTop="zero">
            <Text variant="bodyHeader">
              İkinci Doküman Yüklenebilir Son Tarih
            </Text>
            <Divider />
            <DateSelector
              mode="backendable"
              onChange={(value) => {
                setDatas((state: any) => ({ ...state, secondDate: value }));
              }}
            />
          </Card>
          <Card variant="whiteSpace">
            <Text variant="bodyHeader">Fotoğraf / Belge</Text>
            <Divider />
            <FileSelector
              onChange={(files) => {
                setDatas((state: any) => ({ ...state, images: files }));
              }}
            />
          </Card>
        </Fragment>
      )}

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
          label="Bakımı Tamamla"
          colorScheme="blue"
          onPress={handleClickComplete}
          isLoading={doManager.isPending}
        />
      </Box>
    </Container>
  );
};

export default FollowDocDo;
