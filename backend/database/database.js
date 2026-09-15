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

db.exec(`
    CREATE TABLE IF NOT EXISTS produto_fornecedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto_id INTEGER NOT NULL,
        fornecedor_id INTEGER NOT NULL,
        FOREIGN KEY (produto_id) REFERENCES produtos(id),
        FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id),
        UNIQUE (produto_id, fornecedor_id)
    )
`);

module.exports = db;