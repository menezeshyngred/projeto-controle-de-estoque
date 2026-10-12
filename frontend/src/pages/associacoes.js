
import { Link2, Package, Plus, Search, Trash2, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";

function Associacoes() {
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [associacoes, setAssociacoes] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState("");

    const [fornecedoresDoProduto, setFornecedoresDoProduto] = useState([]);
    const [produtosDoFornecedor, setProdutosDoFornecedor] = useState([]);

    const [pesquisa, setPesquisa] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const [produtoConsulta, setProdutoConsulta] = useState("");
    const [fornecedorConsulta, setFornecedorConsulta] = useState("");

    const carregarDados = async () => {
        try {
            setCarregando(true);

            const [resProdutos, resFornecedores] = await Promise.all([
                fetch("/api/produtos"),
                fetch("/api/fornecedores")
            ]);

            if (!resProdutos.ok || !resFornecedores.ok) {
                throw new Error("Não foi possível carregar os dados.");
            }

            const dadosProdutos = await resProdutos.json();
            const dadosFornecedores = await resFornecedores.json();

            setProdutos(dadosProdutos);
            setFornecedores(dadosFornecedores);

            const resultados = await Promise.all(
                dadosProdutos.map(async (produto) => {
                    const resposta = await fetch(
                        `/api/produtos/${produto.id}/fornecedores`
                    );

                    if (!resposta.ok) {
                        throw new Error("Erro ao carregar as associações.");
                    }

                    const listaFornecedores = await resposta.json();

                    return listaFornecedores.map((fornecedor) => ({
                        produto_id: produto.id,
                        fornecedor_id: fornecedor.id,
                        produto_nome: produto.nome,
                        fornecedor_nome: fornecedor.nome,
                        descricao: produto.descricao || ""
                    }));
                })
            );

            setAssociacoes(resultados.flat());
        } catch (erro) {
            console.error("Erro ao carregar dados:", erro);
            alert(erro.message);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const associarProdutoFornecedor = async (evento) => {
        evento.preventDefault();

        if (!produtoSelecionado || !fornecedorSelecionado) {
            alert("Selecione um produto e um fornecedor.");
            return;
        }

        try {
            const resposta = await fetch(
                "/api/associacoes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
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
                    erro.error ||
                    erro.mensagem ||
                    erro.message ||
                    "Erro ao associar produto e fornecedor."
                );
            }

            alert("Produto associado ao fornecedor com sucesso!");

            setProdutoSelecionado("");
            setFornecedorSelecionado("");
            setMostrarFormulario(false);

            await carregarDados();
        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const desassociarProdutoFornecedor = async (
        produtoId,
        fornecedorId
    ) => {
        const confirmar = window.confirm(
            "Deseja realmente desassociar este produto deste fornecedor?"
        );

        if (!confirmar) return;

        try {
            const resposta = await fetch(
                "/api/associacoes",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        produto_id: Number(produtoId),
                        fornecedor_id: Number(fornecedorId)
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.error ||
                    dados.mensagem ||
                    dados.message ||
                    "Erro ao desassociar produto e fornecedor."
                );
            }

            alert(
                dados.mensagem ||
                "Associação removida com sucesso!"
            );

            setFornecedoresDoProduto([]);
            setProdutosDoFornecedor([]);

            await carregarDados();
        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const listarFornecedoresDoProduto = async () => {
        if (!produtoConsulta) {
            alert("Selecione um produto.");
            return;
        }

        try {
            const resposta = await fetch(
                `/api/produtos/${produtoConsulta}/fornecedores`
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.error || dados.mensagem ||
                    "Erro ao consultar fornecedores."
                );
            }

            setFornecedoresDoProduto(dados);
        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const listarProdutosDoFornecedor = async () => {
        if (!fornecedorConsulta) {
            alert("Selecione um fornecedor.");
            return;
        }

        try {
            const resposta = await fetch(
                `/api/fornecedores/${fornecedorConsulta}/produtos`
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.error || dados.mensagem ||
                    "Erro ao consultar produtos."
                );
            }

            setProdutosDoFornecedor(dados);
        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    // Pesquisa por produto, fornecedor ou descrição.
    const associacoesFiltradas = associacoes.filter((associacao) => {
        const termo = pesquisa.trim().toLowerCase();

        return (
            associacao.produto_nome.toLowerCase().includes(termo) ||
            associacao.fornecedor_nome.toLowerCase().includes(termo) ||
            associacao.descricao.toLowerCase().includes(termo)
        );
    });

    return (
        <div className="pagina-associacoes">
            <h1>Associação de Produtos e Fornecedores</h1>

            <section className="card-associacoes">
                <div className="cabecalho-associacoes">
                    <h3>
                        <Link2 size={20} />
                        Produtos e fornecedores associados
                    </h3>

                    <button
                        type="button"
                        className="botao-nova-associacao"
                        onClick={() =>
                            setMostrarFormulario(!mostrarFormulario)
                        }
                    >
                        {mostrarFormulario ? (
                            <X size={17} />
                        ) : (
                            <Plus size={17} />
                        )}
                        {mostrarFormulario ? "Cancelar" : "Nova associação"}
                    </button>
                </div>

                {mostrarFormulario && (
                    <form
                        className="form-associacoes"
                        onSubmit={associarProdutoFornecedor}
                    >
                        <div className="campo-associacao">
                            <label htmlFor="produto">Produto</label>

                            <select
                                id="produto"
                                value={produtoSelecionado}
                                onChange={(evento) =>
                                    setProdutoSelecionado(evento.target.value)
                                }
                                required
                            >
                                <option value="">Selecione um produto</option>

                                {produtos.map((produto) => (
                                    <option
                                        key={produto.id}
                                        value={produto.id}
                                    >
                                        {produto.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="campo-associacao">
                            <label htmlFor="fornecedor">Fornecedor</label>

                            <select
                                id="fornecedor"
                                value={fornecedorSelecionado}
                                onChange={(evento) =>
                                    setFornecedorSelecionado(evento.target.value)
                                }
                                required
                            >
                                <option value="">Selecione um fornecedor</option>

                                {fornecedores.map((fornecedor) => (
                                    <option
                                        key={fornecedor.id}
                                        value={fornecedor.id}
                                    >
                                        {fornecedor.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="botao-nova-associacao"
                        >
                            <Link2 size={16} />
                            Associar
                        </button>
                    </form>
                )}

                <div className="pesquisa-associacoes">
                    <Search size={19} />

                    <input
                        type="text"
                        placeholder="Pesquisar produto, fornecedor ou descrição..."
                        value={pesquisa}
                        onChange={(evento) => setPesquisa(evento.target.value)}
                    />
                </div>

                <div className="tabela-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Fornecedor</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {carregando ? (
                                <tr>
                                    <td colSpan="4">
                                        Carregando associações...
                                    </td>
                                </tr>
                            ) : associacoesFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan="4">
                                        {associacoes.length === 0
                                            ? "Nenhuma associação cadastrada."
                                            : "Nenhuma associação encontrada."}
                                    </td>
                                </tr>
                            ) : (
                                associacoesFiltradas.map((associacao) => (
                                    <tr
                                        key={`${associacao.produto_id}-${associacao.fornecedor_id}`}
                                    >
                                        <td>{associacao.produto_nome}</td>
                                        <td>{associacao.fornecedor_nome}</td>
                                        <td>
                                            {associacao.descricao ||
                                                "Sem descrição"}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="botao-excluir-associacao"
                                                title="Desassociar"
                                                aria-label="Desassociar produto e fornecedor"
                                                onClick={() =>
                                                    desassociarProdutoFornecedor(
                                                        associacao.produto_id,
                                                        associacao.fornecedor_id
                                                    )
                                                }
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="consultas-associacoes">
                <div className="card-associacoes">
                    <h3>
                        <Truck size={20} />
                        Fornecedores do produto
                    </h3>

                    <div className="campo-associacao">
                        <label htmlFor="produto-consulta">Produto</label>

                        <select
                            id="produto-consulta"
                            value={produtoConsulta}
                            onChange={(evento) => {
                                setProdutoConsulta(evento.target.value);
                                setFornecedoresDoProduto([]);
                            }}
                        >
                            <option value="">Selecione um produto</option>

                            {produtos.map((produto) => (
                                <option key={produto.id} value={produto.id}>
                                    {produto.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="botao-consultar"
                        onClick={listarFornecedoresDoProduto}
                    >
                        <Search size={16} />
                        Consultar fornecedores
                    </button>

                    <div className="tabela-container tabela-consultas">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fornecedor</th>
                                    <th>Contato</th>
                                </tr>
                            </thead>

                            <tbody>
                                {fornecedoresDoProduto.length === 0 ? (
                                    <tr>
                                        <td colSpan="2">
                                            Selecione um produto e consulte os fornecedores.
                                        </td>
                                    </tr>
                                ) : (
                                    fornecedoresDoProduto.map((fornecedor) => (
                                        <tr key={fornecedor.id}>
                                            <td>{fornecedor.nome}</td>
                                            <td>{fornecedor.contato || "Não informado"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-associacoes">
                    <h3>
                        <Package size={20} />
                        Produtos do fornecedor
                    </h3>

                    <div className="campo-associacao">
                        <label htmlFor="fornecedor-consulta">Fornecedor</label>

                        <select
                            id="fornecedor-consulta"
                            value={fornecedorConsulta}
                            onChange={(evento) => {
                                setFornecedorConsulta(evento.target.value);
                                setProdutosDoFornecedor([]);
                            }}
                        >
                            <option value="">Selecione um fornecedor</option>

                            {fornecedores.map((fornecedor) => (
                                <option key={fornecedor.id} value={fornecedor.id}>
                                    {fornecedor.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="botao-consultar"
                        onClick={listarProdutosDoFornecedor}
                    >
                        <Search size={16} />
                        Consultar produtos
                    </button>

                    <div className="tabela-container tabela-consultas">
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>

                            <tbody>
                                {produtosDoFornecedor.length === 0 ? (
                                    <tr>
                                        <td colSpan="2">
                                            Selecione um fornecedor e consulte os produtos.
                                        </td>
                                    </tr>
                                ) : (
                                    produtosDoFornecedor.map((produto) => (
                                        <tr key={produto.id}>
                                            <td>{produto.nome}</td>
                                            <td>{produto.descricao || "Sem descrição"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Associacoes;
