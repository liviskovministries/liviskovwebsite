import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Tentando configurar Supabase com:");
console.log("URL:", supabaseUrl);
console.log("Anon Key:", supabaseAnonKey ? "Definida" : "Não definida");

// Validação das variáveis de ambiente
if (!supabaseUrl) {
  console.error("ERRO: NEXT_PUBLIC_SUPABASE_URL não está definida!");
}

if (!supabaseAnonKey) {
  console.error("ERRO: NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida!");
}

if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  console.error("ERRO: NEXT_PUBLIC_SUPABASE_URL não é uma URL válida!", supabaseUrl);
}

// Cria o cliente apenas se as variáveis estiverem definidas
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase cliente criado com sucesso");
  } catch (error) {
    console.error("Erro ao criar cliente do Supabase:", error);
  }
} else {
  console.error("ERRO: Variáveis de ambiente do Supabase não configuradas!");
}

export { supabase };