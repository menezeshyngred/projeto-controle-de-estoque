import { Pencil, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function Fornecedores(){

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [contato, setContato] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorEditando, setFornecedorEditando] = useState(null);
    const [pesquisa, setPesquisa] = useState('');

    const fornecedoresFiltrados = fornecedores.filter((fornecedor) => {
        const termo = pesquisa.trim().toLowerCase();

        return (
            String(fornecedor.nome || '').toLowerCase().includes(termo) ||
            String(fornecedor.cnpj || '').toLowerCase().includes(termo)
        );
    });

    const listarFornecedores = async () => {
        try {
            const resposta = await fetch('/api/fornecedores');

            const dados = await resposta.json();

            setFornecedores(dados);
        } catch (erro) {
            console.error('Erro ao buscar fornecedores:', erro);
        }
    };

useEffect(() => {
    listarFornecedores();
}, []);

    const cadastrarFornecedor = async (evento) => {
        evento.preventDefault();

        try {
            if (fornecedorEditando) {
                console.log('Fornecedor sendo editado:', fornecedorEditando);
                console.log('ID enviado:', fornecedorEditando.id);
                console.log('Dados enviados: ', {
                    nome: nome,
                    cnpj: cnpj,
                    endereco: endereco,
                    contato: contato
                });

            const resposta = await fetch(
                `/api/fornecedores/${fornecedorEditando.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        cnpj: cnpj,
                        endereco: endereco,
                        contato: contato
                    })
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.json();

                throw new Error(
                    erro.Error || 'Erro ao atualizar fornecedor'
                );
            }

            alert('Fornecedor atualizado com sucesso!');

            } else {
                // cadastrar fornecedor
                const resposta = await fetch(
                    '/api/fornecedores',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body:JSON.stringify({
                            nome: nome,
                            cnpj: cnpj,
                            endereco: endereco,
                            contato: contato
                        })
                    }
                );

                if (!resposta.ok) {
                    const erro = await resposta.json();

                    throw new Error(
                        erro.error || 'Erro ao cadastrar fornecedor'
                    );
                }

                alert('Fornecedor cadastrado com sucesso!');
            }

            listarFornecedores();

            setNome('');
            setCnpj('');
            setEndereco('');
            setContato('');

            setFornecedorEditando(null);
            
        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }

    };

    const deletarFornecedor = async (id) => {
        const confirmar = window.confirm(
            'Deseja realmente excluir este fornecedor?'
        );

        if (!confirmar) {
            return;
        }

        try {
            const resposta = await fetch(
                `/api/fornecedores/${id}`,
                {
                    method: 'DELETE'
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.json();
                throw new Error(
                    erro.error || 'Erro ao excluir fornecedor'
                );
            }

            alert('Fornecedor exluído com sucesso!')

            listarFornecedores();

        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    };

    const editarFornecedor = (fornecedor) => {
        setFornecedorEditando(fornecedor);

        setNome(fornecedor.nome);
        setCnpj(fornecedor.cnpj);
        setEndereco(fornecedor.endereco);
        setContato(fornecedor.contato);
    };

    const cancelarEdicao = () => {
        setFornecedorEditando(null);
        setNome('');
        setCnpj('');
        setEndereco('');
        setContato('');
    };

return (
    <div>
        <h1>Fornecedores</h1>

        <h3>
            {fornecedorEditando
                ? 'Editar Fornecedor'
                : 'Cadastrar Fornecedores'}
        </h3>
        
        <form className="form-fornecedores" onSubmit={cadastrarFornecedor}>
            <input
                type="text"
                placeholder="Nome do Fornecedor"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
            />

            <input
                type="text"
                placeholder="CNPJ"
                value={cnpj}
                onChange={(evento) => setCnpj(evento.target.value)}
            />

            <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(evento) => setEndereco(evento.target.value)}
            />

            <input
                type="tel"
                placeholder="Contato"
                value={contato}
                onChange={(evento) => setContato(evento.target.value)}
            />

            <button type="submit">
                {fornecedorEditando
                    ? 'Atualizar Fornecedor'
                    : 'Cadastrar Fornecedor'}
            </button>

            {fornecedorEditando && (
                <button type="button" onClick={cancelarEdicao}>
                    Cancelar
                </button>
            )}
        </form>

        <h3>Fornecedores cadastrados</h3>

        <div className="pesquisa-fornecedores">
            <Search size={20} />

            <input
                type="text"
                placeholder="Pesquisar por nome ou CNPJ..."
                value={pesquisa}
                onChange={(evento) => setPesquisa(evento.target.value)}
                aria-label="Pesquisar fornecedores por um nome ou CNPJ"
            />
        </div>

        {fornecedoresFiltrados.length === 0 ? (
            <p>
                {fornecedores.length === 0
                    ? 'Nenhum fornecedor cadastrado.'
                    : 'Nenhum fornecedor encontrado.'}
            </p>
        ) : (
            <div className="tabela-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Endereço</th>
                            <th>Contato</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                <tbody>
                    {fornecedoresFiltrados.map((fornecedor) => (
                        <tr key={fornecedor.id}>
                            <td>{fornecedor.id}</td>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.endereco}</td>
                            <td>{fornecedor.contato}</td>

                            <td className="acoes-fornecedor">
                                <button
                                    type="button"
                                    className="botao-editar"
                                    onClick={() =>
                                        editarFornecedor(fornecedor)
                                    }
                                    title="Editar fornecedor"
                                    aria-label="Editar fornecedor"
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    type="button"
                                    className="botao-excluir"
                                    onClick={() =>
                                        deletarFornecedor(fornecedor.id)
                                    }
                                    title="Excluir fornecedor"
                                    aria-label="Excluir fornecedor"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
</div>
);
}

export default Fornecedores;