import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const SuccessFormItem: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
    >
      <Typography variant="body1" color="gray">
        You can navigate to
      </Typography>
      <Button
        startIcon={<HomeIcon />}
        sx={{ textTransform: 'none' }}
        color={'info'}
        onClick={() => navigate('/')}
      >
        Home
      </Button>
      <Typography variant="body1" color="gray">
        or
      </Typography>
      <Button
        startIcon={<LoginIcon />}
        sx={{ textTransform: 'none' }}
        color={'info'}
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </Stack>
  );
};

export default SuccessFormItem;
