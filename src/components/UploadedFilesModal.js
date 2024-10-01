import React from 'react';
import { Modal, List } from 'antd';

const UploadedFilesModal = ({ isModalVisible, setIsModalVisible, uploadedFiles }) => (
  <Modal
    title="Uploaded Files"
    visible={isModalVisible}
    onCancel={() => setIsModalVisible(false)}
    footer={null}
  >
    <List
      dataSource={uploadedFiles}
      renderItem={item => (
        <List.Item>
          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
        </List.Item>
      )}
    />
  </Modal>
);

export default UploadedFilesModal;