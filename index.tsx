/**
 * @file index.tsx
 * @description PUNTO DE ENTRADA DE LA APLICACIÓN
 * 
 * Este archivo contiene la inicialización de la aplicación, la configuración de rutas y la presentación
 * de la estructura principal de la UI utilizando los datos definidos en `types.ts`.
 * 
 * NO contiene lógica compleja ni estructuras de datos, solo renderiza componentes con los tipos adecuados.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

/*
 * Importamos el componente principal.
 * Piensa en 'App' como el contenedor maestro que tiene todo el contenido visible.
 */
import App from './App';

/* 
 * =================================================================================
 *  FASE 1: CONEXIÓN CON EL NAVEGADOR
 *  Buscamos el lugar exacto en el HTML donde vamos a "inyectar" nuestra aplicación.
 * =================================================================================
 */

const identificadorHTML = 'root';
const puntoDeMontaje = document.getElementById(identificadorHTML);


// VERIFICACIÓN DE SEGURIDAD
// Si el HTML no tiene un <div> con el id 'root', la aplicación no puede arrancar.
// Este bloque avisa claramente del problema en la consola.
if (!puntoDeMontaje) {
  
  throw new Error(
    `[Error Crítico]: No se pudo encontrar el elemento con id '${identificadorHTML}' en el archivo index.html. La aplicación no tiene dónde dibujarse.`
  );

}


/* 
 * =================================================================================
 *  FASE 2: INICIALIZACIÓN DE REACT
 *  Tomamos el control del elemento encontrado y dibujamos la aplicación.
 * =================================================================================
 */

// Creamos la "raíz" de React dentro de nuestro punto de montaje.
const raiz = ReactDOM.createRoot(puntoDeMontaje);

// Renderizamos (dibujamos) la aplicación.
raiz.render(
  
  // React.StrictMode es una herramienta de desarrollo.
  // Nos ayuda a detectar errores "invisibles" o prácticas antiguas ejecutando comprobaciones extra.
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
);