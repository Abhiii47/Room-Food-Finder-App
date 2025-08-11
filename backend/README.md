Room & Food Finder (Backend)
This is the backend API for the Room & Food Finder web application. It is a full-stack Node.js server that handles all data management, user authentication, and API requests from the frontend. The server is built to be scalable, secure, and production-ready.

✨ Key Features
RESTful API: Provides well-defined API endpoints for all frontend-to-backend communication.

User Authentication: Secure user registration and login with password hashing (bcryptjs) and JSON Web Tokens (JWTs).

Database Management: Uses Mongoose to connect to a MongoDB database for storing user and listing data.

Real-time Communication: Built to be ready for real-time features using Socket.IO (planned).

Environment Variables: Securely manages sensitive information like database credentials using dotenv.

💻 Technologies Used
Node.js: The JavaScript runtime environment.

Express.js: A fast, minimalist web framework for building APIs.

MongoDB & Mongoose: A NoSQL database and an ODM (Object Data Modeling) library for managing data.

bcryptjs: For secure password hashing.

jsonwebtoken: For creating secure user sessions with JWTs.

cors: To enable Cross-Origin Resource Sharing for frontend communication.

dotenv: To load environment variables from a .env file.

🚀 Getting Started
Follow these instructions to get a copy of the backend API up and running on your local machine.

Prerequisites
You need to have Node.js and npm installed on your machine.

Installation
Navigate into the backend project directory:

cd backend

Install dependencies:

npm install

Configuration
You need to create a .env file in the root of the backend directory to securely store your MongoDB connection string.

Create a .env file:

touch .env  # or create a new file named .env

Add your MongoDB URI:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.lewkapj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

Replace <username> and <password> with your actual MongoDB Atlas credentials.

Running the Server
To run the backend, you must also have the frontend server running simultaneously in a separate terminal.

Start the backend server:

node server.js

The server will start on port 5000. You can test the API endpoints using a tool like Postman or by running the frontend.

👥 Team
This project was developed by a team of dedicated members:

Your Name: Abhijeet Kadu

Your Teammate 1: Atharva Kale


📧 Contact

Email: abhijeetkadu85@gmail.com

GitHub: https://github.com/Abhiii47