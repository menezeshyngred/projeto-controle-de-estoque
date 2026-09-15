const db = require('../database/database');

function associarProdutoFornecedor(req, res) {  // Função para associar um produto a um fornecedor
    const {produto_id, fornecedor_id} = req.body;

    // Verifica se o produto existe
    const produto = db.prepare(`
        SELECT * FROM produtos
        WHERE id = ?
        `).get(produto_id);

    if (!produto) {
        return res.status(404).json({
            error: 'Produto não encontrado'
        });
    }

    // Verifica se o fornecedor existe
    const fornecedor = db.prepare(`
        SELECT * FROM fornecedores
        WHERE id = ?
        `).get(fornecedor_id);

    if (!fornecedor) {
        return res.status(404).json({
            error: 'Fornecedor não encontrado'
        });
}

//Cria associação entre produto e fornecedor
try {
const resultado = db.prepare(`
    INSERT INTO produto_fornecedor (produto_id, fornecedor_id)
    VALUES (?, ?)
    `).run(produto_id, fornecedor_id);

    res.status(201).json({
        id: resultado.lastInsertRowid,
        produto_id,
        fornecedor_id
    });

    } catch (erro) {
        res.status(400).json({
            error: 'Produto já está associado a este fornecedor'
        });
    }
}

function listarFornecedoresDoProduto(req, res) {
    const {id} = req.params;

        const fornecedores = db.prepare(`
            SELECT fornecedores.*
            FROM fornecedores
            INNER JOIN produto_fornecedor
            ON fornecedores.id = produto_fornecedor.fornecedor_id
            WHERE produto_fornecedor.produto_id = ?
        `).all(id);

        res.json(fornecedores);
        
    }

function listarProdutosDoFornecedor(req, res) {
    const {id} = req.params;

        const produtos = db.prepare(`
            SELECT produtos.*
            FROM produtos
            INNER JOIN produto_fornecedor
            ON produtos.id = produto_fornecedor.produto_id
            WHERE produto_fornecedor.fornecedor_id = ?
        `).all(id);

        res.json(produtos);
}

function desassociarProdutoFornecedor(req, res) {
    const {produto_id, fornecedor_id} = req.body;

        const resultado = db.prepare(`
            DELETE FROM produto_fornecedor
            WHERE produto_id = ?
            AND fornecedor_id = ?
        `).run(produto_id, fornecedor_id);

        if (resultado.changes === 0) {
            return res.status(404).json({
                error: 'Associação não encontrada'
            });
        }

        res.json({
            mensagem: 'Produto desassociado do fornecedor com sucesso'
        });
}


module.exports = {
    associarProdutoFornecedor,
    listarFornecedoresDoProduto,
    listarProdutosDoFornecedor,
    desassociarProdutoFornecedor
};


