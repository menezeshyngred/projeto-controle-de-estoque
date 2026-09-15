const db = require('../database/database');

function criarFornecedor(req, res) {
    const {nome, cnpj, endereco, contato} = req.body;

    const resultado = db.prepare(`
        INSERT INTO fornecedores (nome, cnpj, endereco, contato)
        VALUES (?, ?, ?, ?)
        `).run(nome, cnpj, endereco, contato);

        res.status(201).json({
            id: resultado.lastInsertRowid,
            nome,
            cnpj,
            endereco,
            contato
        });

}

function listarFornecedores(req, res) {
    const fornecedores = db.prepare(`
        SELECT * FROM fornecedores
        `).all();

    res.json(fornecedores);
}

function buscarFornecedor(req, res) {
    const {id} = req.params;

    const fornecedor = db.prepare(`
        SELECT * FROM fornecedores
        WHERE id = ?
        `).get(id);

    if (!fornecedor) {
        return res.status(404).json({error: 'Fornecedor não encontrado'
        });
    }

    res.json(fornecedor);
}

function atualizarFornecedor(req, res) {
    const {id} = req.params;
    const {nome, cnpj, endereco, contato} = req.body;

    const resultado = db.prepare(`
        UPDATE fornecedores
        SET nome = ?, cnpj = ?, endereco = ?, contato = ?
        WHERE id = ?
        `).run(nome, cnpj, endereco, contato, id);

    if (resultado.changes === 0) {
        return res.status(404).json({error: 'Fornecedor não encontrado'
        });
    }

    const fornecedor = db.prepare(`
        SELECT * FROM fornecedores
        WHERE id = ?
        `).get(id);

    res.json(fornecedor);
}

function deletarFornecedor(req, res) {
    const {id} = req.params;

    const resultado = db.prepare(`
        DELETE FROM fornecedores
        WHERE id = ?
        `).run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({error: 'Fornecedor não encontrado'
        });
    }

    res.json({mensagem: 'Fornecedor deletado com sucesso'
    });
}

module.exports = {
    criarFornecedor,
    listarFornecedores,
    buscarFornecedor,
    atualizarFornecedor,
    deletarFornecedor
};