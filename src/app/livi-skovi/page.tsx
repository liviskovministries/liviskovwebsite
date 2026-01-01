"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Importando os componentes Card

export default function LiviSkoviPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-4 overflow-hidden">
      <Image
        src="/outono-background.jpg"
        alt="Outono Background"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-custom-black opacity-60 z-10" />

      <main className="relative z-20 flex flex-col items-center justify-start h-full w-full max-w-md md:max-w-5xl mx-auto text-center space-y-6 md:space-y-16 pt-10">
        <div className="w-full flex justify-center">
          <Image
            src="/livi-skovi-logo.png"
            alt="Livi Skovi Logo"
            width={2400}
            height={1200}
            className="w-full md:w-[1200px] h-auto object-contain"
          />
        </div>

        {/* Novo espaço de destaque de propaganda */}
        <Card className="w-full max-w-sm md:max-w-md bg-white/90 backdrop-blur-sm shadow-xl border-none text-custom-green p-4">
          <CardHeader className="flex flex-row items-center gap-4 pb-2"> {/* Adicionado flex para alinhar imagem e texto */}
            <Image
              src="/livro.jpg"
              alt="Capa do Livro: Um novo ano, um recomeço"
              width={100} // Tamanho ajustado para o layout lateral
              height={150} // Tamanho ajustado para o layout lateral
              className="rounded-lg shadow-md object-contain flex-shrink-0" // Garante que a imagem não encolha
            />
            <div> {/* Wrapper para o título e descrição */}
              <CardTitle className="text-2xl font-tan-garland mb-1">Um novo ano, um recomeço</CardTitle> {/* Tamanho do título ajustado */}
              <CardDescription className="text-sm font-clear-sans"> {/* Tamanho da descrição ajustado */}
                "Um novo ano, um recomeço" é um devocional de 31 dias que nasceu das profundezas de um processo de fé, transições e recomeços. Livi Skov convida você a uma jornada sincera para permanecer em Deus, mesmo quando tudo parece incerto. Descubra verdades sobre dores, esperas, identidade e esperança, e permita que estas páginas transformem sua caminhada com Deus.
              </CardDescription>
            </div>
          </CardHeader>
          {/* CardContent removido, pois a imagem agora está no CardHeader */}
        </Card>

        <Button
          className="bg-custom-green hover:bg-custom-green/90 text-custom-white font-clear-sans text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => router.push('/livi-skovi/pre-sale')}
        >
          Adquira já!
        </Button>
      </main>
      <Toaster />
    </div>
  );
}