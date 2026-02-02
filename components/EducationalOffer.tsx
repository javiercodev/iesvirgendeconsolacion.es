/**
 * @file EducationalOffer.tsx
 * @description PÁGINA: CATÁLOGO DE OFERTA EDUCATIVA.
 * 
 * Presenta todos los ciclos y cursos agrupados por familia profesional.
 * Al hacer clic en una tarjeta, se abre una "Ficha Técnica" (Modal) con los detalles.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Clock, Target, ArrowRight, Info, ExternalLink } from 'lucide-react';

import BrutalCard from './ui/BrutalCard';
import { DEPARTMENTS, EDUCATIONAL_OFFER_DETAILED, StudyItem } from '../constants';


// =============================================================================
// CONFIGURACIÓN DE ANIMACIONES
// Separamos la lógica de movimiento para no ensuciar el HTML.
// =============================================================================

const ANIMACION_REJILLA = {
  oculto: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } // Efecto dominó: cada hijo aparece 0.15s después del anterior
  }
};

const ANIMACION_ITEM = {
  oculto: { y: 40, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 } // Rebote suave
  }
};

const TEXTOS = {
  etiquetaTop: "CATÁLOGO OFICIAL 2026/2027",
  tituloPrincipal: "OFERTA",
  tituloResaltado: "EDUCATIVA",
  subtitulo: "Selecciona un plan de estudios específico para consultar su ficha técnica oficial, módulos profesionales y salidas laborales."
};


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const EducationalOffer: React.FC = () => {
  
  // Estado: Guarda el curso que el usuario ha clicado. Si es null, no se muestra nada.
  const [estudioSeleccionado, setEstudioSeleccionado] = useState<StudyItem | null>(null);

  // UTILIDAD: Bloquear el scroll de la página web de fondo cuando el modal está abierto.
  useEffect(() => {
    if (estudioSeleccionado) {
        document.body.style.overflow = 'hidden'; // Bloquea scroll
    } else {
        document.body.style.overflow = 'unset';  // Libera scroll
    }
  }, [estudioSeleccionado]);

  return (
    <section className="min-h-screen pt-28 pb-12 px-4 bg-yellow-50 relative overflow-hidden">
      
      {/* 1. DECORACIÓN DE FONDO (Formas borrosas abstractas) */}
      <div className="absolute top-20 right-[-5%] w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-[-5%] w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 2. CABECERA DE SECCIÓN */}
        <div className="mb-16">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block bg-slate-900 text-white px-4 py-1 rounded-lg font-black text-sm mb-4 shadow-[4px_4px_0px_0px_#3b82f6]"
            >
                {TEXTOS.etiquetaTop}
            </motion.div>
            
            <motion.h1 
                className="text-5xl md:text-8xl font-black mb-6 uppercase tracking-tighter text-slate-900"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
                {TEXTOS.tituloPrincipal} <span className="text-blue-600">{TEXTOS.tituloResaltado}</span>
            </motion.h1>
            
            <motion.p 
                className="text-xl md:text-2xl font-bold text-slate-600 max-w-3xl leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {TEXTOS.subtitulo}
            </motion.p>
        </div>


        {/* 3. REJILLA DE ESTUDIOS (Agrupados por Familia Profesional) */}
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24"
            variants={ANIMACION_REJILLA} // Aplica el efecto dominó a los hijos
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {EDUCATIONAL_OFFER_DETAILED.map((categoria) => (
                <motion.div
                    key={categoria.id}
                    variants={ANIMACION_ITEM} // Cómo entra cada tarjeta individualmente
                    className="group"
                >
                    {/* Contenedor estilo "Carpeta" Brutalista */}
                    <div className="h-full bg-white border-4 border-slate-900 p-8 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300">
                        
                        {/* Cabecera de Categoría (Icono + Nombre) */}
                        <div className="flex items-center gap-5 mb-8 border-b-4 border-slate-900 pb-5">
                            <motion.div 
                                className="bg-yellow-300 p-4 border-2 border-slate-900 text-slate-900"
                                whileHover={{ rotate: -10, scale: 1.1 }}
                            >
                                <categoria.icon size={28} strokeWidth={2.5} />
                            </motion.div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">
                                {categoria.category}
                            </h2>
                        </div>
                        
                        {/* Lista de cursos dentro de esta categoría */}
                        <div className="space-y-4">
                            {categoria.items.map((estudio) => (
                                <motion.div 
                                    key={estudio.id}
                                    onClick={() => setEstudioSeleccionado(estudio)} // Al clic, activamos el Modal
                                    
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group/item flex items-start justify-between gap-4 p-5 border-2 border-slate-100 hover:border-slate-900 hover:bg-slate-50 cursor-pointer transition-all relative overflow-hidden"
                                >
                                    <div className="flex gap-4">
                                        <ChevronRight className="mt-1 text-blue-600 group-hover/item:translate-x-1 transition-transform" size={20} strokeWidth={4} />
                                        <div>
                                            <p className="font-black text-xl text-slate-900 leading-tight">
                                                {estudio.title}
                                            </p>
                                            <p className="font-bold text-slate-500 text-xs uppercase mt-1 tracking-wider">
                                                {estudio.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Icono pequeño "Ir a enlace externo" decorativo */}
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="bg-slate-100 p-2 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                            <ExternalLink size={16} />
                                        </div>
                                    </div>
                                    
                                    {/* Línea azul decorativa al hover (borde izquierdo) */}
                                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-300"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>


        {/* 4. LISTADO DE DEPARTAMENTOS */}
        <SeccionDepartamentos />

      </div>


      {/* 5. MODAL DE FICHA TÉCNICA (POPUP) */}
      <AnimatePresence>
        {estudioSeleccionado && (
            <ModalFichaTecnica 
                estudio={estudioSeleccionado} 
                onClose={() => setEstudioSeleccionado(null)} 
            />
        )}
      </AnimatePresence>

    </section>
  );
};


/* =================================================================================
 * SUB-COMPONENTES INTERNOS (Para mantener limpio el código principal)
 * ================================================================================= */

/* --- A. LISTADO DE DEPARTAMENTOS --- */
const SeccionDepartamentos = () => (
    <div className="mb-24">
        {/* Encabezado Departamentos */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-2">Departamentos</h2>
                <p className="text-lg font-bold text-slate-600">Las áreas de especialización que componen nuestro claustro.</p>
            </motion.div>
            <motion.div 
                className="hidden md:block w-32 h-4 bg-blue-600 border-2 border-slate-900"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
            />
        </div>

        {/* Rejilla de Etiquetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPARTMENTS.map((dept, index) => (
                <motion.div
                    key={dept}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02 }} // Efecto cascada muy rápido
                    whileHover={{ 
                        y: -5, 
                        backgroundColor: "#0f172a", 
                        color: "#fff",
                        rotate: (index % 2 === 0 ? 1 : -1) // Rotación alterna par/impar
                    }}
                    className="bg-white border-2 border-slate-900 p-5 font-black text-slate-800 transition-all cursor-default shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] uppercase text-sm tracking-tighter"
                >
                    {dept}
                </motion.div>
            ))}
        </div>
    </div>
);


/* --- B. MODAL: FICHA TÉCNICA DETALLADA --- */

// Definimos los tipos de props que espera el Modal para ser seguros
interface ModalProps {
    estudio: StudyItem;
    onClose: () => void;
}

const ModalFichaTecnica: React.FC<ModalProps> = ({ estudio, onClose }) => {
    return (
        <motion.div 
            // FONDO OSCURO (OVERLAY)
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md"
            
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            
            onClick={onClose} // Cerrar si clicamos fuera
        >
            <motion.div 
                // CONTENEDOR MODAL (Papel Blanco)
                className="bg-white border-4 border-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] relative p-8 md:p-14 custom-scrollbar"
                
                initial={{ scale: 0.7, y: 100, rotate: -2 }} // Entra girado y pequeño
                animate={{ scale: 1, y: 0, rotate: 0 }}       // Se endereza y crece
                exit={{ scale: 0.7, y: 100, opacity: 0 }}     // Se va hacia abajo
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                
                onClick={(e) => e.stopPropagation()} // Clic dentro NO cierra el modal
                role="dialog" // Ayuda a la accesibilidad
                aria-modal="true"
            >
                
                {/* 1. BOTÓN CERRAR (X FLOTANTE) */}
                <motion.button 
                    onClick={onClose}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 right-6 p-3 bg-red-500 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] z-20"
                    aria-label="Cerrar ficha"
                >
                    <X size={28} strokeWidth={3} />
                </motion.button>

                
                {/* 2. ENCABEZADO DE LA FICHA */}
                <div className="mb-10 border-b-4 border-slate-900 pb-8">
                    <motion.div 
                        className="flex flex-wrap items-center gap-4 mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="bg-yellow-300 px-4 py-1 font-black border-2 border-slate-900 text-sm shadow-[3px_3px_0px_0px_#000]">
                            FICHA TÉCNICA OFICIAL
                        </span>
                        <span className="bg-blue-600 text-white px-4 py-1 font-black border-2 border-slate-900 text-sm uppercase shadow-[3px_3px_0px_0px_#000]">
                            {estudio.subtitle}
                        </span>
                    </motion.div>
                    
                    <motion.h2 
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-slate-900"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {estudio.title}
                    </motion.h2>
                </div>


                {/* 3. DATOS CLAVE (Duración, Requisitos, Objetivo) */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { icon: Clock, label: "DURACIÓN", valor: estudio.details.duration, color: "text-blue-600", bg: "bg-blue-50" },
                        { icon: ArrowRight, label: "REQUISITOS", valor: estudio.details.access, color: "text-green-600", bg: "bg-green-50" },
                        { icon: Target, label: "OBJETIVO", valor: estudio.details.objective, color: "text-orange-600", bg: "bg-orange-50" }
                    ].map((dato, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className={`${dato.bg} border-2 border-slate-900 p-6 relative overflow-hidden group/stat`}
                        >
                            <div className={`flex items-center gap-3 mb-3 ${dato.color} relative z-10`}>
                                <dato.icon size={24} strokeWidth={3} />
                                <span className="font-black text-xs uppercase tracking-widest">{dato.label}</span>
                            </div>
                            <p className="font-bold text-slate-800 relative z-10 leading-tight">
                                {dato.valor}
                            </p>
                            
                            {/* Icono gigante de fondo (decoración sutil) */}
                            <dato.icon className="absolute bottom-[-20%] right-[-10%] opacity-5 group-hover/stat:opacity-10 group-hover/stat:scale-110 transition-all duration-500" size={120} />
                        </motion.div>
                    ))}
                </div>


                {/* 4. COLUMNAS DE CONTENIDO: CURRÍCULO vs SALIDAS */}
                <div className="grid md:grid-cols-2 gap-16">
                    
                    {/* COLUMNA IZQ: LISTA DE MÓDULOS */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <h3 className="text-3xl font-black mb-8 uppercase border-l-8 border-blue-600 pl-5">Currículo</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {estudio.details.modules.map((modulo, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ x: 5, backgroundColor: "#f8fafc" }}
                                    className="flex items-center gap-4 bg-white border-2 border-slate-100 p-4 hover:border-slate-900 transition-all cursor-default"
                                >
                                    {/* Viñeta decorativa: cuadrado girado */}
                                    <div className="w-3 h-3 bg-blue-600 rounded-none border border-slate-900 rotate-45 flex-shrink-0"></div>
                                    <span className="font-bold text-slate-700 text-sm uppercase tracking-tight">{modulo}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    
                    {/* COLUMNA DER: SALIDAS PROFESIONALES */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h3 className="text-3xl font-black mb-8 uppercase border-l-8 border-yellow-400 pl-5">Salidas</h3>
                        <div className="space-y-4">
                            {estudio.details.outlets.map((salida, i) => (
                                <motion.div 
                                    key={i} 
                                    className="bg-slate-900 text-white p-5 font-black relative overflow-hidden group/outlet"
                                    whileHover={{ x: -5 }}
                                >
                                    <div className="relative z-10 flex items-center gap-3 uppercase text-sm tracking-wide">
                                        <ChevronRight size={20} className="text-yellow-400" strokeWidth={4} />
                                        {salida}
                                    </div>
                                    {/* Fondo azul que entra deslizándose al hover */}
                                    <div className="absolute inset-0 bg-blue-600 transition-all translate-x-full group-hover/outlet:translate-x-0 opacity-20"></div>
                                </motion.div>
                            ))}
                            
                            {/* NOTA FCT */}
                            <motion.div 
                                className="p-6 border-4 border-dashed border-slate-200 mt-10 bg-slate-50 relative group/info"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-2 rounded-full border-2 border-slate-900 group-hover/info:rotate-12 transition-transform">
                                    <Info size={24} />
                                </div>
                                <p className="text-sm font-black text-slate-500 italic leading-snug">
                                    En FP incluye módulo obligatorio de Formación en Centros de Trabajo (FCT). Conexión directa con empresas líderes de Utrera y Sevilla.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

        
                {/* Estilos inline para la barra de desplazamiento exclusiva de este modal */}
                <style>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 12px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: #fefce8;
                    border-left: 4px solid #0f172a;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #0f172a;
                    border: 2px solid #fefce8;
                  }
                `}</style>
            </motion.div>
        </motion.div>
    );
};

export default EducationalOffer;