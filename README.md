# Blogger

Blogger is a modern blogging application built with React, Vite, and Appwrite Cloud. It allows users to create, view, edit, and delete blog posts securely.

## Features
- **Authentication:** Users must log in to access, create, edit, or delete posts. Authentication is managed via Appwrite Cloud.
- **User Posts:** The Home page displays the user's own posts and an 'All Posts' section for browsing all users' posts.
- **Authorization:** Users can only edit or delete their own posts.
- **Appwrite Integration:** Utilizes Appwrite Cloud for authentication, database, and storage management.
- **State Management:** Uses React Redux Toolkit for efficient and scalable state management.
- **Protected Routes:** Implements an `AuthLayout` component to ensure only authenticated users can access protected routes.
- **Form Handling:** Uses `react-hook-form` for robust form validation and submission.
- **Rich Text Editor:** Includes a custom RTE (Rich Text Editor) for post creation and editing.
- **Component-Based Architecture:** Modular React components for maintainability and scalability (e.g., Header, Footer, PostCard, Utility components).
- **Image Uploads:** Supports image uploads for posts using Appwrite storage.
- **Modern UI:** Built with a focus on clean, responsive design.
- **Vite Powered:** Fast development and build process using Vite.

## Folder Structure
- `src/components/` - Reusable UI components (Header, Footer, PostCard, Utility, etc.)
- `src/pages/` - Main application pages (Home, AddPost, EditPost, Login, Signup, etc.)
- `src/appwrite/` - Appwrite configuration and authentication logic
- `src/store/` - Redux Toolkit slices and store configuration
- `src/conf/` - App configuration
- `public/` - Static assets

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up your Appwrite project and update configuration in `src/appwrite/config.js` and `src/conf/conf.js`.
3. Start the development server:
   ```sh
   npm run dev
   ```

## Main Dependencies
- React
- Vite
- Appwrite
- Redux Toolkit
- React Hook Form

---
Feel free to explore the codebase for more details on each functionality and component.

