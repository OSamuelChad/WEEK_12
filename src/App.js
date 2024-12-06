import React, { useState, useEffect } from "react";

function App() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    document.title = `Contatos: ${contatos.length}`;
  }, [contatos]);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarTelefone = (telefone) => {
    return /^\d+$/.test(telefone); 
  };

  const validarNome = (nome) => {
    return /^[a-zA-Z\s]+$/.test(nome); 
  };

  const adicionarContato = () => {
    if (!validarNome(nome)) {
      alert("Nome inválido! Use apenas letras e espaços.");
      return;
    }

    if (!validarTelefone(telefone)) {
      alert("Telefone inválido! Use apenas números.");
      return;
    }

    if (!validarEmail(email)) {
      alert("Email inválido! Insira um email no formato correto.");
      return;
    }

    const novoContato = {
      id: Math.random().toString(),
      nome,
      telefone,
      email,
    };
    setContatos([...contatos, novoContato]);

    setNome("");
    setTelefone("");
    setEmail("");
  };

  const removerContato = (id) => {
    const novaLista = contatos.filter((contato) => contato.id !== id);
    setContatos(novaLista);
  };

  return (
    <div style={{ fontFamily: "sans-serif", color: "white", textAlign: "center", marginTop: "50px" }}>
      <h1>Lista de Contatos</h1>
      <div>
        Nome:
        <input
          style={{ margin: "1px" }}
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <br />
        Telefone:
        <input
          style={{ margin: "1px" }}
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <br />
        Email:
        <input
          style={{ margin: "1px" }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button style={{ margin: "1px" }} onClick={adicionarContato}>Adicionar Contato</button>
      </div>
      <h2>Contatos:</h2>
      <div style={{ display: "flex", height: '100vh', justifyContent: "center" }}>
        <ul>
          {contatos.map((contato) => (
            <li key={contato.id}>
              {contato.nome} - {contato.telefone} - {contato.email}{" "}
              <button onClick={() => removerContato(contato.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;