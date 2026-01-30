/**
 * @file constants.ts
 * @description ARCHIVO DE DATOS
 * 
 * Aquí reside toda la información "estática" de la web: textos, menús, listas de profesores
 * y la galería de imágenes. Si necesitas cambiar un nombre, o una foto, 
 * este es el lugar.
 * 
 * NO contiene lógica compleja, solo datos puros.
 */

import { BookOpen, Microscope, Pencil, Settings, Home } from 'lucide-react';
import { Course, NavItem, NewsItem, StaffMember, FacilityImage } from './types';


/* 
 * =================================================================================
 *  CONFIGURACIÓN TÉCNICA
 *  Solo toca esto si cambia el lugar donde alojas las fotos (ej. cambias de GitHub a otro servidor).
 * =================================================================================
 */

// La carpeta base en internet donde están guardadas todas las fotos.
const ASSETS_URL = 'https://github.com/javiercodev/iesvirgendeconsolacion.es-assets/blob/main/';

// Pequeña herramienta para escribir menos código abajo.
// Convierte 'foto.jpg' en la dirección web completa.
const generarUrlImagen = (nombreArchivo: string): string => {
  return `${ASSETS_URL}/${nombreArchivo}?raw=true`;
};


/* 
 * =================================================================================
 *  1. MENÚ DE NAVEGACIÓN
 *  Los botones que aparecen en la barra superior de la web.
 * =================================================================================
 */

export const NAV_ITEMS: NavItem[] = [
  { label: 'Centro',           href: '#centro' },
  { label: 'Oferta Educativa', href: '#oferta-educativa' },
  { label: 'Noticias',         href: '#noticias' },
  
  // La variante 'highlight' hace que este botón se pinte de color diferente (para llamar la atención).
  { label: 'Secretaría',       href: '#matricula', variant: 'highlight' },
];


/* 
 * =================================================================================
 *  2. TARJETAS DE OFERTA EDUCATIVA
 *  Lista de los cursos y etapas que se imparten.
 * =================================================================================
 */

export const COURSES: Course[] = [
  {
    id:          '1',
    title:       'ESO Bilingüe',
    level:       'ESO',
    description: 'La base de tu futuro. Idiomas, tecnología y valores en un entorno dinámico.',
    icon:        BookOpen,
    color:       '', 
    colSpan:     2, // Ocupa 2 espacios en el diseño
  },
  {
    id:          '2',
    title:       'Bachillerato Ciencias',
    level:       'Bachillerato',
    description: 'Prepara tu salto a la universidad con laboratorios de última generación.',
    icon:        Microscope,
    color:       '',
    colSpan:     1,
  },
  {
    id:          '3',
    title:       'Bachillerato Humanidades',
    level:       'Bachillerato',
    description: 'Construye tu futuro comprendiendo el pasado, el lenguaje y la sociedad.',
    icon:        Pencil,
    color:       '',
    colSpan:     1,
  },
  {
    id:          '4',
    title:       'FP: Electricidad y Automoción',
    level:       'FP',
    description: 'Construye tu futuro en talleres equipados, aprendiendo con práctica real.',
    icon:        Settings,
    color:       '',
    colSpan:     2,
  },
  {
    id:          '5',
    title:       'FP: Edificación y Obra Civil',
    level:       'FP',
    description: 'Fórmate en proyectos reales, domina técnicas de construcción y dibuja tu carrera.',
    icon:        Home,
    color:       '',
    colSpan:     3, // Ocupa todo el ancho en algunos diseños
  },
];


/* 
 * =================================================================================
 *  3. TABLÓN DE ANUNCIOS (NOTICIAS)
 *  Las últimas novedades que aparecen en la portada.
 * =================================================================================
 */

export const NEWS: NewsItem[] = [
  {
    id:       '1',
    title:    '¡Se ha rediseñado la web del centro desde 0!',
    date:     '22 ENE',
    category: 'Institucional',
    image:    generarUrlImagen('newsitem-image-001.jpg'),
  },
  {
    id:       '2',
    title:    'Feria de FP 2026',
    date:     '15 FEB',
    category: 'Eventos',
    image:    generarUrlImagen('newsitem-image-002.jpg'),
  },
  {
    id:       '3',
    title:    'Nuevos Talleres de Robótica',
    date:     '10 MAR',
    category: 'Innovación',
    image:    generarUrlImagen('newsitem-image-003.jpg'),
  },
];


/* 
 * =================================================================================
 *  4. PERSONAL Y PROFESORADO
 *  Listados del equipo humano organizados por función.
 * =================================================================================
 */

// EQUIPO DIRECTIVO
export const MANAGEMENT_TEAM: StaffMember[] = [
  { role: 'Directora',                name: 'María Erundina Muela Gandul' },
  { role: 'Vicedirectora',            name: 'María Rosa Sánchez Casablanca' },
  { role: 'Jefe de estudios',         name: 'Alfonso Romero Carmona' },
  { role: 'Jefa de estudios adjunta', name: 'Beatriz López-Escobar Rituerto' },
  { role: 'Jefa de estudios adjunta', name: 'María Auxiliadora Santos Barranco' },
  { role: 'Secretario',               name: 'Manuel Cabrera Clavero' },
  { role: 'Coordinador TDE',          name: 'Ricardo Barroso Sosa' },
];

// JEFES DE DEPARTAMENTO
export const DEPARTMENT_HEADS: StaffMember[] = [
  { role: 'Actividades Extraescolares',     name: 'Milagros Ribes Castera' },
  { role: 'Biología y Geología',            name: 'Francisco de Asís Orozco Rodríguez' },
  { role: 'Dibujo y Artes Plásticas',       name: 'José Manuel López López' },
  { role: 'Edificación y Obra Civil',       name: 'María Auxiliadora Santos Barranco' },
  { role: 'Educación Física',               name: 'José Luis Torrejón Pareja' },
  { role: 'Electricidad y Electrónica',     name: 'Antonio Manuel Rodríguez Losa' },
  { role: 'Filosofía',                      name: 'Miguel Antonio López Martín' },
  { role: 'Física y Química',               name: 'J. Jaime Ruiz-Mateos Garrido' },
  { role: 'FOL - Economía',                 name: 'José Ángel Fernández Sánchez' },
  { role: 'Formación e Innovación',         name: 'José Fernández Jurado' },
  { role: 'Francés',                        name: 'Irene López Godoy' },
  { role: 'Geografía e Historia',           name: 'María Lourdes Bermejo González' },
  { role: 'Inglés',                         name: 'Carlos Manuel Villalonga Morales' },
  { role: 'Lengua Castellana - Clásicas',   name: 'María Mercedes Guirao Silvente' },
  { role: 'Transporte y Mantenimiento',     name: 'Isidro Luque Hijón' },
  { role: 'Matemáticas',                    name: 'Ricardo Rodríguez Gutiérrez Ravé' },
  { role: 'Música',                         name: 'Consolación Villalonga Morales' },
  { role: 'Orientación',                    name: 'María Dolores Barrera Castillo' },
  { role: 'Tecnología - Informática',       name: 'Raquel Calvo Carmona' },
];

// COORDINADORES DE ÁREA
export const AREA_COORDINATORS: StaffMember[] = [
  { role: 'Científico - Tecnológica', name: 'Raquel Calvo Carmona' },
  { role: 'Socio - Lingüística',      name: 'Irene López Godoy' },
  { role: 'Artística',                name: 'José Luis Torrejón Pareja' },
  { role: 'Formación Profesional',    name: 'María Auxiliadora Santos Barranco' },
];

// TUTORES POR GRUPOS
export const TUTORS: Record<string, StaffMember[]> = {
  'ESO y Educación Especial': [
    { role: 'Tutora 1º ESO A',           name: 'María Carmen Iribarren Gil' },
    { role: 'Tutor 1º ESO B',            name: 'Juan Antonio García Ceballos' },
    { role: 'Tutor 1º ESO C',            name: 'Jorge González Fernández' },
    { role: 'Tutora 1º ESO D',           name: 'María Rocío Durán Prieto' },
    { role: 'Tutora 2º ESO A',           name: 'Rocío Coronilla Rojas' },
    { role: 'Tutor 2º ESO B',            name: 'Francisco José López Gallego' },
    { role: 'Tutora 2º ESO C',           name: 'Ivonne Sánchez Roelas' },
    { role: 'Tutora 2º ESO D',           name: 'Inmaculada Isorna Campuzano' },
    { role: 'Tutor 3º ESO A',            name: 'Pedro José Soriano Garrido' },
    { role: 'Tutor 3º ESO B',            name: 'Nalia Ramírez Prieto' },
    { role: 'Tutora 3º ESO C / PDC',     name: 'Isabel María España Jiménez' },
    { role: 'Tutora 3º ESO D / PDC',     name: 'Luisa de Luz Macías Rivero' },
    { role: 'Tutora 4º ESO A',           name: 'Consolación Paz Cruz' },
    { role: 'Tutora 4º ESO B',           name: 'Alba Martín del Pozo' },
    { role: 'Tutora 4º ESO C / PDC',     name: 'María Consuelo Alcázar Cobano' },
    { role: 'Tutora 4º ESO D / PDC',     name: 'Lucía Ruiz Bernal' },
    { role: 'Tutora Unidad Ed. Especial', name: 'Estefanía Gómez Martín' },
  ],
  'Bachillerato': [
    { role: 'Tutora 1º Bach A (Humanidades/CS)',  name: 'Luisa María Sánchez Sánchez' },
    { role: 'Tutora 1º Bach B (Mixto)',           name: 'María Luisa García Domínguez' },
    { role: 'Tutor 1º Bach C (Ciencias/Tec)',     name: 'Manuel Candón Albendiz' },
    { role: 'Tutor 2º Bach A (Humanidades/CS)',   name: 'Miguel Ángel de la Rosa Navarro' },
    { role: 'Tutor 2º Bach B (CC. Sociales)',     name: 'Jesús Manuel Ganga González' },
    { role: 'Tutora 2º Bach C (Ciencias/Tec)',    name: 'Elena Fernández Rodríguez' },
  ],
  'Formación Profesional': [
    { role: 'Tutor 1º CFGB Mantenimiento',        name: 'Juan Miguel Rodríguez González' },
    { role: 'Tutor 2º CFGB Mantenimiento',        name: 'Manuel José González Rodríguez' },
    { role: 'Tutor 1º CFGB Electricidad',         name: 'José Bayón García' },
    { role: 'Tutor 2º CFGB Electricidad',         name: 'Manuel José González Rodríguez' },
    
    { role: 'Tutor 1º A GM Electromecánica',      name: 'José Carlos Garallo Carrera' },
    { role: 'Tutor 1º B GM Electromecánica',      name: 'Juan Antonio Cruz Díaz' },
    { role: 'Tutor 2º GM Electromecánica',        name: 'José Felipe García Vázquez' },
    
    { role: 'Tutora 1º A GM Inst. Eléctricas',    name: 'Nuria Jiménez Díaz' },
    { role: 'Tutor 1º B GM Inst. Eléctricas',     name: 'Julio Rengel López' },
    { role: 'Tutor 2º GM Inst. Eléctricas',       name: 'Norberto Zamorano López' },
    
    { role: 'Tutor 1º A GS Automoción',           name: 'Fernando Martín Godino' },
    { role: 'Tutor 1º B GS Automoción',           name: 'Manuel Anaya Boza' },
    { role: 'Tutor 2º GS Automoción',             name: 'Diego Chacón Longo' },
    
    { role: 'Tutor 1º GS Sist. Electrotécnicos',  name: 'Juan Guerrero García' },
    { role: 'Tutor 2º GS Sist. Electrotécnicos',  name: 'José Pizarro Galán' },
    
    { role: 'Tutor 1º GS Proyectos Edificación',  name: 'Rafael Ruiz Rodríguez' },
    { role: 'Tutora 2º GS Proyectos Edificación', name: 'María Jesús García Reynaldo' },
  ]
};


/* 
 * =================================================================================
 *  5. GALERÍA DE INSTALACIONES
 *  Colección completa de imágenes del centro.
 *  Nota: Cada grupo de fotos está separado por un comentario para facilitar su búsqueda.
 * =================================================================================
 */

export const FACILITIES: FacilityImage[] = [
  
  // --- BLOQUE: ZONAS COMUNES ---
  { id: '1',  title: 'Entrada Principal',      category: 'general', src: generarUrlImagen('facilityimage-image-001.jpg') },
  { id: '2',  title: 'El Guernica',            category: 'general', src: generarUrlImagen('facilityimage-image-002.jpg') },
  { id: '3',  title: 'Escalera Edificio Nuevo',category: 'general', src: generarUrlImagen('facilityimage-image-003.jpg') },
  { id: '4',  title: 'Pasillo Edificio Nuevo', category: 'general', src: generarUrlImagen('facilityimage-image-004.jpg') },
  { id: '5',  title: 'Pasillo Edificio Nuevo', category: 'general', src: generarUrlImagen('facilityimage-image-005.jpg') },
  { id: '6',  title: 'Patio',          category: 'general', src: generarUrlImagen('facilityimage-image-006.jpg') },
  { id: '7',  title: 'Patio',        category: 'general', src: generarUrlImagen('facilityimage-image-007.jpg') },
  { id: '8',  title: 'Patio',           category: 'general', src: generarUrlImagen('facilityimage-image-008.jpg') },
  { id: '9',  title: 'Zonas Deportiva',        category: 'general', src: generarUrlImagen('facilityimage-image-009.jpg') },
  { id: '10', title: 'Biblioteca',             category: 'general', src: generarUrlImagen('facilityimage-image-010.jpg') },
  { id: '11', title: 'Pasillo Edificio Antiguo',category:'general', src: generarUrlImagen('facilityimage-image-011.jpg') },
  { id: '12', title: 'Salón de Actos',         category: 'general', src: generarUrlImagen('facilityimage-image-012.jpg') },

  // --- BLOQUE: TALLERES DE AUTOMOCIÓN ---
  { id: '13', title: 'Sist. Auxiliares Motor', category: 'automocion', src: generarUrlImagen('facilityimage-image-013.jpg') },
  { id: '14', title: 'Taller de Carrocería',   category: 'automocion', src: generarUrlImagen('facilityimage-image-014.jpg') },
  { id: '15', title: 'Mecanizado',             category: 'automocion', src: generarUrlImagen('facilityimage-image-015.jpg') },
  { id: '16', title: 'Zona de Carrocería',         category: 'automocion', src: generarUrlImagen('facilityimage-image-016.jpg') },
  { id: '17', title: 'Vehículo de GLP',        category: 'automocion', src: generarUrlImagen('facilityimage-image-017.jpg') },
  { id: '18', title: 'Paneles de Herramientas',category: 'automocion', src: generarUrlImagen('facilityimage-image-018.jpg') },
  { id: '19', title: 'Motores',       category: 'automocion', src: generarUrlImagen('facilityimage-image-019.jpg') },
  { id: '20', title: 'Transmisión de Fuerzas', category: 'automocion', src: generarUrlImagen('facilityimage-image-020.jpg') },
  { id: '21', title: 'Maquetas Didácticas',    category: 'automocion', src: generarUrlImagen('facilityimage-image-021.jpg') },
  { id: '22', title: 'Neumática',      category: 'automocion', src: generarUrlImagen('facilityimage-image-022.jpg') },
  { id: '23', title: 'Cajas de Cambio',        category: 'automocion', src: generarUrlImagen('facilityimage-image-023.jpg') },
  { id: '24', title: 'Sist. Eléctricos Aux.',  category: 'automocion', src: generarUrlImagen('facilityimage-image-024.jpg') },
  { id: '25', title: 'Electricidad Automóvil', category: 'automocion', src: generarUrlImagen('facilityimage-image-025.jpg') },
  { id: '26', title: 'Taller FP Básica',     category: 'automocion', src: generarUrlImagen('facilityimage-image-026.jpg') },
  { id: '27', title: 'Taller FP Básica',     category: 'automocion', src: generarUrlImagen('facilityimage-image-027.jpg') },

  // --- BLOQUE: ELECTRICIDAD Y ELECTRÓNICA ---
  { id: '28', title: 'Taller Electricidad 1',   category: 'electricidad', src: generarUrlImagen('facilityimage-image-028.jpg') },
  { id: '29', title: 'Taller Electricidad 2',   category: 'electricidad', src: generarUrlImagen('facilityimage-image-029.jpg') },
  { id: '30', title: 'Taller Electricidad 3',    category: 'electricidad', src: generarUrlImagen('facilityimage-image-030.jpg') },
  { id: '31', title: 'Taller Electricidad 4',   category: 'electricidad', src: generarUrlImagen('facilityimage-image-031.jpg') },
  { id: '32', title: 'Taller Electricidad 5',          category: 'electricidad', src: generarUrlImagen('facilityimage-image-032.jpg') },
  { id: '33', title: 'Taller Electricidad 6', category: 'electricidad', src: generarUrlImagen('facilityimage-image-033.jpg') },
  { id: '34', title: 'Taller Electricidad 7',      category: 'electricidad', src: generarUrlImagen('facilityimage-image-034.jpg') },

  // --- BLOQUE: FÍSICA Y QUÍMICA ---
  { id: '35', title: 'Lab. Física (General)',   category: 'fisica', src: generarUrlImagen('facilityimage-image-035.jpg') },
  { id: '36', title: 'Péndulo de Newton',       category: 'fisica', src: generarUrlImagen('facilityimage-image-036.jpg') },
  { id: '37', title: 'Campana de Gases',        category: 'fisica', src: generarUrlImagen('facilityimage-image-037.jpg') },
  { id: '38', title: 'Exp. Danza de Péndulos',  category: 'fisica', src: generarUrlImagen('facilityimage-image-038.jpg') },
  { id: '39', title: 'Cubeta de Ondas',         category: 'fisica', src: generarUrlImagen('facilityimage-image-039.jpg') },
  { id: '40', title: 'Aula Digital Física',     category: 'fisica', src: generarUrlImagen('facilityimage-image-040.jpg') },
  { id: '41', title: 'Instrumentación Precisión',category:'fisica', src: generarUrlImagen('facilityimage-image-041.jpg') },
  { id: '42', title: 'Tabla Periódica Mural',   category: 'fisica', src: generarUrlImagen('facilityimage-image-042.jpg') },
  { id: '43', title: 'Almacén Reactivos',     category: 'fisica', src: generarUrlImagen('facilityimage-image-043.jpg') },
  { id: '44', title: 'Exposición permanente de experimentos',     category: 'fisica', src: generarUrlImagen('facilityimage-image-044.jpg') },

  // --- BLOQUE: BIOLOGÍA Y GEOLOGÍA ---
  { id: '45', title: 'Laboratorio Biología 1',      category: 'biologia', src: generarUrlImagen('facilityimage-image-045.jpg') },
  { id: '46', title: 'Laboratorio Biología 2',        category: 'biologia', src: generarUrlImagen('facilityimage-image-046.jpg') },
  { id: '47', title: 'Laboratorio Biología 3',category: 'biologia', src: generarUrlImagen('facilityimage-image-047.jpg') },
  { id: '48', title: 'Laboratorio Biología 4',    category: 'biologia', src: generarUrlImagen('facilityimage-image-048.jpg') },
  { id: '49', title: 'Laboratorio Biología 5',           category: 'biologia', src: generarUrlImagen('facilityimage-image-049.jpg') },
  { id: '50', title: 'Laboratorio Biología 6',           category: 'biologia', src: generarUrlImagen('facilityimage-image-050.jpg') },
];