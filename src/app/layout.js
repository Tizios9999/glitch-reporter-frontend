"use client"
import './globals.css'
import { Inter } from 'next/font/google'

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from './createEmotionCache';
import theme from './theme';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bug Tracker application',
  description: 'Application used for Bug Tracking',
}

export default function RootLayout({ children }) {

  const emotionCache = createEmotionCache();

  return (
    <html lang="en">
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <body>{children}</body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  )
}
