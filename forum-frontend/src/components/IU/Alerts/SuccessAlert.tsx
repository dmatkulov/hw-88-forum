import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/lab';

interface Props {
  message: string;
}

const SuccessAlert: React.FC<Props> = ({ message }) => {
  return (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity="success"
      sx={{ mt: 3, width: '100%' }}
    >
      {message}
    </Alert>
  );
};

export default SuccessAlert;
