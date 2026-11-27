import { useState } from "react";
import type { NovaMeta } from "../types/meta";

type FormMetaProps = {
  onSalvar: (dados: NovaMeta) => Promise<string | null>;
  onCancelar: () => void;
};

export function FormMeta({ onSalvar, onCancelar }: FormMetaProps) {
  const [nome, setNome] = useState("");
  const [valorAlvo, setValorAlvo] = useState("");
  const [valorAtual, setValorAtual] = useState("0");
  const [prazo, setPrazo] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    const alvo = Number(valorAlvo);
    const atual = Number(valorAtual);

    if (!nome.trim()) return setErro("Informe um nome para a meta.");
    if (!(alvo > 0)) return setErro("O valor alvo deve ser maior que zero.");
    if (!(atual >= 0)) return setErro("O valor atual não pode ser negativo.");

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
      setErro("Não foi possível salvar. Verifique sua conexão e tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  const campo =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <div>
        <label className="text-sm font-medium text-slate-700">Nome</label>
        <input
          className={campo}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Reserva de emergência"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Valor alvo</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className={campo}
            value={valorAlvo}
            onChange={(e) => setValorAlvo(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Valor atual</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className={campo}
            value={valorAtual}
            onChange={(e) => setValorAtual(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Prazo (opcional)</label>
        <input
          type="date"
          className={campo}
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
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
          {enviando ? "Salvando..." : "Salvar meta"}
        </button>
      </div>
    </form>
  );
}
