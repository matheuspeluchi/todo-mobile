import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebaseConfig";
import { UserProps } from "../types";


export async function createNewAccount(email: string, password: string, name: string): Promise<UserProps | null> {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    
    const ref = doc(firestore, 'users', user.uid)

    await setDoc(ref, {name, id: user.uid })
    const savedUser = (await getDoc(ref));
    const userData = savedUser.data() as UserProps;
    return {
      id: savedUser.id,
      email: userData.email,
      name: userData.name,
    }

  } catch (error) {
    console.error(error)
    return null;
  }
}



export async function updateUser(user: UserProps): Promise<void>{
  const ref = doc(firestore, 'users', user.id)
  await setDoc(ref, {
    avatarUrl: user.avatarUrl,
    displayName: user.name,
    email: user.email,
  } )

}