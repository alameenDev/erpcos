# CosmetiCore MySQL API

Production-oriented Node.js API for the cosmetics accounting, inventory, sales, installments and sales-representative system.

## Hostinger setup

1. Create a MySQL database and database user in hPanel.
2. Copy `.env.example` to `.env` and enter the exact MySQL credentials shown in hPanel.
3. Set `DB_HOST` to the host supplied by Hostinger. Do not assume `localhost`; on managed Node hosting it may resolve to IPv6 `::1` and cause an access-denied error.
4. Run `npm install`.
5. Run `npm run db:init` once to create the schema and initial administrator.
6. Start the application with `npm start` and configure Hostinger's application entry point as `server.js`.

## Required environment variables

`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `FRONTEND_URL`.

The initial administrator is created using `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. Change the password immediately after first login.

## Implemented modules

- Company, branches, roles, users and audit logs
- Manufacturers, brands, categories, products and product variants
- Five price levels: cost, wholesale, retail, mandatory and minimum sale price
- Warehouses, balances and full inventory movement history
- Customers, credit limits and balances
- Sales representatives and product-level assignments
- Quotations with gifts, discounts and expiry dates
- Cash and installment invoices with transactional stock deduction
- Payments, installment schedules and overdue tracking
- Dashboard and sales reports

## Security and accounting rules

- JWT authentication and role authorization
- Password hashing with bcrypt
- Prepared SQL statements and transaction-based invoice posting
- Sale-price floor enforcement
- Gift eligibility enforcement
- Stock availability checks with row locking
- Atomic invoice, inventory, payment and installment creation
