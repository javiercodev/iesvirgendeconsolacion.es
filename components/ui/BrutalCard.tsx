/**
 * @file BrutalCard.tsx
 * @description COMPONENTE VISUAL: TARJETA CONTENEDORA
 * 
 * Es la "caja" fundamental del diseño. Envuelve cualquier contenido (noticias, fotos...)
 * dándole el aspecto característico de bordes gruesos y sombras duras.
 */

import React from 'react';
import { motion } from 'framer-motion';

/* 
 * =================================================================================
 *  CONFIGURACIÓN DE ESTILOS Y SOMBRAS
 *  Aquí definimos la "altura física" simulada de la tarjeta mediante su sombra.
 * =================================================================================
 */

const ESTILO_BASE = "border-2 border-slate-900 rounded-2xl overflow-hidden";

const SOMBRA = {
  // REPOSO: La sombra es profunda (6px), parece que la tarjeta flota alto.
  reposo: "6px 6px 0px 0px #0f172a",
  
  // ACTIVADA: La sombra es pequeña (2px), parece que la hemos hundido con el dedo.
  presionada: "2px 2px 0px 0px #0f172a"
};


/* 
 * =================================================================================
 *  INTERFAZ DE DATOS (PROPS)
 * =================================================================================
 */

interface BrutalCardProps {
  
  /** Elementos HTML que irán dentro de la tarjeta (texto, imagen, botones...) */
  children: React.ReactNode;
  
  /** 
   * Color de fondo.
   * Se espera una clase de Tailwind (ej: 'bg-white', 'bg-red-200').
   * Valor por defecto: 'bg-white'.
   */
  color?: string;
  
  /** Clases CSS extra si necesitas ajustar márgenes o flexbox específicos. */
  className?: string;
  
  /** 
   * Interruptor para desactivar la animación.
   * Útil si usas la tarjeta en móviles o listas muy densas donde el movimiento marea.
   * Valor por defecto: true (animación activada).
   */
  hoverEffect?: boolean;
}


/* 
 * =================================================================================
 *  COMPONENTE PRINCIPAL
 * =================================================================================
 */

const BrutalCard: React.FC<BrutalCardProps> = ({ 
  children, 
  color = 'bg-white', 
  className = '',
  hoverEffect = true
}) => {
  
  // Unimos todas las clases en una cadena limpia.
  // Esto evita errores de espacios dobles si 'className' viene vacío.
  const clasesFinales = `${ESTILO_BASE} ${color} ${className}`;

  return (
    <motion.div 
      className={clasesFinales}
      
      /* --- FÍSICA DE LA ANIMACIÓN --- */
      
      // 1. ESTADO INICIAL
      initial={{ boxShadow: SOMBRA.reposo }}
      
      // 2. ESTADO INTERACTIVO (HOVER)
      // Solo aplicamos animación si 'hoverEffect' es verdadero.
      whileHover={hoverEffect ? { 
        x: 4, // Movemos la tarjeta 4 píxeles a la derecha
        y: 4, // Movemos la tarjeta 4 píxeles abajo
        boxShadow: SOMBRA.presionada // Reducimos la sombra para mantener el realismo
      } : undefined}
      
      // 3. REBOTE (SPRING)
      // Configuramos un rebote suave pero rápido para que se sienta ágil.
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      
      {/* Pintamos lo que sea que nos hayan pasado dentro de la tarjeta */}
      {children}
      
    </motion.div>
  );
};

export default BrutalCard;