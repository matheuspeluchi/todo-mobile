import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import TodoIcon from "../../../assets/icon.png";
import LoginImg from "../../../assets/imgs/login.jpg";
import { useViewModel } from "./model";
import { styles } from "./styles";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import BaseContainer from "@/components/baseContainer";

const Login: React.FC = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    stageNew,
    confirmPassword,
    setConfirmPassword,
    setStageNew,
    name,
    setName,
    signinOrSignup,
    isValidForm,
    validateForm,
  } = useViewModel();

  const signInGoogle = async () => {
    GoogleSignin.configure({
      webClientId:
        "663840776979-nrul4nlkspjokkcu9hhs2blbdl8qod21.apps.googleusercontent.com",
    });
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(statusCodes.SIGN_IN_CANCELLED);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(statusCodes.IN_PROGRESS);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE);
      } else {
        console.log(error.code);
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);
  return (
    <BaseContainer>
      <ImageBackground style={styles.background} source={LoginImg}>
        <View style={styles.header}>
          <Image source={TodoIcon} style={styles.headerIcon} />
          <Text style={styles.title}>Todo</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.subTitle}>
            {stageNew ? "Crie a sua conta" : "Informe seus dados"}
          </Text>
          {stageNew && (
            <TextInput
              dense
              error={!isValidForm && name != ""}
              label="Nome"
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            dense
            error={!isValidForm && email != ""}
            style={styles.input}
            mode="flat"
            label="Email"
            placeholder="Informe seu email..."
            value={email}
            right={<TextInput.Icon icon="at" />}
            onChangeText={setEmail}
          />

          <TextInput
            error={!isValidForm && password != ""}
            dense
            label="Senha"
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            right={<TextInput.Icon icon="eye" />}
            onChangeText={setPassword}
          />
          {stageNew && (
            <TextInput
              dense
              label="Confirmação"
              error={!isValidForm && confirmPassword != ""}
              style={styles.input}
              placeholder="Confirme a senha"
              secureTextEntry={true}
              right={<TextInput.Icon icon="asterisk" />}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}

          <Button
            style={styles.button}
            dark
            mode="contained"
            buttonColor={!isValidForm ? "surfaceDisabled" : ""}
            onPress={!isValidForm ? () => null : signinOrSignup}
          >
            {stageNew ? "Registrar" : "Entrar"}
          </Button>
          <TouchableOpacity onPress={() => setStageNew(!stageNew)}>
            <Text style={[styles.subTitle, { paddingTop: 20 }]}>
              {stageNew
                ? "Já possui uma conta?"
                : "Ainda não possui uma conta?"}
            </Text>
          </TouchableOpacity>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signInGoogle}
          />
        </View>
      </ImageBackground>
    </BaseContainer>
  );
};

export default Login;
