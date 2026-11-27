import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Meta } from "../types/meta";

export function useMetas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function buscarMetas() {
      const { data, error } = await supabase
        .from("metas")
        .select("*")
        .order("created_at", { ascending: true });

      if (!ativo) return;

      if (error) {
        setErro(error.message);
      } else {
        // Garante que valores numéricos sejam number, não string
        setMetas(
          (data ?? []).map((m) => ({
            ...m,
            valor_alvo: Number(m.valor_alvo),
            valor_atual: Number(m.valor_atual),
          }))
        );
      }
      setCarregando(false);
    }

    buscarMetas();

    return () => {
      ativo = false;
    };
  }, []);

  return { metas, carregando, erro };
}
