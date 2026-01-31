<img src="https://github.com/VladKolhanov/ai-smart-dictionary/actions/workflows/ci.yml/badge.svg?branch=main" />

# 📚 AI Smart Dictionary

A modern, internationalized dictionary application built with Next.js 15 and React 19.

## ✨ Features

- 🌐 **Internationalization (i18n)**: Built-in support for multiple languages using `next-intl`.
- 💾 **Data Persistence**: Secure and scalable database powered by **Neon** (PostgreSQL) and **Drizzle ORM**.
- 🎨 **Modern UI**: Beautiful, responsive design built with **Tailwind CSS v4** and **shadcn/ui** components.
- 🧪 **Testing**: Unit and integration testing setup with **Vitest**.

## 🛠️ Tech Stack

- ⚡ **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- ⚛️ **Library**: [React 19](https://react.dev/)
- 📘 **Language**: [TypeScript](https://www.typescriptlang.org/)
- 💅 **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- 🐘 **Database**: [Neon](https://neon.tech/) (Serverless Postgres)
- 🏗️ **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- 📋 **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- 🌍 **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- 🧪 **Testing**: [Vitest](https://vitest.dev/)
- 🧹 **Linting & Formatting**: ESLint, Prettier
- 🐶 **Git Hooks**: Husky

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm (Package Manager)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/VladKolhanov/ai-smart-dictionary.git
    cd ai-smart-dictionary
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Copy the sample environment file to create your local development environment file:

    ```bash
    cp .env.development.local.sample .env.development.local
    ```

    Open `.env.development.local` and fill in the required values:
    - `DATABASE_URL`: Your Neon database connection string.

4.  **Database Setup:**

    Push the schema to your database:

    ```bash
    pnpm db:push
    ```

### Running the Application

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint to fix issues.
- `pnpm format`: Formats code with Prettier.
- `pnpm test`: Runs tests with Vitest.
- `pnpm db:push`: Pushes schema changes to the database.
- `pnpm db:generate`: Generates SQL migrations.
- `pnpm db:migrate`: Applies migrations to the database.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/lib`: Utilities, database configuration, and services.
- `src/ui`: Reusable UI components, fonts, icons, etc.
- `public`: Static assets.
