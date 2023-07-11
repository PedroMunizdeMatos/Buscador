import { FiSearch } from "react-icons/fi"
import { useState } from "react"
import "./styles.css"
import api from "./services/api.js"

function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})
  async function handleSearch() {
    if (input === "") {
      alert("preencha um CEP válido")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } catch {
      alert("erro ao buscar")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">
        Buscador <br /> de CEP
      </h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch">
          <FiSearch size={25} color="#fff" onClick={handleSearch} />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  )
}

export default App
