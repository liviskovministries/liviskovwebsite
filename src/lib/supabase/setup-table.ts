import { createClient } from '@supabase/supabase-js';

// Cria um cliente com permissões de serviço (para operações administrativas)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials not configured');
  throw new Error('Supabase credentials not configured');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function setupPreSalesTable() {
  try {
    // Cria a tabela pre_sales usando SQL
    const { data, error } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS pre_sales (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          whatsapp TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_pre_sales_email ON pre_sales(email);
        CREATE INDEX IF NOT EXISTS idx_pre_sales_whatsapp ON pre_sales(whatsapp);
      `
    });
    
    if (error) {
      console.error('Error creating table:', error);
      return false;
    }
    
    console.log('Table pre_sales created successfully');
    return true;
  } catch (error) {
    console.error('Error setting up pre_sales table:', error);
    return false;
  }
}

export { setupPreSalesTable };