import React, { useState, useEffect, useRef, useLayoutEffect, FC } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Text,
  Card,
  RequireAgreementButton,
  Divider,
  FileSelector,
  MaintenanceIssueQuestions,
} from "../";
import { DoMaintenanceIssueStackNavigationProps } from "../../navigations/stacks/MaintenanceIssueStack/DoMaintenanceIssueStack";
import { IMaintenanceIssueDetail } from "../../models/timeline";
import TextInput from "../molecules/TextInput";
import Button from "../molecules/Button";
import { useAuth } from "../../hooks/redux-hooks";
import { Hooks } from "../../services";

interface Props {
  maintenance: IMaintenanceIssueDetail;
  requires: any;
}

const MaintenanceIssueMaker: FC<Props> = ({ maintenance: mai, requires }) => {
  const navigation = useNavigation<DoMaintenanceIssueStackNavigationProps>();
  const { user, project } = useAuth();
  const doManager = Hooks.DoMaintenance();
  const [datas, setDatas] = useState<any>({
    images: [],
    documents: [],
    firm: "",
    maintenanceFirm: "",
    explain: "",
    questions: [],
  });

  async function handleClickComplete() {
    await doManager.fetch({
      createUserID: user.id,
      projectID: project.id,
      projectName: project.name,
      inventoryBarcode: mai.barcode,
      inventoryID: mai.inventoryID,
      inventoryMaintenanceID: mai.maintenanceId,
      maintenanceStartDate: mai.startDate,
      maintenanceEndDate: mai.endDate,
      images: [
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
      inventoryName: mai.name,
      maintenanceTypeName: mai.maintenanceTypeName,
      periodName: mai.maintenancePeriodName,
      personelName: datas.firm,
      maintenanceFirm: datas.firm,
      isAfterCompleted: mai.maintenanceTypeId === 3 ? false : true,
      maintenanceExplain: datas.explain,
      maintenanceQuestion: datas.questions
        ? JSON.stringify(datas.questions)
        : undefined,
      isMaintenanceIncomplete: mai.maintenanceTypeId === 3,
      //TODO: STATE DON SORUYA GORE
      state: !datas.questions
        ?.map((question: any) => {
          if (question.QuestionType === 1) {
            if (
              question.SelectedItem <= question.EndValue &&
              question.SelectedItem >= question.InitialValue
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            if (question.trueFalseAnswer) {
              return question.SelectedItem === "Yes";
            } else {
              return question.SelectedItem === "No";
            }
          }
        })
        .includes(false),
    });
  }

  useEffect(() => {
    if (doManager.data?.data.success === true) {
      Alert.alert(
        "Ba??ar??l??!",
        "Bak??m ba??ar??yla ger??ekle??ti.",
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
        doManager.data?.data.message || "Bak??m yap??l??rken hata ger??ekle??ti",
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
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Box height={20} />
        {/** Zorunlu D??k??manlar  */}
        {[
          mai.maintenanceContractIsRequired,
          mai.riskAnalysisIsRequired,
          mai.userInstructionsIsRequired,
          mai.userGudiePathIsRequired,
        ].includes(true) && (
          <Card variant="whiteSpace" marginTop="zero">
            <Text variant="bodyHeader">Zorunlu D??k??manlar</Text>
            <Divider />
            <Box flexDirection="column">
              {mai.maintenanceContractIsRequired && (
                <RequireAgreementButton
                  label={
                    !!requires && requires["contract"]
                      ? "Bak??m S??zle??mesi Onayland??"
                      : "Bak??m S??zle??mesini Onayla"
                  }
                  checked={!!requires && requires["contract"]}
                  onPress={() => {
                    navigation.navigate("DocumentViewer", {
                      file: { type: "", path: mai.maintenanceContractPath },
                      field: "contract",
                      backUrl: "DoMaintenanceIssue"
                    });
                  }}
                />
              )}
              {mai.riskAnalysisIsRequired && (
                <RequireAgreementButton
                  label={
                    !!requires && requires["riskAnalysis"]
                      ? "ISG Risk Analizi Onayland??"
                      : "ISG Risk Analizini Onayla"
                  }
                  checked={!!requires && requires["riskAnalysis"]}
                  onPress={() => {
                    navigation.navigate("DocumentViewer", {
                      file: { type: "", path: mai.riskAnalysisPath },
                      field: "riskAnalysis",
                      backUrl: "DoMaintenanceIssue"
                    });
                  }}
                />
              )}
              {mai.userInstructionsIsRequired && (
                <RequireAgreementButton
                  label={
                    !!requires && requires["instruction"]
                      ? "Kullanma Talimat?? Onayland??"
                      : "Kullanma Talimat?? Onayla"
                  }
                  checked={!!requires && requires["instruction"]}
                  onPress={() => {
                    navigation.navigate("DocumentViewer", {
                      file: { type: "", path: mai.userInstructionsPath },
                      field: "instruction",
                      backUrl: "DoMaintenanceIssue"
                    });
                  }}
                />
              )}
              {mai.userGudiePathIsRequired && (
                <RequireAgreementButton
                  label={
                    !!requires && requires["guide"]
                      ? "Kullan??m Klavuzu Onayland??"
                      : "Kullan??m Klavuzu Onayla"
                  }
                  checked={!!requires && requires["guide"]}
                  onPress={() => {
                    navigation.navigate("DocumentViewer", {
                      file: { type: "", path: mai.userGudiePath },
                      field: "guide",
                      backUrl: "DoMaintenanceIssue"
                    });
                  }}
                />
              )}
            </Box>
          </Card>
        )}

        {mai.isInventoryPhotoRequired && (
          <Card variant="whiteSpace" marginTop="zero">
            <Text variant="bodyHeader">Ekipman Foto??raf??</Text>
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
            <Text variant="bodyHeader">???? ??zin Ve Bak??m Formu</Text>
            <Divider />
            <FileSelector
              onChange={(files) => {
                setDatas((state: any) => ({ ...state, documents: files }));
              }}
            />
          </Card>
        )}

        {mai.maintenanceTypeId === 1 && (
          <Card variant="whiteSpace" marginTop="zero">
            <Text variant="bodyHeader">Sorular</Text>
            <Divider />
            <MaintenanceIssueQuestions
              maintenanceId={mai.inventoryMaintenanceTypeID}
              onChange={(questions) =>
                setDatas((state: any) => ({ ...state, questions }))
              }
            />
          </Card>
        )}

        <Card variant="whiteSpace" marginTop="zero">
          <Text variant="bodyHeader">Bilgiler</Text>
          <Divider />
          <TextInput
            label="Bak??m Firmas??"
            value={datas.firm}
            onChangeText={(text) =>
              setDatas((state: any) => ({ ...state, firm: text }))
            }
          />
          <TextInput
            label="Bak??m Notlar??"
            value={datas.explain}
            onChangeText={(text) =>
              setDatas((state: any) => ({ ...state, explain: text }))
            }
          />
        </Card>
        <Box mb="xxl" px="m">
          <Button
            label="Bak??m?? Tamamla"
            colorScheme="blue"
            onPress={handleClickComplete}
            isLoading={doManager.isPending}
          />
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MaintenanceIssueMaker;
