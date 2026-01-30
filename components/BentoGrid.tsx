/**
 * @file BentoGrid.tsx
 * @description SECCIÓN: OFERTA EDUCATIVA
 * 
 * Muestra los cursos disponibles organizados en una cuadrícula irregular (estilo Bento japonés).
 * Las tarjetas tienen tamaños variables para dar dinamismo visual y romper la monotonía.
 */

import React from 'react';
import { motion } from 'framer-motion';

import { COURSES } from '../constants';
import BrutalCard from './ui/BrutalCard';

// =============================================================================
// 1. CONFIGURACIÓN DE TEXTOS Y CONTENIDOS
// =============================================================================

const DATOS_SECCION = {
  // Este ID permite que el botón "Oferta Educativa" del menú navegue hasta aquí.
  id: "oferta-educativa", 
  
  titulo_normal: "Explora tu",
  titulo_resaltado: "camino",
  
  descripcion: "Desde la ESO hasta la Formación Profesional especializada. Tenemos el mapa para tu aventura educativa."
};


// =============================================================================
// 2. LÓGICA DE VISUALIZACIÓN
// =============================================================================

/**
 * Función que decide qué tan ancha es una tarjeta según la configuración.
 * 
 * @param espacios - Número de columnas que debe ocupar (1, 2 o 3).
 * @returns La clase CSS exacta para Tailwind.
 */
const calcularAnchoTarjeta = (espacios: number | undefined): string => {
  // Si no se especifica, ocupa 1 espacio.
  // En pantallas 'md' (Tablets/PC), cambiamos el comportamiento:
  switch (espacios) {
    case 3:  return 'md:col-span-3'; // Ancho completo
    case 2:  return 'md:col-span-2'; // Dos tercios
    default: return 'md:col-span-1'; // Un tercio (estándar)
  }
};


// =============================================================================
// 3. COMPONENTE PRINCIPAL
// =============================================================================

const BentoGrid: React.FC = () => {
  
  return (
    <section 
      className="py-20 px-4 bg-white border-y-2 border-slate-900" 
      id={DATOS_SECCION.id}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- CABECERA DE LA SECCIÓN --- */}
        <div className="mb-12 text-center">
            
            {/* Título animado que sube ligeramente al aparecer */}
            <motion.h2 
                className="text-4xl md:text-6xl font-black mb-4 uppercase"
                
                initial={{ opacity: 0, y: 20 }}     // Empieza invisible y más abajo
                whileInView={{ opacity: 1, y: 0 }}  // Sube y se hace visible
                viewport={{ once: true }}           // Solo lo hace la primera vez (no molesta al hacer scroll arriba/abajo)
            >
                {DATOS_SECCION.titulo_normal}{" "}
                
                {/* Palabra resaltada en naranja y fondo oscuro */}
                <span className="text-orange-500 bg-slate-900 px-2 leading-snug box-decoration-clone">
                    {DATOS_SECCION.titulo_resaltado}
                </span>
            </motion.h2>

            <p className="text-xl font-medium text-slate-600 max-w-2xl mx-auto">
                {DATOS_SECCION.descripcion}
            </p>
        </div>


        {/* --- REJILLA DE TARJETAS (GRID) --- */}
        {/* Móvil: 1 columna. PC: 3 columnas. Espacio entre huecos: gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          
          {COURSES.map((curso, indice) => {
            
            // Calculamos el ancho de esta tarjeta específica
            const claseDeAncho = calcularAnchoTarjeta(curso.colSpan);
            
            return (
              <motion.div
                  key={curso.id}
                  className={`col-span-1 ${claseDeAncho}`}
                  
                  // ANIMACIÓN ESCALONADA
                  // Multiplicamos el índice * 0.1s para que aparezcan una tras otra (efecto dominó)
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: indice * 0.1, type: "spring" }}
              >
                  {/* COMPONENTE VISUAL: TARJETA BRUTALISTA */}
                  <BrutalCard 
                      color={curso.color} 
                      className="h-full min-h-[280px] p-6 flex flex-col justify-between relative group cursor-pointer transition-transform hover:-translate-y-1"
                  >
                      
                      {/* 
                         ETIQUETA DE NIVEL (Ej: ESO, FP) 
                         En PC está oculta (opacity-0) y aparece al pasar el ratón (hover).
                         En Móvil siempre es visible para mejor experiencia.
                      */}
                      <div className="absolute top-4 right-4 bg-white border-2 border-slate-900 px-3 py-1 rounded-full font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#0f172a]
                                      opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          {curso.level}
                      </div>

                      {/* ZONA SUPERIOR: ICONO + TÍTULO */}
                      <div>
                          {/* Caja del Icono */}
                          <div className="w-14 h-14 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_#0f172a] 
                                          transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                              
                              {/* Icono dinámico (se importa como objeto desde 'lucide-react') */}
                              <curso.icon size={28} strokeWidth={2.5} />
                          </div>
                          
                          <h3 className="text-3xl font-black mb-2 leading-tight">
                              {curso.title}
                          </h3>
                      </div>
                      
                      {/* ZONA INFERIOR: DESCRIPCIÓN + BARRA PROGRESO */}
                      <div>
                          <p className="font-bold text-slate-800 leading-tight mb-4">
                              {curso.description}
                          </p>
                          
                          {/* Barra decorativa que se llena de azul al interactuar */}
                          <div className="w-full h-2 bg-slate-900/10 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                          </div>
                      </div>

                  </BrutalCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;