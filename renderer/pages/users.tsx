import styles from '../styles/users.module.css';

import { useState, useEffect } from 'react';

import { getUsers } from '../api/user';

export default function UsersPage(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fecth() {
      const usersFromFirestore = await getUsers();
      setUsers(usersFromFirestore.filter(user => user.id !== props.user.id));
    }
    
    fecth();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles['user-list']}>
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