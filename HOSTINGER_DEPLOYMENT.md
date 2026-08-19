# Hostinger deployment

The repository contains two applications:

- The current dashboard frontend in the repository root.
- The production MySQL API in `mysql-backend`.

## Recommended hPanel configuration

Create a Node.js application from the GitHub repository and set:

- Branch: `main`
- Application root: `mysql-backend`
- Node.js version: 20 or 22
- Package manager: npm
- Install command: `npm install --omit=dev`
- Start command: `npm start`
- Entry file, when requested: `src/server.js`
- Health check path: `/health`

Using the repository root as the application root installs the separate
Vinext frontend and its 500+ packages. That is not an API deployment error,
but it is unnecessary for the MySQL service and can show deprecation warnings
from transitive frontend build dependencies.

## Required environment variables

Copy the names from `mysql-backend/.env.example` into hPanel. Enter secrets in
hPanel only; never commit a real `.env` file.

Use the exact MySQL hostname shown by Hostinger. Do not use `localhost` or
`::1` unless hPanel explicitly provides it. A host mismatch is the usual cause
of `Access denied for user ... @ '::1'`.

`JWT_SECRET` must be at least 32 characters. `FRONTEND_URL` must be the exact
frontend origin. Multiple frontend origins may be comma-separated.

## First database initialization

After the environment variables are saved, run once in the application root:

```bash
npm run db:init
```

Then restart the application and open `/health`. A successful response is:

```json
{"status":"ok","database":"connected"}
```

## Root-directory fallback

If hPanel does not allow setting `mysql-backend` as the application root, use:

- Install command: `npm run hostinger:install`
- Start command: `npm run hostinger:start`
- One-time database command: `npm run hostinger:init-db`
