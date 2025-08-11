Room & Food Finder
A full-stack web application designed to help new students find local room and food services.

This project is a complete, scalable platform for connecting students with local vendors. It is built as a monorepo, containing both the frontend and backend in a single repository for streamlined development and deployment.

✨ Project Highlights
User-Centric Design: The frontend offers a clean, responsive UI that works seamlessly across all devices.

Secure Authentication: The backend provides a secure system for user registration and login, with password hashing and JWT-based sessions.

Data Management: A robust Node.js server with a MongoDB database for managing user accounts, vendor information, and listing data.

Real-time Features: The project includes the foundation for real-time chat functionality using Socket.IO.

Organized Codebase: The codebase is split into distinct frontend and backend directories for clear separation of concerns.

💻 Technologies Used
Frontend
React: The core JavaScript library for building the user interface.

React Router: Manages navigation and routing within the application.

Axios: Used for making API calls to the backend.

HTML & CSS: Custom styling for a unique and appealing design.

Backend
Node.js & Express: The server-side environment and web framework.

MongoDB & Mongoose: A NoSQL database and an ODM for data modeling.

bcryptjs & jsonwebtoken: For user authentication and session management.

cors: Enables cross-origin requests between the frontend and backend.

dotenv: For secure management of environment variables.

🚀 Getting Started
To run the full application on your local machine, you need to set up both the frontend and backend servers.

Prerequisites
Node.js and npm installed.

Setup Instructions
Clone the repository:

git clone https://github.com/Abhiii47/Room-Food-Finder-App.git

Install Frontend Dependencies:

cd Room-Food-Finder-App/room-food-finder-frontend
npm install

Install Backend Dependencies:

cd ../backend
npm install

Backend Configuration:

Create a .env file in the backend directory.

Add your MongoDB Atlas connection string:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.lewkapj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

Running the Application
You must run both the frontend and backend in separate terminal windows.

Start the Backend:

cd backend
node server.js

Start the Frontend:

cd ../room-food-finder-frontend
npm start

👥 Teamate
Teammate 1 : Atharva Kale


📧 Contact
Email: abhijeetkadu85@gmail.com
GitHub: github.com/Abhiii47/
