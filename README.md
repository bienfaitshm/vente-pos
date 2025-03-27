# Mobile Sales Management Solution

This project provides a comprehensive solution for managing field sales, offering increased flexibility and efficiency for businesses operating across various points of sale.

This project delivers a robust and user-friendly solution for mobile sales management, invoicing, and performance tracking, enabling businesses to optimize their sales operations and improve profitability.

## Key Features

### Simplified Mobile Sales and Invoicing
- **Field sales**: Sales representatives can make sales directly from their locations.
- **Instant invoicing**: Generate invoices immediately after a sale.
- **Invoice downloads**: Customers can download their invoices in digital format.

### Performance Tracking and Analysis
- **Sales trends**: Real-time tracking of sales trends.
- **Sales representative performance**: Monitor individual performance of sales representatives.
- **Daily sales reports**: Generate detailed reports on daily sales activities.

## Benefits

- Improved efficiency of field sales operations.
- Accelerated invoicing process.
- Accurate tracking of sales and sales representatives' performance.
- Informed decision-making through detailed reports.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Documentation for Environment Variables

This `.env` file contains configuration settings for the application. Below is a detailed explanation of each variable:

### Authentication
- **AUTH_SECRET**: Secret key used for authentication purposes. Keep this value secure and do not expose it publicly.
- **AUTH_RESEND_KEY**: Key used for resending authentication-related requests.

### Resend API
- **RESEND_API_KEY**: (Optional) API key for accessing the Resend service. Ensure this key is kept confidential.

### PostgreSQL Database Configuration
- **POSTGRES_URL**: (Required) Connection string for the PostgreSQL database with SSL enabled (pooled connection).

### [Optional]
- **POSTGRES_HOST**: Hostname of the PostgreSQL database server (pooled connection).
- **POSTGRES_URL_NON_POOLING**: Connection string for the PostgreSQL database without pooling, with SSL enabled.
- **POSTGRES_DATABASE**: Name of the PostgreSQL database.
- **POSTGRES_PASSWORD**: Password for the PostgreSQL database user. Keep this value secure.
- **PGUSER**: Username for the PostgreSQL database.
- **POSTGRES_URL_NO_SSL**: Connection string for the PostgreSQL database without SSL.
- **PGHOST_UNPOOLED**: Hostname of the PostgreSQL database server (non-pooled connection).
- **PGDATABASE**: Name of the PostgreSQL database (alternative variable).
- **POSTGRES_PRISMA_URL**: Connection string for the PostgreSQL database optimized for Prisma, with pooling and additional parameters.
- **PGPASSWORD**: Password for the PostgreSQL database user (alternative variable).
- **DATABASE_URL**: General connection string for the PostgreSQL database with SSL enabled.
- **POSTGRES_USER**: Username for the PostgreSQL database (alternative variable).
- **PGHOST**: Hostname of the PostgreSQL database server (pooled connection, alternative variable).
- **DATABASE_URL_UNPOOLED**: Connection string for the PostgreSQL database without pooling, with SSL enabled.

### Notes
- Ensure all sensitive information such as passwords, API keys, and secrets are stored securely and not exposed in version control systems.
- Use environment variable management tools or services to handle these values securely in production environments.
- The connection strings include parameters like `sslmode=require` to enforce secure connections to the database.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
