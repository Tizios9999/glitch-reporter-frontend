"use client";

/* IMPORTS */

// CSS
import "./globals.css";
// React
// Next.js
import Head from "next/head";
// External services
// Internal services
// Components
import AppWrapper from "./components/AppWrapper";
// Internal functions
// Contexts providers
import { AuthContextProvider } from "./contexts/AuthContext";
import { AppContextProvider } from "./contexts/AppContext";
// Material UI
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "./createEmotionCache";
import theme from "./theme";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Layout page. All the context providers are wrapping the
application here.

*/

export default function RootLayout({ children }) {
  const emotionCache = createEmotionCache();

  const metadata = {
    title: "Glitch Reporter",
    description: "Application used for Bug Tracking",
  };

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <AuthContextProvider>
              <AppWrapper>{children}</AppWrapper>
            </AuthContextProvider>
          </AppContextProvider>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
