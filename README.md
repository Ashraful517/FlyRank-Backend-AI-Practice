# Task API — SQLite Database

A simple REST API built with Node.js, Express, and SQLite. This project demonstrates CRUD operations (Create, Read, Update, and Delete) using a persistent database.

## Features

- Retrieve all tasks.
- Retrieve a single task by ID.
- Create a new task.
- Update an existing task.
- Delete a task.
- Store tasks persistently using SQLite.
- Validate request data and return appropriate HTTP status codes.
- Explore API documentation through Swagger UI.

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Swagger UI

## Database

This project uses SQLite to store task information in a local database file named `tasks.db`.

The database file is created in the project directory by `database.js`. The `tasks` table is created automatically if it does not exist. Three example tasks are inserted when the table is empty.

### Table Structure

| Column | Type    | Description                   |
|--------|---------|-------------------------------|
| `id`   | INTEGER | Primary key for each task     |
| `title`| TEXT    | Task title                    |
| `done` | BOOLEAN | Whether the task is completed |

SQLite stores Boolean values as integers: `0` represents false and `1` represents true.

### Why SQLite?

SQLite is lightweight, requires no separate database server, and stores data in a local file. Unlike an in-memory JavaScript array, SQLite preserves task data when the Node.js server restarts.

## Installation and Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/Ashraful517/FlyRank-Backend-AI-Practice.git
   ```

2. Enter the project directory containing `FirstCrud.js`:

   ```bash
   cd "BackEnd AI Eng"
   ```

   If you cloned the repository directly into a different directory, navigate to that directory instead.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the API:

   ```bash
   node FirstCrud.js
   ```

   If Nodemon is installed and configured, you can also start it with your configured Nodemon command.

5. Open the API at:

   `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a task by ID |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/health` | Check API health |

### Example: Create a Task

**Request**

`POST /tasks`

Content-Type: `application/json`

```json
{
  "title": "Learn SQLite"
}
```

A successful request returns HTTP `201 Created`.

### Example: Update a Task

**Request**

`PUT /tasks/1`

```json
{
  "title": "Learn SQLite properly",
  "done": true
}
```

### Example: Retrieve All Tasks

**Request**

`GET /tasks`

Example response:

```json
[
  {
    "id": 1,
    "title": "Learn SQLite",
    "done": false
  }
]
```

The returned task IDs and data depend on the current database contents.

## Example SQL Queries

Display all tasks:

```sql
SELECT * FROM tasks;
```

Display completed tasks:

```sql
SELECT * FROM tasks WHERE done = 1;
```

Count the total number of tasks:

```sql
SELECT COUNT(*) FROM tasks;
```

Mark all tasks as completed:

```sql
UPDATE tasks SET done = 1;
```

Delete completed tasks:

```sql
DELETE FROM tasks WHERE done = 1;
```

**Note:** The update and delete queries modify the database. Use them carefully.

## Swagger API Documentation

If Swagger UI is configured in the application, open:

`http://localhost:3000/docs`

Use this page to explore the documented API endpoints.

## Learning Outcomes

This project demonstrates how to:

- Build RESTful endpoints using Express.
- Perform SQL CRUD operations with SQLite.
- Validate incoming request data.
- Handle missing tasks and invalid requests.
- Persist data across server restarts.

## Author

Ashraful Alam Chowdhury

GitHub: [Ashraful517](https://github.com/Ashraful517)