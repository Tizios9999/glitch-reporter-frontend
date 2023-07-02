"use client"
import './globals.css'
import { useEffect, useContext } from 'react';
import { Inter } from 'next/font/google'
import { Provider } from "react-redux";
import store from "./store";
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from './createEmotionCache';
import theme from './theme';
import Navbar from './components/Navbar'
import { AuthContextProvider } from './contexts/AuthContext';
import { AuthContext } from "./contexts/AuthContext";
import AppWrapper from './components/AppWrapper'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Glitch Reporter',
  description: 'Application used for Bug Tracking',
}


export default function RootLayout({ children }) {

  const emotionCache = createEmotionCache();

  return (
    <html lang="en">
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <AuthContextProvider>
              <AppWrapper>
                {children}
              </AppWrapper>
            </AuthContextProvider>
          </ThemeProvider>
        </CacheProvider>
    </html>
  )
}
