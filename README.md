# My Store DEMO

The project was built using React, Typescript, React Redux, React Router and Vite and have been deployed to netlify: [Check it out](https://release--lovely-syrniki-236122.netlify.app/)

## Usages

to start dev server 

```bash
npm run dev
```

build the project

```bash
npm run build
```

You can also locally preview the production build

```bash
npm run preveiew
```

to run test

```bash
npm run test
```

## Project Sturcture

```
Overview of project structure
├── src
│   ├── App.tsx
│   ├── api.ts
│   ├── asset
│   ├── component
│   ├── index.scss
│   ├── main.tsx
│   ├── page
│   ├── store
│   ├── util.ts
│   └── vite-env.d.ts
├── test
├── tsconfig.base.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

34 directories, 24 files

```

- `/component` : With Reusable and extendable UI components: FlatList, Badge

- `/store`: hold all the logic related to redux and async fetching

- `/page`: components with business logic

## CI w/ Githuh Actions

Build and test tasks are going to be automatically ran after push to `main` branch

## Deployment

Since this is a CSR single page application, all the bundled files are static. Netfliy have been choosen to be the platform for deployment. Deployment is going to run when push to `release` branch.

## Screenshots
<img src="./preview/product-list.png" alt="screen shot of product list on mobile" width="300"/>
<img src="./preview/cart.png" alt="screen shot of cart on mobile" width="300"/>
<img src="./preview/product-list-l.png" alt="screen shot of product list on desktop" width="700"/>
<img src="./preview/cart-l.png" alt="screen shot of cart on desktop" width="700"/>
