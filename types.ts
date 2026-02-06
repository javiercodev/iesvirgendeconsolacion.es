/**
 * @file types.ts
 * @description ARCHIVO DE TIPOS
 * 
 * Aquí se definen todos los tipos y las interfaces necesarias para estructurar los datos de la aplicación.
 * Este archivo es fundamental para mantener la tipificación y la coherencia en el código a lo largo de la aplicación.
 * 
 * NO contiene lógica ni datos estáticos, solo definiciones de tipos.
 */

import { LucideIcon } from 'lucide-react';

/* 
 * =================================================================================
 *  DEFINICIONES GLOBALES DE OPCIONES
 *  Estas listas controlan las opciones disponibles en varias partes de la aplicación.
 *  Si necesitas añadir un nuevo nivel o categoría, hazlo aquí.
 * =================================================================================
 */

// Niveles educativos disponibles en el centro.
export type NivelEducativo = 'ESO' | 'Bachillerato' | 'FP';

// Categorías para organizar las fotos de las instalaciones.
export type CategoriaInstalacion = 
  | 'general' 
  | 'automocion' 
  | 'electricidad' 
  | 'fisica' 
  | 'biologia';

// Estilos visuales disponibles para los botones de navegación.
export type EstiloBoton = 'default' | 'highlight';


/* 
 * =================================================================================
 *  SECCIÓN 1: NAVEGACIÓN
 *  Elementos que permiten al usuario moverse por el sitio web.
 * =================================================================================
 */

export interface NavItem {
  
  // Texto visible del botón o enlace (ej: "Inicio", "Contacto").
  label: string;

  // Dirección web a la que nos lleva al hacer clic.
  href: string;

  // (Opcional) Define si el botón se ve normal o resaltado.
  variant?: EstiloBoton;

  // (Opcional) Si necesitamos que el botón ejecute algo especial al hacer clic
  // (como abrir un menú o una ventana), esa lógica va aquí.
  action?: () => void;
}


/* 
 * =================================================================================
 *  SECCIÓN 2: EDUCACIÓN Y ACADÉMICA
 *  Estructuras relacionadas con la oferta formativa.
 * =================================================================================
 */

export interface Course {
  
  // Identificador único para bases de datos o listas.
  id: string;

  // Nombre completo del curso o asignatura.
  title: string;

  // Etapa educativa a la que pertenece.
  level: NivelEducativo;

  // Resumen breve de qué trata el curso.
  description: string;

  // Icono visual de la librería 'lucide-react'.
  icon: LucideIcon;

  // Color temático para la tarjeta o sección (ej: "#FF5733" o clases CSS).
  color: string;

  // (Opcional) Usado para el diseño visual tipo "mosaico". 
  // Define cuántos espacios de ancho ocupa esta tarjeta en la cuadrícula.
  colSpan?: number; 
}


/* 
 * =================================================================================
 *  SECCIÓN 3: CONTENIDO E INFORMACIÓN
 *  Noticias, novedades y miembros del equipo.
 * =================================================================================
 */

export interface NewsItem {
  
  id: string;
  
  title: string;
  
  // Fecha de publicación en formato texto (ej: "29 Enero 2026").
  date: string;
  
  // Tipo de noticia (ej: "Eventos", "Avisos").
  category: string;
  
  // Ruta o enlace a la fotografía de portada.
  image: string;

  content?: string;
}

export interface StaffMember {
  
  // Nombre completo de la persona.
  name: string;
  
  // Cargo o puesto que desempeña (ej: "Profesor", "Director").
  role: string;
  
  // (Opcional) Departamento al que pertenece (ej: "Matemáticas").
  department?: string;
  
  // (Opcional) Si es tutor, indica el grupo a su cargo (ej: "1º A").
  group?: string;
}


/* 
 * =================================================================================
 *  SECCIÓN 4: INFRAESTRUCTURA Y MEDIOS
 *  Gestión de imágenes de las instalaciones del centro.
 * =================================================================================
 */

export interface FacilityImage {
  
  id: string;

  // Texto descriptivo para la imagen (importante para accesibilidad).
  title: string;

  // Clasificación para filtrar la galería de fotos.
  category: CategoriaInstalacion;

  // La ruta del archivo de imagen original.
  src: string;
}