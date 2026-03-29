# tengu

## Marketplace + Auth + Stripe + Sheets + Email

Configurar `.env` (ver `.env.example`) y luego:
```bash
npm install
npm run prisma:generate:auth
npm run prisma:generate:shop
npm run prisma:generate:crm
npm run prisma:dbpush:auth
npm run prisma:dbpush:shop
npm run prisma:dbpush:crm
npm run dev
```

Rutas: `/register`, `/login`, `/marketplace`, `/api/products`, `/api/checkout`.
