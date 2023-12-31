'use client'

import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

type AppUploadProps = {
  onUploadComplete: () => void;
}

const AppUpload: React.FC<AppUploadProps> = ({onUploadComplete}: AppUploadProps) => {
  const props: UploadProps = {
    name: 'file',
    action: 'http://localhost:3001/api/upload-csv', 
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        onUploadComplete?.();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => {
        return percent && `${parseFloat(percent.toFixed(2))}%`
      },
    },
  };
  
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
};

export default AppUpload;