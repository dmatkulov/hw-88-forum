import React from 'react';
import { Container } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="md"
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
        <Container maxWidth="md" disableGutters sx={{ pl: '16px' }}>
          {children}
        </Container>
      </main>
    </Container>
  );
};

export default Layout;
