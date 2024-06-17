const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

app.post('/add-reflection', (req, res) => {
console.log('Recebendo solicitação de salvar relato:', req.body);
const {
    description, context, internal_source, external_source,
    evidence_for, evidence_against, consistency, inconsistencies,
    self_assessment, personal_goals, action, adjustment
} = req.body;

db.run(`INSERT INTO reflections (
    description, context, internal_source, external_source,
    evidence_for, evidence_against, consistency, inconsistencies,
    self_assessment, personal_goals, action, adjustment
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
    description, context, internal_source, external_source,
    evidence_for, evidence_against, consistency, inconsistencies,
    self_assessment, personal_goals, action, adjustment
], function(err) {
    if (err) {
    console.error('Erro ao salvar no banco de dados:', err.message);
    return res.status(500).send(err.message);
    }
    console.log('Relato salvo com sucesso com ID:', this.lastID);
    res.status(200).send({ id: this.lastID });
});
});

app.get('/reflections', (req, res) => {
  db.all(`SELECT * FROM reflections`, [], (err, rows) => {
    if (err) {
    console.error('Erro ao buscar relatos:', err.message);
    return res.status(500).send(err.message);
    }
    res.status(200).json(rows);
});
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
