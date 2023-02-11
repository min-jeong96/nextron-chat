import '../styles/globals.css';

import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type {AppProps} from 'next/app';

import { signIn } from '../api/auth';

import Header from '../components/ui/header';
import Navigation from '../components/ui/navigation';

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
      <Header user={user} login={login} logout={logout} />
      <Component {...pageProps} user={user} login={login} logout={logout} />
      <Navigation value={value} setValue={setValue}/>
    </>
  )

  async function login(id, password) {
    try {
      let userData = await signIn(id, password);
      setUser(userData);
      router.push('/users');
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  function logout() {
    setUser(undefined);
    router.push('/login');
  }
}

