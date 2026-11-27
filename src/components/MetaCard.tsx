import type { Meta } from "../types/meta";

type MetaCardProps = {
  meta: Meta;
};

const formatarMoeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatarData = (data: string) =>
  new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");

export function MetaCard({ meta }: MetaCardProps) {
  const percentual = Math.min(
    Math.round((meta.valor_atual / meta.valor_alvo) * 100),
    100
  );
  const concluida = percentual >= 100;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">{meta.nome}</h3>
          {meta.prazo && (
            <p className="mt-1 text-xs text-slate-500">
              Prazo: {formatarData(meta.prazo)}
            </p>
          )}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            concluida
              ? "bg-emerald-100 text-emerald-700"
              : "bg-teal-50 text-teal-700"
          }`}
        >
          {percentual}%
        </span>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${
            concluida ? "bg-emerald-500" : "bg-teal-500"
          }`}
          style={{ width: `${percentual}%` }}
        />
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-slate-600">{formatarMoeda(meta.valor_atual)}</span>
        <span className="font-medium text-slate-900">
          {formatarMoeda(meta.valor_alvo)}
        </span>
      </div>
    </div>
  );
}
