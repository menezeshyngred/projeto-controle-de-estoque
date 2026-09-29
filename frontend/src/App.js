import './App.css';
import Associacoes from './pages/associacoes';

function App() {
  return (
    <Associacoes />
  );
}

/*function App() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');

  //buscar produtos no backend
  const listarProdutos = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/produtos');
      const dados = await resposta.json();

      setProdutos(dados);
    } catch (erro) {
      console.error('Erro ao buscar produtos.', erro);
    }
  };

  //executa quando a pagina é carregada
  // eslint-disable-next-line no-undef
  useEffect(() => {
    listarProdutos();
  }, []);

  //cadastar produto
  const cadastrarProduto =async (evento) => {
    evento.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          nome:nome,
          descricao: descricao,
          preco: Number(preco),
          codigo_barras: codigoBarras
        })
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error('Erro ao cadastrar produto');
      }

      alert('Produto cadastrado com sucesso!');

      //limpar campos
      setNome('');
      setDescricao('');
      setPreco('');
      setCodigoBarras('');

      //atualizar lista de produtos
      listarProdutos();

    } catch (erro) {
      console.error(erro);
      alert(erro.message);
    }
  };

  //excluir produto
  const excluirProduto = async (id) => {
    const confirmar = window.confirm(
      'Deseja realmente excluir este produto?'
    );

    if(!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/produtos/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (!resposta.ok) {
        throw new Error('Erro ao excluir produto');
      }

      alert('Produto excluído com sucesso!');

      listarProdutos();

    } catch (erro) {
      console.error(erro);
      alert('Erro ao excluir produto.');
    }
};

  return (
    <div className="App">

      <header>
        <h1>Controle de Estoque</h1>
        <h2>Produtos</h2>
      </header>

      <main>

        <section>
          <h2>Cadastrar Produto</h2>

          <form onSubmit={cadastrarProduto}>

            <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            required
            />

            <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            required
            />

            <input
            type="number"
            step="0.01"
            placeholder="Preço"
            value={preco}
            onChange={(evento) => setPreco(evento.target.value)}
            required
            />

            <input
            type="text"
            placeholder="Código de Barras"
            value={codigoBarras}
            onChange={(evento) => setCodigoBarras(evento.target.value)}
            required
            />

            <button type="submit">
              Cadastrar Produto
            </button>

          </form>
        </section>

        <section>
          <h2>Produtos cadastrados</h2>

          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado.</p>
          ) : (
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
                    R$ {Number(produto.preco).toFixed(2)}
                  </td>
                  <td>{produto.codigo_barras}</td>

                  <td>
                    <button
                      onClick={() => excluirProduto(produto.id)}
                    >
                      Excluir
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

            </table>
          )}

        </section>

      </main>

    </div>
  );
}*/

export default App;
