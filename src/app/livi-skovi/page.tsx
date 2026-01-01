"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { Instagram } from "lucide-react"; // Importando o ícone do Instagram

export default function LiviSkoviPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const bookSynopsis = "Um novo ano, um recomeço é um devocional de 31 dias que convida a uma jornada de permanência em Deus, mesmo em meio a dores, esperas e incertezas. Livi Skov compartilha verdades sobre identidade, visão, serviço, descanso e esperança, encorajando a entrega do controle e o alinhamento do coração com o propósito divino. Este livro é um convite para viver a fé diariamente, transformando a vida muito além de suas páginas.";

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

      <main className="relative z-20 flex flex-col items-center justify-start h-full w-full max-w-md md:max-w-5xl mx-auto text-center space-y-6 md:space-y-10 pt-10 pb-10">
        <div className="w-full flex justify-center">
          <Image
            src="/livi-skovi-logo.png"
            alt="Livi Skovi Logo"
            width={2400}
            height={1200}
            className="w-full md:w-[1200px] h-auto object-contain"
          />
        </div>

        <h1 className="font-tan-garland text-custom-white text-4xl md:text-5xl leading-tight mt-4">
          Um novo ano, um recomeço
        </h1>
        <p className="font-clear-sans text-custom-white text-lg md:text-xl max-w-2xl mx-auto px-4">
          {bookSynopsis}
        </p>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[2/3] bg-gray-800 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          <Image
            src="/livro.jpg"
            alt="Capa do Livro: Um novo ano, um recomeço"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Button
            className="bg-custom-green hover:bg-custom-green/90 text-custom-white font-clear-sans text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => router.push('/livi-skovi/pre-sale')}
          >
            Comprar Livro - R$ 30,00
          </Button>
          <p className="font-clear-sans text-custom-white text-sm md:text-base max-w-xl mx-auto px-4">
            Acompanhe 31 vídeos devocionais no Instagram, um por dia, ministrando cada capítulo do livro.
          </p>
          <a
            href="https://www.instagram.com/liviskov"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-custom-white hover:text-gray-300 transition-colors duration-200"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-clear-sans text-base">@liviskov</span>
          </a>
        </div>
      </main>
      <Toaster />
    </div>
  );
}