"use client";

import { useState, useEffect } from "react";
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
import { ArrowLeft, CheckCircle2, RefreshCw, Copy } from "lucide-react";
import { SupabaseClient } from "@supabase/supabase-js";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string()
    .transform((val) => val.replace(/\D/g, '')) // Remove caracteres não numéricos primeiro
    .refine((val) => val.length >= 10, "Telefone inválido (mínimo 10 dígitos)"), // Valida o comprimento do valor limpo
});

type FormValues = z.infer<typeof formSchema>;

export default function PreSalePage() {
  const [step, setStep] = useState<"form" | "payment">("form");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Código PIX fornecido
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136b31658e9-229f-4d7f-8ef5-863ad2c3316c520400005303986540520.005802BR592563.833.293 LIVI DOMITILA 6009SAO PAULO610805409000622505211BC0GLqKCSYhZ3t6nz1ue630407BE";

  const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // Valida apenas na submissão
  });

  // Adicionando um useEffect para logar erros de validação, especialmente para o WhatsApp
  useEffect(() => {
    if (errors.whatsapp) {
      console.error("Erro de validação no WhatsApp:", errors.whatsapp.message);
    }
    if (errors.name) {
      console.error("Erro de validação no Nome:", errors.name.message);
    }
    if (errors.email) {
      console.error("Erro de validação no Email:", errors.email.message);
    }
  }, [errors]);

  const onSubmit = async (data: FormValues) => {
    console.log("onSubmit chamado com dados:", data);
    console.log("onSubmit: formState.isValid no momento da submissão:", isValid);
    
    if (!isValid) {
      console.error("Formulário inválido na submissão.");
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    if (!supabase) {
      toast.error("Supabase não configurado. Adicione as chaves de API.");
      console.error("Cliente Supabase não configurado.");
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
            whatsapp: data.whatsapp, // O valor já foi transformado e validado pelo Zod
          }
        ]);
      
      if (error) {
        console.error("Erro ao inserir no Supabase:", error); // Loga o objeto de erro completo
        console.error("Detalhes do erro Supabase:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });

        if (error.code === '23505') {
          toast.error("Este e-mail ou telefone já está cadastrado.");
        } else if (error.message) {
          toast.error(`Erro ao salvar dados: ${error.message}`);
        } else {
          toast.error("Erro desconhecido ao salvar dados no Supabase. Verifique o console para mais detalhes.");
        }
        return;
      }
      
      toast.success("Dados salvos com sucesso!");
      console.log("Dados salvos, mudando para a etapa de pagamento.");
      setStep("payment");
    } catch (error: any) {
      console.error("Erro no bloco catch:", error);
      if (error.message) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.error("Erro desconhecido ao conectar com o banco de dados.");
      }
    } finally {
      setIsLoading(false);
      console.log("setIsLoading(false) chamado.");
    }
  };

  const handleCopyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      toast.success("Código PIX copiado!");
    } catch (err) {
      toast.error("Falha ao copiar o código PIX.");
      console.error("Failed to copy PIX code: ", err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Image 
        src="/outono-background.jpg" 
        alt="Background" 
        fill 
        className="object-cover z-0" 
        priority 
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
      
      <div className="relative z-20 w-full max-w-md flex flex-col items-center">
        <Button 
          variant="ghost" 
          className="text-white mb-4 hover:bg-white/10 self-start"
          onClick={() => step === "payment" ? setStep("form") : router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <div className="w-full flex justify-center mb-6">
          <Image
            src="/livi-skovi-logo.png"
            alt="Livi Skovi Logo"
            width={2400}
            height={1200}
            className="w-96 h-auto object-contain"
          />
        </div>
        
        <Card className="bg-white/95 backdrop-blur shadow-2xl border-none w-full">
          {step === "form" ? (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-tan-garland text-custom-green">Pré-Venda Exclusiva</CardTitle>
                <CardDescription>Garanta seu acesso antecipado por apenas R$ 20,00</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Seu nome" 
                      {...register("name")} 
                      autoComplete="name"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      {...register("email")} 
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp / Telefone</Label>
                    <Input 
                      id="whatsapp" 
                      placeholder="(00) 00000-0000" 
                      {...register("whatsapp")} 
                      autoComplete="tel"
                    />
                    {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-custom-green hover:bg-custom-green/90 text-white py-6 text-lg rounded-xl mt-4 relative z-30"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="animate-spin h-4 w-4" />
                        Processando...
                      </span>
                    ) : "Ir para Pagamento"}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-tan-garland text-custom-green">Quase lá!</CardTitle>
                <CardDescription>Realize o pagamento de R$ 20,00 via PIX para confirmar.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden border-4 border-white shadow-md">
                  <Image 
                    src="/pix-qr-code.png" 
                    alt="QR Code PIX" 
                    fill 
                    className="object-contain" 
                  />
                </div>

                <div className="max-w-sm space-y-2">
                  <Label htmlFor="pix-code" className="text-center">Código PIX</Label>
                  <div className="flex w-full items-center space-x-2">
                    <Input 
                      id="pix-code" 
                      value={pixCode} 
                      readOnly 
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      onClick={handleCopyPixCode} 
                      variant="outline" 
                      size="icon"
                      className="bg-custom-green hover:bg-custom-green/90 text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-custom-green hover:bg-custom-green/90 text-white rounded-xl py-6"
                  onClick={() => router.push("/livi-skovi")}
                >
                  Voltar ao Início
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}