const express = require('express');
const cors = require('cors');

const db = require('./database/database');  //importa o banco de dados

const produtoRoutes = require('./routes/produtoRoutes');  //importa as rotas de produtos
const fornecedorRoutes = require('./routes/fornecedorRoutes');  //importa as rotas de fornecedores
const associacaoRoutes = require('./routes/associacaoRoutes'); //importa as rotas de associação entre produtos e fornecedores

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());  //permite que o Express entenda requisições com JSON

app.use('/api', produtoRoutes);
app.use('/api', fornecedorRoutes);
app.use('/api', associacaoRoutes);

app.use(produtoRoutes);  //usa as rotas de produtos
app.use(fornecedorRoutes);  //usa as rotas de fornecedores
app.use(associacaoRoutes); //usa as rotas de associação entre produtos e fornecedores

app.get('/', (req, res) => {           //rota raiz da API
    res.json({ messagem: 'API do Controle de Estoque funcionando!' });
});

app.listen(PORT, process.env.HOST || '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});