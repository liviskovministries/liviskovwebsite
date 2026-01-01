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
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-tan-garland mb-2">Um novo ano, um recomeço</CardTitle>
            <CardDescription className="text-base font-clear-sans">
              31 dias de encorajamento, renovo e recomeços na palavra
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-0">
            <Image
              src="/livro.jpg"
              alt="Capa do Livro: Um novo ano, um recomeço"
              width={300} 
              height={450} 
              className="rounded-lg shadow-lg object-contain w-full h-auto max-w-[200px] md:max-w-[300px]"
            />
          </CardContent>
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