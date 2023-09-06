"use client";

/* IMPORTS */
// CSS
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// React
import * as React from "react";
// Next.js
import Head from "next/head";
// External services
// Internal services
// Components
import Main from "./components/Main";
// Internal functions
// Contexts
// Material UI Components

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Home page.

*/

export default function Home() {
  return (
    <div>
      <Head>
        <title>Glitch Reporter</title>
      </Head>
      <Main />
    </div>
  );
}
