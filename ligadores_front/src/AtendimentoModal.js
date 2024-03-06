// AtendimentoModal.js
import React, { useState } from 'react';
import axios from 'axios';

const AtendimentoModal = ({ cnpj,isOpen, onClose }) => {
  const [score, setScore] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [anotacao, setAnotacao] = useState('');

  const handleAddAtendimento = async (e) => {
    e.preventDefault();

    console.log(`https://coral-app-7ytww.ondigitalocean.app/empresa/${cnpj}/atendimento`)
    await axios.post(`https://coral-app-7ytww.ondigitalocean.app/empresa/${cnpj}/atendimento`, {
        score: Number(score),
        status,
        Anotacao: anotacao,
      });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <span className="absolute top-0 right-0 p-4" onClick={onClose}>X</span>
        <h2 className="text-xl font-bold">Novo Atendimento</h2>
        <form onSubmit={handleAddAtendimento} className="space-y-4">
          <div>
            <label htmlFor="score">Score</label>
            <input type="number" id="score" value={score} onChange={(e) => setScore(e.target.value)} className="border rounded p-2 w-full" />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded p-2 w-full">
                <option value="Pendente">Pendente</option>
                <option value="Retornar">Retornar</option>
                <option value="Encaminhado">Encaminhado</option>
                <option value="Sucesso">Sucesso</option>
                <option value="Perdido">Perdido</option>
                <option value="Cadastro Incorreto">Cadastro Incorreto</option>
                <option value="Não Possui Conta">Não Possui Conta</option>
            </select>
          </div>
          <div>
            <label htmlFor="anotacao">Anotação</label>
            <input type="text" id="anotacao" value={anotacao} onChange={(e) => setAnotacao(e.target.value)} className="border rounded p-2 w-full" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Incluir</button>
        </form>
      </div>
    </div>
  );
};

export default AtendimentoModal;
