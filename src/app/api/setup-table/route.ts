import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Cria um cliente com permissões de serviço
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials not configured');
}

const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase credentials not configured' },
      { status: 500 }
    );
  }

  try {
    // Cria a tabela pre_sales
    const { error } = await supabaseAdmin.rpc('exec_sql', {
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
      return NextResponse.json(
        { error: 'Error creating table: ' + error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Table pre_sales created successfully' });
  } catch (error: any) {
    console.error('Error setting up pre_sales table:', error);
    return NextResponse.json(
      { error: 'Error setting up table: ' + error.message },
      { status: 500 }
    );
  }
}