import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Meta, NovaMeta } from "../types/meta";

export function useMetas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarMetas = useCallback(async () => {
    const { data, error } = await supabase
      .from("metas")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      setErro(error.message);
    } else {
      setErro(null);
      setMetas(
        (data ?? []).map((m) => ({
          ...m,
          valor_alvo: Number(m.valor_alvo),
          valor_atual: Number(m.valor_atual),
        }))
      );
    }
    setCarregando(false);
  }, []);

  useEffect(() => {
    buscarMetas();
  }, [buscarMetas]);

  async function criarMeta(dados: NovaMeta): Promise<string | null> {
    const { error } = await supabase.from("metas").insert(dados);
    if (error) return error.message;
    await buscarMetas();
    return null;
  }

  return { metas, carregando, erro, criarMeta };
}
