
# LinkedIn Clone

**Repository:** [linkedin-clone](https://github.com/pauloborges-hub/linkedin-clone)  
**Author:** pauloborges-hub

## 📄 Overview

The `linkedin-clone` repository is a web application project designed to replicate core features of the LinkedIn platform. 
Built with **Next.js**, a React-based framework, the project was initialized using `create-next-app`, providing a solid foundation for server-rendered React applications.
This repository serves as a comprehensive example of building a modern web application with Next.js, integrating MongoDB for data management, and utilizing Tailwind CSS for efficient styling.

## 📂 Project Structure

- **`app/` Directory:** Contains the main application components and pages. The entry point is `app/page.tsx`, which serves as the homepage.

- **`components/` Directory:** Houses reusable UI components utilized across various parts of the application.

- **`lib/` Directory:** Includes utility functions and libraries that support the application's core functionality.

- **`mongodb/` Directory:** Manages MongoDB-related files, indicating that the application uses MongoDB as its primary database.

- **`public/` Directory:** Stores static assets like images, fonts, and other public resources accessible to the client.

- **`types/` Directory:** Defines TypeScript types and interfaces, ensuring type safety and enhancing code reliability.

## 🔧 Key Configuration Files

- **`.eslintrc.json`:** Configuration file for ESLint, specifying linting rules and settings to maintain code quality and consistency.

- **`next.config.mjs`:** The Next.js configuration file where custom settings and plugins are defined to modify the default build and runtime behavior.

- **`tailwind.config.ts`:** Configuration for Tailwind CSS, a utility-first CSS framework, indicating that the project employs Tailwind for styling purposes.

- **`tsconfig.json`:** TypeScript configuration file that defines compiler options and project settings for TypeScript integration.

- **`package.json`:** Lists the project's dependencies, scripts, and metadata. Notable dependencies include Next.js, React, Tailwind CSS, and MongoDB, among others.

## 🚀 Setup and Development

To set up the development environment:

```bash
# Install Dependencies
npm install

# Start Development Server
npm run dev
```

The application will be accessible at `http://localhost:3000/` by default.

## ✨ Features

- **MongoDB Integration:** Utilizes MongoDB as the primary database, facilitating efficient storage and retrieval of user data.

- **Tailwind CSS for Styling:** Employs Tailwind CSS, allowing for rapid and consistent UI development with utility-first CSS classes.

- **TypeScript Support:** The inclusion of TypeScript enhances code quality and maintainability by providing static type checking.
