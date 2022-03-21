import React, { useLayoutEffect, useEffect, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import {
  Container,
  Box,
  Text,
  Divider,
  FileSelector,
  Button,
  Card,
} from "../components";
import { Hooks } from "../services";
import { CounterIssueStackProps as PageProps } from "../navigations/stacks/Counter/CounterDoStack";
import TextInput from "../components/molecules/TextInput";
import { useAuth } from "../hooks/redux-hooks";

const ControlTaskDo = (props: PageProps<"CounterTaskDo">) => {
  const { user, project } = useAuth();
  const doManager = Hooks.CounterDo();
  const [datas, setDatas] = useState<any>({
    images: [],
    t: "",
    t1: "",
    t2: "",
    t3: "",
    kapasitif: "",
    reaktif: "",
    demant: "",
    desc: "",
    value: "",
  });

  async function handleClickComplete() {
    const item = props.route.params.data;
    const photos = datas.images;
    const values = {
      value: datas.value,
      t: datas.t,
      t1: datas.t1,
      t2: datas.t2,
      t3: datas.t3,
      reaktif: datas.reaktif,
      kapasitif: datas.kapasitif,
      demant: datas.demant,
      description: datas.desc,
    };
    doManager.fetch({
      id: item.counterTaskID,
      consumptionDifferencePercentage: item.consumptionDifferencePercentage,
      controlledUserID: item.controlledUserID ?? user.id,
      demant: values.demant,
      description: values.description,
      kapasitif: values.kapasitif,
      multiplierValue: item.multiplierValue,
      photo:
        photos.length > 0
          ? JSON.stringify(
              photos.map((_image: any) => ({
                base64: _image.base64,
                extension: "png",
              }))
            )
          : "",
      photoExtension: "",
      reaktif: values.reaktif,
      t1: values.t1,
      t2: values.t2,
      t3: values.t3,
      t: values.t,
      value: values.value || "0",
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
    <Container keyboardable scrollabe>
      <Box height={20} />
      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Bilgiler</Text>
        <Divider />
        <TextInput
          label="Açıklama"
          value={datas.desc}
          onChangeText={(text) =>
            setDatas((state: any) => ({ ...state, desc: text }))
          }
        />
        {props.route.params.data.counterTypeId === 1 ? (
          <>
            {props.route.params.data.isTRequired && (
              <TextInput
                label="T"
                value={datas.t}
                onChangeText={(text) =>
                  setDatas((state: any) => ({ ...state, t: text }))
                }
              />
            )}
            {props.route.params.data.isT1Required && (
              <TextInput
                label="T1"
                value={datas.t1}
                onChangeText={(text) =>
                  setDatas((state: any) => ({ ...state, t1: text }))
                }
              />
            )}

            {props.route.params.data.isT2Required && (
              <TextInput
                label="T2"
                value={datas.t2}
                onChangeText={(text) =>
                  setDatas((state: any) => ({ ...state, t2: text }))
                }
              />
            )}

            {props.route.params.data.isT3Required && (
              <TextInput
                label="T3"
                value={datas.t3}
                onChangeText={(text) =>
                  setDatas((state: any) => ({ ...state, t3: text }))
                }
              />
            )}

            {props.route.params.data.isReaktifRequired && (
              <TextInput
                label="Reaktif Değer"
                value={datas.reaktif}
                onChangeText={(text) =>
                  setDatas((state: any) => ({ ...state, reaktif: text }))
                }
              />
            )}
            {props.route.params.data.isDemantRequired && (
              <TextInput
                label="Demant Değeri"
                value={datas.demant}
                onChangeText={(text) =>
                  setDatas((state: any) => ({ ...state, demant: text }))
                }
              />
            )}
            {props.route.params.data.isKapasitifRequired && (
              <TextInput
                label="Kapasitif Değer"
                value={datas.kapasitif}
                onChangeText={(text) =>
                  setDatas((state: any) => ({ ...state, kapasitif: text }))
                }
              />
            )}
          </>
        ) : (
          <TextInput
            label="Değer"
            value={datas.value}
            onChangeText={(text) =>
              setDatas((state: any) => ({ ...state, value: text }))
            }
          />
        )}
      </Card>

      <Card variant="whiteSpace" marginTop="zero">
        <Text variant="bodyHeader">Fotoğraf</Text>
        <Divider />
        <FileSelector
          onlyImage
          onChange={(files) => {
            setDatas((state: any) => ({ ...state, images: files }));
          }}
        />
      </Card>
      <Button
        colorScheme="blue"
        label="Kontrol Yap"
        isLoading={doManager.isPending}
        onPress={handleClickComplete}
        marginHorizontal="m"
      />
      <Box height={100} />
    </Container>
  );
};

export default ControlTaskDo;
