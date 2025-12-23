"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

export function SetupTableButton() {
  const [isLoading, setIsLoading] = useState(false);

  const setupTable = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/setup-table', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Tabela criada com sucesso!');
      } else {
        toast.error(data.error || 'Erro ao criar tabela');
      }
    } catch (error: any) {
      toast.error('Erro de conexão: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={setupTable} 
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <RefreshCw className="animate-spin h-4 w-4" />
          Configurando...
        </span>
      ) : (
        "Configurar Tabela no Supabase"
      )}
    </Button>
  );
}