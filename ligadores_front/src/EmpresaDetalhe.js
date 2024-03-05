// EmpresaDetalhe.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Usaremos para capturar o ID/CNPJ da empresa da URL
import AtendimentoModal from './AtendimentoModal'; // Componente do modal para adicionar novo atendimento

function EmpresaDetalhe() {
    const [empresa, setEmpresa] = useState(null);
    const [atendimentos, setAtendimentos] = useState([]);
    const { cnpj } = useParams(); // Captura o CNPJ da URL

    const fetchData = async () => {
        const empresaRes = await axios.get(`https://coral-app-7ytww.ondigitalocean.app/empresa/${cnpj}`);
        setEmpresa(empresaRes.data);
        const atendimentoRes = await axios.get(`https://coral-app-7ytww.ondigitalocean.app/empresa/${cnpj}/atendimento`);
        setAtendimentos(atendimentoRes.data);
    };

    useEffect(() => {
       
        fetchData();
    }, [cnpj]);

    return (
        <div className="container mx-auto p-4">
            {empresa && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Detalhes da Empresa</h2>
                    {/* Exibindo detalhes da empresa */}
                    <div className="mb-8">
                        {/* Campos da empresa aqui */}
                    </div>

                    <h3 className="text-xl font-semibold mb-2">Histórico de Atendimentos</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* Cabeçalho da tabela de atendimentos */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {atendimentos.map((atendimento) => (
                                    <tr key={atendimento.id}>
                                        {/* Dados do atendimento */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <AtendimentoModal empresaId={empresa._id} onAtendimentoAdded={() => fetchData()} />
                </div>
            )}
        </div>
    );
}

export default EmpresaDetalhe;
