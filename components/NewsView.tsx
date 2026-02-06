/**
 * @file NewsView.tsx
 * @description VISTA: NOTICIAS Y EVENTOS.
 * 
 * Muestra el tablón de anuncios del centro.
 * Funcionalidades clave:
 * 1. Filtrado por categorías (Todos, Eventos, Institucional...)
 * 2. Vista previa en tarjeta (BrutalCard).
 * 3. Vista completa en ventana modal (Popup) sin cambiar de página.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, ArrowUpRight, X, ArrowLeft, Share2, Check } from 'lucide-react';

import { NEWS } from '../constants';
import { NewsItem } from '../types';
import BrutalCard from './ui/BrutalCard';
import BrutalButton from './ui/BrutalButton';


// =============================================================================
// CONFIGURACIÓN: TEXTOS Y OPCIONES VISUALES
// =============================================================================

const TEXTOS_VISTA = {
    etiquetaSuperior: "ACTUALIDAD DEL CENTRO",
    titulo: "NOTICIAS Y",
    tituloResaltado: "EVENTOS",
    descripcion: "Descubre las últimas actividades, logros académicos y novedades que hacen vibrar al IES Virgen de Consolación.",
    
    botonFiltrar: "Filtrar por:",
    mensajeVacio: "No hay noticias en esta categoría aún.",
    
    // Texto de relleno por si la noticia no tiene cuerpo largo definido en la BBDD
    contenidoPorDefecto: "En el IES Virgen de Consolación, cada día es una oportunidad para crecer. Esta noticia refleja nuestro compromiso con la excelencia educativa. Colaboramos alumnos, profesores y familias para impulsar el cambio positivo en Utrera."
};

const ANIMACIONES = {
    entrada: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    salida: { opacity: 0, scale: 0.9, y: 20 }
};


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const NewsView: React.FC = () => {
  
  // 1. ESTADO: Controla qué filtro está activo (por defecto 'all' es "Todo")
  const [filtroActivo, setFiltroActivo] = useState<string>('all');
  
  // 2. ESTADO: Guarda la noticia que el usuario ha abierto (null = ninguna abierta)
  const [noticiaAbierta, setNoticiaAbierta] = useState<NewsItem | null>(null);
  
  // 3. ESTADO: Controla si aparece el aviso de "Enlace Copiado"
  const [mostrarAviso, setMostrarAviso] = useState(false);


  /* 
   * LÓGICA DE FILTRADO
   * useMemo evita recalcular esto cada vez que tocamos algo que no sea las noticias o el filtro.
   */
  
  // Crea la lista de categorías únicas disponibles (evita duplicados con Set)
  const categoriasDisponibles = useMemo(() => {
    return ['all', ...Array.from(new Set(NEWS.map(item => item.category)))];
  }, []);

  // Filtra las noticias según lo que haya elegido el usuario
  const noticiasVisibles = filtroActivo === 'all' 
    ? NEWS 
    : NEWS.filter(item => item.category === filtroActivo);


  /* 
   * FUNCIÓN: COMPARTIR
   * Copia la URL actual al portapapeles y muestra un mensajito temporal.
   */
  const gestionarCompartir = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setMostrarAviso(true);
      // Ocultar aviso automáticamente a los 3 segundos
      setTimeout(() => setMostrarAviso(false), 3000);
    });
  };


  return (
    <section className="min-h-screen pt-28 pb-20 px-4 bg-yellow-50">
      <div className="max-w-6xl mx-auto">
        
        {/* --- CABECERA DE LA PÁGINA --- */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-blue-600 text-white px-4 py-1 rounded-lg font-black text-sm mb-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000]"
          >
            {TEXTOS_VISTA.etiquetaSuperior}
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {TEXTOS_VISTA.titulo} <span className="text-orange-500">{TEXTOS_VISTA.tituloResaltado}</span>
          </motion.h1>
          
          <p className="text-xl md:text-2xl font-bold text-slate-700 max-w-2xl leading-tight">
            {TEXTOS_VISTA.descripcion}
          </p>
        </div>


        {/* --- BARRA DE FILTROS --- */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="bg-white border-2 border-slate-900 p-2 rounded-xl flex items-center gap-2 shadow-[3px_3px_0px_0px_#000]">
            <Filter size={18} className="text-slate-400 ml-1" />
            <span className="font-black text-xs uppercase mr-2">{TEXTOS_VISTA.botonFiltrar}</span>
            
            <div className="flex flex-wrap gap-2">
              {categoriasDisponibles.map(categoria => (
                <button
                  key={categoria}
                  onClick={() => setFiltroActivo(categoria)}
                  className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all border-2 ${
                    filtroActivo === categoria 
                      ? 'bg-slate-900 text-white border-slate-900' // Estilo Activo
                      : 'bg-white text-slate-600 border-transparent hover:border-slate-200' // Estilo Inactivo
                  }`}
                >
                  {/* Si es 'all', mostramos "Todo" para que sea más amigable */}
                  {categoria === 'all' ? 'Todo' : categoria}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* --- REJILLA DE NOTICIAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* AnimatePresence permite animar los elementos cuando se eliminan al filtrar */}
          <AnimatePresence mode='popLayout'>
            
            {noticiasVisibles.map((noticia, indice) => (
              <motion.div
                key={noticia.id}
                layout // 'layout' anima mágicamente el reordenamiento de la rejilla
                initial={ANIMACIONES.entrada}
                animate={ANIMACIONES.visible}
                exit={ANIMACIONES.salida}
                transition={{ delay: indice * 0.05, type: "spring", stiffness: 100 }}
              >
                
                {/* TARJETA INDIVIDUAL */}
                <BrutalCard className="h-full flex flex-col p-0 group cursor-pointer" onClick={() => setNoticiaAbierta(noticia)}>
                  
                  {/* Foto de portada */}
                  <div className="relative h-64 border-b-2 border-slate-900 overflow-hidden">
                    <img 
                      src={noticia.image} 
                      alt={noticia.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white text-slate-900 border-2 border-slate-900 font-black px-3 py-1 rounded-lg text-xs shadow-[3px_3px_0px_0px_#000] uppercase tracking-wider">
                      {noticia.category}
                    </div>
                  </div>
                  
                  {/* Contenido Texto */}
                  <div className="p-8 bg-white flex-1 flex flex-col relative">
                    
                    {/* Fecha Flotante */}
                    <div className="absolute -top-6 right-6 bg-yellow-400 border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center justify-center min-w-[70px]">
                      <Calendar size={18} className="mb-1" />
                      <span className="font-black text-sm">{noticia.date}</span>
                    </div>

                    <h3 className="text-3xl font-black mb-4 mt-4 leading-none group-hover:text-blue-600 transition-colors">
                      {noticia.title}
                    </h3>
                    
                    {/* Resumen o Contenido por defecto */}
                    {/* 'line-clamp-3' corta el texto si es muy largo */}
                    <p className="text-slate-600 font-bold text-base mb-8 flex-1 leading-snug line-clamp-3">
                      {TEXTOS_VISTA.contenidoPorDefecto}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-slate-100">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que se dispare el click de la tarjeta entera
                          setNoticiaAbierta(noticia);
                        }}
                        className="flex items-center gap-2 font-black text-sm uppercase tracking-tighter hover:gap-3 transition-all underline decoration-4 decoration-yellow-400 underline-offset-4"
                      >
                        Leer artículo completo <ArrowUpRight size={18} strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                </BrutalCard>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mensaje si no hay resultados */}
        {noticiasVisibles.length === 0 && (
          <div className="text-center py-20 bg-white border-4 border-dashed border-slate-200 rounded-3xl">
            <h3 className="text-2xl font-black text-slate-400">{TEXTOS_VISTA.mensajeVacio}</h3>
          </div>
        )}

      </div>


      {/* --- MODALES Y POPUPS (Capa Superior) --- */}
      
      <AnimatePresence>
        {noticiaAbierta && (
            <ModalNoticiaCompleta 
                noticia={noticiaAbierta} 
                onClose={() => setNoticiaAbierta(null)}
                onShare={gestionarCompartir}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mostrarAviso && <NotificacionToast />}
      </AnimatePresence>


      {/* Estilos CSS Auxiliares */}
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>

    </section>
  );
};


// =============================================================================
// SUB-COMPONENTE: MODAL DE LECTURA (Noticia Completa)
// =============================================================================

interface ModalNoticiaProps {
    noticia: NewsItem;
    onClose: () => void;
    onShare: () => void;
}

const ModalNoticiaCompleta: React.FC<ModalNoticiaProps> = ({ noticia, onClose, onShare }) => {
    
    // Bloquear el scroll de la página de fondo cuando el modal se abre
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className="bg-white border-4 border-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0px_0px_rgba(255,165,0,1)] relative flex flex-col rounded-3xl"
                initial={{ scale: 0.8, y: 100, rotate: 2 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.8, y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                onClick={(e) => e.stopPropagation()} // Clic dentro NO cierra modal
            >
                {/* 1. CABECERA VISUAL (IMAGEN) */}
                <div className="relative h-[300px] md:h-[450px] overflow-hidden flex-shrink-0">
                    <img 
                        src={noticia.image} 
                        alt={noticia.title} 
                        className="w-full h-full object-cover"
                    />
                    {/* Degradado negro inferior para leer mejor la fecha */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-4 bg-red-500 text-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:scale-110 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none z-20"
                    >
                        <X size={24} strokeWidth={3} />
                    </button>

                    <div className="absolute bottom-8 left-8 bg-yellow-400 border-4 border-slate-900 p-4 rounded-3xl shadow-[6px_6px_0px_0px_#000] z-10 flex flex-col items-center">
                        <Calendar size={24} className="mb-1" />
                        <span className="font-black text-xl leading-none">{noticia.date}</span>
                    </div>
                </div>

                {/* 2. CUERPO DE LA NOTICIA */}
                <div className="p-8 md:p-14 bg-white relative">
                    <div className="mb-10">
                        {/* Categoría y Título */}
                        <div className="flex gap-4 items-center mb-6">
                            <span className="bg-blue-600 text-white px-4 py-1 font-black border-2 border-slate-900 text-sm uppercase tracking-wider rounded-lg shadow-[3px_3px_0px_0px_#000]">
                                {noticia.category}
                            </span>
                            <div className="h-1 flex-1 bg-slate-100 rounded-full"></div>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900 mb-8">
                            {noticia.title}
                        </h2>

                        {/* Texto del artículo (Simulado) */}
                        <div className="prose prose-xl max-w-none font-bold text-slate-700 leading-relaxed mb-12">
                            <p className="first-letter:text-7xl first-letter:font-black first-letter:text-orange-500 first-letter:mr-3 first-letter:float-left">
                                {TEXTOS_VISTA.contenidoPorDefecto.substring(0, 100)}...
                            </p>
                            <p className="mt-6">
                                Continuamos trabajando para ofrecer las mejores instalaciones y el currículo más actualizado, asegurando que nuestros estudiantes no solo estén preparados para el mercado laboral actual, sino que también sean ciudadanos críticos.
                            </p>
                            <p className="mt-6">
                                Para más información sobre este evento o para participar en futuras actividades, no dudes en contactar con la secretaría del centro.
                            </p>
                        </div>

                        {/* Pie: Botones de Acción */}
                        <div className="flex flex-wrap gap-6 pt-10 border-t-4 border-slate-100">
                            <BrutalButton 
                                variant="primary" 
                                size="md" 
                                icon={<Share2 size={20} />}
                                onClick={onShare}
                            >
                                Compartir Noticia
                            </BrutalButton>
                            
                            <button 
                                onClick={onClose}
                                className="flex items-center gap-2 font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-sm"
                            >
                                <ArrowLeft size={20} /> Volver al listado
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


// =============================================================================
// SUB-COMPONENTE: NOTIFICACIÓN FLOTANTE (Toast)
// =============================================================================

const NotificacionToast: React.FC = () => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.5 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]"
        >
            <div className="bg-green-400 border-4 border-slate-900 px-8 py-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
                <div className="bg-white border-2 border-slate-900 p-1 rounded-full">
                    <Check size={20} strokeWidth={4} className="text-green-600" />
                </div>
                <span className="font-black text-xl uppercase tracking-tight text-slate-900">
                    ¡Enlace copiado!
                </span>
            </div>
        </motion.div>
    );
};

export default NewsView;