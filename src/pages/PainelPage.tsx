import { MetaCard } from "../components/MetaCard";
import { useMetas } from "../hooks/useMetas";

export default function PainelPage() {
  const { metas, carregando, erro } = useMetas();

  if (carregando) {
    return <p className="text-slate-500">Carregando metas...</p>;
  }

  if (erro) {
    return <p className="text-red-600">Erro ao carregar metas: {erro}</p>;
  }

  if (metas.length === 0) {
    return <p className="text-slate-500">Nenhuma meta cadastrada ainda.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metas.map((meta) => (
        <MetaCard key={meta.id} meta={meta} />
      ))}
    </div>
  );
}
