import { auth, firestore } from "./firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth"
import {doc, getDoc, setDoc} from "firebase/firestore"


export class FirebaseService {



  async createNewAccount(email: string, password: string, name: string) {
    try {
      const {user} =await createUserWithEmailAndPassword(auth, email, password);
      
      const ref = doc(firestore, 'users',email)

      await setDoc(ref, {name, id: user.uid })
      const savedUser = await getDoc(ref);
      return savedUser.data();

    } catch (error) {
      console.error(error)
    }
  }

  async auth(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  }

}