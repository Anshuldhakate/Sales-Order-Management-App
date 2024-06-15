import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, FormLabel, FormControl } from '@chakra-ui/react';
import { createSaleOrder } from '../api';

const SaleOrderForm = ({ defaultValues, isReadOnly, onClose }) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSaleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeSaleOrders'] });
      onClose();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Invoice No</FormLabel>
        <Input
          {...register('invoice_no', { required: true })}
          readOnly={isReadOnly}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Customer Name</FormLabel>
        <Input
          {...register('customer_profile.name', { required: true })}
          readOnly={isReadOnly}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Invoice Date</FormLabel>
        <Input
          type="date"
          {...register('invoice_date', { required: true })}
          readOnly={isReadOnly}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit" isLoading={mutation.isLoading}>
        Submit
      </Button>
    </form>
  );
};

export default SaleOrderForm;
