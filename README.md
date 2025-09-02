This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## 1 Installation

### Clone the repository:

```
git clone <repository-url>
cd <project-folder>
```


## Install dependencies:

```
npm install
# or
yarn
# or
pnpm install
```

### 2️ Environment Variables

Create a .env.local file in the root of the project.

Add the following variables (replace with your own credentials):

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.


## Schools Dashboard

A simple Next.js (App Router) project that displays a list of schools in a responsive grid layout, with an option to add new schools via a dedicated form page.

### Features

 **Responsive design:** Works seamlessly across all devices.
 
 **Dynamic school listing**: Data fetched from MySQL (Aiven Cloud).
 
 **cloud Image hosting :** utilised imgBB for hosting the images using api key

 **Database integration**: Insert & fetch data from Aiven-hosted MySQL.  

 **School listing:** Displays schools in a grid layout (3 per row on large screens).

 **Add new school:** Button to navigate to the AddSchool form page.

 **Next.js** App Router with client-side navigation.

 Styled with **Tailwind CSS**.
