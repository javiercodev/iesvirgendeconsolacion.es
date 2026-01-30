/**
 * @file Navbar.tsx
 * @description BARRA DE NAVEGACIÓN SUPERIOR
 * 
 * Gestiona el movimiento del usuario por la aplicación.
 * Es un componente "inteligente": sabe en qué vista estás ('home' o 'centro')
 * y ajusta el comportamiento del scroll o cambio de pantalla según corresponda.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

// =============================================================================
// CONFIGURACIÓN VISUAL
// =============================================================================

const TEXTOS_NAVBAR = {
  logoIniciales: "IES",             
  nombreEscritorio: "VIRGEN DE CONSOLACIÓN",
  nombreMovil: "IES V.C."           
};

interface NavbarProps {
  // Función que permite a la barra avisar a App.tsx de cambiar de vista
  onNavigate: (vista: 'home' | 'center') => void;
  
  // Saber en qué vista estamos actualmente para iluminar el botón correcto
  currentView: 'home' | 'center';
}


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  
  /* Estado para controlar si el menú móvil (hamburguesa) está abierto o cerrado */
  const [menuAbierto, setMenuAbierto] = useState(false);


  /**
   * LOGICA DE NAVEGACIÓN:
   * Decide qué hacer cuando el usuario hace clic en un enlace.
   * 
   * 1. Si es '#centro', cambiamos la pantalla completa.
   * 2. Si es una sección normal (ej: '#noticias'), volvemos al 'home' y hacemos scroll.
   */
  const gestionarClicNavegacion = (enlace: string) => {
    
    // Primero, siempre cerramos el menú móvil para que no estorbe.
    setMenuAbierto(false);

    // CASO A: Ir a la vista detallada del centro
    if (enlace === '#centro') {
      onNavigate('center');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } 
    
    // CASO B: Navegación estándar dentro de la Portada
    onNavigate('home');

    // Usamos un pequeño temporizador (100ms) para dar tiempo a React
    // a que "dibuje" la pantalla de Inicio antes de intentar buscar el ID para hacer scroll.
    setTimeout(() => {
        if (enlace === '#' || enlace === '') {
            // Ir arriba del todo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Buscar la sección y desplazarse suavemente
            const elementoDestino = document.querySelector(enlace);
            elementoDestino?.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  
  /**
   * Ayudante visual para mantener el JSX limpio.
   * Decide qué colores lleva el botón según si es importante o si está activo.
   */
  const obtenerEstilosBoton = (item: typeof NAV_ITEMS[0]) => {
    const claseBase = "px-5 py-2 rounded-xl font-bold border-2 border-transparent transition-all";
    
    // 1. Botón Resaltado (Naranja - Importante)
    if (item.variant === 'highlight') {
        return `${claseBase} bg-orange-400 text-white border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none`;
    }
    
    // 2. Botón Activo (Gris claro - Indica dónde estás)
    // Solo se aplica si el botón lleva al centro y estamos en la vista del centro.
    if (currentView === 'center' && item.href === '#centro') {
        return `${claseBase} bg-slate-100 border-slate-900`;
    }

    // 3. Botón Normal (Transparente)
    return `${claseBase} hover:bg-slate-100 hover:border-slate-900`;
  };


  return (
    // 'fixed z-50': La barra se queda pegada arriba y siempre visible sobre el resto.
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      
      {/* ISLA FLOTANTE (CONTENEDOR) */}
      <motion.div 
        className="bg-white border-2 border-slate-900 rounded-2xl px-2 py-2 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] w-full max-w-5xl relative"
        
        // Animación de entrada al cargar la página (cae desde arriba)
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* --- 1. ZONA LOGOTIPO --- */}
        <div 
            className="flex items-center gap-2 pl-4 cursor-pointer"
            onClick={() => gestionarClicNavegacion('#')}
            title="Volver al inicio"
        >
          {/* Círculo Azul con Iniciales */}
          <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-slate-900 flex items-center justify-center text-white font-black text-xs">
            {TEXTOS_NAVBAR.logoIniciales}
          </div>
          
          {/* Nombre (Responsive: cambia según el tamaño de pantalla) */}
          <span className="font-black text-lg tracking-tight hidden sm:block">
            {TEXTOS_NAVBAR.nombreEscritorio}
          </span>
          <span className="font-black text-lg tracking-tight block sm:hidden">
            {TEXTOS_NAVBAR.nombreMovil}
          </span>
        </div>


        {/* --- 2. MENÚ DE ESCRITORIO (Visible solo en PC/Tablet) --- */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => gestionarClicNavegacion(item.href)}
              className={obtenerEstilosBoton(item)}
              
              // Animación sutil al pasar el ratón (solo si no es el botón naranja)
              whileHover={item.variant !== 'highlight' ? { scale: 1.05 } : {}}
            >
              {item.label}
            </motion.button>
          ))}
        </div>


        {/* --- 3. BOTÓN HAMBURGUESA (Solo móvil) --- */}
        <button 
          className="md:hidden p-2 bg-yellow-300 border-2 border-slate-900 rounded-xl transition-transform active:scale-95"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? <X size={24} /> : <Menu size={24} />}
        </button>

      </motion.div>


      {/* --- 4. DESPLEGABLE DEL MENÚ MÓVIL --- */}
      {/* AnimatePresence permite animar el componente cuando DESAPARECE del DOM */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className="absolute top-full mt-4 w-[90%] bg-white border-2 border-slate-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden z-40"
            
            // Animación: cae y se rota un poco hacia adelante
            initial={{ opacity: 0, y: -20, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex flex-col p-4 gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => gestionarClicNavegacion(item.href)}
                  className={`px-4 py-3 rounded-xl font-bold border-2 border-slate-900 text-center active:scale-95 transition-transform ${
                    item.variant === 'highlight' 
                        ? 'bg-orange-400 text-white'       // Naranja sólido
                        : 'bg-slate-50 hover:bg-slate-100' // Gris claro
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;