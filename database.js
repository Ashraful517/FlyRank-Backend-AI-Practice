
const Database = require('better-sqlite3');
const path = require('path');

// Store the database beside this file.
const dbPath = path.join(__dirname, 'tasks.db');

const db = new Database(dbPath);
console.log('Database file:', dbPath);

// Create the tasks table if it doesn't exist.
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`);

// Insert example tasks only if the table is empty.
const taskCount = db.prepare(
  'SELECT COUNT(*) AS count FROM tasks'
).get();

if (taskCount.count === 0) {
  const insertTask = db.prepare(
    'INSERT INTO tasks (title, done) VALUES (?, ?)'
  );

  const insertExamples = db.transaction(() => {
    insertTask.run('Learn Express basics', 0);
    insertTask.run('Build a REST API', 1);
    insertTask.run('Test endpoints with Postman', 0);
  });

  insertExamples();
}

module.exports = db;
