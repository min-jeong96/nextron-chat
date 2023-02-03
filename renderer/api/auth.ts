// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app } from './firebase';

const firestore = getFirestore(app);

export async function signUp(id, password) {
  const docRef = doc(firestore, 'auth', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    throw Error('이미 존재하는 아이디입니다.');
  } else {
    await setDoc(docRef, { password, chat: [] });
  }

  return true;
}

export async function signIn(id, password) {
  const docRef = doc(firestore, 'auth', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error('존재하지 않는 아이디입니다.');
  }

  if (password !== docSnap.data().password) {
    throw Error('비밀번호가 일치하지 않습니다.');
  }

  return { id, password, timestamp: Date.now() }
}