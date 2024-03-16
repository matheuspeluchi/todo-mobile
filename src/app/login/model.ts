import { Dispatch, SetStateAction, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate, createNewAccount } from "../../services/database/respository";

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
  signup: ()=>void,
}

export const useViewModel = (): LoginViewModel => {
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
      const user = await authenticate(email, password);
      AsyncStorage.setItem('user', JSON.stringify(user))
      console.log(user)
    }
  }

  const signup = ()=>{

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
    signup
  }
}