import React from 'react';
import { Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons'; // Import LinkOutlined icon
import styles from './styles';

const UrlUploadInput = ({ showUrlInput, url, setUrl, setShowUrlInput, handleUrlSubmit }) => (
  <>
    <Button style={styles.uploadButton} icon={<LinkOutlined />} onClick={() => setShowUrlInput(!showUrlInput)}>
      Upload from URL
    </Button>
    {showUrlInput && (
      <div style={styles.urlInput}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter file URL"
          style={styles.urlField}
        />
        <Button onClick={handleUrlSubmit}>Submit</Button>
      </div>
    )}
  </>
);

export default UrlUploadInput;