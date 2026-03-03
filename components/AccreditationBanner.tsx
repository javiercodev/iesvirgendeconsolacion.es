/**
 * @file AccreditationBanner.tsx
 * @description BANNER DE ACREDITACIÓN DE COMPETENCIAS.
 * 
 * Se muestra el cartel/díptico completo aprovechando todo el espacio de su columna.
 * Ajuste: Sin recortes ('object-contain') y sin relleno ('padding-0'), 
 * ocupando el 100% del cuadro disponible.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Sparkles } from 'lucide-react';

// =============================================================================
// DATOS Y CONFIGURACIÓN
// =============================================================================

const DATOS_BANNER = {
  etiqueta: "ACREDITACIÓN DE COMPETENCIAS",
  
  titulo: {
    inicio: "Reconoce tu",
    palabraDestacada: "experiencia",
    final: "laboral"
  },
  
  descripcion: "Si tienes experiencia laboral pero no tienes título oficial, ahora puedes conseguirlo. Infórmate sobre el proceso de acreditación.",
  
  boton: {
    texto: "MÁS INFORMACIÓN",
    url: "https://www.juntadeandalucia.es/educacion/portales/web/iacp/andalucia-acredita"
  },

  imagen: "http://iesvirgendeconsolacion.es/images/provisional/dipticoacredita01.jpg"
};

const ANIMACIONES = {
  tarjeta: {
    oculto: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.1 }
    }
  },
  contenido: {
    oculto: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }
};


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const AccreditationBanner: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-yellow-50 relative overflow-hidden">
      
      {/* Fondo decorativo (formas abstractas flotantes) */}
      <motion.div 
        className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full border-2 border-slate-900 -z-10"
        animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-32 h-32 bg-orange-200 rounded-lg border-2 border-slate-900 -z-10"
        animate={{ y: [0, 20, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto">
        
        {/* Contenedor Flex: Izquierda (Texto) | Derecha (Imagen) */}
        <motion.div 
          className="bg-white border-4 border-slate-900 rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_#0f172a] flex flex-col md:flex-row h-full relative"
          variants={ANIMACIONES.tarjeta}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* --- COLUMNA 1: TEXTO (Se expande según contenido) --- */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white z-10">
            
            <motion.div variants={ANIMACIONES.contenido}>
              <div className="inline-flex items-center gap-2 bg-blue-400 border-2 border-slate-900 px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_#0f172a] mb-6 w-fit">
                <Award size={18} />
                <span>{DATOS_BANNER.etiqueta}</span>
              </div>
            </motion.div>
            
            <motion.h2 
              variants={ANIMACIONES.contenido}
              className="text-4xl md:text-5xl font-black mb-6 leading-tight uppercase"
            >
              {DATOS_BANNER.titulo.inicio}{" "}
              <span className="text-green-600 relative inline-block">
                {DATOS_BANNER.titulo.palabraDestacada}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300 -z-10"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </span>
              {" "}{DATOS_BANNER.titulo.final}
            </motion.h2>
            
            <motion.p 
              variants={ANIMACIONES.contenido}
              className="text-xl font-bold text-slate-700 mb-8"
            >
              {DATOS_BANNER.descripcion}
            </motion.p>
            
            <motion.div variants={ANIMACIONES.contenido} className="flex gap-4">
              <motion.a 
                href={DATOS_BANNER.boton.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-900 text-white border-2 border-slate-900 px-8 py-4 rounded-xl font-black text-xl flex items-center gap-2 hover:bg-green-400 transition-colors shadow-[6px_6px_0px_0px_#2563eb]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, translateX: 2, translateY: 2, boxShadow: "0px 0px 0px 0px #000" }}
              >
                {DATOS_BANNER.boton.texto}
                <ExternalLink size={20} />
              </motion.a>
            </motion.div>
          </div>


          {/* --- COLUMNA 2: IMAGEN --- 
              Usamos bg-slate-100 para rellenar huecos si la imagen es estrecha,
              pero 'w-full h-full' para que ocupe todo el espacio posible.
          */}
          <div className="md:w-1/2 bg-slate-100 border-t-4 md:border-t-0 md:border-l-4 border-slate-900 relative flex items-center justify-center overflow-hidden">
            
            {/* 
              IMAGEN AJUSTADA (Sin recortes ni relleno)
              - w-full h-full: Ocupa todo el contenedor flex.
              - object-contain: Se ve completa sin cortarse.
              - sin padding: Toca los bordes de la caja.
            */}
            <motion.img 
              src={DATOS_BANNER.imagen}
              alt="Folleto Acreditación" 
              className="w-full h-full object-contain absolute inset-0 bg-slate-200"
              loading="lazy"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            
            {/* Badge 'Destello' sobre la imagen */}
            <motion.div 
              className="absolute top-4 right-4 bg-green-400 border-2 border-slate-900 p-2 rounded-full shadow-[4px_4px_0px_0px_#0f172a] z-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-slate-900" size={24} />
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AccreditationBanner;