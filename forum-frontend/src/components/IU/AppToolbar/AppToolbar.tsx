import React from 'react';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';

import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});
const AppToolbar: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        boxShadow: 0,
        mb: '80px',
        minHeight: '74px',
        borderTop: '8px solid coral',
      }}
    >
      <Toolbar disableGutters>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: '1px solid #eee',
            py: 2,
            px: 3,
          }}
        >
          <Typography variant="h6" component="div" color="black">
            <Link to="/">TalkSpace</Link>
          </Typography>
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
