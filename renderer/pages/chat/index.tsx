import styles from '../../styles/ul.module.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getChattingRooms } from '../../api/chat';

import Link from '../../components/Link';

export default function ChattingListPage(props) {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!props.user) {
      router.push('/login');
      return;
    }

    async function fecth() {
      const roomsFromFirestore = await getChattingRooms(props.user.id);
      setRooms(roomsFromFirestore);
    }
    
    fecth();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {
          rooms.map((room) => {
            return (
              <li key={room.id}>
                <Link href={`/chat/${room.id}`}>{room.users.join(', ')}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}