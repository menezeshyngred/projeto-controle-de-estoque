const Database = require('better-sqlite3');
const db = new Database('./database/database.sqlite');

db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT NOT NULL,
        preco REAL NOT NULL,
        codigo_barras TEXT NOT NULL UNIQUE
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS fornecedores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cnpj TEXT NOT NULL UNIQUE,
        endereco TEXT,
        contato TEXT
    )
`);

module.exports = db;