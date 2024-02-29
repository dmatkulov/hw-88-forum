import React from 'react';
import { Alert } from '@mui/material';

interface Props {
  message: string;
}

const InfoAlert: React.FC<Props> = ({ message }) => {
  return (
    <Alert severity="info" sx={{ width: '100%' }}>
      {message}
    </Alert>
  );
};

export default InfoAlert;
