# Multi-tenant Notes SaaS (Acme & Globex)

## Overview
Shared schema multi-tenancy. JWT auth. Admin & Member roles. Free plan limit = 3 notes per tenant. Upgrade endpoint lifts limit.

## Run locally
1. Clone repo
2. Create `.env`:
   MONGO_URI=...
   JWT_SECRET=...
   FRONTEND_URL=http://localhost:3000
3. Install:
   npm install
4. Seed DB:
   node seed.js
5. Start:
   node server.js
6. Access health:
   GET http://localhost:3000/health

## Predefined accounts (password: password)
- admin@acme.test (Admin, Acme)
- user@acme.test (Member, Acme)
- admin@globex.test (Admin, Globex)
- user@globex.test (Member, Globex)

## API
[documented routes described above]

## Multi-tenancy approach
Shared-schema with `tenant` references on documents. All endpoints strictly filter by `req.user.tenant._id` derived from verified JWT. This ensures no cross-tenant access.

## Deployment
- Backend: Deploy to Vercel/any Node host. Set env vars in Vercel.
- Frontend: Next.js app deployed to Vercel. Set `NEXT_PUBLIC_API_URL` to your backend URL.

