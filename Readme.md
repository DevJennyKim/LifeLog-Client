# React App

This is the frontend for the LifeLog application. It integrates with the LifeLog API to enable features like post management, comments, image uploads, and user authentication.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Environment Variables](#environment-variables)
3. [Available Scripts](#available-scripts)
4. [Features](#features)
5. [Tech Stack](#tech-stack)
6. [Reference Video](https://youtu.be/8v2qZGydmvw?si=c0X6KIsJGyrIR7Wa))

---

## Project Setup

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <REPOSITORY_URL>
   cd react-app
   ```

2. Install dependencies with the `--force` flag due to compatibility issues between React 18 and the latest version of the TOAST UI React editor:
   ```bash
   npm install --force
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

Create a `.env` file in the root directory and add the following:
   ```bash
   VITE_API_BASE_URL=http://localhost:8081(or your new port number)
   ```

The `VITE_API_BASE_URL` should point to your API server's URL. In this case, the default API port is `8081`.

---

## Available Scripts

In the project directory, you can run the following commands:

- **Start the app**:
   ```bash
   npm run dev
   ```

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

- **Build the app for production**:

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

- **Run tests**:

This command removes the single build dependency from your project. This is a one-way operation and should be used with caution.

---

## Features

- **User Authentication**:
- Sign up, log in, and log out functionality using JWT.

- **Post Management**:
- Create, read, update, and delete posts.

- **Image Upload**:
- Upload and display images with AWS S3 integration.

- **Likes**:
- Users can like posts and view like counts.

- **Comments**:
- Users can add and delete comments on posts.

---

## Tech Stack

- **Frontend Framework**: React
- **State Management**: React Context API 
- **Routing**: React Router
- **Form Handling**: React Hook Form 
- **Image Upload**: AWS S3, Axios
- **Authentication**: JWT-based Authentication
- **Styles**: CSS, SCSS, ReactIcon

---

## Reference Video

For a detailed guide on setting up and running the project, check out this [YouTube video](<YOUR_YOUTUBE_LINK>)!

---

Thank you for checking out this project! If you have any questions or need further assistance, feel free to open an issue or reach out directly.
