export default async function uploadFilesToFirestore(files, db) {
  const uploadedFiles = [];

  for (const file of files) {
    try {
      // Assuming you have a Firestore collection where you want to store the files.
      // Replace 'filesCollection' with the actual reference to the Firestore collection.
      // For example, if your collection is named "uploadedFiles", you can use the following:
      // const filesCollection = db.collection('uploadedFiles');
      const filesCollection = db.collection("glitchreporter-uploads");

      // Uploading the file to Firestore using Firebase Storage API.
      const storageRef = filesCollection.child(file.name);
      const snapshot = await storageRef.put(file);

      // Getting the URL of the uploaded file.
      const url = await snapshot.ref.getDownloadURL();

      // Creating an object with file name and URL, then pushing it to the array.
      uploadedFiles.push({ name: file.name, url });
    } catch (error) {
      // Handle any potential errors during the upload process for individual files.
      console.error(`Error uploading ${file.name}:`, error);
    }
  }

  return uploadedFiles;
}
