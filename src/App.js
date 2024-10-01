import React, { useState } from 'react';
import { Button, message, Progress } from 'antd';
import 'antd/es/style/reset.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FileUploadButton from './components/FileUploadButton';
import GoogleDriveUploadButton from './components/GoogleDriveUploadButton';
import UrlUploadInput from './components/UrlUploadInput';
import UploadedFilesModal from './components/UploadedFilesModal';
import styles from './components/styles';
import { storage } from './utils/firebaseConfig';
import { useGoogleApi } from './utils/googleApiconfig';
//import NavbarComponent from './navbar/navbar';

function App() {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { gapiInited, gisInited, tokenClient } = useGoogleApi();

  const authenticateGoogleUser = () => {
    if (!gapiInited || !gisInited) {
      message.error('Google API not initialized.');
      return;
    }

    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      if (window.gapi.picker) {
        createPicker(resp.access_token);
      } else {
        message.error('Picker API not loaded.');
      }
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  const createPicker = (accessToken) => {
    const picker = new window.google.picker.PickerBuilder()
      .addView(window.google.picker.ViewId.DOCS)
      .setOAuthToken(accessToken)
      .setDeveloperKey(process.env.REACT_APP_API_KEY)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  };

  const pickerCallback = (data) => {
    if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
      const file = data[window.google.picker.Response.DOCUMENTS][0];
      handleGoogleDriveUpload(file);
    }
  };

  const handleGoogleDriveUpload = async (file) => {
    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: process.env.REACT_APP_SCOPE,
        callback: async (response) => {
          if (response.error !== undefined) {
            throw new Error('Failed to get access token');
          }

          const fileResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`, {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });

          if (!fileResponse.ok) {
            throw new Error('File content could not be retrieved from Google Drive.');
          }

          const fileContent = await fileResponse.blob();
          const storageRef = ref(storage, `uploads/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, fileContent);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              message.error('Upload failed.');
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setUploadedFiles((prevFiles) => [...prevFiles, { name: file.name, url: downloadURL }]);
              message.success(`${file.name} uploaded successfully!`);
              setShowUploadOptions(false);
              setUploadProgress(0);
            }
          );
        },
      });

      tokenClient.requestAccessToken({ prompt: '' });
    } catch (error) {
      message.error('Error uploading Google Drive file.');
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => handleLocalFileUpload(file));
  };

  const handleLocalFileUpload = (file) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        message.error('Upload failed.');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUploadedFiles((prevFiles) => [...prevFiles, { name: file.name, url: downloadURL }]);
        message.success(`${file.name} uploaded successfully!`);
        setShowUploadOptions(false);
        setUploadProgress(0);
      }
    );
  };

  const handleUrlSubmit = () => {
    if (!url) {
      message.error('Please enter a valid URL.');
      return;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch file from URL.');
        return response.blob();
      })
      .then((blob) => {
        const file = new File([blob], url.split('/').pop(), { type: blob.type });
        handleLocalFileUpload(file);
        setUrl('');
      })
      .catch(() => {
        message.error('Error uploading file from URL.');
      });
  };

  const showUploadedFilesModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Upload Files</h2>
          <div style={styles.buttonContainer}>
            <Button
              style={showUploadOptions ? styles.disabledButton : styles.uploadButton}
              onClick={() => setShowUploadOptions(true)}
              disabled={showUploadOptions} // Disable the button when upload options are visible
            >
              Upload Files
            </Button>
            {!showUploadOptions && (
              <Button
                style={styles.viewFilesButton}
                onClick={showUploadedFilesModal}
              >
                View Uploaded Files
              </Button>
            )}
          </div>
          {showUploadOptions && (
            <>
              <div style={styles.form}>
                <FileUploadButton handleFileChange={handleFileChange} />
                <UrlUploadInput showUrlInput={showUrlInput} url={url} setUrl={setUrl} setShowUrlInput={setShowUrlInput} handleUrlSubmit={handleUrlSubmit} />
                <GoogleDriveUploadButton authenticateGoogleUser={authenticateGoogleUser} />
              </div>
              {uploadProgress > 0 && <Progress percent={uploadProgress} />}
            </>
          )}
          <UploadedFilesModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} uploadedFiles={uploadedFiles} />
        </div>
      </div>
    </>
  );
}

export default App;