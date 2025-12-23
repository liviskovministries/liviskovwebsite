import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';

// Definindo o tipo para as tabelas do Supabase
export type PreSales = {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  created_at: string;
};

// Definindo o tipo para o esquema do banco de dados
export interface Database {
  public: {
    Tables: {
      pre_sales: {
        Row: PreSales;
        Insert: {
          name: string;
          email: string;
          whatsapp: string;
        };
        Update: Partial<{
          name: string;
          email: string;
          whatsapp: string;
        }>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type TypedSupabaseClient = SupabaseClient<Database>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
let supabase: TypedSupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    console.log("Supabase cliente criado com sucesso");
  } catch (error) {
    console.error("Erro ao criar cliente do Supabase:", error);
  }
} else {
  console.error("ERRO: Variáveis de ambiente do Supabase não configuradas!");
}

export { supabase };