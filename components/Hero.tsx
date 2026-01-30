/**
 * @file Hero.tsx
 * @description SECCIÓN DE BIENVENIDA
 * 
 * Es la portada del sitio web. Contiene el mensaje principal (H1), 
 * los botones para "Ver cursos" o "Ver centro", y la imagen destacada.
 * Utiliza 'framer-motion' para que los elementos entren suavemente al cargar la web.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

import BrutalButton from './ui/BrutalButton';

// Definimos las Props para recibir la función de navegación desde App.tsx
interface HeroProps {
  onNavigate: (view: 'home' | 'center') => void;
}

// =============================================================================
// CONFIGURACIÓN DE CONTENIDOS (PORTADA)
// =============================================================================

const CONTENIDO_PORTADA = {
  // Notificación tipo píldora que aparece arriba a la izquierda.
  insignia: "¡Abierto plazo de inscripción 2026/27!",

  // El Título Principal se divide en 3 partes para poder aplicar estilos diferentes.
  titulo: {
    linea1: "TU FUTURO",
    destacado: "EMPIEZA", // Saldrá en azul vibrante con borde negro
    linea2: "EN UTRERA.",
  },

  // Descripción breve bajo el título.
  subtitulo: "Formación Profesional, tecnología y un ambiente educativo que se adapta a ti. Rompe el molde en el IES Virgen de Consolación.",

  // Configuración de los botones
  botones: {
    primario: { texto: "Ver Oferta Educativa", url: "#oferta-educativa" },
    secundario: { texto: "Conoce el Centro" } // Eliminamos la URL ya que usaremos navegación por estado
  },

  // Imagen dentro de la "tarjeta" derecha.
  imagenPortada: "https://github.com/javiercodev/iesvirgendeconsolacion.es-assets/blob/main/hero-image.jpg?raw=true"
};


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    // 'min-h-screen' asegura que la portada ocupe al menos toda la pantalla al cargar
    <section className="min-h-screen pt-32 pb-12 px-4 flex items-center justify-center overflow-hidden">
      
      {/* Rejilla de 2 Columnas: Izquierda (Texto) / Derecha (Imagen) */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* --- COLUMNA IZQUIERDA: MENSAJE Y BOTONES --- */}
        <div className="relative z-10 flex flex-col items-start gap-6">
          
          {/* 1. NOTIFICACIÓN FLOTANTE */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-green-300 border-2 border-slate-900 px-4 py-1 rounded-full font-bold text-sm shadow-[2px_2px_0px_0px_#0f172a]"
            
            // Animación: Entra desde la izquierda (-50px) y transparente
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }} // Se espera 0.2 seg para empezar
          >
            <Sparkles size={16} />
            <span>{CONTENIDO_PORTADA.insignia}</span>
          </motion.div>

          {/* 2. TÍTULO PRINCIPAL (H1) */}
          <motion.h1 
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter"
            initial={{ y: 50, opacity: 0 }} // Viene desde abajo
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }} // Efecto rebote suave
          >
            {CONTENIDO_PORTADA.titulo.linea1} <br />
            
            {/* Texto con borde negro (Clase 'text-outline-black' definida globalmente) */}
            <span className="text-blue-600 text-outline-black">
                {CONTENIDO_PORTADA.titulo.destacado}
            </span> <br />
            
            {CONTENIDO_PORTADA.titulo.linea2}
          </motion.h1>

          {/* 3. SUBTÍTULO DESCRIPTIVO */}
          <motion.p 
            className="text-xl md:text-2xl font-medium text-slate-700 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {CONTENIDO_PORTADA.subtitulo}
          </motion.p>

          {/* 4. BOTONES DE ACCIÓN (CTAs) */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Botón Primario */}
            <a href={CONTENIDO_PORTADA.botones.primario.url}>
                <BrutalButton variant="accent" size="lg" icon={<ArrowRight size={20} />}>
                    {CONTENIDO_PORTADA.botones.primario.texto}
                </BrutalButton>
            </a>

            {/* Botón Secundario (Ahora ejecuta la acción de navegación) */}
            <div onClick={() => onNavigate('center')} className="cursor-pointer">
                <BrutalButton variant="secondary" size="lg">
                    {CONTENIDO_PORTADA.botones.secundario.texto}
                </BrutalButton>
            </div>
          </motion.div>
        </div>


        {/* --- COLUMNA DERECHA: IMAGEN DESTACADA Y DECORACIÓN --- */}
        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
          
          {/* DECORACIÓN FONDO: Mancha Roja que gira lentamente */}
          <motion.div 
            className="absolute top-10 right-10 w-48 h-48 bg-red-400 rounded-full border-2 border-slate-900 z-0"
            animate={{ 
              scale: [1, 1.1, 1], // Se agranda y encoge
              rotate: [0, 10, -5, 0] // Se tambalea
            }}
            transition={{ repeat: Infinity, duration: 8 }} // Bucle infinito de 8 segundos
          />
          
          {/* DECORACIÓN FONDO: Mancha Verde que flota */}
          <motion.div 
            className="absolute bottom-10 left-10 w-32 h-32 bg-green-400 rounded-full border-2 border-slate-900 z-0"
            animate={{ y: [0, -20, 0] }} // Sube y baja 20 píxeles
            transition={{ repeat: Infinity, duration: 5 }}
          />

          {/* TARJETA TIPO "POLAROID/RED SOCIAL" (CONTENEDOR IMAGEN) */}
          <motion.div
            className="relative z-10 w-full max-w-sm aspect-[3/4] bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_#0f172a]"
            initial={{ rotate: 5, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 3, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 250 }}
            whileHover={{ rotate: 0 }} // Si pasas el ratón, se endereza
          >
             <div className="absolute inset-0 bg-blue-50 flex flex-col">
                
                {/* Mitad superior: Foto Real */}
                <div className="h-2/3 bg-slate-200 border-b-2 border-slate-900 relative overflow-hidden">
                    <img 
                        src={CONTENIDO_PORTADA.imagenPortada}
                        alt="Fotografía representativa del centro educativo" 
                        className="w-full h-full object-cover"
                        // 'eager' fuerza al navegador a cargar esto lo antes posible (LCP: Largest Contentful Paint)
                        loading="eager" 
                    />
                </div>

                {/* Mitad inferior: Diseño de "Interfaz de Red Social" falsa */}
                <div className="p-6 flex flex-col justify-between flex-1">
                    
                    {/* Barras grises que simulan texto */}
                    <div className="space-y-2">
                        <div className="w-3/4 h-6 bg-slate-900 rounded-md"></div>
                        <div className="w-1/2 h-4 bg-slate-400 rounded-md"></div>
                    </div>
                    
                    {/* Iconos falsos y foto de perfil simulada */}
                    <div className="flex justify-between items-end">
                        {/* Tres círculos simulando "Likes" de personas */}
                        <div className="flex -space-x-3">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-900" />
                             ))}
                        </div>
                        
                        {/* Botón de acción simulado */}
                        <div className="w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center bg-white">
                            <Sparkles className="text-slate-900" />
                        </div>
                    </div>
                </div>

             </div>
          </motion.div>

        </div> {/* Fin Columna Derecha */}

      </div>
    </section>
  );
};

export default Hero;