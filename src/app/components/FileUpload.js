/* IMPORTS */
// React
import React from "react";
import { useState } from "react";
// Next.js
// External services
// Internal services
// Components
// Internal functions
// Contexts
// Material UI Components
import { Box, Button, Input, Typography, IconButton } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Used to select files to be uploaded on cloud.
Used when adding an uploaded file from the file system as an attachment
to a new ticket or message.

*/

const FileUpload = ({ onFileChange }) => {
  const [uploadActive, setUploadActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    let filesList = [...uploadedFiles];

    if (event.target.files && event.target.files[0]) {
      const newFilename = event.target.files[0].name;
      const index = filesList.findIndex((file) => file.name === newFilename);

      if (index < 0) {
        filesList.push(event.target.files[0]);
      } else {
        filesList.splice(index, 1, event.target.files[0]);
      }

      setUploadedFiles(filesList);

      // Notifies the parent component (NewTicket) of the selected files
      onFileChange(filesList);
    }

    setUploadActive(false);
    event.target.value = "";
  };

  const handleRemoveFile = (name) => {
    let filesList = uploadedFiles.filter((item) => item.name !== name);

    setUploadedFiles(filesList);

    // Notifies the parent component (NewTicket) of the updated files list
    onFileChange(filesList);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FileUploadIcon />}
        onClick={() => setUploadActive(true)}
        sx={{ display: uploadActive ? "none" : "inline-block" }}
      >
        Add file
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setUploadActive(false)}
        sx={{ display: uploadActive ? "inline-block" : "none" }}
      >
        UNDO
      </Button>
      <Box sx={{ width: "100%" }}>
        <Input
          sx={{ display: uploadActive ? "block" : "none" }}
          component="input"
          type="file"
          id="file-upload"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
        />
        {uploadedFiles[0] && (
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontWeight: "bold", mt: "15px", mb: "5px" }}
          >
            Files Uploaded
          </Typography>
        )}
        {uploadedFiles[0] &&
          uploadedFiles.map((file, index) => {
            return (
              <div key={index}>
                {file.name}{" "}
                <IconButton
                  aria-label="delete"
                  color="error"
                  size="large"
                  onClick={() => handleRemoveFile(file.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}
      </Box>
    </Box>
  );
};

export default FileUpload;
