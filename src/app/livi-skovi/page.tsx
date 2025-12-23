"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LiviSkoviPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/outono-background.jpg" // Caminho da nova imagem
        alt="Outono Background" // Alt text atualizado
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />

      {/* Overlay para escurecer a imagem e melhorar a legibilidade */}
      <div className="absolute inset-0 bg-custom-black opacity-60 z-10"></div>

      <main className="relative z-20 flex flex-col items-center justify-start h-full w-full max-w-md mx-auto text-center space-y-4 pt-10">
        {/* Logo */}
        <Image
          src="/livi-skovi-logo.png"
          alt="Livi Skovi Logo"
          width={800} // Largura ajustada (200 * 4)
          height={400} // Altura ajustada (100 * 4)
          // Removida a classe mb-8 para reduzir o espaçamento
        />

        {/* Título e Subtítulo */}
        <div className="text-custom-white">
          {/* Este div agora está vazio, mas pode ser útil para futuros elementos de texto */}
        </div>

        {/* Video Placeholder */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[9/16] bg-gray-800 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          {/* Substitua este div pelo seu elemento <video> real */}
          {/* Exemplo:
          <video
            src="/your-tiktok-style-video.mp4"
            controls
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
          */}
          <p className="text-custom-white font-clear-sans text-sm">
            Espaço para o vídeo (substitua este texto pelo seu vídeo)
          </p>
        </div>

        {/* Botão para o Formulário */}
        <Button
          className="bg-custom-green hover:bg-custom-green/90 text-custom-white font-clear-sans text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => alert("Redirecionar para o formulário!")} // Substitua por sua lógica de redirecionamento
        >
          Acessar Formulário
        </Button>
      </main>
    </div>
  );
}