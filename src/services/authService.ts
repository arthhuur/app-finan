import { supabase } from '../lib/supabase'

const MENSAGENS: Record<string, string> = {
  'Invalid login credentials': 'E-mail ou senha incorretos.',
  'Email not confirmed': 'Confirme seu e-mail antes de entrar.',
  'User already registered': 'Já existe uma conta com este e-mail.',
  'Password should be at least 8 characters': 'A senha deve ter pelo menos 8 caracteres.',
  'Unable to validate email address: invalid format': 'Informe um e-mail válido.',
  'For security purposes, you can only request this after': 'Aguarde alguns segundos e tente novamente.',
}

function traduzirErro(mensagem: string): string {
  const chave = Object.keys(MENSAGENS).find((k) => mensagem.includes(k))
  return chave ? MENSAGENS[chave] : 'Ocorreu um erro. Tente novamente.'
}

export async function cadastrar(email: string, senha: string) {
  const { error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  })
  if (error) throw new Error(traduzirErro(error.message))
}

export async function entrar(email: string, senha: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  })
  if (error) throw new Error(traduzirErro(error.message))
}

export async function sair() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(traduzirErro(error.message))
}
