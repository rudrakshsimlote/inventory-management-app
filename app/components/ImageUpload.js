import React, { useState } from 'react';
import { Button, Box, LinearProgress, Typography } from '@mui/material';
import { storage, firestore } from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const ImageUpload = ({ updateInventory }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCapture = ({ target }) => {
    const file = target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (image) {
      setUploading(true);
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error('Upload failed', error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);

          const newItem = {
            name: image.name,
            quantity: 1,
            imageUrl: downloadURL // Ensure this field is correctly named
          };
          await addDoc(collection(firestore, 'inventory'), newItem);
          setUploading(false);
          setImage(null);
          updateInventory();
        }
      );
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        type="file"
        capture="environment"
        onChange={handleCapture}
        style={{ display: 'none' }}
        id="icon-button-file"
      />
      <label htmlFor="icon-button-file">
        <Button variant="contained" color="primary" component="span">
          Capture Image
        </Button>
      </label>
      {image && (
        <Box mt={2}>
          <Typography variant="body2">{image.name}</Typography>
          <Button variant="contained" color="secondary" onClick={handleUpload} sx={{ mt: 1 }}>
            Upload Image
          </Button>
        </Box>
      )}
      {uploading && (
        <Box mt={2}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
