import '../styles/globals.css';

import React from 'react';
import Head from 'next/head';
import type {AppProps} from 'next/app';

export default function MyApp(props: AppProps) {
  const {Component, pageProps} = props;

  return (
    <>
      <Head>
        <title>Nextron-Chat</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <div>
        <div>메뉴</div>
        <Component {...pageProps} />
      </div>
    </>
  )
}
