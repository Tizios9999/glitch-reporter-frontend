"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from "react-redux";
import store from "./store";
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from './createEmotionCache';
import theme from './theme';
import Navbar from './components/Navbar'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Glitch Reporter',
  description: 'Application used for Bug Tracking',
}

export default function RootLayout({ children }) {

  const emotionCache = createEmotionCache();

  return (
    <html lang="en">
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <body>
              <Navbar />
              {children}
            </body>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </html>
  )
}
