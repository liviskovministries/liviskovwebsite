"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function LiviSkoviPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Inicializa videoUrl com a URL fornecida pelo usuário
  const [videoUrl, setVideoUrl] = useState<string | null>("https://fgnxnvfycbzyjgnprskc.supabase.co/storage/v1/object/sign/videos/livi.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81ZDhjZWVkMC02MmQyLTQzMWYtYmY5Yy1lMjE3NTMxMDk0NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvbGl2aS5tcDQiLCJpYXQiOjE3NjY1MTkwNjcsImV4cCI6MTc5ODA1NTA2N30.V8G5Zt19mJwWrgKBcQONW3NufnCXpx5gvre1NHYbuBs");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 1.0; // Define o volume no máximo
      videoRef.current.play().catch((error) => {
        console.log("Autoplay com som foi bloqueado pelo navegador. O usuário precisa interagir com a página primeiro.", error);
      });
    }
  }, [videoUrl]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/outono-background.jpg"
        alt="Outono Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />

      {/* Overlay para escurecer a imagem e melhorar a legibilidade */}
      <div className="absolute inset-0 bg-custom-black opacity-60 z-10"></div>

      <main className="relative z-20 flex flex-col items-center justify-start h-full w-full max-w-md md:max-w-5xl mx-auto text-center space-y-4 pt-10">
        {/* Logo - Aumentada em 3x para desktop (md) */}
        <div className="w-full flex justify-center">
          <Image
            src="/livi-skovi-logo.png"
            alt="Livi Skovi Logo"
            width={2400}
            height={1200}
            className="w-full md:w-[1200px] h-auto object-contain"
          />
        </div>

        {/* Video Element */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[9/16] bg-gray-800 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            >
              Seu navegador não suporta o elemento de vídeo.
            </video>
          ) : (
            <div className="text-custom-white text-sm">
              Faça o upload de um vídeo para visualizá-lo.
            </div>
          )}
        </div>

        {/* Botão para o Formulário */}
        <Button
          className="bg-custom-green hover:bg-custom-green/90 text-custom-white font-clear-sans text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => alert("Redirecionar para o formulário!")} // Substitua por sua lógica de redirecionamento
        >
          Acessar Formulário
        </Button>
      </main>
      <Toaster /> {/* Adicione o Toaster aqui para exibir as notificações */}
    </div>
  );
}