import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import React from 'react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Text
          bgGradient="linear(to-l, rgb(80, 52, 52), rgb(113, 93, 78))"
          bgClip="text"
          fontSize="30px"
          fontWeight="extrabold"
          fontFamily="Times New Roman"
          textTransform="uppercase"
          textAlign="center"
        >
          <RouterLink to="/">Product Store 🛒</RouterLink>
        </Text>

        <HStack spacing={2} alignItems="center">
          <RouterLink to="/create">
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </RouterLink>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? '🌙' : '🌞'}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
