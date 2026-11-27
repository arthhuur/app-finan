import { useState } from "react";
import { FormMeta } from "../components/FormMeta";
import { MetaCard } from "../components/MetaCard";
import { useMetas } from "../hooks/useMetas";
import type { Meta, NovaMeta } from "../types/meta";

export default function PainelPage() {
  const {
    metas,
    carregando,
    erro,
    criarMeta,
    editarMeta,
    excluirMeta,
    registrarAporte,
  } = useMetas();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [metaEditando, setMetaEditando] = useState<Meta | null>(null);

  function abrirNova() {
    setMetaEditando(null);
    setMostrarForm(true);
  }

  function abrirEdicao(meta: Meta) {
    setMetaEditando(meta);
    setMostrarForm(true);
  }

  function fecharForm() {
    setMostrarForm(false);
    setMetaEditando(null);
  }

  async function handleSalvar(dados: NovaMeta) {
    const msgErro = metaEditando
      ? await editarMeta(metaEditando.id, dados)
      : await criarMeta(dados);
    if (!msgErro) fecharForm();
    return msgErro;
  }

  async function handleExcluir(meta: Meta) {
    if (!window.confirm(`Excluir a meta "${meta.nome}"?`)) return;
    const msgErro = await excluirMeta(meta.id);
    if (msgErro) alert(`Não foi possível excluir: ${msgErro}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Metas</h1>
        {!mostrarForm && (
          <button
            onClick={abrirNova}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Nova meta
          </button>
        )}
      </div>

      {mostrarForm && (
        <div className="max-w-md">
          <FormMeta
            key={metaEditando?.id ?? "nova"}
            metaInicial={metaEditando ?? undefined}
            onSalvar={handleSalvar}
            onCancelar={fecharForm}
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
              onEditar={() => abrirEdicao(meta)}
              onExcluir={() => handleExcluir(meta)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
