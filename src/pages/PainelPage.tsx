import { useState } from "react";
import { FormMeta } from "../components/FormMeta";
import { MetaCard } from "../components/MetaCard";
import { useMetas } from "../hooks/useMetas";
import type { NovaMeta } from "../types/meta";

export default function PainelPage() {
  const { metas, carregando, erro, criarMeta, registrarAporte } = useMetas();
  const [mostrarForm, setMostrarForm] = useState(false);

  async function handleCriar(dados: NovaMeta) {
    const msgErro = await criarMeta(dados);
    if (!msgErro) setMostrarForm(false);
    return msgErro;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Metas</h1>
        {!mostrarForm && (
          <button
            onClick={() => setMostrarForm(true)}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Nova meta
          </button>
        )}
      </div>

      {mostrarForm && (
        <div className="max-w-md">
          <FormMeta
            onSalvar={handleCriar}
            onCancelar={() => setMostrarForm(false)}
          />
        </div>
      )}

      {carregando && <p className="text-slate-500">Carregando metas...</p>}

      {!carregando && erro && (
        <p className="text-red-600">Erro ao carregar metas: {erro}</p>
      )}

      {!carregando && !erro && metas.length === 0 && (
        <p className="text-slate-500">Nenhuma meta cadastrada ainda.</p>
      )}

      {!carregando && !erro && metas.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metas.map((meta) => (
            <MetaCard
              key={meta.id}
              meta={meta}
              onAporte={(novoValor) => registrarAporte(meta.id, novoValor)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
