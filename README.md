# Task API

A simple REST API built with **Node.js** and **Express.js** for managing tasks.

The API supports basic CRUD operations:

* Create a task
* Read all tasks
* Read a single task
* Update a task
* Delete a task

The project stores tasks in an **in-memory JavaScript array**, so the data resets whenever the server is restarted.

## Technologies Used

* Node.js
* Express.js
* JavaScript
* Swagger UI
* OpenAPI

## Installation and Setup

### 1. Clone the repository

```bash
git clone (https://github.com/Ashraful517/FlyRank-Backend-AI-Practice)
```

### 2. Open the project folder

```bash
cd C:\Users\ashra\OneDrive\Desktop\BackEnd AI Eng
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node FirstCrud.js
```

The server will run at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint     | Description                          | Success Status |
| ------ | ------------ | ------------------------------------ | -------------- |
| GET    | `/`          | Returns a welcome message            | 200            |
| GET    | `/tasks`     | Returns all tasks                    | 200            |
| GET    | `/tasks/:id` | Returns a single task by ID          | 200            |
| POST   | `/tasks`     | Creates a new task                   | 201            |
| PUT    | `/tasks/:id` | Updates an existing task             | 200            |
| DELETE | `/tasks/:id` | Deletes a task by ID                 | 200            |
| GET    | `/health`    | Checks whether the server is running | 200            |

## Task Format

Each task contains three properties:

```json
{
  "id": 1,
  "title": "Learn Express basics",
  "done": false
}
```

* `id` — unique task ID
* `title` — task description
* `done` — whether the task is completed

## Create a Task

### POST `/tasks`

Request body:

```json
{
  "title": "Buy milk"
}
```

Example response:

```json
{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

## Get All Tasks

### GET `/tasks`

Example response:

```json
[
  {
    "id": 1,
    "title": "Learn Express basics",
    "done": false
  },
  {
    "id": 2,
    "title": "Build a REST API",
    "done": true
  },
  {
    "id": 3,
    "title": "Test endpoints with Postman",
    "done": false
  }
]
```

## Get One Task

### GET `/tasks/:id`

Example:

```text
GET /tasks/1
```

Response:

```json
{
  "id": 1,
  "title": "Learn Express basics",
  "done": false
}
```

If the task does not exist, the API returns a `404` response.

Example:

```json
{
  "error": "Task 99 not found"
}
```

## Update a Task

### PUT `/tasks/:id`

Example:

```text
PUT /tasks/1
```

Request body:

```json
{
  "title": "Learn Express",
  "done": true
}
```

## Delete a Task

### DELETE `/tasks/:id`

Example:

```text
DELETE /tasks/1
```

Response:

```json
{
  "message": "Task deleted"
}
```

## Health Check

### GET `/health`

Response:

```json
{
  "status": "OK"
}
```

## Swagger API Documentation

Interactive Swagger UI is available at:

```text
http://localhost:3000/docs
```

Swagger UI provides documentation for all task endpoints and allows the API to be tested directly using the **Try it out** button.

### Swagger Screenshot

<img width="1317" height="588" alt="image" src="https://github.com/user-attachments/assets/b50e30ad-5f8f-4bec-8e30-bdf3d904b678" />


Place the screenshot file in the project folder and name it:
swagger-screenshot.png


## Testing with curl

The API can also be tested using `curl`.

Example:

```bash
curl -i http://localhost:3000/
```

Example output:

PS C:\Users\ashra\OneDrive\Desktop\BackEnd AI Eng> curl.exe -i http://localhost:3000/
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
Date: Tue, 29 Sep 2026 10:42:42 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Hello World!

## Project Structure
.
├── FirstCrud.js
├── openapi.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore


## Author
`Ashraful Alam Chowdhury`
Built as part of a backend development practice project.
