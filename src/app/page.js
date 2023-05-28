"use client"
import Image from 'next/image'
import styles from './page.module.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Button from '@mui/material/Button';
import SignIn from './components/SignIn'

export default function Home() {
  return (
      <div>
        <SignIn />
      {/* <Button variant="contained">Hello World</Button> */}
    </div>
  );
}