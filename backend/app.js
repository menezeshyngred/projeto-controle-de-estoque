const express = require("express");
const cors = require("cors");
const path = require("path");

require("./database/database");

const produtoRoutes = require("./routes/produtoRoutes");
const fornecedorRoutes = require("./routes/fornecedorRoutes");
const associacaoRoutes = require("./routes/associacaoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api", produtoRoutes);
app.use("/api", fornecedorRoutes);
app.use("/api", associacaoRoutes);

// Frontend React compilado
const frontendBuild = path.join(__dirname, "..", "frontend", "build");

app.use(express.static(frontendBuild));

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendBuild, "index.html"));
});

// Teste da API
app.get("/api", (req, res) => {
    res.json({
        mensagem: "API do Controle de Estoque funcionando!",
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
