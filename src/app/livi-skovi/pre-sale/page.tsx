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
import { ArrowLeft, CheckCircle2, Copy, AlertTriangle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(10, "Telefone inválido"),
});

type FormValues = z.infer<typeof formSchema>;

export default function PreSalePage() {
  const [step, setStep] = useState<"form" | "payment">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url === "" || key === "") {
      setIsConfigured(false);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!isConfigured) {
      toast.error("Supabase não configurado. Adicione as chaves de API.");
      return;
    }

    setIsLoading(true);
    try {
      const { error: supabaseError } = await supabase.from("pre_sales").insert([
        {
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
        },
      ]);

      if (supabaseError) throw supabaseError;

      toast.success("Dados salvos com sucesso!");
      setStep("payment");
    } catch (error: any) {
      console.error("Erro na submissão:", error);
      toast.error("Erro de conexão com o banco de dados. Verifique suas chaves do Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyPixKey = () => {
    const pixKey = "seu-email@ou-chave-pix.com";
    navigator.clipboard.writeText(pixKey);
    toast.success("Chave PIX copiada!");
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

      <div className="relative z-20 w-full max-w-md">
        <Button
          variant="ghost"
          className="text-white mb-4 hover:bg-white/10"
          onClick={() => step === "payment" ? setStep("form") : router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {!isConfigured && (
          <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-4 rounded shadow-md flex items-start gap-3">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={20} />
            <div>
              <p className="text-amber-800 font-bold text-sm">Atenção!</p>
              <p className="text-amber-700 text-xs">Variáveis do Supabase não detectadas. O formulário não irá funcionar até que você as configure.</p>
            </div>
          </div>
        )}

        <Card className="bg-white/95 backdrop-blur shadow-2xl border-none">
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
                    <Input id="name" placeholder="Seu nome" {...register("name")} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp / Telefone</Label>
                    <Input id="whatsapp" placeholder="(00) 00000-0000" {...register("whatsapp")} />
                    {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-custom-green hover:bg-custom-green/90 text-white py-6 text-lg rounded-xl mt-4"
                    disabled={isLoading || !isConfigured}
                  >
                    {isLoading ? "Processando..." : "Ir para Pagamento"}
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
                
                <div className="w-full space-y-3">
                  <p className="text-sm text-center text-gray-500">Ou use a chave PIX:</p>
                  <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border">
                    <span className="text-xs font-mono truncate flex-1">seu-email@ou-chave-pix.com</span>
                    <Button size="icon" variant="ghost" onClick={copyPixKey} className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800 leading-relaxed text-center">
                  Após o pagamento, envie o comprovante para nosso WhatsApp para liberação imediata.
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