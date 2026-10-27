import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: {
    // Empty fallback lets `prisma generate` run in CI/build without a database.
    url: process.env.DATABASE_URL ?? '',
  },
});
