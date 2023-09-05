/* IMPORTS */
// React
import React from "react";
// Next.js
// External services
// Internal services
// Components
// Internal functions
// Contexts
// Material UI Components
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Loading spinner component. Used to show that the page is loading.

*/

const Loading = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" size={250} />
    </Container>
  );
};

export default Loading;
