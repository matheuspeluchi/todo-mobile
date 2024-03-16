import { auth, firestore } from "./firebaseConfig"
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import {doc, getDoc, setDoc} from "firebase/firestore"
import { AuthProps, UserProps } from "../../types";

export async function createNewAccount(email: string, password: string, name: string): Promise<UserProps | null> {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    
    const ref = doc(firestore, 'users',email)

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

export async function authenticate(email: string, password: string):Promise<AuthProps> {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const ref = doc(firestore, 'users',email)
    const savedUser = await getDoc(ref);
    const userData = savedUser.data()!;
    const token = await user.getIdToken()
    return {
     user: { id: savedUser.id,
      email: userData.email,
      name: userData.name,
      avatarUrl: userData.avatarUrl
    },
    token
    
  }
  } catch (error) {
    console.error(error)
  }
 

}

export async function logout(): Promise<void>{
  await signOut(auth)
}
