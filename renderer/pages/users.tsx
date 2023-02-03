import styles from '../styles/ul.module.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getUsers } from '../api/user';

export default function UsersPage(props) {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!props.user) {
      router.push('/login');
      return;
    }
    
    async function fecth() {
      const usersFromFirestore = await getUsers();
      setUsers(usersFromFirestore.filter(user => user.id !== props.user.id));
    }
    
    fecth();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {
          users.map((user) => {
            return (
              <li key={user.id}>{user.id}</li>
            )
          })
        }
      </ul>
    </div>
  );
}