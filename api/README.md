# @headule/api

## Configuration

Add a .env file

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/headule?schema=public"
JWT_SECRET=1234567890
```

## Install

Install the dependencies and build generated file

```bash
pnpm install
pnpm build
```

## Development

Run the development server (restarts on change)

```bash
pnpm dev
```

To update the schema.graphql file (after changes to the graphql api) or update the prisma client (after changes to the prisma schema)

```bash
pnpm build
```

To test

```bash
pnpm test
# or
pnpm test:watch
```
