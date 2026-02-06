/**
 * @file NewsCards.tsx
 * @description SECCIÓN DE NOTICIAS
 * 
 * Muestra las 3 últimas novedades definidas en 'constants.ts' usando un diseño de cuadrícula.
 * Cada tarjeta incluye imagen, fecha flotante y resumen.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react'; // Añadido ArrowRight

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
    // Nota: El estilo de resaltado se ha actualizado a gradiente en la lógica nueva
  },
  
  botones: {
    principal: "Ver todo el blog",
    leerMas: "LEER MÁS"
  },
  
  // Texto de relleno por si la noticia no trae descripción.
  textoPorDefecto: "Mantente al día con lo que ocurre en los pasillos, aulas y talleres del instituto."
};

// Interface para las propiedades de navegación (INCORPORACIÓN NUEVA)
interface NewsCardsProps {
  onNavigate: (view: 'home' | 'center' | 'offer' | 'news') => void;
}


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const NewsCards: React.FC<NewsCardsProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 px-4" id={DATOS_SECCION.id}>
      <div className="max-w-6xl mx-auto">
        
        {/* --- 1. CABECERA (Título y Botón principal) --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            
            <h2 className="text-4xl md:text-6xl font-black">
                {DATOS_SECCION.titulos.linea1} <br />
                
                {/* Texto resaltado: ACTUALIZADO A GRADIENTE (Diseño nuevo) */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Novedades
                </span>
            </h2>

            {/* Botón con lógica de navegación añadida */}
            <BrutalButton 
                variant="outline" 
                size="md"
                onClick={() => onNavigate('news')}
            >
                {DATOS_SECCION.botones.principal}
            </BrutalButton>
        </div>


        {/* --- 2. REJILLA DE NOTICIAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Se limita a las 3 primeras (slice) por seguridad */}
            {NEWS.slice(0, 3).map((noticia, indice) => (
                <motion.div
                    key={noticia.id}
                    
                    // CONFIGURACIÓN DE ANIMACIÓN
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} // (margin removido en actualización para disparo más natural)
                    transition={{ delay: indice * 0.15, type: "spring" }} // Delay actualizado a 0.15
                >
                    
                    {/* Tarjeta Clickable: Al pulsar lleva a la vista de noticias */}
                    <BrutalCard 
                        className="h-full flex flex-col p-0 cursor-pointer overflow-visible group"
                        onClick={() => onNavigate('news')}
                    >
                        
                        {/* A. IMAGEN SUPERIOR */}
                        <div className="relative h-48 border-b-2 border-slate-900 overflow-hidden rounded-t-[calc(theme(borderRadius.xl)-2px)]">
                            <img 
                                src={noticia.image} 
                                alt={`Foto portada: ${noticia.title}`} 
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                loading="lazy" 
                            />
                            
                            {/* Etiqueta de Categoría ACTUALIZADA: 
                                Rojo, siempre visible y con sombra sólida (diseño nuevo) 
                            */}
                            <div className="absolute top-3 left-3 bg-red-500 text-white border-2 border-slate-900 font-bold px-2 py-1 rounded-lg text-xs shadow-[2px_2px_0px_0px_#0f172a]">
                                {noticia.category.toUpperCase()}
                            </div>
                        </div>


                        {/* B. CONTENIDO (TEXTO) */}
                        <div className="p-6 bg-white flex-1 flex flex-col relative rounded-b-xl">
                            
                            {/* Etiqueta Flotante de FECHA (Esquina superior derecha) */}
                            <div className="absolute -top-5 right-4 z-10 
                                            bg-yellow-400 border-2 border-slate-900 p-2 rounded-xl 
                                            shadow-[3px_3px_0px_0px_#0f172a] text-center min-w-[60px] 
                                            flex flex-col justify-center items-center">
                                
                                <Calendar size={16} className="mb-1 text-slate-900"/>
                                <span className="font-black text-xs leading-none uppercase text-slate-900">
                                    {noticia.date}
                                </span>
                            </div>


                            {/* Título de la noticia */}
                            <h3 className="text-2xl font-black mb-3 mt-2 text-slate-900 leading-tight">
                                {noticia.title}
                            </h3>
                            
                            {/* Descripción breve (Truncado manual añadido si existe content, sino default) */}
                            <p className="text-slate-600 font-medium text-sm mb-6 flex-1">
                                {(noticia as any).content 
                                    ? (noticia as any).content.substring(0, 100) + "..." 
                                    : DATOS_SECCION.textoPorDefecto}
                            </p>
                            
                            {/* BOTÓN 'LEER MÁS' ACTUALIZADO
                                - Usa onClick y stopPropagation para no conflictuar con el click de la carta
                                - Añadido icono ArrowRight
                            */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita doble navegación
                                    onNavigate('news');
                                }}
                                className="inline-flex items-center gap-2 font-black underline decoration-4 decoration-blue-500 underline-offset-4 hover:decoration-blue-600 transition-all text-left w-fit"
                            >
                                {DATOS_SECCION.botones.leerMas} <ArrowRight size={16} />
                            </button>

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