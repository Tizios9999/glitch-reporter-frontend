/* IMPORTS */
// React
// Next.js
// External services
// Internal services
// Components
import UploadedFileElement from "./UploadedFileElement";
// Internal functions
import convertISOStringToLocalFormat from "../common/js/convertISOStringToLocalFormat";
// Contexts
// Material UI Components
import { Box, Typography } from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Renders a single message inside the Ticket page.

*/

export default function TicketMessage({ messageData }) {
  const messageLines = messageData.message.split("\n");

  return (
    <Box>
      <Box
        sx={{
          p: "5px",
          display: "flex",
          backgroundColor: "primary.main",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
        }}
      >
        <Typography variant="body1" color="white">
          {messageData.sender}
        </Typography>
        <Typography variant="body1" color="white">
          {convertISOStringToLocalFormat(messageData.messageDate)}
        </Typography>
      </Box>
      <Box sx={{ p: "5px", minHeight: "100px" }}>
        {messageLines.map((line, index) => (
          <Typography variant="body1" key={index}>
            {line}
          </Typography>
        ))}
      </Box>
      <Box sx={{ backgroundColor: "#cccccc" }}>
        {messageData.uploadedFiles.map((file) => {
          return <UploadedFileElement file={file} key={file.id} />;
        })}
      </Box>
    </Box>
  );
}
