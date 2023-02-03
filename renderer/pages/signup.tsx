import styles from '../styles/signup.module.css';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '../api/auth';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SignUpPage() {
  const router = useRouter();

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
        onClick={() => submit()} >
        가입하기
      </Button>
    </div>
  );

  async function submit() {
    try {
      await signUp(id, password);
    } catch (error) {
      alert(error.message);
      return;
    }

    alert('회원가입이 완료되었습니다.');
    router.push('/login');
  }
} 