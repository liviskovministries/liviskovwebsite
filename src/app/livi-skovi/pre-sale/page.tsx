"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { SupabaseClient } from "@supabase/supabase-js";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(10, "Telefone inválido"),
});

type FormValues = z.infer<typeof formSchema>;

export default function PreSalePage() {
  const [step, setStep] = useState<"form" | "payment">("form");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!supabase) {
      console.error("Cliente do Supabase não foi criado. Verifique as variáveis de ambiente.");
      toast.error("Erro de configuração do Supabase. Verifique as variáveis de ambiente.");
    }
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!supabase) {
      toast.error("Supabase não configurado. Adicione as chaves de API.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await (supabase as SupabaseClient)
        .from("pre_sales")
        .insert([
          {
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp,
          }
        ]);
      
      if (error) {
        if (error.code === '23505') {
          toast.error("Este e-mail ou telefone já está cadastrado.");
        } else if (error.message) {
          toast.error(`Erro ao salvar dados: ${error.message}`);
        } else {
          toast.error("Erro desconhecido ao salvar dados.");
        }
        return;
      }
      
      toast.success("Dados salvos com sucesso!");
      setStep("payment");
    } catch (error: any) {
      if (error.message) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.error("Erro desconhecido ao conectar com o banco de dados.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Conteúdo temporariamente simplificado para depuração */}
      <h1>Página de Pré-Venda (Depuração)</h1>
      <p>Se você está vendo isso, o erro de JSX foi contornado.</p>
      <Button onClick={() => router.back()}>Voltar</Button>
    </div>
  );
}