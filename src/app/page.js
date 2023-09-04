"use client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import * as React from "react";
import Main from "./components/Main";
import Head from "next/head";

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
