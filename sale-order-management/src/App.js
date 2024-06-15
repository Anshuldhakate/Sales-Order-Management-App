import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage';
import SaleOrdersPage from './pages/SaleOrdersPage';


const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={4}>
      <Button onClick={toggleColorMode} mb={4}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sale-orders/*" element={<SaleOrdersPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Box>
  );
};

export default App;
