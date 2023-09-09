/* IMPORTS */
// React
// Next.js
// External services
// Internal services
// Components
// Internal functions
// Contexts
// Material UI Components
import { Typography, Link } from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Copyright component.

*/

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.davidesantonocito.com/">
        Davide Santonocito
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
