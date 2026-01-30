/**
 * @file NewsCards.tsx
 * @description SECCIÓN DE NOTICIAS
 * 
 * Muestra las 3 últimas novedades definidas en 'constants.ts' usando un diseño de cuadrícula.
 * Cada tarjeta incluye imagen, fecha flotante y resumen.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

import { NEWS } from '../constants';
import BrutalCard from './ui/BrutalCard';
import BrutalButton from './ui/BrutalButton';

// =============================================================================
// CONFIGURACIÓN DE TEXTOS DE LA SECCIÓN
// =============================================================================

const DATOS_SECCION = {
  // El 'id' debe ser igual al del menú en constants.ts para que el scroll funcione.
  id: "noticias",
  
  titulos: {
    linea1: "Últimas",
    resaltado: "Novedades" // Esta parte saldrá en azul/color distinto
  },
  
  botones: {
    principal: "Ver todo el blog",
    leerMas: "LEER MÁS"
  },
  
  // Texto de relleno por si la noticia no trae descripción.
  textoPorDefecto: "Mantente al día con lo que ocurre en los pasillos, aulas y talleres del instituto."
};


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const NewsCards: React.FC = () => {
  return (
    <section className="py-20 px-4" id={DATOS_SECCION.id}>
      <div className="max-w-6xl mx-auto">
        
        {/* --- 1. CABECERA (Título y Botón principal) --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            
            <h2 className="text-4xl md:text-6xl font-black">
                {DATOS_SECCION.titulos.linea1} <br />
                
                {/* Texto resaltado en color Azul vibrante */}
                <span className="text-blue-600">
                    {DATOS_SECCION.titulos.resaltado}
                </span>
            </h2>

            <BrutalButton variant="outline" size="md">
                {DATOS_SECCION.botones.principal}
            </BrutalButton>
        </div>


        {/* --- 2. REJILLA DE NOTICIAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {NEWS.map((noticia, indice) => (
                <motion.div
                    key={noticia.id}
                    
                    // CONFIGURACIÓN DE ANIMACIÓN
                    // Empieza: Invisible (opacity: 0) y desplazada hacia abajo 50px (y: 50).
                    initial={{ opacity: 0, y: 50 }}
                    
                    // Termina: Visible y en su posición original.
                    whileInView={{ opacity: 1, y: 0 }}
                    
                    // Solo se anima la primera vez que se ve ('once: true').
                    // Empieza un poco antes de llegar (-50px de margen).
                    viewport={{ once: true, margin: "-50px" }}
                    
                    // El 'delay' crea el efecto escalera: la 1ª tarda 0s, la 2ª tarda 0.1s, la 3ª 0.2s...
                    transition={{ delay: indice * 0.1, type: "spring" }}
                >
                    
                    <BrutalCard className="h-full flex flex-col p-0 overflow-visible group">
                        
                        {/* A. IMAGEN SUPERIOR */}
                        {/* overflow-hidden asegura que la imagen no se salga de las esquinas redondeadas al hacer zoom */}
                        <div className="relative h-48 border-b-2 border-slate-900 overflow-hidden rounded-t-[calc(theme(borderRadius.xl)-2px)]">
                            <img 
                                src={noticia.image} 
                                alt={`Foto portada: ${noticia.title}`} 
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                loading="lazy" // Optimización: carga solo cuando es necesario
                            />
                            
                            {/* Etiqueta de Categoría (ej: Eventos) */}
                            {/* Oculta por defecto, aparece al pasar el ratón (group-hover) */}
                            <div className="absolute top-0 left-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 m-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {noticia.category}
                            </div>
                        </div>


                        {/* B. CONTENIDO (TEXTO) */}
                        <div className="p-6 bg-white flex-1 flex flex-col relative rounded-b-xl">
                            
                            {/* Etiqueta Flotante de FECHA (Esquina superior derecha) */}
                            <div className="absolute -top-5 right-4 z-10 
                                            bg-yellow-400 border-2 border-slate-900 p-2 rounded-xl 
                                            shadow-[3px_3px_0px_0px_#0f172a] text-center min-w-[60px] 
                                            transition-transform group-hover:-translate-y-1">
                                
                                <Calendar size={16} className="mb-1 text-slate-900 mx-auto"/>
                                <span className="font-black text-xs leading-none uppercase text-slate-900">
                                    {noticia.date}
                                </span>
                            </div>


                            {/* Título de la noticia */}
                            <h3 className="text-2xl font-black mb-3 mt-2 text-slate-900 leading-tight">
                                {noticia.title}
                            </h3>
                            
                            {/* Descripción breve */}
                            {/* 'line-clamp-3' corta el texto automáticamente con puntos suspensivos si ocupa más de 3 líneas */}
                            <p className="text-slate-600 font-medium text-sm mb-6 flex-1 line-clamp-3">
                                {DATOS_SECCION.textoPorDefecto}
                            </p>
                            
                            {/* Enlace Leer Más */}
                            <a 
                                href="#" 
                                className="font-black text-blue-600 underline decoration-2 decoration-blue-200 underline-offset-4 hover:decoration-blue-600 hover:text-slate-900 transition-all self-start"
                            >
                                {DATOS_SECCION.botones.leerMas}
                            </a>

                        </div>

                    </BrutalCard>
                </motion.div>
            ))}

        </div>

      </div>
    </section>
  );
};

export default NewsCards;