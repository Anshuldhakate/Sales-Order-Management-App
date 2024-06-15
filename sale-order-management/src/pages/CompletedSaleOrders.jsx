import React from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getCompletedSaleOrders } from '../api';

const CompletedSaleOrders = () => {
  const { data: completedOrders, isLoading, isError } = useQuery({
    queryKey: ['completedSaleOrders'],
    queryFn: getCompletedSaleOrders,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading completed orders</div>;

  return (
    <Box mt={4}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Customer Name</Th>
            <Th>Invoice Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {completedOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.invoice_no}</Td>
              <Td>{order.customer_profile?.name || 'Unknown'}</Td>
              <Td>{order.invoice_date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedSaleOrders;
