import React from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '../components/Link';
import {styled} from '@mui/material';

function Next() {
  return (
    <Link href="/home">Go to the home page</Link>
  );
};

export default Next;
