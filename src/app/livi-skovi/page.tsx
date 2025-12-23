"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";

export default function LiviSkoviPage() {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [videoUrl] = useState<string | null>("https://fgnxnvfycbzyjgnprskc.supabase.co/storage/v1/object/sign/videos/livi.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81ZDhjZWVkMC02MmQyLTQzMWYtYmY5Yy1lMjE3NTMxMDk0NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvbGl2aS5tcDQiLCJpYXQiOjE3NjY1MTkwNjcsImV4cCI6MTc5ODA1NTA2N30.V8G5Zt19mJwWrgKBcQONW3NufnCXpx5gvre1NHYbuBs");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const attemptPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay blocked. Waiting for interaction.", error);
        });
      }
    }
  };

  useEffect(() => {
    if (isMounted) {
      attemptPlay();
      
      const handleFirstInteraction = () => {
        attemptPlay();
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      };

      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);

      return () => {
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      };
    }
  }, [isMounted, videoUrl]);

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
            />
          ) : (
            <div className="text-custom-white text-sm">Carregando vídeo...</div>
          )}
        </div>

        <Button
          className="bg-custom-green hover:bg-custom-green/90 text-custom-white font-clear-sans text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => router.push('/livi-skovi/pre-sale')}
        >
          Acessar Pré-Venda
        </Button>
      </main>
      <Toaster />
    </div>
  );
}