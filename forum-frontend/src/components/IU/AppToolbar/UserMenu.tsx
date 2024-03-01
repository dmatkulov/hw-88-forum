import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';
import { User } from '../../../types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOutUser } from '../../../features/users/usersThunks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { selectLogOutLoading } from '../../../features/users/usersSlice';
import LoadingPage from '../LoadingPage/LoadingPage';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const logOutLoading = useAppSelector(selectLogOutLoading);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const logOut = () => {
    dispatch(logOutUser());
    navigate('/');
  };

  return (
    <>
      {logOutLoading && <LoadingPage />}
      <Stack
        sx={{ flexGrow: 1 }}
        direction="row"
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          color={'secondary'}
          sx={{ textTransform: 'none', color: 'white', borderRadius: 16 }}
          variant="contained"
          startIcon={<AddCircleIcon />}
          disableElevation
          onClick={() => navigate('/new-post')}
        >
          Create post
        </Button>
      </Stack>

      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ display: 'flex', gap: 1 }}
        disableRipple
      >
        <Tooltip title={user.username}>
          <AccountCircleIcon color="secondary" />
        </Tooltip>
      </IconButton>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        sx={{ mt: 2 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={logOut}>
          <LogoutIcon sx={{ mr: 2 }} />
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
