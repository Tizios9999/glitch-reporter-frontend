"use client";

import { firebaseConfig, app } from "../firebase/firebaseConfig";
import { getFirestore } from "firebase/firestore";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material";
// import Input from '@mui/material/Input';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import DeleteIcon from '@mui/icons-material/Delete';

import CustomSelect from "../components/CustomSelect";
import FileUpload from "../components/FileUpload";

import priority from "../testdata/priority";
import topic from "../testdata/topic";

const NewTicket = () => {
  const { push } = useRouter();

  const initialState = {
    subject: "",
    priority: "medium",
    topic: "Other",
    description: "",
  };

  const [formState, setFormState] = useState(initialState);

  // const [uploadedFiles, setUploadedFiles] = useState([]);

  // const [uploadActive, setUploadActive] = useState(false);

  function onChangeHandler(event) {
    let name = event.target.name;
    let value = event.target.value;

    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  // Firestore loading
  useEffect(() => {
    const db = getFirestore(app);
  }, []);

  // this function takes the property name and the value to set and changes the state property
  // function setStateProperty(name, value) {
  //     setFormState((prevState) => {
  //         return {
  //             ...prevState, [name]: value
  //         }
  //     })
  // }

  // function handleFileChange(event) {

  //     let filesList = uploadedFiles;

  //     if (event.target.files && event.target.files[0]) {

  //         // In order to upload the file, a check is made to know if another file with the same name exists

  //         const newFilename = event.target.files[0].name;
  //         const index = filesList.findIndex((file) => file.name === newFilename);

  //         if (index < 0) {
  //             // If the file is a new one, It's simply added to the array.
  //             filesList.push(event.target.files[0])
  //         } else {
  //             //If not, it's replaced.
  //             filesList.splice(index, 1, event.target.files[0]);
  //         }

  //         setUploadedFiles(filesList);

  //     }
  //     console.log(filesList);
  //     setUploadActive(false);
  //     event.target.value = "";
  // }

  // function handleRemoveFile(name) {
  //     setUploadedFiles((prevItems) => prevItems.filter((item) => item.name !== name));
  //   };

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Form submitted: ", formState);

    {
      /* Make use of firebase to handle files uploaded */
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          New Ticket
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            width: "100%",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="subject"
            label="Ticket subject"
            name="subject"
            value={formState.subject}
            onChange={onChangeHandler}
            autoFocus
          />
          <CustomSelect
            required={true}
            values={priority}
            width="250px"
            name="priority"
            label="Issue priority"
            currentValue={formState.priority}
            onChange={onChangeHandler}
          />
          <CustomSelect
            required={true}
            values={topic}
            width="250px"
            name="topic"
            label="Area of interest"
            currentValue={formState.topic}
            onChange={onChangeHandler}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            minRows={10}
            placeholder="Please describe here the issue encountered and the steps to reproduce it."
            id="description"
            label="Issue description"
            name="description"
            value={formState.description}
            onChange={onChangeHandler}
          />

          {/* <Box>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<FileUploadIcon />} 
                  onClick={() => setUploadActive(true)}
                  sx={{ display: uploadActive ? 'none' : 'inline-block' }}>
                    Add file
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary"  
                  onClick={() => setUploadActive(false)}
                  sx={{ display: uploadActive ? 'inline-block' : 'none' }}>
                    UNDO
                </Button>
            </Box>
            <Box sx={{ width: '100%'}}>
                <Input sx={{ display: uploadActive ? 'block' : 'none' }}
                    component="input"
                    type="file"
                    id="file-upload"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                />
                {uploadedFiles[0] && <Typography variant="body1" color="initial" sx={{ fontWeight: 'bold', mt: '15px', mb: '5px'}}>Files Uploaded</Typography> }
                {uploadedFiles[0] && uploadedFiles.map((file, index) => {
                    return (
                        <div key={index}>{file.name} <IconButton aria-label="delete" color="error" size="large" onClick={() => handleRemoveFile(file.name)}>
                          <DeleteIcon />
                         </IconButton>
                        </div>
                    )
                })}
            </Box> */}

          <FileUpload />
          <Box sx={{ display: "flex", justifyContent: "center", gap: "50px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mb: 2, width: "200px" }}
            >
              Create Ticket
            </Button>
            <Button
              variant="outlined"
              sx={{ mb: 2, width: "200px" }}
              onClick={() => {
                push("./dashboard");
              }}
            >
              Abort
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NewTicket;
