// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, collection, query, onSnapshot } from "firebase/firestore";
import { app } from './firebase';

const firestore = getFirestore(app);

export async function getChattingRooms(id) {
  if (!id) {
    throw Error('로그인 오류');
  }

  // 사용자 id가 속한 모든 채팅방 id 목록 읽기
  const docRef = doc(firestore, 'auth', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error('DB Error');
  }

  // 사용자 id가 속한 모든 채팅방 목록의 참여 사용자 가져오기
  const rooms = [];
  const roomIds = docSnap.data().chat;
  for (let roomId of roomIds) {
    let users = (await getDoc(doc(firestore, 'chat', roomId))).data().users;
    rooms.push({
      id: roomId,
      users: users
    });
  }

  return rooms;
}

export function getChatStream(id, setMessages) {
  const q = query(collection(firestore, 'chat', id, 'messages'));
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        ...doc.data(),
        timestamp: Number(doc.id)
      });
    });
    setMessages(messages);
  })
}