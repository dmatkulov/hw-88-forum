import React from 'react';
import { Box, Container } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        borderLeft: '1px solid #eee',
        borderRight: '1px solid #eee',
        height: '100vh',
        position: 'relative',
      }}
    >
      <header>
        <AppToolbar />
      </header>
      <main>
        <Box component="section">{children}</Box>
      </main>
    </Container>
  );
};

export default Layout;
