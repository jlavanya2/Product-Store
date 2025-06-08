import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Createpage from './pages/Createpage';

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue('cyan.100', 'cyan.800')}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
      </Routes>
    </Box>
  );
}

export default App;
