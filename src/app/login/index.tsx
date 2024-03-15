import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TodoIcon from "../../../assets/icon.png";
import LoginImg from "../../../assets/imgs/login.jpg";
import AuthInput from "../../components/authInput";
import BaseContainer from "../../components/baseContainer";
import { useViewModel } from "./model";
import { styles } from "./styles";

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
  } = useViewModel();
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
            <AuthInput
              icon="user"
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            ></AuthInput>
          )}
          <AuthInput
            icon="at"
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            icon="lock"
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {stageNew && (
            <AuthInput
              icon="asterisk"
              style={styles.input}
              placeholder="Confirme a senha"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}
          <TouchableOpacity onPress={signinOrSignup}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {stageNew ? "Registrar" : "Entrar"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStageNew(!stageNew)}>
            <Text style={[styles.subTitle, { paddingTop: 20 }]}>
              {stageNew
                ? "Já possui uma conta?"
                : "Ainda não possui uma conta?"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </BaseContainer>
  );
};

export default Login;
