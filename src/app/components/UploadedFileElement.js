/* IMPORTS */
// React
// Next.js
// External services
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig, app } from "../firebase/firebaseConfig";
// Internal services
// Components
// Internal functions
// Contexts
// Material UI Components
import { Box, Link } from "@mui/material";
/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Returns a link component to an uploaded file in the storage.
Used to make available uploaded files from ticket messages.

*/

function UploadedFileElement({ file }) {
  function handleClick() {
    const storage = getStorage(app);

    getDownloadURL(
      ref(storage, `gs://glitchreporter-store.appspot.com/${file.path}`)
    )
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;

          const blobURL = URL.createObjectURL(blob);

          // Create a link element and simulate a click to trigger download
          const link = document.createElement("a");
          link.href = blobURL;
          link.download = file.name;
          link.click();

          // Clean up the blob object URL
          URL.revokeObjectURL(blobURL);
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
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

        console.error(error, "error from storage");
      });
  }

  return (
    <Box>
      <Link sx={{ cursor: "pointer" }} onClick={handleClick}>
        {file.name}
      </Link>
    </Box>
  );
}

export default UploadedFileElement;
