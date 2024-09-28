# Drizzle Boilerplate and Query examples

## Install

-   To install dependencies:

```bash
bun install
```

-   Copy `.env.template` to `.env` and update the contents if required.

## Create database

```bash
bun run create_db
```

## Run

To run:

```bash
bun run ./index.ts
```

To check out database tests run:

```bash
bun test
```

## View database

Run:

```bash
bun run view_db
```

And view the database at: https://local.drizzle.studio/

## Debug generated SQLs

To check out how the SQlite tables are created run:

```bash
bun run debug_sql
```

In the `./drizzle` folder a number of sql files will appear.
