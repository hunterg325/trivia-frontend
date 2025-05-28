# Trivia Quiz App

A fullstack web application that allows users to play a trivia quiz. Users can select a category and difficulty level, answer 5 random multiple-choice questions, and view their results. The application ensures that correct answers are not exposed in the frontend until after submission to prevent cheating.

## Tech Stack

### Frontend

- **React**: For building the user interface.
- **Redux (with Redux Toolkit)**: For global state management.
- **React Router**: For navigation between different views.
- **Axios**: For making API requests to the backend.

### Backend

- **Node.js**: Runtime environment.
- **Express**: Node.js HTTP Framework to build the API.
- **MongoDB (with Mongoose)**: Database for storing categories and questions.
- **Axios**: For fetching data from the OpenTDB API during database seeding.
- [Backend source lives in a separate repository](https://github.com/hunterg325/trivia-quiz-backend)

## Setup and Running Instructions

### Prerequisites

- **Node.js** (version 14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

### Access the Application

- Open a web browser and go to `http://localhost:3000`.

## Project Structure

- **backend/**
- `src/`
    - `server.ts`: Server to run.
    - `seedDatabase.ts`: Single file that houses function to seed the database with categories and questions for each difficulty from OpenTDB (had to account for ~5 second rate-limit between each request).
    - `models.ts`:  Mongoose model definitions (e.g., `Category`, `Question`).
    - `schemas.ts`: Mongoose Schema definitions (e.g., `categorySchema`, `questionSchema`).
    - `types.ts`: Type definitions (e.g., `Category`, `Question`).

- **frontend/**

    - `src/`
        - `common/`: Styled components reused throughout application.
        - `components/`: React components (e.g., `CategorySelector.tsx`, `Quiz.tsx`, `Results.tsx`).
        - `store.ts`: Redux store configuration.
        - `store.ts`: Type definitions expected from API
        - `App.tsx`: Main App component with routing and Redux provider.
        - `index.tsx`: Entry point for the React application.

## Key Features

- **Category and Difficulty Selection**: Users can choose a trivia category and difficulty level.
- **Quiz Experience**: Users answer 5 random multiple-choice questions.
- **Results and Scoring**: Users view their score and a breakdown of correct/incorrect answers.
- **Security**: Correct answers are not exposed in the frontend until after submission, preventing cheating via developer tools.

## API Endpoints

- **GET /api/categories**: Fetch all available categories.
- **GET /api/quiz?category=&difficulty=**: Fetch 5 random questions based on the selected category and difficulty.
- **POST /api/quiz/score**: Submit user answers and receive the score and detailed results.

## Notes

- The application uses the OpenTDB API for seeding the database with categories and questions.
- The backend ensures that correct answers are not sent to the frontend until after the quiz is submitted, maintaining the integrity of the quiz.
