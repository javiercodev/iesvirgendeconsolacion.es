/**
 * @file App.tsx
 * @description COMPONENTE PRINCIPAL
 * 
 * Este archivo conecta todas las piezas de la web: el menú, la portada, 
 * las noticias y el pie de página. 
 * También gestiona la "memoria" simple de la web (saber si estás en "Inicio", viendo el "Centro" u "Oferta").
 */

import React, { useState, useEffect } from 'react';

// --- IMPORTS: BLOQUES DE CONSTRUCCIÓN ---
// (Componentes que hemos creado en otros archivos)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import NewsCards from './components/Newscard';
import Footer from './components/Footer';
import SchoolCenter from './components/SchoolCenter'; // La vista detallada del centro
import BrutalButton from "./components/ui/BrutalButton";

// Importación nueva añadida
import EducationalOffer from './components/EducationalOffer'; 

// =============================================================================
// 1. CONFIGURACIÓN DE CONTENIDO (FÁCIL DE EDITAR)
// =============================================================================

// Texto que viaja en la barra animada infinita
const TEXTO_CINTA = "★ MATRICULACIÓN ABIERTA ★ FP DUAL ★ ERASMUS+ ★";

// Datos de la tarjeta grande naranja (Llamada a la acción / CTA)
const DATOS_MATRICULA = {
  titulo: "¿LISTO PARA EMPEZAR?",
  descripcion: "No te quedes sin tu plaza. El futuro te espera en nuestros talleres y aulas.",
  boton: "SOLICITAR ADMISIÓN"
};

/* 
 * TRUCO TÉCNICO:
 * Para crear el efecto de "cinta infinita", necesitamos repetir el texto muchas veces.
 * Aquí creamos una lista ficticia de 12 repeticiones.
 */
const REPETICIONES_CINTA = Array.from({ length: 12 });


// =============================================================================
// 2. LÓGICA DEL COMPONENTE APP
// =============================================================================

const App: React.FC = () => {
  
  /* 
   * ESTADO DE NAVEGACIÓN
   * 'currentView' guarda qué pantalla estamos viendo. 
   * Se añade 'offer' a las opciones posibles para una navegación separada.
   */
  const [currentView, setCurrentView] = useState<'home' | 'center' | 'offer'>('home');


  return (
    <div className="min-h-screen bg-yellow-50 text-slate-900 overflow-x-hidden selection:bg-orange-500 selection:text-white">
      
      {/* 
        BARRA SUPERIOR (MENÚ)
        Le damos la instrucción 'onNavigate' para que, al pulsar botones,
        pueda cambiar nuestro estado 'currentView'.
      */}
      <Navbar 
        currentView={currentView} 
        onNavigate={(nuevaVista) => setCurrentView(nuevaVista)} 
      />
      
      <main>
        {/* CONDICIONALES: ¿Qué mostramos según la variable 'currentView'? */}
        
        {currentView === 'home' && (
          
          /* === OPCIÓN A: PORTADA PRINCIPAL === */
          <>
            {/* Cabecera grande con imagen de fondo */}
            <Hero onNavigate={(nuevaVista) => setCurrentView(nuevaVista)} />
            
            {/* Mosaico de asignaturas/niveles */}
            <BentoGrid />

            {/* CINTA ANIMADA (MARQUEE) */}
            <div className="w-full bg-slate-900 text-white py-4 overflow-hidden whitespace-nowrap border-y-2 border-slate-900">
              <div className="animate-marquee inline-block" aria-hidden="true">
                {REPETICIONES_CINTA.map((_, i) => (
                  <span key={i} className="mx-8 font-black text-2xl uppercase tracking-wider">
                    {TEXTO_CINTA}
                  </span>
                ))}
              </div>
            </div>

            {/* Últimas novedades */}
            <NewsCards />

            {/* SECCIÓN MATRÍCULA (TARJETA NARANJA) */}
            <section className="py-20 px-4" id="matricula">
              <div className="max-w-4xl mx-auto bg-orange-400 border-2 border-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_#0f172a] relative overflow-hidden">
                
                {/* Capa de contenido (Texto y Botón) */}
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 text-outline-black">
                    {DATOS_MATRICULA.titulo}
                  </h2>
                  <p className="text-xl font-bold mb-8 max-w-lg mx-auto">
                    {DATOS_MATRICULA.descripcion}
                  </p>
                  <BrutalButton variant="secondary" size="lg">
                    {DATOS_MATRICULA.boton}
                  </BrutalButton>
                </div>

                {/* Decoración de fondo (Manchas de color animadas "Blobs") */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              </div>
            </section>
          </>
        )}

        {/* === OPCIÓN B: INFORMACIÓN DETALLADA DEL CENTRO === */}
        {currentView === 'center' && <SchoolCenter />}

        {/* === OPCIÓN C: OFERTA EDUCATIVA === */}
        {currentView === 'offer' && <EducationalOffer />}

      </main>

      {/* PIE DE PÁGINA (SIEMPRE VISIBLE) */}
      <Footer />

      {/* 
        INYECCIÓN DE ESTILOS CSS
        Cargamos aquí las animaciones especiales y efectos de borde. 
      */}
      <style>{GLOBAL_STYLES}</style>
      
    </div>
  );
};

export default App;


// =============================================================================
// 3. ESTILOS CSS Y ANIMACIONES
// =============================================================================

const GLOBAL_STYLES = `
  /* 
   * ESTILO 'BRUTALISTA': Borde negro alrededor de las letras blancas.
   * Crea contraste fuerte y estética moderna.
   */
  .text-outline-black {
      text-shadow: 
          2px 2px 0 #000, -1px -1px 0 #000, 
          1px -1px 0 #000, -1px 1px 0 #000, 
          1px 1px 0 #000;
  }
  
  /* 
   * ANIMACIÓN: MARQUEE (Cinta corredera)
   * Desplaza el texto lateralmente para que parezca un teletipo de noticias.
   */
  @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
  }
  .animate-marquee {
      animation: marquee 40s linear infinite; /* Aumentar '40s' para hacerlo más lento */
  }

  /* 
   * ANIMACIÓN: BLOBS (Manchas flotantes)
   * Hace que los círculos de colores del fondo se deformen y muevan suavemente.
   */
  @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
      animation: blob 7s infinite;
  }
  .animation-delay-2000 {
      animation-delay: 2s; /* Retrasa la animación del segundo círculo para que no vayan sincronizados */
  }

  /* 
   * ESTÉTICA: BARRA DE SCROLL 
   * Personaliza la barra gris fea del navegador para que sea minimalista.
   */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9; /* Color de la pista */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #0f172a; /* Color del tirador */
    border-radius: 4px;
  }
`;