# Zenclass Bootcamp Dashboard for Students

![zenclass dashboard](https://github.com/renish47/zenclass_dashboard/assets/107568859/a066ade8-0a97-4175-98f1-638de719126b)

Welcome to the Fullstack Bootcamp Dashboard for Students GitHub repository! This project is a responsive web application that serves as a comprehensive dashboard for students attending a full-stack bootcamp. It provides a modern interface and a range of features to help students manage their coursework effectively. This README file will guide you through the project, including its technology stack, deployment details, and key functionalities.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly designing custom user interfaces.
- **Redux**: A state management library for React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **Netlify**: A cloud hosting platform for deploying the frontend code.

### Backend
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing data.
- **Render**: A cloud hosting platform for deploying the backend code.

## Deployment

- The frontend code is deployed on [Netlify](https://www.netlify.com/).
- The backend code is deployed on [Render](https://render.com/). Please note that Render may take a minute to load the server if it has been idle due to its free hosting tier.

## Features

1. **Dashboard Data**: The dashboard fetches data from the server and displays it in a modern view, making it easy for students to see their progress and upcoming tasks.

2. **Task Submission**: Students can submit tasks, and tasks are sorted based on their due dates, helping students prioritize their work effectively.

3. **Project Details Editing**: Students can edit the details of the projects they have submitted, allowing them to keep their information up to date.

4. **Course Completion Percentage**: The application automatically calculates the course completion percentage based on lessons and task completion, providing students with a clear overview of their progress.

5. **Lesson Completion**: Students can mark lessons as complete, and the application will calculate and display lesson completion automatically.

6. **Responsive Design**: The dashboard is fully responsive, ensuring a seamless experience for users on both large and small screens.

## Getting Started

To get started with the Fullstack Bootcamp Dashboard for Students, follow these steps:

1. Clone this GitHub repository to your local machine:
   ```bash
   git clone https://github.com/renis47/zenclass_dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd zenclass_dashboard
   ```

3. Install the dependencies for both the frontend and backend:

   Frontend:
   ```bash
   cd client
   npm install
   ```

   Backend:
   ```bash
   cd server
   npm install
   ```

4. Configure environment variables:

   - Create a `.env` file in the backend directory and add your MongoDB connection string and other environment variables as needed.

5. Start the development servers:

   Frontend:
   ```bash
   cd client
   npm start
   ```

   Backend:
   ```bash
   cd server
   npm start
   ```

6. Open your web browser and access the frontend at [http://localhost:5173](http://localhost:5173).


---

Thank you for using the Fullstack Bootcamp Dashboard for Students! We hope it enhances your bootcamp experience and helps you stay organized and focused on your learning journey. If you encounter any issues or have suggestions for improvement, please feel free to open an issue or pull request on this GitHub repository. Happy coding!
