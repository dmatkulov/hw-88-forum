import React from 'react';
import { Box, Container } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        borderLeft: '1px solid #eee',
        borderRight: '1px solid #eee',
        height: '100vh',
        position: 'relative',
        overflowY: 'scroll',
      }}
    >
      <header
        style={{ position: 'sticky', left: 0, right: 0, top: 0, zIndex: 1000 }}
      >
        <AppToolbar />
      </header>
      <main>
        <Box component="section" px={3}>
          {children}
        </Box>
      </main>
    </Container>
  );
};

export default Layout;
