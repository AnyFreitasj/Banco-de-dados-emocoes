const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
db.run(`CREATE TABLE reflections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    context TEXT,
    internal_source TEXT,
    external_source TEXT,
    evidence_for TEXT,
    evidence_against TEXT,
    consistency TEXT,
    inconsistencies TEXT,
    self_assessment TEXT,
    personal_goals TEXT,
    action TEXT,
    adjustment TEXT
)`);
});

module.exports = db;
