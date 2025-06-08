import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: ''
  });
  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    try {
      const result = await createProduct(newProduct);
      toast({
        title: 'Product added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
        variant: 'solid',
        colorScheme: 'green',
      });
      setNewProduct({ name: '', price: '', image: '', category: '' });
    } catch (err) {
      console.error('Error adding product:', err.message);
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={8}
          fontFamily="Times New Roman"
          color={useColorModeValue('cyan.800', 'white')}
        >
          Create New Product
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue('white', 'gray.700')}
          p={6}
          rounded="lg"
          boxShadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Input
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Createpage;
