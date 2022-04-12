import React, { FC, useRef, useEffect } from "react";
import { AuthNaviProps } from "../navigations/AuthNavi";
import { KeyboardAvoidingView, ScrollView, Image } from "react-native";
import {
  Box,
  Form,
  FormTextInput,
  FormHandle,
  Button,
  Text,
} from "../components";
import { Hooks } from "../services";
import { SafeAreaView } from "react-native-safe-area-context";
import { Authenticator } from "../helper/authenticator";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
interface LoginForm {
  username: string;
  password: string;
}

const LoginScreen: FC<AuthNaviProps<"Login">> = () => {
  const formRef = useRef<FormHandle>(null);
  const loginManager = Hooks.Login();

  function onValid(data: LoginForm) {
    loginManager.fetch(data.username, data.password);
  }

  useEffect(() => {
    if (loginManager.isFullfilled) {
      if (loginManager.data?.data.success) {
        Authenticator.Login(
          loginManager.data?.data.data.accessToken,
          loginManager.data?.data.data,
          null
        );
      }
    }
  }, [loginManager.status]);

  return (
    <Box>
      <ScrollView>
        <KeyboardAvoidingView>
          <Box
            p="l"
            backgroundColor="red.100"
            height={hp(100)}
            justifyContent="center"
            position="relative"
          >
            <Box
              position="absolute"
              height={hp(100)}
              width={wp(100)}
              top={0}
              left={0}
              right={0}
              backgroundColor="green.400"
            >
              <Image
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                source={{
                  uri: "https://i.pinimg.com/originals/92/d3/e2/92d3e202bee3df35b5a65278158677c1.jpg",
                }}
              />
            </Box>
            <Form<LoginForm>
              formRef={formRef}
              onValid={onValid}
              onInvalid={() => {}}
              onChange={(values) => {}}
            >
              <FormTextInput
                defaultValue=""
                name="username"
                rules={{ required: true }}
                label="Kullanıcı Adı"
              />
              <FormTextInput
                defaultValue=""
                label="Parola"
                name="password"
                secureTextEntry
                rules={{ required: true }}
              />
            </Form>
            <Button
              label="Giriş Yap"
              colorScheme="teal"
              isLoading={loginManager.isPending}
              onPress={() => {
                formRef.current?.onSubmit();
              }}
            />
          </Box>
        </KeyboardAvoidingView>
        {loginManager.data?.data.success === false && (
          <Box px="xl">
            <Text textAlign="center" color="red.400">
              {loginManager.data?.data.message}
            </Text>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default LoginScreen;
