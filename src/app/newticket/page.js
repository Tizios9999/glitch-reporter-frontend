"use client";

/* IMPORTS */
// React
import { useContext } from "react";
import { useState } from "react";
// Next.js
import { useRouter } from "next/navigation";
// External services
import { firebaseConfig, app } from "../firebase/firebaseConfig";
import { getStorage } from "firebase/storage";
// Internal services
import { createTicket } from "../services/ticket.service";
// Components
import ProtectedRoute from "../protectedRoutes/ProtectedRoute";
import CustomSelect from "../components/CustomSelect";
import FileUpload from "../components/FileUpload";
// Internal functions
import uploadFilesToCloud from "../common/js/uploadFilesToCloud";
import getCurrentDateTimeISO from "../common/js/getCurrentDateTimeISO";
// Contexts
import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../contexts/AppContext";
// Material UI Components
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Page that allows the user to open a new ticket.

*/

const NewTicket = () => {
  const { push } = useRouter();

  const initialState = {
    subject: "",
    priority: "",
    topic: "",
    message: "",
  };

  const storage = getStorage(app);
  const [authState, authDispatch] = useContext(AuthContext);
  const [appState, appDispatch] = useContext(AppContext);

  const [formState, setFormState] = useState(initialState);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

  function handleFileChange(files) {
    setUploadedFiles(files);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Form control

    const formValues = Object.values(formState);

    const allFieldsFilled = formValues.every((value) => value !== "");

    if (!allFieldsFilled) {
      console.error("You missed some fields");

      return false;
    }

    // Check on files to be uploaded

    async function createTicketWithFiles(formState, uploadedFiles, storage) {
      try {
        // Upload files to Firestore and get the file links.
        const fileLinks = await uploadFilesToCloud(uploadedFiles, storage);

        // Form conversion into json
        const currentUser = authState.user;
        const currentDateTimeISO = getCurrentDateTimeISO();

        const ticketMessage = {
          sender: currentUser.username,
          senderId: currentUser.id,
          messageDate: currentDateTimeISO,
          message: formState.message,
          uploadedFiles: fileLinks,
        };

        const ticketData = {
          ticketSubject: formState.subject,
          creationDate: currentDateTimeISO,
          lastUpdated: currentDateTimeISO,
          priorityId: formState.priority,
          topicId: formState.topic,
          openingUserId: currentUser.id,
          openingUser: currentUser.username,
          statusId: null,
          assignedTo: null,
          messages: [ticketMessage],
        };

        const createdTicket = await createTicket(ticketData);

        push(`/tickets/${createdTicket}`);
      } catch (error) {
        console.error("Error creating ticket with files:", error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        appDispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
      }
    }

    createTicketWithFiles(formState, uploadedFiles, storage);
  }

  return (
    <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_AGENT", "ROLE_ADMIN"]}>
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
              values={appState.metadata.priorities}
              width="250px"
              name="priority"
              label="Issue priority"
              currentValue={formState.priority}
              onChange={onChangeHandler}
            />
            <CustomSelect
              required={true}
              values={appState.metadata.topics}
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
              id="message"
              label="Issue description"
              name="message"
              value={formState.message}
              onChange={onChangeHandler}
            />

            <FileUpload onFileChange={handleFileChange} />
            <Box
              sx={{
                display: "flex",
                width: "80%",
                justifyContent: "space-evenly",
                flexFlow: "row wrap",
              }}
            >
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
    </ProtectedRoute>
  );
};

export default NewTicket;
