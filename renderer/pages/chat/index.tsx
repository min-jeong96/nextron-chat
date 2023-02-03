import styles from '../../styles/ul.module.css';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'
import { getChattingRooms, openNewChattingRoom } from '../../api/chat';
import { getUsers } from '../../api/user';

import Link from '../../components/Link';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default function ChattingListPage(props) {
  const router = useRouter();

  // 사용자가 속한 채팅방 목록
  const [rooms, setRooms] = useState([]);

  // 새로운 채팅방 생성 위한 states
  const [users, setUsers] = useState([]);
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  useEffect(() => {
    if (!props.user) {
      router.push('/login');
      return;
    }

    async function fecth() {
      const roomsFromFirestore = await getChattingRooms(props.user.id);
      setRooms(roomsFromFirestore);

      const usersFromFirestore = await getUsers();
      setUsers(usersFromFirestore.filter(user => user.id !== props.user.id));
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
      <Fab
        color='primary'
        aria-label='add'
        sx={{
          position: 'absolute',
          bottom: 80,
          right: 20
        }}
        onClick={() => setIsDialogOpened(true)} >
        <AddIcon />
      </Fab>
      <AddChattingRoomDialog />
    </div>
  );

  function AddChattingRoomDialog() {
    const [checked, setChecked] = useState([]);

    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    return (
      <Dialog
        open={isDialogOpened}
        onClose={() => setIsDialogOpened(false)} >
        <DialogTitle>새 채팅방 만들기</DialogTitle>
        <List>
          {
            users.map((user, index) => {
              return (
                <ListItem key={index}>
                  <ListItemButton onClick={handleToggle(index)}>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(index) !== -1}
                      tabIndex={-1}
                      disableRipple />
                    <ListItemText>{user.id}</ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })
          }
        </List>
        <Button
          variant='contained'
          disabled={checked.length === 0} 
          onClick={() => createChattingRoom(checked)} >
          채팅방 만들기
        </Button>
      </Dialog>
    )
  }

  async function createChattingRoom(checked) {
    const checkedUsers = users.filter((user, index) => checked.includes(index))
                              .map((user) => user.id);
    checkedUsers.push(props.user.id);

    const result = await openNewChattingRoom(checkedUsers);

    if (result) {
      alert('새 채팅방이 생성되었습니다.');
      setIsDialogOpened(false);

      const roomsFromFirestore = await getChattingRooms(props.user.id);
      setRooms(roomsFromFirestore);
    } else {
      alert('오류');
    }
  }
}