
import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import styles from './styles';

const GoogleDriveUploadButton = ({ authenticateGoogleUser }) => (
  <Button style={styles.uploadButton} icon={<GoogleOutlined />} onClick={authenticateGoogleUser}>
    Upload from Google Drive
  </Button>
);

export default GoogleDriveUploadButton;