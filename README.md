## Foleon application

## 🗂 Monorepo structure

| Package                                               | Description                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [`@foleon/web`](./apps/web)                           | Front end application created with NextJS                                              |
| [`@foleon/ui`](./packages/ui)                         | React components with [stories](https://storybook.js.org/)                             |
| [`@foleon/design-tokens`](./packages/design-tokens)   | Design tokens (colors, font)                                                           |

## 💥 Features

- Login page with credentials
- Display a list of (my) publications
- Search the publications by name
- Display a publication’s information
- Pagination
- Mobile first

## ⚒️ Stack
- Lerna with PNPM monorepo
- React (typescript)
- Next13
- Storybook
- Github actions with Release
- Github actions with Tests
- Design tokens with `style-dictionary` https://amzn.github.io/style-dictionary/#/
- Component library with React
- Conventional commits
- Semantic releases

## 🌐 Links

- Front end application: https://foleon-project-web.vercel.app/
- Components: https://foleon-project-ui.vercel.app

## ⚠️ Requirements

- Node >= `v18.12.1`
- PNPM >= `8.5.1`

Create an `.env` file in [`@foleon/web`](./apps/web):

```
NEXT_PUBLIC_CLIENT_ID=ENTER_YOUR_FOLEON_CLIENT_ID_HERE
NEXT_PUBLIC_CLIENT_SECRET=ENTER_YOUR_FOLEON_CLIENT_SECRET_HERE
```

Ready to go!

## 🚀 Start

In the root folder run following commands:

1. Install dependencies

```bash
  pnpm i
```

2. Running the project

```bash
  pnpm dev
```

## 🚦 Testing

In the root folder run following commands:

Unit tests

```bash
  pnpm test
```

E2E tests

1. Running the project

```bash
  pnpm dev
```

2. Running Cypress (new terminal)

```bash
  pnpm --filter @foleon/web cypress:open
```
