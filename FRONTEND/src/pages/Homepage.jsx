import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient="linear(to-l, rgb(80, 52, 52), rgb(113, 93, 78))"
          bgClip="text"
          fontSize="30px"
          fontWeight="extrabold"
          fontFamily="Times New Roman"
          textTransform="uppercase"
          textAlign="center"
        >
          Current Products!
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
          {products.map((product) => (
            <ProductCard key={product._id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
            product={product}
             />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            fontWeight="extrabold"
            fontFamily="Times New Roman"
            textAlign="center"
            color="gray.500"
          >
            No Products found!{' '}
            <Link to="/create" style={{ color: 'teal', textDecoration: 'underline' }}>
              Click here to create a new product
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Homepage;
