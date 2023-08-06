import { Box, Typography } from "@mui/material";

import convertISOStringToLocalFormat from "../js/convertISOStringToLocalFormat";

export default function TicketMessage({ messageData }) {
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
      <Box sx={{ p: "5px", minHeight: "100px" }}>{messageData.message}</Box>
      <Box sx={{ backgroundColor: "gray" }}>
        {messageData.uploadedFiles.map((file) => {
          return <div key={file.id}>{file.name}</div>;
        })}
      </Box>
    </Box>
  );
}
