import { Box, Typography } from "@mui/material";
import UploadedFileElement from "./UploadedFileElement";

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
      <Box sx={{ backgroundColor: "#cccccc" }}>
        {messageData.uploadedFiles.map((file) => {
          return <UploadedFileElement file={file} key={file.id} />;
        })}
      </Box>
    </Box>
  );
}
