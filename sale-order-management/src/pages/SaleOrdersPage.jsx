import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import ActiveSaleOrders from './ActiveSaleOrders';
import CompletedSaleOrders from './CompletedSaleOrders';
import SaleOrderForm from './SaleOrderForm';

const SaleOrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleOpenModal = (order = null) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button colorScheme="blue" onClick={() => handleOpenModal()}>+ Sale Order</Button>
            <ActiveSaleOrders onEdit={handleOpenModal} />
          </TabPanel>
          <TabPanel>
            <CompletedSaleOrders onView={handleOpenModal} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentOrder ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm defaultValues={currentOrder} isReadOnly={currentOrder && currentOrder.isCompleted} onClose={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SaleOrdersPage;
