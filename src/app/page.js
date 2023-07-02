"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useDispatch, useSelector } from "react-redux";
import EventBus from "./common/EventBus";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Button from '@mui/material/Button';
import Main from './components/Main'

export default function Home() {
  return (
      <div>
        <Main />
    </div>
  );
}