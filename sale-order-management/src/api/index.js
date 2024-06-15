let activeSaleOrders = [
  {
    id: 1,
    invoice_no: 'INV-001',
    customer_profile: { name: 'Customer 1' },
    invoice_date: '2024-06-01',
  },
  {
    id: 2,
    invoice_no: 'INV-002',
    customer_profile: { name: 'Customer 2' },
    invoice_date: '2024-06-02',
  },
];

let completedSaleOrders = [
  {
    id: 3,
    invoice_no: 'INV-003',
    customer_profile: { name: 'Customer 3' },
    invoice_date: '2024-06-03',
  },
  {
    id: 4,
    invoice_no: 'INV-004',
    customer_profile: { name: 'Customer 4' },
    invoice_date: '2024-06-04',
  },
];

export const getActiveSaleOrders = async () => {
  return activeSaleOrders;
};

export const getCompletedSaleOrders = async () => {
  return completedSaleOrders;
};

export const createSaleOrder = async (order) => {
  const newOrder = { id: activeSaleOrders.length + 1, ...order };
  activeSaleOrders.push(newOrder);
  return newOrder;
};

export const moveOrderToCompleted = async (orderId) => {
  const orderToMove = activeSaleOrders.find(order => order.id === orderId);
  if (!orderToMove) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  activeSaleOrders = activeSaleOrders.filter(order => order.id !== orderId);
  completedSaleOrders.push(orderToMove);

  return orderToMove;
};

export const deleteOrder = async (orderId) => {
  const orderIndex = activeSaleOrders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  activeSaleOrders.splice(orderIndex, 1);
  return orderId;
};
