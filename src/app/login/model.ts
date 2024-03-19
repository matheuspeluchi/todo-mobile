import { Dispatch, SetStateAction, useState } from "react"
import { createNewAccount } from "../../services/userService";
import { useSession } from "@/context";
import { router } from "expo-router";
import { Alert } from "react-native";

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
  signinOrSignup: ()=>void,
}

export const useViewModel = (): LoginViewModel => {
  const {signIn}  = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [stageNew, setStageNew] = useState(false);

  const signinOrSignup = async (): Promise<void> =>{
    if(stageNew){
      const user = await createNewAccount(email, password, name);
      console.log(user)
    }else{
      const isAuthenticated = await signIn(email, password,)
      if(isAuthenticated){
        router.push("/")        
      }else{
        Alert.alert("Usuário ou senha inválidos!")
      }
      

    }
  }

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
  }
}