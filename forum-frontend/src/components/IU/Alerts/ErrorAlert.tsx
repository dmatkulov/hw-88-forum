import React from 'react';
import { Alert } from '@mui/material';
import { motion } from 'framer-motion';

interface Props {
  message: string;
}

const ErrorAlert: React.FC<Props> = ({ message }) => {
  return (
    <motion.div
      animate={{
        x: [0, -8, 8, -8, 8, -4, 4, -2, 2, 0],
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
    >
      <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
        {message}
      </Alert>
    </motion.div>
  );
};

export default ErrorAlert;
