import { Dispatch, SetStateAction, useState } from "react"

import { createNewAccount } from "../../services/userService";
import { useSession } from "@/context";
import { router } from "expo-router";
import { Alert } from "react-native";
import { LoginType } from "@/types";

interface LoginViewModel {
  email: string,
  password: string,
  setEmail: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  confirmPassword: string,
  stageNew: boolean,
  name: string,
  setName: Dispatch<SetStateAction<string>>,
  setConfirmPassword: Dispatch<SetStateAction<string>>,
  setStageNew: Dispatch<SetStateAction<boolean>>
  isLoading: boolean,
  signinOrSignup: () => void,
  validateForm: () => void,
  isValidForm: boolean,
  signInGoogle: () => void
}

export const useViewModel = (): LoginViewModel => {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [stageNew, setStageNew] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (text: string) => {
    let exp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    return new RegExp(exp, 'g').test(text);
  }

  const validateForm = () => {
    const validations = [];
    validations.push(email != '' && isValidEmail(email))
    validations.push(password.length >= 6)
    if (stageNew) {
      validations.push(confirmPassword === password)
      validations.push(name && name.trim().length >= 3)
    }

    const isValid = validations.reduce((t, a) => t && a) as boolean
    setIsValidForm(isValid);
  }

  const signinOrSignup = async (): Promise<void> => {

    if (stageNew) {
      await createNewAccount(email, password, name);
      await signIn(LoginType.USER_AND_PASSWORD, email, password)
    } else {
      const isAuthenticated = await signIn(LoginType.USER_AND_PASSWORD, email, password,)
      if (isAuthenticated) {
        router.push("/")
      } else {
        Alert.alert("Usuário ou senha inválidos!")
      }
    }
  }

  const signInGoogle = async () => {
    setIsLoading(true)
    try {
      const isAuthenticated = await signIn(LoginType.GOOGLE);
      if (isAuthenticated) {
        router.push("/")
      } else {
        Alert.alert("Usuário ou senha inválidos!")
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  };


  return {
    email,
    setEmail,
    password,
    setPassword,
    stageNew,
    confirmPassword,
    setStageNew,
    setConfirmPassword,
    name,
    setName,
    signinOrSignup,
    validateForm,
    isValidForm,
    signInGoogle,
    isLoading
  }
}