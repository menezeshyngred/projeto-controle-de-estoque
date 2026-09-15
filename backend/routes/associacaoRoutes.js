const express = require('express');
const router = express.Router();
const associacaoController = require('../controllers/associacaoController');

router.post(
    '/associacoes',
    associacaoController.associarProdutoFornecedor
);

router.get(
    '/produtos/:id/fornecedores',
    associacaoController.listarFornecedoresDoProduto
);

router.get(
    '/fornecedores/:id/produtos',
    associacaoController.listarProdutosDoFornecedor
);

router.delete(
    '/associacoes',
    associacaoController.desassociarProdutoFornecedor
);

module.exports = router;