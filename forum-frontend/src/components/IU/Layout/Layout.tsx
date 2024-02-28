import React from 'react';
import { Container, Grid } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        borderLeft: '1px solid #eee',
        borderRight: '1px solid #eee',
        height: '100vh',
      }}
    >
      <header>
        <AppToolbar />
      </header>
      <main>
        <Grid container>{children}</Grid>
      </main>
    </Container>
  );
};

export default Layout;
