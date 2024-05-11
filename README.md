# Angular Product Order Customer

This Angular application is designed to manage products, orders, and customers in an ecommerce system. It provides functionality to view products, create orders, and manage customer details.

## Features

- **Products Page:** Displays a list of available products. Allows editing products with low quantities.
- **Orders Page:** Shows all orders in the system, including total price and payment method.
- **Order Details Page:** Provides detailed information about an order, including customer details, product details, and quantities.
- **Add Order Popup:** Opens a popup for adding new orders, including customer information and payment method selection.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/angular-product-order-customer.git

2. Navigate to the project directory:
   cd angular-product-order-customer

## Usage

1. Start the development server:
  ng serve

2. Open your browser and go to `http://localhost:4200/` to view the application.

## Dependencies

- Angular CLI: 16.0.0
- Angular Core: 16.2.12
- Angular Compiler: 16.2.12
- TypeScript: 5.0.0
- RxJS: 7.8.0
- Zone.js: 0.14.5
- Tailwind CSS: 3.4.3 (for styling)
- Font Awesome Free: 6.5.1
- ngx-toastr: 18.0.0
- ngx-spinner: 16.0.2

## Folder Structure

- `src/app/pages`: Contains Angular components for different pages (Products, Orders, Order Details).
- `src/app/shared/services`: Includes services for HTTP requests and data handling.
- `src/assets`: Stores static assets such as images and JSON data files.
- `src/styles.scss`: Global SCSS styles for the application.

## Development

- Use Angular CLI commands for development:
- `ng generate component component-name`: Generate a new component.
- `ng serve`: Start the development server.
- `ng build`: Build the application for production.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
