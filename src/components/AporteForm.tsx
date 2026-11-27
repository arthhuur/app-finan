import { useState } from "react";

type AporteFormProps = {
  valorAtual: number;
  onSalvar: (novoValor: number) => Promise<string | null>;
  onCancelar: () => void;
};

export function AporteForm({ valorAtual, onSalvar, onCancelar }: AporteFormProps) {
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    const aporte = Number(valor);
    if (!(aporte > 0)) return setErro("O aporte deve ser maior que zero.");

    setEnviando(true);
    try {
      const msgErro = await onSalvar(valorAtual + aporte);
      if (msgErro) setErro(msgErro);
    } catch {
      setErro("Não foi possível registrar o aporte. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Valor do aporte"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={enviando}
        className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
      >
        {enviando ? "..." : "Somar"}
      </button>
      <button
        type="button"
        onClick={onCancelar}
        className="rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
      >
        ✕
      </button>
      {erro && <p className="text-sm text-red-600">{erro}</p>}
    </form>
  );
}
