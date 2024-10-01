import React from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './styles';

const FileUploadButton = ({ handleFileChange }) => (
  <>
    <Button style={styles.uploadButton} icon={<UploadOutlined />} onClick={() => document.getElementById('file-input').click()}>
      Upload Local File
    </Button>
    <input
      id="file-input"
      type="file"
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
  </>
);

export default FileUploadButton;