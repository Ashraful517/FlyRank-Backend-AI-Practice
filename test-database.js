
const db = require('./database');

const tasks = db.prepare(
  'SELECT * FROM tasks'
).all();

console.log(tasks);

db.close();
