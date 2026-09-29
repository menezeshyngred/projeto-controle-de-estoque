import { useEffect, useState } from "react";

function Associacoes() {

    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState('');
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
    
    const [fornecedoresDoProduto, setFornecedoresDoProduto] = useState([]);
    const [produtoDoFornecedor, setProdutoDoFornecedor] = useState([]);

    const listarProdutos = async () => {
        try {
            const resposta = await fetch(
                'http://localhost:3000/produtos'
            );

            const dados = await resposta.json();

            console.log('Produtos recebidos:', dados);

            setProdutos(dados);
        } catch (erro) {
            console.error('Erro ao buscar produtos:', erro);
        }
    };

    const listarFornecedores = async () => {
        try {
            const resposta = await fetch(
                'http://localhost:3000/fornecedores'
            );

            const dados = await resposta.json();

            console.log('Produtos recebidos:', dados);

            setFornecedores(dados);
        } catch (erro) {
            console.error('Erro ao buscar fornecedores:', erro);
        }
    };

    useEffect(() => {
        listarProdutos();
        listarFornecedores();
    }, []);

    const associarProdutoFornecedor = async (evento) => {
        console.log('Função de assosiação foi executada');
        evento.preventDefault();

        if (!produtoSelecionado || !fornecedorSelecionado) {
            alert('Selecione um produto e um fornecedor.');
            return;
        }

        try {
            const resposta = await fetch(
                'http://localhost:3000/associacoes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        produto_id: Number(produtoSelecionado),
                        fornecedor_id: Number(fornecedorSelecionado)
                    })
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.json();

                throw new Error(
                    erro.error || 'Erro ao associar produto e fornecedor'
                );
            }

            alert('Produto associado ao fornecedor com sucesso!');

            setProdutoSelecionado('');
            setFornecedorSelecionado('');

        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const listarFornecedoresDoProduto = async () => {
        if (!produtoSelecionado) {
            alert('Selecione um produto.');
            return;
        }

        try {
            const resposta = await fetch(
                `http://localhost:3000/produtos/${produtoSelecionado}/fornecedores`
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.error || 'Erro ao buscar fornecedores do produto.'
                );
            }

            setFornecedoresDoProduto(dados);

        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const listarProdutosDoFornecedor = async () => {
        if (!fornecedorSelecionado) {
            alert('Selecione um fornecedor.');
            return;
        }

        try {
            const resposta = await fetch(
                `http://localhost:3000/fornecedores/${fornecedorSelecionado}/produtos`
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.error || 'Erro ao busar produtos do fornecedor'
                );
            }

            setProdutoDoFornecedor(dados);

        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const desassociarProdutoFornecedor = async () => {
        if (!produtoSelecionado || !fornecedorSelecionado) {
            alert('Selecione um produto e um fornecedor.');
            return;
        }

        try {
            const resposta = await fetch(
                'http://localhost:3000/associacoes',
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        produto_id: Number(produtoSelecionado),
                        fornecedor_id: Number(fornecedorSelecionado)
                    })
                }
            );

            const dados = await resposta.json();

            if(!resposta.ok) {
                throw new Error(
                    dados.Error || 'Erro ao desassociar produto e fornecedor'
                );
            }

            alert(dados.mensagem);

            setProdutoSelecionado('');
            setFornecedorSelecionado('');
            setFornecedoresDoProduto('');
            setProdutoDoFornecedor('');
        } catch (erro) {
            console.error(erro);
            alert(erro.mensagem);
        }
    };

    return (
        <div>
            <h1>Controle de Estoque</h1>

            <h2>Associação de Produtos e Fornecedores</h2>

        <form onSubmit={associarProdutoFornecedor}>

            <h3>Selecionar Produto</h3>

            <select
                value={produtoSelecionado}
                onChange={(evento) => setProdutoSelecionado(evento.target.value)}
            >
                <option value="">Selecione um produto</option>

                {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                        {produto.nome}
                    </option>
                ))}
            </select>

            <h3>Selecionar Fornecedeor</h3>

            <select
                value={fornecedorSelecionado}
                onChange={(evento) => setFornecedorSelecionado(evento.target.value)}
            >
                
                <option value="">Selecionar Fornecedor</option>

                {fornecedores.map((fornecedor) => (
                    <option key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                    </option>
                ))}
            </select>

            <button type="submit">
                Associar
            </button>

            <button
                type="button"
                onClick={listarFornecedoresDoProduto}
            >
                Consultar Fornecedores
            </button>

            <button
                type="button"
                onClick={listarProdutosDoFornecedor}
            >
                Consultar Produtos
            </button>

            <button
                type="button"
                onClick={desassociarProdutoFornecedor}
            >
                Desassociar
            </button>

        </form>

            <h3>Fornecedores associados ao produto</h3>

            {fornecedoresDoProduto.length === 0 ? (
                <p>Nenhum fornecedor associado.</p>
            ) : (
                <ul>
                    {fornecedoresDoProduto.map((fornecedor) => (
                        <li key={fornecedor.id}>
                            {fornecedor.id} - {fornecedor.nome}
                        </li>
                    ))}
                </ul>
            )}

            <h3>Produtos</h3>

            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        {produto.id} - {produto.nome}
                    </li>
                ))}
            </ul>

            <h3>Fornecedores</h3>

            <ul>
                {fornecedores.map ((fornecedor) => (
                    <li key={fornecedor.id}>
                        {fornecedor.id} - {fornecedor.nome}
                    </li>
                ))}
            </ul>

            <h3>Produtos associados ao fornecedor</h3>

            {produtoDoFornecedor.length === 0 ? (
                <p>Nenhum produto associado.</p>
            ) : (
                <ul>
                    {produtoDoFornecedor.map((produto) => (
                        <li key={produto.id}>
                            {produto.id} - {produto.nome}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default Associacoes;