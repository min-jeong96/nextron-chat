// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, collection, query, onSnapshot, setDoc } from "firebase/firestore";
import { app } from './firebase';

const firestore = getFirestore(app);

/**
 * 로그인한 사용자의 채팅방 목록 가져오는 API
 * @param {string} id 사용자의 아이디
 * @returns {objects[]} 각 채팅방의 id와 참여자 아이디 목록
 */
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

/**
 * 특정 채팅방의 메시지 컬렉션 데이터 구독하는 API
 * @param {string} id 채팅방 아이디
 * @param {function} setMessages useState()
 * @returns {function} Unsubscribe
 */
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

/**
 * 특정 채팅방에 메시지 전송하는 API
 * @param {string} id 채팅방 아이디
 * @param {string} userId 메시지 전송자 아이디
 * @param {string} message 메시지 내용
 * @returns {boolean} 전송 성공 여부
 */
export async function sendMessage(id, userId, message) {
  const timestamp = Date.now().toString();
  
  try {
    await setDoc(doc(firestore, 'chat', id, 'messages', timestamp), {
      sender: userId,
      message: message
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}