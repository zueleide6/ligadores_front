import React, { useState } from 'react';
import axios from 'axios';

function AtendimentoModal({ empresaId, onAtendimentoAdded }) {
    const [showModal, setShowModal] = useState(false);
    const [atendimentoInfo, setAtendimentoInfo] = useState({ /* estado inicial */ });

    const handleSave = async () => {
        await axios.post(`https://congenial-space-spork-qvj9w7w959cxx94-3333.app.github.dev/empresa/${empresaId}/atendimento`, atendimentoInfo);
        onAtendimentoAdded();
        setShowModal(false);
    };

    return (
        <div>
            {/* Botão para abrir o modal */}
            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white p-2 rounded">
                Adicionar Atendimento
            </button>

            {/* Estrutura do modal aqui, controlada pelo estado showModal */}
        </div>
    );
}

export default AtendimentoModal;