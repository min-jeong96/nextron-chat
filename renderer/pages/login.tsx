import styles from '../styles/login.module.css';

import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginPage(props) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        id='id'
        label='아이디'
        variant='outlined'
        type='text'
        onChange={(e) => setId(e.target.value)} />
      <TextField
        id='password'
        label='비밀번호'
        variant='outlined'
        type='password'
        onChange={(e) => setPassword(e.target.value)} />
      <Button
        variant='contained'
        disabled={!id || !password}
        onClick={() => props.login(id, password)} >
        로그인
      </Button>
      <Button
       variant='outlined'
       href='/signup' >
        회원가입
      </Button>
    </div>
  );
}