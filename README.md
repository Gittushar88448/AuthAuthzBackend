# Backend Authentication and Authorization

This project implements authentication and authorization for a backend application using Express, MongoDB, and Node.js. The application supports three roles: Student, Admin, and Visitor.

## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization (Student, Admin, Visitor)
- Protected routes based on user roles

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken (JWT)
- dotenv

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Steps

1. Clone the repository:


git clone https://github.com/Gittushar88448/AuthAuthzBackend.git
cd AuthAuthzBackend

2. Install dependencies:

npm install

3. Create a .env file in the root directory and add the following environment variables:

PORT = 3000
DATABASE_URL = "mongodb+srv://kmrtushar01:DzZ5yHQfV2thp4Uy@cluster0.lbaxk7p.mongodb.net/Authapp"
JWT_SECRET = tushar

4. Start the server:

npm run dev

Endpoints:

POST /api/v1/signup

Registers a new user

Request body:

{
  "name": "yourName"
  "email": "user@example.com",
  "password": "yourpassword",
  "role": "student" // or "admin" or "visitor"
}

- Response: 

{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "name":"userName"
    "id": "user_id",
    "email": "user@example.com",
    "role": "student"
  }
}

* POST /api/v1/login

Logs in a user and returns a JWT token

Request body:

{
    "email": "ayushiipal@gmail.com",
    "password": "ay1234"
}

Response: 

{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoaWlwYWxAZ21haWwuY29tIiwiaWQiOiI2NmEyOThiYzEzMjNiYjE0MWQwYzhkODIiLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTcyMTk3NzE5MCwiZXhwIjoxNzIxOTg0MzkwfQ.TdTeQYYpDwBMdpMnxweD7sJNoVFgCv0rtmos2ekNOdk",
    "userObject": {
        "_id": "66a298bc1323bb141d0c8d82",
        "name": "Ayushi",
        "email": "ayushiipal@gmail.com",
        "role": "Student",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoaWlwYWxAZ21haWwuY29tIiwiaWQiOiI2NmEyOThiYzEzMjNiYjE0MWQwYzhkODIiLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTcyMTk3NzE5MCwiZXhwIjoxNzIxOTg0MzkwfQ.TdTeQYYpDwBMdpMnxweD7sJNoVFgCv0rtmos2ekNOdk"
    },
    "message": "User logged in successfully"
}

## Middleware
Auth Middleware
- auth.js
- Verifies the JWT token and extracts the user information
- verify roles
- Checks the user's role and grants access to specific routes

## Running Tests
You can use tools like Postman or Insomnia to test the API endpoints.
Contributing
Feel free to fork the repository and create pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License - see the LICENSE file for details.


Adjust the `git clone` URL, paths, and other details as necessary to fit your specific project structure and requirements.
