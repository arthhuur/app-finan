import { MetaCard } from "../components/MetaCard";
import type { Meta } from "../types/meta";

const metaTeste: Meta = {
  id: "1",
  user_id: "1",
  nome: "Reserva de emergência",
  valor_alvo: 10000,
  valor_atual: 3500,
  prazo: "2027-06-30",
  created_at: "2026-11-27T00:00:00Z",
};

export default function PainelPage() {
  return (
    <div className="max-w-sm">
      <MetaCard meta={metaTeste} />
    </div>
  );
}
