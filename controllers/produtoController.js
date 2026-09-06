const db = require('../database/database');

function criarProduto(req, res){
    const {nome, descricao, preco,  codigo_barras} = req.body;

    const resultado = db.prepare(`
        INSERT INTO produtos (nome, descricao, preco, codigo_barras)
        VALUES (?, ?, ?, ?)
    `).run(nome, descricao, preco, codigo_barras);

    res.status(201).json({
        id: resultado.lastInsertRowid,
        nome,
        descricao,
        preco,
        codigo_barras
    });
}

function listarProdutos(req, res) {
    const produtos = db.prepare(`
        SELECT * FROM produtos
    `).all();

    res.json(produtos);
}

function buscarProduto(req, res) {
    const {id} = req.params;

    const produto = db.prepare(`
        SELECT * FROM produtos
        WHERE id = ?
    `).get(id);

    if(!produto) {
        return res.status(404).json({error: 'Produto não encontrado'
        });
    }

    res.json(produto);
}

function atualizarProduto(req, res) {
    const {id} = req.params;
    const {nome, descricao, preco, codigo_barras} = req.body;

    const resultado = db.prepare(`
        UPDATE produtos
        SET nome = ?, descricao = ?, preco = ?, codigo_barras = ?
        WHERE id = ?
    `).run(nome, descricao, preco, codigo_barras, id);

    if(resultado.changes === 0) {
        return res.status(404).json({error: 'Produto não encontrado'
        });
    }

    const produto = db.prepare(`
        SELECT * FROM produtos
        WHERE id = ?
    `).get(id);
    
    res.json(produto);
}

function deletarProduto(req, res) {
    const {id} = req.params;

    const resultado = db.prepare(`
        DELETE FROM produtos
        WHERE id = ?
    `).run(id);

    if(resultado.changes === 0) {
        return res.status(404).json({error: 'Produto não encontrado'
        });
    }

    res.json({mensagem: 'Produto deletado com sucesso'
    });
}

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProduto,
    atualizarProduto,
    deletarProduto
};