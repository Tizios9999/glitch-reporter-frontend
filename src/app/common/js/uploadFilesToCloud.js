/**

Uploades files to the Google Cloud storage.

*/

import createRandomString from "./createRandomString";
import { ref, uploadBytes } from "firebase/storage";

export default async function uploadFilesToCloud(files, storage) {
  const uploadedFiles = [];

  for (const file of files) {
    try {
      const fileName = file.name;

      //A randomized folder ensures that all links to the file will be different.
      const randomizedFolder = createRandomString(12);

      const storageRef = ref(
        storage,
        `uploads/${randomizedFolder}/${fileName}`
      );

      const fullPath = storageRef.fullPath;

      uploadBytes(storageRef, file).then((snapshot) => {
        console.log(`Uploaded ${fileName}!`);
      });

      const fileData = {
        name: fileName,
        path: fullPath,
      };

      // Creating an object with file name and URL, then pushing it to the array.
      uploadedFiles.push(fileData);
    } catch (error) {
      // Handle any potential errors during the upload process for individual files.
      console.error(`Error uploading ${file.name}:`, error);
    }
  }

  return uploadedFiles;
}
