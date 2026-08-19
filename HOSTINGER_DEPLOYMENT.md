# Hostinger deployment

The repository contains two independently deployable applications:

- A standard Next.js dashboard frontend in the repository root.
- The production MySQL API in `mysql-backend`.

## Recommended hPanel configuration

### Deployment 1: dashboard frontend

Create a Node.js application from the GitHub repository and set:

- Branch: `main`
- Application root: repository root
- Framework: `Next.js`
- Node.js version: 22
- Build command: `npm run build`
- Start command: `npm start`
- Entry file: leave empty
- Output directory: leave empty

Set `NEXT_PUBLIC_API_URL` to the public URL of Deployment 2.

### Deployment 2: MySQL API

Create a second Node.js application from the same GitHub repository and set:

- Branch: `main`
- Application root: `mysql-backend`
- Node.js version: 20 or 22
- Framework: `Express`
- Package manager: npm
- Install command: `npm install --omit=dev`
- Start command: `npm start`
- Entry file, when requested: `server.cjs`
- Health check path: `/health`

Do not configure `server.cjs` while the application root points to the repository
root. The Express entry file exists at `mysql-backend/server.cjs`.

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
