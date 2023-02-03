// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { app } from './firebase';

const firestore = getFirestore(app);

export async function getUsers() {
  const q = query(collection(firestore, 'auth'));

  const users = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id });
  });

  return users;
}