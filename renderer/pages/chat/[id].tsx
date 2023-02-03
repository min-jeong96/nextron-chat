import styles from '../../styles/chat[id].module.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getChatStream } from '../../api/chat';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ChattingRoomPage(props) {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!props.user) {
      router.push('/login');
      return;
    }
    
    // 해당 채팅방 구독
    const unsubscribeChatStream = getChatStream(router.query.id, setMessages);

    return () => { // 해당 채팅방 구독 해제
      unsubscribeChatStream();
    }
  }, []);

  useEffect(() => {
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {
          messages.map((message) => {
            return (
              <div
                key={message.timestamp}
                className={`${styles.message} ${getMessageClassName(message)}`} >
                <div className={styles.sender}>{message.sender}</div>
                <div className={styles.content}>{message.message}</div>
                <div className={styles.time}>
                  {`${new Date(message.timestamp).toLocaleString('ko-KR')}`}
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={styles['input-container']}>
        <TextField
          className={styles.input}
          multiline
          rows={4} />
        <Button variant='contained'>전송</Button>
      </div>
    </div>
  );

  function getMessageClassName(message) {
    return props.user && props.user.id === message.sender ? styles.send : styles.receive;
  }
}