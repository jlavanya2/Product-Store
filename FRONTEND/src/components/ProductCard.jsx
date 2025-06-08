import React from 'react';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
  VStack,
  useDisclosure,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = React.useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.700');
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      toast({
        title: 'Product deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
        variant: 'solid',
        colorScheme: 'green',
      });
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(product._id, updatedProduct);
      toast({
        title: 'Product updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
        variant: 'solid',
        colorScheme: 'green',
      });
      onClose();
    } catch (err) {
      console.error('Error updating product:', err.message);
    }
  };

  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" transition="all 0.3s" bg={bg} _hover={{ transform: "translateY(-5px)", shadow: "xl" }}>
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ₹{product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image url"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
              <Input
                placeholder="Category"
                name="category"
                value={updatedProduct.category}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateProduct}>Update</Button>
            <Button ml={3} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
