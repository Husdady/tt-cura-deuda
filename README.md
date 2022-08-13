![alt text](https://1.bp.blogspot.com/-uIUq1E2Ta24/WpdFKrJxz-I/AAAAAAAAa7c/9xuCepfpyVMmcgtYE3XuRWTNyxAM0RbegCLcBGAs/s1600/Age-of-Empires-Definitive-Edition-Beta-Sign-Up.gif)

## GUIA DE INSTALACIÓN
Para poder ejecutar este proyecto localmente,asegurese de tener Node instalado. A continuación habra Git bash o CMD, clone el proyecto con *git clone https://github.com/Husdady/tt-cura-deuda.git*

Depués que termine de clonarse el proyecto, debe instalar las dependencias con *npm install*

Al finalizarse de instalarse las dependencias, cree un nuevo archiv *.env* . Agregue las siguientes variables de entorno
- NODE_ENV="production"
- APP_NAME="Age of Empires II"
- PUBLIC_URL="http://localhost:3000"
- API_URL="https://age-of-empires-2-api.herokuapp.com/api/v1"
- AUTHOR="Husdady"
- AUTHOR_PORTFOLIO_URL="https://husdady.netlify.com"
- 

Finalmente ejecute *npm run dev* en una terminal, ya sea Git bash o CMD y el proyecto se levantará en http://localhost:3000 . Abra su navegador favorito e ingrese a la url anteriormente mencionada y podrá ver el proyecto ejecutandose :)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
