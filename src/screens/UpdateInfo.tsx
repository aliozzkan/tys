import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
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
import { useAuth } from "../hooks/redux-hooks";
import { AccountStackProps } from "../navigations/stacks/Account/AccountStack";
import { Hooks } from "../services";

const UpdateInfo = (props: AccountStackProps<"Update">) => {
  const formRef = useRef<FormHandle>(null);
  const { user } = useAuth();
  const infoManager = Hooks.UserInfo();
  const updateManager = Hooks.UpdateUserInfo();
  const [request, setRequest] = useState<{
    email: boolean;
    notification: boolean;
  }>({
    email: false,
    notification: false,
  });

  useLayoutEffect(() => {
    infoManager.fetch(user.id);
  }, []);

  useEffect(() => {
    if (infoManager.isFullfilled && infoManager.data) {
      setRequest({
        email: infoManager.data.data.data.isEmailEnabled,
        notification: infoManager.data.data.data.isNotificationEnabled,
      });
    }
  }, [infoManager.status]);

  function handleValid(values: any) {
    updateManager.fetch({
      id: user.id,
      name: values.name,
      surname: values.surname,
      email: values.email,
      companyID: user.companyID,
      isActive: user.isActive,
      phone: values.phone,
      username: user.username,
      isEmailEnabled: request.email,
      isNotificationEnabled: request.notification,
    });
  }

  return !infoManager.isFullfilled ? (
    <Box alignItems="center" justifyContent="center" flex={1}>
      <ActivityIndicator size="large" style={{ marginBottom: 80 }} />
    </Box>
  ) : (
    <Container scrollabe keyboardable>
      <Box p="l">
        <Form<any>
          formRef={formRef}
          onChange={(values) => {}}
          onInvalid={() => {
            console.log("invalid updaet");
          }}
          onValid={handleValid}
        >
          <FormTextInput
            defaultValue={infoManager.data?.data.data.name}
            name="name"
            label="Ad"
          />
          <FormTextInput
            defaultValue={infoManager.data?.data.data.surname}
            name="surname"
            label="Soyad"
          />
          {/* <FormTextInput defaultValue={infoManager.data?.data.data.username} name="username" label="Kullanıcı Adı" /> */}
          <FormTextInput
            defaultValue={infoManager.data?.data.data.email}
            name="email"
            label="E-Posta"
          />
          <FormTextInput
            defaultValue={infoManager.data?.data.data.phone}
            name="phone"
            label="Telefon"
          />
          <TouchableOpacity
            onPress={() => {
              setRequest((prev) => ({ ...prev, email: !prev.email }));
            }}
          >
            <Box
              flexDirection="row"
              py="m"
              mb="l"
              borderRadius="s"
              alignItems="center"
              px="l"
              backgroundColor="white"
            >
              <Checkbox
                value={request.email}
                onChange={(value) => {
                  setRequest((prev) => ({ ...prev, email: value }));
                }}
              />
              <Text variant="body" pl="m">
                E-Posta İzni
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRequest((prev) => ({
                ...prev,
                notification: !prev.notification,
              }));
            }}
          >
            <Box
              flexDirection="row"
              py="m"
              mb="l"
              borderRadius="s"
              alignItems="center"
              px="l"
              backgroundColor="white"
            >
              <Checkbox
                value={request.notification}
                onChange={(value) => {
                  setRequest((prev) => ({ ...prev, notification: value }));
                }}
              />
              <Text variant="body" pl="m">
                Bildirim İzni
              </Text>
            </Box>
          </TouchableOpacity>
        </Form>
        <Button
          label="Güncelle"
          colorScheme="blue"
          isLoading={updateManager.isPending}
          onPress={() => {
            formRef.current?.onSubmit();
          }}
        />
      </Box>
    </Container>
  );
};

export default UpdateInfo;
