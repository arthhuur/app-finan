import { useState, type FormEvent } from "react";
import type { Meta, NovaMeta } from "../types/meta";

type FormMetaProps = {
  metaInicial?: Meta;
  onSalvar: (dados: NovaMeta) => Promise<string | null>;
  onCancelar: () => void;
};

export function FormMeta({ metaInicial, onSalvar, onCancelar }: FormMetaProps) {
  const [nome, setNome] = useState(metaInicial?.nome ?? "");
  const [valorAlvo, setValorAlvo] = useState(
    metaInicial ? String(metaInicial.valor_alvo) : ""
  );
  const [valorAtual, setValorAtual] = useState(
    metaInicial ? String(metaInicial.valor_atual) : "0"
  );
  const [prazo, setPrazo] = useState(metaInicial?.prazo ?? "");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const alvo = Number(valorAlvo);
    const atual = Number(valorAtual);

    if (!nome.trim()) {
      setErro("Informe o nome da meta.");
      return;
    }
    if (!(alvo > 0)) {
      setErro("O valor alvo deve ser maior que zero.");
      return;
    }
    if (!(atual >= 0)) {
      setErro("O valor atual não pode ser negativo.");
      return;
    }

    setEnviando(true);
    try {
      const msgErro = await onSalvar({
        nome: nome.trim(),
        valor_alvo: alvo,
        valor_atual: atual,
        prazo: prazo || null,
      });
      if (msgErro) setErro(msgErro);
    } catch {
      setErro("Não foi possível salvar a meta. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <h2 className="font-semibold text-slate-900">
        {metaInicial ? "Editar meta" : "Nova meta"}
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Nome
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex.: Viagem"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Valor alvo (R$)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={valorAlvo}
          onChange={(e) => setValorAlvo(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Valor atual (R$)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={valorAtual}
          onChange={(e) => setValorAtual(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Prazo (opcional)
        </label>
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {enviando ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
