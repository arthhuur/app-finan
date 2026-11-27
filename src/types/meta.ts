export type Meta = {
  id: string;
  nome: string;
  valor_alvo: number;
  valor_atual: number;
  prazo: string | null;
  created_at: string;
};

export type NovaMeta = {
  nome: string;
  valor_alvo: number;
  valor_atual: number;
  prazo: string | null;
};
