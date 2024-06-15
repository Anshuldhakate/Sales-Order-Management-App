import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { username, password } = values;
    if (username === 'admin' && password === 'password') {
      navigate('/sale-orders');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input {...register('username')} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
