# Sales-Order-Management-App

This is a Sale Order Management application built with React, Chakra UI, and React Query. The app allows users to create, manage, and move sale orders to a completed state.


<img width="941" alt="features1" src="https://github.com/Anshuldhakate/Sales-Order-Management-App/assets/123949154/3f5e1a16-c617-4243-be4e-b6429a3fd44b">

<br/>

<img width="959" alt="Screenshot 2024-06-15 155330" src="https://github.com/Anshuldhakate/Sales-Order-Management-App/assets/123949154/bf8f1eaf-f50b-4654-bb9e-ac0ba8616205">


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/Anshuldhakate/Sales-Order-Management-App.git
    ```

2. Navigate to the project directory:

    ```bash
    cd sale-order-management
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and visit `http://localhost:3000` to see the app in action.

## Usage

### Creating a Sale Order

1. Click on the "Create Sale Order" button.
2. Fill in the necessary details such as invoice number, customer name, and invoice date.
3. Click "Submit" to create the sale order.

### Managing Sale Orders

- Edit: Click the "Edit" button next to the sale order you wish to edit.
- Delete: Click the "Delete" button to remove a sale order.
- Move: Click the "Move" button to move a sale order to the completed list.

## API Reference

### Endpoints

#### `GET /api/activeSaleOrders`

- **Description**: Fetch all active sale orders.
- **Response**: 
  - Status: `200 OK`
  - Body: Array of active sale orders.

#### `GET /api/completedSaleOrders`

- **Description**: Fetch all completed sale orders.
- **Response**: 
  - Status: `200 OK`
  - Body: Array of completed sale orders.

#### `POST /api/createSaleOrder`

- **Description**: Create a new sale order.
- **Body**:
  ```json
  {
    "invoice_no": "string",
    "customer_name": "string",
    "invoice_date": "YYYY-MM-DD"
  }
