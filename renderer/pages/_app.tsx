import '../styles/globals.css';

import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type {AppProps} from 'next/app';
import Link from '../components/Link';

import { signIn } from '../api/auth';

import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

export default function MyApp(props: AppProps) {
  const {Component, pageProps} = props;
  const router = useRouter();

  const [value, setValue] = useState(0);
  const [user, setUser] = useState(undefined);

  return (
    <>
      <Head>
        <title>Nextron-Chat</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width'/>
      </Head>
      <Header />
      <Component {...pageProps} user={user} login={login} logout={logout} />
      <Navigation />
    </>
  )

  function Header() {
    if (user) {
      return (
        <div className='header'>
          <Button
            className='logout'
            variant='text'
            onClick={() => logout()} >
            로그아웃
          </Button>
        </div>
      );
    } else {
      return (
        <div className='header'>
          <Button
            className='login'
            variant='text'
            href='/login' >
            로그인
          </Button>
        </div>
      );
    }
  }

  function Navigation() {
    if (['/login', '/signup'].includes(router.pathname)) {
      return (
        <></>
      );
    } else {
      return (
        <BottomNavigation
          className='bottom-navigation'
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)} >
          <BottomNavigationAction label='users' />
          <BottomNavigationAction label='chattings' />
        </BottomNavigation>
      );
    }
  }

  async function login(id, password) {
    let user;

    try {
      user = await signIn(id, password);
    } catch (error) {
      alert(error.message);
      return;
    }

    setUser(user);
    router.push('/users');
  }

  function logout() {
    setUser(undefined);
    router.push('/login');
  }
}

