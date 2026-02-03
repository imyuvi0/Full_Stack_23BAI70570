
import React from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import MembersPage from './pages/MembersPage';
import BorrowingsPage from './pages/BorrowingsPage';
import { Container, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

const LibraryContent = () => {
  const { currentPage } = useLibrary();
  
  return (
    <Box sx={{ py: 4 }}>
      <AnimatePresence mode="wait">
        {currentPage === 'dashboard' && <Dashboard key="dashboard" />}
        {currentPage === 'books' && <BooksPage key="books" />}
        {currentPage === 'members' && <MembersPage key="members" />}
        {currentPage === 'borrowings' && <BorrowingsPage key="borrowings" />}
      </AnimatePresence>
    </Box>
  );
};

const App = () => {
  return (
    <LibraryProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
        <Navigation />
        <Container maxWidth="xl">
          <LibraryContent />
        </Container>
      </Box>
    </LibraryProvider>
  );
};

export default App;
