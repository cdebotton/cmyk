const path = require('path');

const MIGRATIONS_FOLDER = path.join(process.cwd(), '.migrations');
const DB_FOLDER = path.join(process.cwd(), 'db');
const UP_FOLDER = path.join(DB_FOLDER, 'up');
const DOWN_FOLDER = path.join(DB_FOLDER, 'down');

exports.MIGRATIONS_FOLDER = MIGRATIONS_FOLDER;
exports.DB_FOLDER = DB_FOLDER;
exports.UP_FOLDER = UP_FOLDER;
exports.DOWN_FOLDER = DOWN_FOLDER;
