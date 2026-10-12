import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function Produto() {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [produtoEditando, setProdutoEditando] = useState(null);

    const cadastrarProduto = async (evento) => {
        evento.preventDefault();

        if (produtoEditando) {
            try {
                const resposta = await fetch(
                    `/api/produtos/${produtoEditando.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nome,
                            descricao,
                            preco: Number(preco),
                            codigo_barras: codigoBarras
                        })
                    }
                );

                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(
                        dados.error || 'Erro ao atualizar produto'
                    );
                }

                alert('Produto atualizado com sucesso!');

                // Limpar campos
                setProdutoEditando(null);
                setNome('');
                setDescricao('');
                setPreco('');
                setCodigoBarras('');
                listarProdutos();
                return;

            } catch (erro) {
                console.error(erro);
                alert(erro.message);
                return;
            }
        }

        try {
            const resposta = await fetch(
                '/api/produtos',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome,
                        descricao,
                        preco: Number(preco),
                        codigo_barras: codigoBarras
                    })
                }
            );
            
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.error || 'Erro ao cadastrar produto'
                );
            }

            alert('Produto cadastrado com sucesso!');

            // Limpar campos
            setNome('');
            setDescricao('');
            setPreco('');
            setCodigoBarras('');
            listarProdutos();

        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const listarProdutos = async () => {
        try {
            const resposta = await fetch(
                '/api/produtos'
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.error || 'Erro ao buscar produtos'
                );
            }

            setProdutos(dados);
        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    useEffect(() => {
        listarProdutos();
    }, []);

    const editarProduto = (produto) => {
        setProdutoEditando(produto);

        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(String(produto.preco));
        setCodigoBarras(produto.codigo_barras);
    };

    const deletarProduto = async (id) => {
        const confirmar = window.confirm(
            'Deseja realmente excluir este produto?'
        );

        if (!confirmar) {
            return;
        }

        try {
            const resposta = await fetch(
                `/api/produtos/${id}`,
                {
                    method: 'DELETE'
                    }
                );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                        dados.error || 'Erro ao deletar produto'
                );
            }

            alert('Produto deletado com sucesso!');

            listarProdutos();

        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };


    return (
    <div className="produtos-pagina">
            <div className="titulo-pagina">
            <div>
                <h1>Produtos</h1>
                <p>Gerencie os produtos do seu estoque.</p>
            </div>

        <button
            type="button"
            onClick={() => {
                setProdutoEditando(null);
                setNome('');
                setDescricao('');
                setPreco('');
                setCodigoBarras('');
            }}
        >
            + Novo Produto
        </button>
    </div>

    <div className="produtos-layout">
        <section className="card-produtos">
            <h2>Produtos cadastrados</h2>

            {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <div className="tabela-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Código de barras</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>
                                        R$ {Number(produto.preco) .toFixed(2)}
                                    </td>
                                    <td>{produto.codigo_barras}</td>

                                    <td className="acoes-produto">
                                        <button
                                            type="button"
                                            onClick={() => editarProduto(produto)}
                                            title="Editar produto"
                                            aria-label="Editar produto"
                                        >
                                            <Pencil size={16}/>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => deletarProduto(produto.id)}
                                            title="Excluir produto"
                                            aria-label="Excluir produto"
                                        >
                                            <Trash2 size={16}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>

        <section className="card-formulario">
            <h2>
                {produtoEditando
                ? 'Editar Produto'
                : 'Cadastrar Produto'}
            </h2>

            <form onSubmit={cadastrarProduto}>
                <div>
                    <label>Nome *</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(evento) => setNome(evento.target.value)}
                        placeholder="Nome do produto"
                        required
                    />
                </div>

                <div>
                    <label>Código de barras *</label>
                    <input
                        type="text"
                        value={codigoBarras}
                        onChange={(evento) => setCodigoBarras(evento.target.value)}
                        placeholder="Código de barras"
                        required
                    />
                </div>

                <div>
                    <label>Preço (R$) *</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={preco}
                        onChange={(evento) => setPreco(evento.target.value)}
                        placeholder="0,00"
                        required
                    />
                </div>

                <div>
                    <label>Descrição *</label>
                    <textarea
                        value={descricao}
                        onChange={(evento) => setDescricao(evento.target.value)}
                        placeholder="Descrição do produto"
                        rows="4"
                        required
                    />
                </div>

                <button type="submit" className="botao-salvar">
                    {produtoEditando
                    ? 'Salvar Alterações'
                    : 'Cadastrar Produto'}
                </button>

                {produtoEditando && (
                    <button
                        type="button"
                        className="botao-cancelar"
                        onClick={() => {
                            setProdutoEditando(null);
                            setNome('');
                            setDescricao('');
                            setPreco('');
                            setCodigoBarras('');

                        }}
                    >
                        Cancelar edição
                    </button>
                )}
            </form>
        </section>
    </div>
</div>
);
}

export default Produto;