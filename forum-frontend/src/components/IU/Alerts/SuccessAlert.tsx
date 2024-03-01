import React, { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/lab';
import { motion } from 'framer-motion';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

interface Props {
  message: string;
}

const SuccessAlert: React.FC<Props> = ({ message }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId: number | undefined;
    if (message) {
      intervalId = setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [message]);
  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <Grid item textAlign="center">
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{ mt: 3, width: '100%', textAlign: 'center' }}
        >
          {message}
        </Alert>
      </Grid>

      <Grid item textAlign="center">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Typography variant="body1" color="gray">
            You will be navigated to
          </Typography>
          <Button
            startIcon={<HomeIcon />}
            sx={{ textTransform: 'none' }}
            color={'info'}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </Stack>
      </Grid>
    </motion.div>
  );
};

export default SuccessAlert;
