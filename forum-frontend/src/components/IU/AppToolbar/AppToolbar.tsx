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
        mb: 4,
      }}
    >
      <Toolbar>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: '1px solid #eee' }}
          py={2}
          mt={2}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color="black"
          >
            <Link to="/">TalkSpace</Link>
          </Typography>
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
