import React from 'react';
import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

const GuestMenu: React.FC = () => {
  return (
    <Stack direction="row" spacing={3}>
      <Button
        component={NavLink}
        to="/register"
        sx={{ textTransform: 'none', borderRadius: 16 }}
        color={'secondary'}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        component={NavLink}
        to="/login"
        color={'secondary'}
        sx={{ textTransform: 'none', color: 'white', borderRadius: 16 }}
        disableElevation
      >
        Sign In
      </Button>
    </Stack>
  );
};

export default GuestMenu;
