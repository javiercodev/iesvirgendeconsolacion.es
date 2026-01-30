/**
 * @file BrutalButton.tsx
 * @description COMPONENTE UI: BOTÓN CON ESTÉTICA
 * 
 * Este es el "ladrillo" fundamental de la interfaz. Se caracteriza por:
 * 1. Bordes gruesos y negros.
 * 2. Sombras duras (sin difuminar).
 * 3. Animación táctil: Al pasar el ratón, el botón se desplaza físicamente.
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

/* 
 * =================================================================================
 *  CONFIGURACIÓN DE ESTILOS
 *  Aquí definimos cómo se ve el botón sin mezclarlo con la lógica.
 * =================================================================================
 */

// Estilos obligatorios para que el diseño funcione (borde, fuente negrita, posición relativa).
const ESTILO_BASE = "relative inline-flex items-center justify-center font-bold border-2 border-slate-900 rounded-xl transition-colors select-none whitespace-nowrap z-10";

// Opciones de color (Fondo + Texto).
const PALETA_COLORES = {
  primary:   "bg-blue-500 text-white hover:bg-blue-600",     // Azul principal
  secondary: "bg-white text-slate-900 hover:bg-slate-50",     // Blanco estándar
  accent:    "bg-orange-500 text-white hover:bg-orange-600",  // Naranja destacado
  outline:   "bg-white text-slate-900 hover:bg-slate-200",     // Fondo blanco simple
};

// Opciones de tamaño (Relleno interno / Padding).
const DIMENSIONES = {
  sm: "px-4 py-2 text-sm",  // Pequeño (Filtros)
  md: "px-6 py-3 text-base", // Mediano (Estándar)
  lg: "px-8 py-4 text-xl",  // Grande (Call to Action)
};


/* 
 * =================================================================================
 *  INTERFAZ DE DATOS (PROPS)
 * =================================================================================
 */

// Extendemos 'HTMLMotionProps' para que el botón acepte todo lo normal (onClick, disabled, id...)
// además de las propiedades de animación.
interface BrutalButtonProps extends HTMLMotionProps<"button"> {
  
  // Define el color. Por defecto es 'primary'.
  variant?: keyof typeof PALETA_COLORES;
  
  // Define el tamaño. Por defecto es 'md'.
  size?: keyof typeof DIMENSIONES;
  
  // (Opcional) Un icono para poner a la izquierda del texto.
  icon?: React.ReactNode;
  
  // El texto o contenido dentro del botón.
  children: React.ReactNode;
}


/* 
 * =================================================================================
 *  COMPONENTE PRINCIPAL
 * =================================================================================
 */

const BrutalButton: React.FC<BrutalButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  icon,
  ...propsRestantes // Recoge cualquier otra propiedad estándar (como onClick)
}) => {

  // Construimos la lista final de clases CSS uniendo todas las partes
  const clasesFinales = `${ESTILO_BASE} ${PALETA_COLORES[variant]} ${DIMENSIONES[size]} ${className}`;

  return (
    <motion.button
      className={clasesFinales}
      
      /* --- FÍSICA DE LA ANIMACIÓN --- */
      
      // 1. ESTADO REPOSO:
      // El botón tiene una sombra dura desplazada 4px hacia abajo y derecha.
      initial={{ 
        boxShadow: "4px 4px 0px 0px #0f172a" 
      }}
      
      // 2. ESTADO HOVER (Ratón encima):
      // El botón se mueve físicamente 4px (x, y) hacia la sombra.
      // Al mismo tiempo, quitamos la sombra.
      // Resultado visual: Parece que estás pulsando una tecla mecánica.
      whileHover={{ 
        x: 4, 
        y: 4, 
        boxShadow: "0px 0px 0px 0px #0f172a" 
      }}
      
      // 3. ESTADO TAP (Clic mantenido):
      // Se encoge un 5% para dar sensación de profundidad.
      whileTap={{
        scale: 0.95
      }}
      
      // 4. TRANSICIÓN (Efecto Muelle):
      // stiffness: Rigidez del muelle (más alto = más rápido/duro).
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      
      // Pasamos el resto de propiedades al elemento HTML nativo
      {...propsRestantes}
    >
      
      {/* Si existe el icono, lo dibujamos con un margen a la derecha */}
      {icon && (
        <span className="mr-2 flex items-center">
            {icon}
        </span>
      )}
      
      {/* Texto del botón */}
      {children}
      
    </motion.button>
  );
};

export default BrutalButton;