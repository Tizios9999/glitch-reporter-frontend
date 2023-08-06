import { Box, Link } from "@mui/material";
import { firebaseConfig, app } from "../firebase/firebaseConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function UploadedFileElement({ file }) {
  function handleClick() {
    const storage = getStorage(app);

    getDownloadURL(ref(storage, file.path))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        // Handle any errors

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
