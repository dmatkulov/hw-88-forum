import React from 'react';
import { Alert } from '@mui/material';

interface Props {
  message: string;
}

const ErrorAlert: React.FC<Props> = ({ message }) => {
  return (
    <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
