const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.post('/fornecedores', fornecedorController.criarFornecedor);
router.get('/fornecedores', fornecedorController.listarFornecedores);
router.get('/fornecedores/:id', fornecedorController.buscarFornecedor);
router.put('/fornecedores/:id', fornecedorController.atualizarFornecedor);
router.delete('/fornecedores/:id', fornecedorController.deletarFornecedor);

module.exports = router;