import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usado para navegação

function EmpresaTable() {
  const [empresas, setEmpresas] = useState([]);

  const navigate = useNavigate(); // Hook para navegar programaticamente

 

  // Função para navegar até a página de detalhes da empresa
  const handleRowClick = (cnpj) => {
    navigate(`/empresa/${cnpj}`); // Ajuste a rota conforme necessário
  };

  useEffect(() => {
    // Atualizada para incluir filtro de banco
    const fetchEmpresas = async () => {
      const { data } = await axios.get('https://coral-app-7ytww.ondigitalocean.app/empresa');
      setEmpresas(data);
    };

    fetchEmpresas();
  }, [banco]);

  const handleBancoChange = (event) => {
    setBanco(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <table className="w-full table-auto text-sm text-left text-gray-900">
        <thead className="text-xs text-gray-900 uppercase bg-stone-500 bg-gray-300 ">
          <tr>
            <th scope="col" className="py-3 px-6">Banco</th>
            <th scope="col" className="py-3 px-6">Nome Fantasia</th>
            <th scope="col" className="py-3 px-6">CNPJ</th>
            <th scope="col" className="py-3 px-6">Capital Social</th>
            <th scope="col" className="py-3 px-6">Email</th>
            <th scope="col" className="py-3 px-6">Telefones</th>
            <th scope="col" className="py-3 px-6">Status</th>
            <th scope="col" className="py-3 px-6">Score</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr
              key={empresa.cnpj}
              className="text-gray-900 bg-white border-b even:bg-stone-200 odd:bg-stone-50  dark:hover:bg-sky-300 cursor-pointer"
              onClick={() => handleRowClick(empresa.cnpj)}
            >
              <td className="py-4 px-6">{empresa.banco}</td>
              <td className="py-4 px-6">{empresa.nomeFantasia}</td>
              <td className="py-4 px-6">{empresa.cnpj}</td>
              <td className="py-4 px-6">{empresa.capSocial}</td>
              <td className="py-4 px-6">{empresa.email}</td>
              <td className="py-4 px-6">{empresa.telefones}</td>
              <td className="py-4 px-6">{empresa.atendimentos?.status ?? 'Não Disponível'}</td>
              <td className="py-4 px-6">{empresa.atendimentos?.score ?? 'Não Disponível'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmpresaTable;
