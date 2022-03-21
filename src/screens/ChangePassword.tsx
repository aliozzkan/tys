import React, { useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import {
  Box,
  Container,
  Text,
  Form,
  FormTextInput,
  FormHandle,
  Button,
  Checkbox,
} from "../components";
import { Hooks } from "../services";
import { useAuth } from "../hooks/redux-hooks";
import { AccountStackProps } from "../navigations/stacks/Account/AccountStack";

const ChangePassword = (props: AccountStackProps<"Update">) => {
  const formRef = useRef<FormHandle>(null);
  const passManager = Hooks.ChangePassword();
  const { user } = useAuth();

  function handleValid(value: any) {
    if (!value.pass || value.pass != value.confPass) {
      Alert.alert("Hata!", "Şifreler uyuşmamaktadır!");
      return;
    }

    passManager.fetch(user.id, value.oldPass, value.pass);
  }

  useEffect(() => {
    if (passManager.isFullfilled && passManager.data?.data.success) {
      Alert.alert("İşlem Başarılı!", "Şifreniz başarıyla güncellendi!");
      props.navigation.goBack();
    } else if (passManager.isFullfilled && !passManager.data?.data.success) {
      Alert.alert("Hata!", passManager.data?.data.message);
    }
  }, [passManager.status]);

  return (
    <Container scrollabe keyboardable>
      <Box p="l">
        <Form
          formRef={formRef}
          onChange={(values) => {}}
          onInvalid={() => {}}
          onValid={handleValid}
        >
          <FormTextInput defaultValue="" name="oldPass" label="Mevcut Şifre" />
          <FormTextInput defaultValue="" name="pass" label="Yeni Şifre" />
          <FormTextInput
            defaultValue=""
            name="confPass"
            label="Yeni Şifre Tekrar"
          />
        </Form>
        <Button
          label="Değiştir"
          colorScheme="blue"
          isLoading={passManager.isPending}
          onPress={() => {
            formRef.current?.onSubmit();
          }}
        />
      </Box>
    </Container>
  );
};

export default ChangePassword;
