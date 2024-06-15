import React from 'react';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getActiveSaleOrders, deleteOrder, moveOrderToCompleted } from '../api';

const ActiveSaleOrders = ({ onEdit }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: activeOrders, isLoading, isError } = useQuery({
    queryKey: ['activeSaleOrders'],
    queryFn: getActiveSaleOrders,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: ['activeSaleOrders'] });
      const previousOrders = queryClient.getQueryData(['activeSaleOrders']);
      queryClient.setQueryData(['activeSaleOrders'], (oldOrders) =>
        oldOrders.filter(order => order.id !== orderId)
      );
      return { previousOrders };
    },
    onError: (error, orderId, context) => {
      queryClient.setQueryData(['activeSaleOrders'], context.previousOrders);
      console.error('Error deleting order:', error);
      toast({
        title: 'Failed to delete order',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activeSaleOrders'] });
    },
    onSuccess: () => {
      toast({
        title: 'Order deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const moveMutation = useMutation({
    mutationFn: moveOrderToCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeSaleOrders'] });
      queryClient.invalidateQueries({ queryKey: ['completedSaleOrders'] });
      toast({
        title: 'Order moved to completed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error('Error moving order:', error);
      toast({
        title: 'Failed to move order',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading active orders</div>;

  return (
    <Box mt={4}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Customer Name</Th>
            <Th>Invoice Date</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
            <Th>Move</Th>
          </Tr>
        </Thead>
        <Tbody>
          {activeOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.invoice_no}</Td>
              <Td>{order.customer_profile?.name}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <Button colorScheme="blue" onClick={() => onEdit(order)}>Edit</Button>
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => deleteMutation.mutate(order.id)}>Delete</Button>
              </Td>
              <Td>
                <Button colorScheme="green" onClick={() => moveMutation.mutate(order.id)}>Move</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveSaleOrders;
