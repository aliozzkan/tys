import React, {
  FC,
  Fragment,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box, Text, KeyValue, Button } from "../components";
import { MaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/MaintenanceIssueStack";
import { Hooks } from "../services";
import Moment from "moment";
import { useAuth } from "../hooks/redux-hooks";
import ImageViewer from "react-native-image-zoom-viewer";

interface CompletedMaintenance {
  userTypeId: number;
  userTypeName: string;
  barcode: string;
  isActive: boolean;
  name: string;
  unit: string;
  count: number;
  startDate: string;
  endDate: string;
  maintenanceDate: string;
  maintenanceCreateDate: string;
  inventoryMaintenanceDetailID: number;
  maintenancePeriodName: string;
  maintenanceFirm: string;
  maintenanceTypeName: string;
  maintenanceExplain: string;
  serialNumber: string;
  productionYear: string;
  inventoryPhoto: string;
  campusName: string;
  buildName: string;
  floorName: string;
  roomName: string;
  groupName: string;
  brandName: string;
  modelName?: any;
  inventoryCapacityName?: any;
  assetNo: string;
  maintenanceQuestion: string;
  photos: Photo[];
  maintenanceTypeID: number;
  maintenancePeriodID: number;
  personelName: string;
  riskAnalysisExpriDate?: any;
  riskAnalysisPath?: any;
  userInstructions?: any;
  userGudiePath?: any;
  maintenanceContract: string;
  riskAnalysisIsRequired: boolean;
  userInstructionsIsRequired: boolean;
  userGudiePathIsRequired: boolean;
  maintenanceContractIsRequired: boolean;
  inventoryPhotoIdRequired: boolean;
  controlFormPhotoIdRequired: boolean;
  isAfterCompleted: boolean;
  isMaintenanceComplete: boolean;
  maintenanceStatus: number;
  maintenanceStatusDesc: string;
  maintenanceStatusColor: string;
  isPositiveAnswer: boolean;
}

interface Photo {
  inventoryMaintenanceDetailID: number;
  photoPath: string;
  type: string;
  id: number;
  createDate: string;
}

const configs = {
  dateString: "YYYY-MM-DD[T]HH:mm:ss",
};

const MaintenanceIssueDetail: FC<
  MaintenanceIssueStackProps<"MaintenanceIssueDetail">
> = (props) => {
  const { project } = useAuth();
  const detailManager = Hooks.MaintenanceTimelineDetail();
  const completedsManager = Hooks.GetCompletedMaintenance();
  const [maintenance, setData] = useState<CompletedMaintenance | null>(null);
  const [imageSet1, setImage1] = useState<any>(false);
  const [imageSet2, setImage2] = useState<any>(false);

  useLayoutEffect(() => {
    detailManager.fetch(props.route.params.maintenanceIssueId);
    completedsManager.fetch(project.id);
    props.navigation.setOptions({ title: props.route.params.screenTitle });
  }, []);

  useEffect(() => {
    if (completedsManager.hasData && detailManager.hasData) {
      const detailData = detailManager.data!.data.data;
      const found = completedsManager.data?.data.data.find(
        (x: any) =>
          ![
            x.barcode === detailData.barcode,
            x.maintenancePeriodID === detailData.maintenancePeriodID,
            x.maintenanceTypeID === detailData.maintenanceTypeId,
            x.endDate === detailData.endDate,
            x.barcode === detailData.barcode,
          ].includes(false)
      );
      setData(found);
    }
  }, [completedsManager.status, detailManager.status]);

  function getQuestions(_questions: string) {
    const questions = JSON.parse(_questions ?? "[]") ?? [];

    return questions;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {(!detailManager.isFullfilled || !completedsManager.isFullfilled) && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      )}
      {detailManager.isFullfilled && completedsManager.isFullfilled && (
        <Fragment>
          <Box mx="m" mt="m" flexDirection="row" alignItems="center">
            <Text variant="bodyHeader">Ekipman Bilgileri</Text>
            <Box height={1} backgroundColor="gray.500" flex={1} ml="m" />
          </Box>
          <Box
            m="m"
            mt="s"
            backgroundColor="white"
            minHeight={300}
            borderRadius="l"
          >
            <Box p="m">
              <Text variant="bodyHeader">Genel Bilgiler</Text>
              <KeyValue
                title="#ID"
                value={
                  detailManager.data?.data.data.inventoryID.toString() as string
                }
              />
              <KeyValue
                title="Ekipman Adı"
                value={detailManager.data?.data.data.name as string}
              />
              <KeyValue
                title="Barkod"
                value={detailManager.data?.data.data.barcode as string}
              />
              <KeyValue
                title="Seri No"
                value={detailManager.data?.data.data.serialNumber as string}
              />
              <KeyValue
                title="Asset No"
                value={detailManager.data?.data.data.assetNo as string}
              />
              <KeyValue
                title="Birim"
                value={detailManager.data?.data.data.capacityName as string}
              />
              <KeyValue
                title="Kapasite"
                value={detailManager.data?.data.data.unit as string}
              />
              <Text variant="bodyHeader" mt="m">
                Lokasyon Bilgileri
              </Text>
              <KeyValue
                title="Tesis"
                value={detailManager.data?.data.data.campusName as string}
              />
              <KeyValue
                title="Bina"
                value={detailManager.data?.data.data.buildName as string}
              />
              <KeyValue
                title="Kat"
                value={detailManager.data?.data.data.floorName as string}
              />
              <KeyValue
                title="Oda"
                value={detailManager.data?.data.data.roomName as string}
              />

              <Text variant="bodyHeader" mt="m">
                Model Bilgileri
              </Text>
              <KeyValue
                title="Grup"
                value={detailManager.data?.data.data.groupName as string}
              />
              <KeyValue
                title="Marka"
                value={detailManager.data?.data.data.brandName as string}
              />
              <KeyValue
                title="Model"
                value={detailManager.data?.data.data.modelName as string}
              />
            </Box>
          </Box>
          <Box mx="m" mt="m" flexDirection="row" alignItems="center">
            <Text variant="bodyHeader">Bakım Bilgileri</Text>
            <Box height={1} backgroundColor="gray.500" flex={1} ml="m" />
          </Box>
          <Box m="m" mt="s" backgroundColor="white" borderRadius="l">
            <Box p="m">
              <Text variant="bodyHeader">
                {detailManager.data?.data.data.maintenanceTypeName}
              </Text>
              <KeyValue
                title="Periyot"
                value={
                  detailManager.data?.data.data.maintenancePeriodName as string
                }
              />
              <KeyValue
                title="Planlı Başlangıç Tarihi"
                value={
                  Moment(detailManager.data?.data.data.startDate).format(
                    "DD.MM.YYYY"
                  ) as string
                }
              />
              <KeyValue
                title="Planlı Bakım Tarihi"
                value={
                  Moment(detailManager.data?.data.data.endDate).format(
                    "DD.MM.YYYY"
                  ) as string
                }
              />
            </Box>
          </Box>
          {maintenance && (
            <>
              <Box p="m" m="m" mt="s" backgroundColor="white" borderRadius="l">
                <Text variant="bodyHeader">Gerçekleşen Bakım Bilgileri</Text>
                {[
                  {
                    title: "Planlı Bakım Tarihi",
                    value: Moment(
                      maintenance.endDate,
                      configs.dateString
                    ).format("DD/MM/YYYY"),
                  },
                  {
                    title: "Gercekleşen Tarih",
                    value: Moment(
                      maintenance.maintenanceDate,
                      configs.dateString
                    ).format("DD/MM/YYYY HH:mm"),
                  },
                  {
                    title: "Bakım Tipi",
                    value: maintenance.maintenanceTypeName,
                  },
                  {
                    title: "Bakım Periyodu",
                    value: maintenance.maintenancePeriodName,
                  },
                  {
                    title: "Kullanıcı",
                    value: maintenance.personelName,
                  },
                  {
                    title: "Bakım Firmasi",
                    value: maintenance.maintenanceFirm,
                  },
                  {
                    title: "Bakım Notları",
                    value: maintenance.maintenanceExplain,
                  },
                ].map((x, index) => (
                  <KeyValue {...x} key={index} />
                ))}
              </Box>
              {[
                {
                  title: "ISG Risk Analizi",
                  value: "Okudum, Anladım",
                  stat: maintenance.riskAnalysisIsRequired,
                },
                {
                  title: "Kullanma Klavuzu",
                  value: "Okudum, Anladım",
                  stat: maintenance.userGudiePathIsRequired,
                },
                {
                  title: "Kullanıcı Talimatları",
                  value: "Okudum, Anladım",
                  stat: maintenance.userInstructionsIsRequired,
                },
                {
                  title: "Bakım Sözleşmesi",
                  value: "Okudum, Anladım",
                  stat: maintenance.maintenanceContractIsRequired,
                },
              ].filter((item) => item.stat).length > 0 && (
                <Box
                  p="m"
                  m="m"
                  mt="s"
                  backgroundColor="white"
                  borderRadius="l"
                >
                  <Text variant="bodyHeader">Form Olayları</Text>
                  {[
                    {
                      title: "ISG Risk Analizi",
                      value: "Okudum, Anladım",
                      stat: maintenance.riskAnalysisIsRequired,
                    },
                    {
                      title: "Kullanma Klavuzu",
                      value: "Okudum, Anladım",
                      stat: maintenance.userGudiePathIsRequired,
                    },
                    {
                      title: "Kullanıcı Talimatları",
                      value: "Okudum, Anladım",
                      stat: maintenance.userInstructionsIsRequired,
                    },
                    {
                      title: "Bakım Sözleşmesi",
                      value: "Okudum, Anladım",
                      stat: maintenance.maintenanceContractIsRequired,
                    },
                  ]
                    .filter((item) => item.stat)
                    .map((x, index) => (
                      <KeyValue {...x} key={index} />
                    ))}
                </Box>
              )}

              {getQuestions(
                maintenance.maintenanceQuestion as unknown as string
              ).length > 0 && (
                <Box
                  p="m"
                  m="m"
                  mt="s"
                  backgroundColor="white"
                  borderRadius="l"
                >
                  <Text variant="bodyHeader">Bakım Soruları</Text>
                  {getQuestions(
                    maintenance.maintenanceQuestion as unknown as string
                  )
                    .map((question: any) => {
                      return {
                        title: question.Question,
                        value:
                          question.SelectedItem == null
                            ? "Cevap Girilmemiş"
                            : question.SelectedItem === "Yes"
                            ? `Evet (${
                                question.trueFalseAnswer === true ||
                                question.trueFalseAnswer === undefined
                                  ? "Olumlu"
                                  : "Olumsuz"
                              })`
                            : question.SelectedItem === "No"
                            ? `Hayır (${
                                question.trueFalseAnswer === true ||
                                question.trueFalseAnswer === undefined
                                  ? "Olumsuz"
                                  : "Olumlu"
                              })`
                            : `${question.SelectedItem} (${
                                question.SelectedItem >=
                                  question.InitialValue &&
                                question.SelectedItem <= question.EndValue
                                  ? "Olumlu Değer Aralığında"
                                  : "Olumlu Değer Aralığı Dışında"
                              })`,
                      };
                    })
                    .map((x: any, index: number) => (
                      <KeyValue {...x} key={index} />
                    ))}
                </Box>
              )}

              {maintenance.photos.filter(
                (photo: any) => photo.type === "formPhoto"
              ).length > 0 && (
                <TouchableOpacity onPress={() => setImage1(true)}>
                  <Box
                    p="m"
                    m="m"
                    mt="s"
                    backgroundColor="white"
                    borderRadius="l"
                  >
                    <Text variant="bodyHeader">İş İzin / Bakım Formu</Text>

                    <Box flexDirection="row" flexWrap="wrap">
                      {maintenance.photos
                        .filter((photo: any) => photo.type === "formPhoto")
                        .map((x) => (
                          <Box marginTop="s" mr="s">
                            <Image
                              source={{ uri: x.photoPath }}
                              key={x.id}
                              style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                              }}
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}

              {maintenance.photos.filter(
                (photo: any) => photo.type === "inventoryPhoto"
              ).length > 0 && (
                <TouchableOpacity onPress={() => setImage2(true)}>
                  <Box
                    p="m"
                    m="m"
                    mt="s"
                    backgroundColor="white"
                    borderRadius="l"
                  >
                    <Text variant="bodyHeader">Ekipman Fotoğrafları</Text>

                    <Box flexDirection="row" flexWrap="wrap">
                      {maintenance.photos
                        .filter((photo: any) => photo.type === "inventoryPhoto")
                        .map((x) => (
                          <Box marginTop="s" mr="s">
                            <Image
                              source={{ uri: x.photoPath }}
                              key={x.id}
                              style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                              }}
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}

              <Modal
                visible={imageSet1}
                onRequestClose={() => {
                  setImage1(false);
                }}
              >
                <ImageViewer
                  onSwipeDown={() => setImage1(false)}
                  onCancel={() => setImage1(false)}
                  enableSwipeDown={true}
                  imageUrls={maintenance.photos
                    .filter((photo: any) => photo.type === "formPhoto")
                    .map((x) => ({
                      url: x.photoPath,
                    }))}
                />
              </Modal>
              <Modal
                visible={imageSet2}
                onRequestClose={() => {
                  setImage2(false);
                }}
              >
                <ImageViewer
                  onSwipeDown={() => setImage2(false)}
                  onCancel={() => setImage2(false)}
                  enableSwipeDown={true}
                  imageUrls={maintenance.photos
                    .filter((photo: any) => photo.type === "inventoryPhoto")
                    .map((x) => ({
                      url: x.photoPath,
                    }))}
                />
              </Modal>
            </>
          )}
        </Fragment>
      )}
    </ScrollView>
  );
};

export default MaintenanceIssueDetail;
