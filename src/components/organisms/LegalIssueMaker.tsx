import React, { FC, useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Text,
  Container,
  RequireAgreementButton,
  Divider,
  Card,
  FileSelector,
  Button,
} from "../";
import { ILegal } from "../../models/timeline";
import TextInput from "../molecules/TextInput";
import { Hooks } from "../../services";
import { useAuth } from "../../hooks/redux-hooks";
import DateSelector from "../molecules/DateSelector";
import Moment from "moment";

interface Props {
  maintenance: ILegal;
  requires: any;
}

const LegalIssueMaker: FC<Props> = ({
  maintenance: mai,
  requires,
  ...props
}) => {
  const { user, project } = useAuth();
  const navigation = useNavigation<any>();
  const [datas, setDatas] = useState<any>({
    images: [],
    documents: [],
    firm: "",
    maintenanceFirm: "",
    lastDate: "",
    explain: "",
    question: null,
  });
  const doManager = Hooks.DoLegalMaintenance();

  async function handleClickComplete() {
    if (datas.question === null) {
      Alert.alert("Lütfen kontrol sorusunu cevaplayınız!");
      return;
    }

    if (!datas.firm) {
      Alert.alert("Lütfen bakım firmasını doldurunuz!");
      return;
    }

    doManager.fetch({
      answer: !!datas.question,
      completedPersonelName: `${user.name} ${user.surname}`,
      completedUserID: user.id,
      documents: [
        ...datas.images.map((_image: any) => ({
          photo: _image.base64,
          extension: "jpeg",
          type: "inventoryPhoto",
        })),
        ...datas.documents.map((_image: any) => ({
          photo: _image.base64,
          extension: "jpeg",
          type: "formPhoto",
        })),
      ],
      explain: datas.explain,
      secondDate: !!datas.lastDate
        ? datas.lastDate
        : Moment().format("YYYY-MM-DD"),
      id: mai.id,
      maintenanceFirm: datas.firm,
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
      <Box height={20} />
      {[
        mai.maintenanceContractIsRequired,
        mai.riskAnalysisIsRequired,
        mai.userInstructionsIsRequired,
        mai.userGudiePathIsRequired,
      ].includes(true) && (
        <Card variant="whiteSpace" marginTop="zero">
          <Text variant="bodyHeader">Zorunlu Dökümanlar</Text>
          <Divider />
          <Box flexDirection="column">
            {mai.maintenanceContractIsRequired && (
              <RequireAgreementButton
                label={
                  !!requires && requires["contract"]
                    ? "Bakım Sözleşmesi Onaylandı"
                    : "Bakım Sözleşmesini Onayla"
                }
                checked={!!requires && requires["contract"]}
                onPress={() => {
                  navigation.navigate("DocumentViewer", {
                    file: { type: "", path: mai.maintenanceContractPath },
                    field: "contract",
                    backUrl: "DoLegalIssue",
                  });
                }}
              />
            )}
            {mai.riskAnalysisIsRequired && (
              <RequireAgreementButton
                label={
                  !!requires && requires["riskAnalysis"]
                    ? "ISG Risk Analizi Onaylandı"
                    : "ISG Risk Analizini Onayla"
                }
                checked={!!requires && requires["riskAnalysis"]}
                onPress={() => {
                  navigation.navigate("DocumentViewer", {
                    file: { type: "", path: mai.riskAnalysisPath },
                    field: "riskAnalysis",
                    backUrl: "DoLegalIssue",
                  });
                }}
              />
            )}
            {mai.userInstructionsIsRequired && (
              <RequireAgreementButton
                label={
                  !!requires && requires["instruction"]
                    ? "Kullanma Talimatı Onaylandı"
                    : "Kullanma Talimatı Onayla"
                }
                checked={!!requires && requires["instruction"]}
                onPress={() => {
                  navigation.navigate("DocumentViewer", {
                    file: { type: "", path: mai.userInstructionsPath },
                    field: "instruction",
                    backUrl: "DoLegalIssue",
                  });
                }}
              />
            )}
            {mai.userGudiePathIsRequired && (
              <RequireAgreementButton
                label={
                  !!requires && requires["guide"]
                    ? "Kullanım Klavuzu Onaylandı"
                    : "Kullanım Klavuzu Onayla"
                }
                checked={!!requires && requires["guide"]}
                onPress={() => {
                  navigation.navigate("DocumentViewer", {
                    file: { type: "", path: mai.userGudiePath },
                    field: "guide",
                    backUrl: "DoLegalIssue",
                  });
                }}
              />
            )}
          </Box>
        </Card>
      )}
      {mai.isInventoryPhotoRequired && (
        <Card variant="whiteSpace" marginTop="zero">
          <Text variant="bodyHeader">Ekipman Fotoğrafı</Text>
          <Divider />
          <FileSelector
            onChange={(files) => {
              setDatas((state: any) => ({ ...state, images: files }));
            }}
          />
        </Card>
      )}
      {mai.controlFormPhotoIsRequired && (
        <Card variant="whiteSpace" marginTop="zero">
          <Text variant="bodyHeader">İş İzin Ve Bakım Formu</Text>
          <Divider />
          <FileSelector
            onChange={(files) => {
              setDatas((state: any) => ({ ...state, documents: files }));
            }}
          />
        </Card>
      )}
      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Periyodik Kontrol Sorusu</Text>
        <Divider />
        <Box mb="s">
          <Text mb="xs">{mai.question}</Text>
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
        </Box>
      </Card>
      {datas.question === false && (
        <Card variant="whiteSpace" marginTop="zero">
          <Text variant="bodyHeader">İkinci Doküman Yükleme Tarihi</Text>
          <Divider />
          <DateSelector
            mode="backendable"
            onChange={(value: any) => {
              setDatas((state: any) => ({ ...state, lastDate: value }));
            }}
          />
        </Card>
      )}
      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Bilgiler</Text>
        <Divider />
        <TextInput
          label="Bakım Firması"
          value={datas.firm}
          onChangeText={(text) =>
            setDatas((state: any) => ({ ...state, firm: text }))
          }
        />
        <TextInput
          label="Bakım Notları"
          value={datas.explain}
          onChangeText={(text) =>
            setDatas((state: any) => ({ ...state, explain: text }))
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

export default LegalIssueMaker;
