# Task Manager API

A RESTful API for managing tasks with user authentication, built with Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Task Management**: Create, read, update, delete, and mark tasks as complete
- **Rate Limiting**: Express-rate-limit to prevent abuse (100 requests per 15 minutes per IP)
- **Logging**: Morgan middleware for HTTP request logging
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Centralized error handling middleware

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5.x
- **Database**: PostgreSQL (using `pg` pool)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Validation**: express-validator
- **Logging**: morgan, winston
- **Security**: express-rate-limit, cookie-parser



## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login and receive JWT token |

### Tasks (Protected - requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks for authenticated user |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/complete` | Mark task as complete |

## Implementation Details

### Architecture

The application follows the MVC (Model-View-Controller) pattern with clear separation of concerns:

- **Routes** define URL endpoints and map them to controller functions
- **Controllers** handle business logic and request/response processing
- **Models** interact with the PostgreSQL database using parameterized queries
- **Middleware** provides cross-cutting concerns like authentication, logging, and rate limiting

### Authentication Flow

1. User registers via `/api/users/register` - password is hashed with bcrypt and user is stored in database
2. User logs in via `/api/users/login` - credentials are verified and a JWT token is issued
3. Protected routes require the JWT token in the `Authorization` header or `token` cookie
4. The `protect` middleware verifies the token and attaches the decoded user to `req.user`

### Database Schema

- **users table**: Stores user credentials (id, name, email, password)
- **tasks table**: Stores tasks with reference to owner (id, owner_id, title, description, due_date, completed, timestamps)

## Installation

### Clone the Repository

```bash
git clone https://github.com/tony-clex/task-manager-api.git
cd task-manager-api
```

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=task_manager_db
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
BCRYPT_SALT_ROUNDS=12
NODE_ENV=development
```

### Database Setup

Create a PostgreSQL database and run the schema migration:

```sql
CREATE DATABASE task_manager_db;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Application

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## Usage Examples

### Register a User

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Create a Task (Authenticated)

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread", "due_date": "2024-12-31"}'
```

### Get All Tasks (Authenticated)

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <your_jwt_token>"
```

## License

ISC