/**
 * @file SchoolCenter.tsx
 * @description PÁGINA "EL CENTRO"
 * 
 * Esta página es un contenedor inteligente. En lugar de tener tres páginas separadas,
 * usa un sistema de pestañas para cambiar instantáneamente entre:
 * 1. Historia del centro.
 * 2. El equipo humano (Organigrama).
 * 3. Galería fotográfica (con visor a pantalla completa).
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, History, Building, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Importamos componentes de interfaz y datos
import BrutalCard from './ui/BrutalCard';
import { MANAGEMENT_TEAM, DEPARTMENT_HEADS, AREA_COORDINATORS, TUTORS, FACILITIES } from '../constants';

/* 
 * =================================================================================
 *  1. CONFIGURACIÓN DE TEXTOS ESTÁTICOS
 *  Si quieres cambiar el título de la página o el texto de "Historia", hazlo aquí.
 * =================================================================================
 */

const DATOS_PAGINA = {
    cabecera: {
        prefijo: "EL",
        resaltado: "CENTRO", // Saldrá en color azul
        subtitulo: "Conoce nuestra esencia, nuestro equipo y los espacios donde construimos futuro."
    },
    
    // Contenido de la primera pestaña
    historia: {
        tituloTarjeta: "ORIGEN Y LEGADO",
        
        // Dividimos el texto para poder poner en negrita el nombre del centro fácilmente
        textoParte1: "El ",
        textoResaltado: "I.E.S. Virgen de Consolación", 
        textoParte2: " no es solo un edificio, es un pilar fundamental en la educación de Utrera. Desde sus inicios, ha sido testigo de la evolución educativa, adaptándose desde la enseñanza tradicional hasta convertirse en un referente en Formación Profesional y tecnología.",
        
        mision: "Fundado con la vocación de servicio público, nuestro centro ha crecido en instalaciones y oferta educativa, abrazando la diversidad y la excelencia. Hemos pasado de las pizarras de tiza a los paneles digitales interactivos, pero manteniendo siempre nuestra esencia: formar personas, no solo alumnos.",
        
        // Texto del bloque decorativo visual (derecha)
        selloTextoGrande: "50 AÑOS",
        selloSubtitulo: "creando futuro",
        anoFundacion: "1968"
    }
};

/* 
 * DEFINICIÓN DE PESTAÑAS
 * Usamos un tipo estricto ('type') para evitar errores al escribir los nombres en el código.
 */
type IdentificadorPestana = 'historia' | 'equipo' | 'instalaciones';

const PESTANAS: { id: IdentificadorPestana; etiqueta: string; icono: React.ElementType }[] = [
    { id: 'historia',      etiqueta: 'Nuestra Historia', icono: History },
    { id: 'equipo',        etiqueta: 'Equipo',    icono: Users },
    { id: 'instalaciones', etiqueta: 'Instalaciones',    icono: Building }
];


/* 
 * =================================================================================
 *  2. COMPONENTE PRINCIPAL (CONTROLADOR DE PESTAÑAS)
 * =================================================================================
 */

const SchoolCenter: React.FC = () => {
  // 'pestanaActiva' recuerda cuál es la sección que el usuario está viendo.
  const [pestanaActiva, setPestanaActiva] = useState<IdentificadorPestana>('historia');

  return (
    <section className="min-h-screen pt-28 pb-12 px-4 bg-yellow-50" id="centro">
      <div className="max-w-6xl mx-auto">
        
        {/* --- CABECERA COMÚN --- */}
        <div className="mb-12 text-center">
            <motion.h1 
                className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                {DATOS_PAGINA.cabecera.prefijo}{" "} 
                <span className="text-blue-600">{DATOS_PAGINA.cabecera.resaltado}</span>
            </motion.h1>
            <p className="text-xl font-bold text-slate-700 max-w-2xl mx-auto">
                {DATOS_PAGINA.cabecera.subtitulo}
            </p>
        </div>


        {/* --- MENÚ DE NAVEGACIÓN (TABS) --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {PESTANAS.map((pestana) => {
                
                // Comprobamos si esta es la pestaña actual para cambiar su color
                const estaActiva = pestanaActiva === pestana.id;
                
                return (
                    <button
                        key={pestana.id}
                        onClick={() => setPestanaActiva(pestana.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] transition-all select-none
                            ${estaActiva 
                                ? 'bg-orange-400 text-white translate-x-[2px] translate-y-[2px] shadow-none' // Estilo presionado (Activo)
                                : 'bg-white hover:bg-slate-100' // Estilo reposo (Inactivo)
                            }`}
                    >
                        <pestana.icono size={20} />
                        {pestana.etiqueta.toUpperCase()}
                    </button>
                );
            })}
        </div>


        {/* --- ZONA DE CONTENIDO CAMBIANTE --- */}
        <div className="min-h-[500px]">
            {/* 'AnimatePresence' con mode='wait' asegura que la pestaña vieja desaparezca antes de mostrar la nueva */}
            <AnimatePresence mode="wait">
                
                {pestanaActiva === 'historia' && (
                    <SeccionHistoria key="historia" />
                )}
                
                {pestanaActiva === 'equipo' && (
                    <SeccionEquipo key="equipo" />
                )}
                
                {pestanaActiva === 'instalaciones' && (
                    <SeccionInstalaciones key="instalaciones" />
                )}

            </AnimatePresence>
        </div>

      </div>
    </section>
  );
};


/* 
 * =================================================================================
 *  SUB-COMPONENTE A: HISTORIA
 *  Texto a la izquierda, bloque visual abstracto a la derecha.
 * =================================================================================
 */
const SeccionHistoria = () => {
    return (
        <motion.div 
            // Animación: Desliza desde la izquierda
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid md:grid-cols-2 gap-8 items-center"
        >
            {/* Tarjeta de Texto */}
            <BrutalCard className="p-8 bg-white rotate-1 md:rotate-2">
                <h3 className="text-3xl font-black mb-6 border-b-4 border-yellow-300 inline-block">
                    {DATOS_PAGINA.historia.tituloTarjeta}
                </h3>
                
                <div className="space-y-4 text-lg font-medium text-slate-700 leading-relaxed">
                    <p>
                        {DATOS_PAGINA.historia.textoParte1}
                        <span className="font-bold text-blue-600">
                            {DATOS_PAGINA.historia.textoResaltado}
                        </span>
                        {DATOS_PAGINA.historia.textoParte2}
                    </p>
                    <p>
                        {DATOS_PAGINA.historia.mision}
                    </p>
                </div>
            </BrutalCard>
            
            {/* Elemento Visual Abstracto (Derecha) */}
            <div className="relative h-[400px] select-none">
                {/* Fondo azul rotado */}
                <div className="absolute inset-0 bg-blue-500 rounded-3xl border-2 border-slate-900 transform rotate-3 z-0"></div>
                
                {/* Tarjeta blanca frontal */}
                <div className="absolute inset-0 bg-white rounded-3xl border-2 border-slate-900 flex flex-col items-center justify-center p-8 z-10 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.2)]">
                   
                   {/* Texto "1968" de fondo muy sutil */}
                   <div className="text-9xl font-black text-slate-100 absolute z-0 pointer-events-none">
                       {DATOS_PAGINA.historia.anoFundacion}
                   </div>
                   
                   <h4 className="text-4xl font-black text-center relative z-10 leading-tight">
                       <span className="block text-slate-900 text-2xl mb-2">Más de</span>
                       <span className="text-orange-500 text-6xl md:text-7xl block mb-2">
                            {DATOS_PAGINA.historia.selloTextoGrande}
                       </span>
                       <span className="block text-slate-900 text-2xl">
                            {DATOS_PAGINA.historia.selloSubtitulo}
                       </span>
                   </h4>
                </div>
            </div>
        </motion.div>
    );
};


/* 
 * =================================================================================
 *  SUB-COMPONENTE B: EQUIPO HUMANO
 *  Listas de directivos, jefes y tutores.
 * =================================================================================
 */
const SeccionEquipo = () => {
    return (
        <motion.div
            // Animación: Sube desde abajo
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
        >
            {/* 1. EQUIPO DIRECTIVO */}
            <section>
                <CabeceraSeccionEquipo titulo="Equipo Directivo" color="bg-orange-400" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MANAGEMENT_TEAM?.map((miembro, i) => (
                        <div key={i} className="bg-white border-2 border-slate-900 p-4 rounded-xl shadow-[4px_4px_0px_0px_#e2e8f0] hover:shadow-[4px_4px_0px_0px_#0f172a] transition-shadow">
                            <span className="block text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">
                                {miembro.role}
                            </span>
                            <h4 className="font-black text-lg">
                                {miembro.name}
                            </h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. JEFES DE DEPARTAMENTO (Estilo Tabla) */}
            <section>
                <CabeceraSeccionEquipo titulo="Jefes de Departamento" color="bg-blue-400" />
                
                <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#0f172a]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100 border-b-2 border-slate-900">
                                <tr>
                                    <th className="p-4 font-black uppercase text-sm w-1/2">Departamento</th>
                                    <th className="p-4 font-black uppercase text-sm w-1/2 border-l-2 border-slate-900">Responsable</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-100">
                                {DEPARTMENT_HEADS?.map((jefe, i) => (
                                    <tr key={i} className="hover:bg-yellow-50 transition-colors">
                                        <td className="p-3 font-bold text-sm text-slate-700">{jefe.role}</td>
                                        <td className="p-3 font-medium text-sm border-l-2 border-slate-100">{jefe.name}</td>
                                    </tr>
                                ))}
                                
                                {/* Fila separadora para Coordinadores */}
                                <tr className="bg-slate-900 text-white">
                                    <td colSpan={2} className="p-2 font-black text-center uppercase tracking-widest text-xs">
                                        Coordinadores de Área
                                    </td>
                                </tr>

                                {AREA_COORDINATORS?.map((coord, i) => (
                                     <tr key={`coord-${i}`} className="hover:bg-blue-50 transition-colors bg-slate-50">
                                        <td className="p-3 font-bold text-sm text-slate-600">{coord.role}</td>
                                        <td className="p-3 font-medium text-sm border-l-2 border-slate-200">{coord.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

             {/* 3. TUTORES */}
             <section>
                <CabeceraSeccionEquipo titulo="Tutores por Nivel" color="bg-green-400" />
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Convertimos el diccionario 'TUTORS' (key: valor) en una lista procesable */}
                    {Object.entries(TUTORS || {}).map(([nivelEducativo, listaTutores]: [string, any]) => (
                        <BrutalCard key={nivelEducativo} className="p-0 bg-white" hoverEffect={false}>
                            
                            {/* Cabecera del nivel (sticky para que se quede fija al hacer scroll en la lista) */}
                            <div className="bg-slate-900 text-white p-4 font-black uppercase tracking-wider border-b-2 border-slate-900 sticky top-0 z-10">
                                {nivelEducativo}
                            </div>

                            {/* Lista con scroll interno si es muy larga */}
                            <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar space-y-2">
                                {listaTutores.map((tutor: any, index: number) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 pb-2 last:border-0 hover:bg-slate-50 p-1 rounded transition-colors">
                                        <span className="font-bold text-sm text-blue-600">{tutor.role}</span>
                                        <span className="font-medium text-sm text-right text-slate-800">{tutor.name}</span>
                                    </div>
                                ))}
                            </div>
                        </BrutalCard>
                    ))}
                </div>
            </section>
        </motion.div>
    );
};

// Pequeño ayudante para los títulos (bolita de color + texto)
const CabeceraSeccionEquipo = ({ titulo, color }: { titulo: string, color: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className={`h-4 w-4 ${color} border-2 border-slate-900 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}></div>
        <h2 className="text-3xl font-black uppercase tracking-tight">{titulo}</h2>
    </div>
);


/* 
 * =================================================================================
 *  SUB-COMPONENTE C: GALERÍA DE INSTALACIONES
 *  Rejilla filtrable con modo "Pantalla Completa" (Lightbox).
 * =================================================================================
 */
const SeccionInstalaciones = () => {
    
    // Filtro activo: 'all' muestra todo. 'general', 'automocion', etc filtra.
    const [filtroActivo, setFiltroActivo] = useState<string>('all');
    
    // Índice de la foto abierta en modo pantalla completa (null = ninguna abierta)
    const [indiceImagenAbierta, setIndiceImagenAbierta] = useState<number | null>(null);
    
    const categorias = [
        { id: 'all',          label: 'Todo' },
        { id: 'general',      label: 'Generales' },
        { id: 'automocion',   label: 'Automoción' },
        { id: 'electricidad', label: 'Electricidad' },
        { id: 'fisica',       label: 'Física y Química' },
        { id: 'biologia',     label: 'Biología' },
    ];

    // Calculamos qué imágenes mostrar según el filtro
    const imagenesVisibles = filtroActivo === 'all' 
        ? FACILITIES 
        : FACILITIES?.filter(img => img.category === filtroActivo);


    /**
     * NAVEGACIÓN DE GALERÍA CIRCULAR
     * Permite ir de la última foto a la primera sin pararse.
     */
    const siguienteFoto = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation(); // Evitamos que el clic se propague al fondo y cierre el modal
        if (indiceImagenAbierta !== null && imagenesVisibles) {
            // Operador Módulo (%): Permite volver al 0 cuando llegamos al final
            setIndiceImagenAbierta((actual) => (actual! + 1) % imagenesVisibles.length);
        }
    }, [indiceImagenAbierta, imagenesVisibles]);

    const anteriorFoto = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (indiceImagenAbierta !== null && imagenesVisibles) {
            // Truco matemático para ir hacia atrás circularmente sin números negativos
            setIndiceImagenAbierta((actual) => (actual! - 1 + imagenesVisibles.length) % imagenesVisibles.length);
        }
    }, [indiceImagenAbierta, imagenesVisibles]);


    /*
     * CONTROL DE TECLADO Y RESET
     * 1. Si cambias de filtro, cerramos el visor por seguridad.
     * 2. Si abres una foto, bloqueamos el scroll de fondo y activamos las flechas.
     */
    useEffect(() => {
        setIndiceImagenAbierta(null);
    }, [filtroActivo]);

    useEffect(() => {
        if (indiceImagenAbierta === null) return;

        const manejarTeclado = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIndiceImagenAbierta(null);
            if (e.key === 'ArrowRight') siguienteFoto();
            if (e.key === 'ArrowLeft')  anteriorFoto();
        };

        window.addEventListener('keydown', manejarTeclado);
        document.body.style.overflow = 'hidden'; // Bloquea scroll de fondo

        return () => {
            window.removeEventListener('keydown', manejarTeclado);
            document.body.style.overflow = 'unset'; // Restaura scroll
        };
    }, [indiceImagenAbierta, siguienteFoto, anteriorFoto]);


    if (!FACILITIES || FACILITIES.length === 0) {
        return <div className="text-center font-bold">No hay imágenes disponibles.</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* 1. BOTONERA DE FILTROS */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setFiltroActivo(cat.id)}
                        className={`px-4 py-2 rounded-full border-2 border-slate-900 text-sm font-bold transition-all
                            ${filtroActivo === cat.id 
                                ? 'bg-slate-900 text-white transform scale-105 shadow-[2px_2px_0px_0px_#cbd5e1]' 
                                : 'bg-white hover:bg-slate-200'}
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* 2. REJILLA DE MINIATURAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {imagenesVisibles?.map((img, index) => (
                        <motion.div
                            key={img.id}
                            layout // 'layout' anima el movimiento de las fotos al filtrar
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer"
                            onClick={() => setIndiceImagenAbierta(index)}
                        >
                            <BrutalCard className="p-0 overflow-hidden group h-full flex flex-col">
                                
                                {/* Contenedor de la Imagen */}
                                <div className="relative aspect-video overflow-hidden border-b-2 border-slate-900 bg-slate-100">
                                    <img 
                                        src={img.src} 
                                        alt={img.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    
                                    {/* Capa oscura "Ver más" al pasar el ratón */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white text-slate-900 p-3 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000]">
                                            <Maximize2 size={24} />
                                        </div>
                                    </div>
                                    
                                    {/* Etiqueta de categoría (esquina superior izq) */}
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-slate-900 font-bold text-[10px] px-2 py-0.5 rounded border border-slate-900 shadow-sm">
                                        {categorias.find(c => c.id === img.category)?.label}
                                    </div>
                                </div>
                                
                                {/* Pie de la tarjeta */}
                                <div className="p-3 bg-white flex-1">
                                    <h5 className="font-black text-lg leading-tight">{img.title}</h5>
                                </div>

                            </BrutalCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>


            {/* 3. VISOR PANTALLA COMPLETA (LIGHTBOX) */}
            <AnimatePresence>
                {/* Condición: Si tenemos un índice válido, mostramos el modal */}
                {indiceImagenAbierta !== null && imagenesVisibles && imagenesVisibles[indiceImagenAbierta] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 md:p-8"
                        onClick={() => setIndiceImagenAbierta(null)} // Click en el fondo cierra
                    >
                         <motion.div 
                            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()} // Click en la foto NO cierra
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                         >
                            {/* --- CONTENEDOR FOTO GRANDE --- */}
                            <div className="relative bg-white border-4 border-slate-900 p-2 shadow-[12px_12px_0px_0px_#000] rounded-xl overflow-hidden w-full">
                                <motion.img 
                                    key={imagenesVisibles[indiceImagenAbierta].id} // La clave fuerza el repintado (fade in) al cambiar de foto
                                    src={imagenesVisibles[indiceImagenAbierta].src} 
                                    alt={imagenesVisibles[indiceImagenAbierta].title}
                                    className="max-h-[70vh] w-full object-contain mx-auto bg-slate-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                
                                {/* Info inferior de la foto modal */}
                                <div className="bg-white border-t-2 border-slate-900 p-4 mt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                                    <div>
                                        <h3 className="font-black text-xl md:text-2xl uppercase">
                                            {imagenesVisibles[indiceImagenAbierta].title}
                                        </h3>
                                        <span className="text-sm font-bold bg-yellow-300 px-2 py-0.5 border border-slate-900 rounded-md inline-block mt-1">
                                            {categorias.find(c => c.id === imagenesVisibles[indiceImagenAbierta].category)?.label}
                                        </span>
                                    </div>
                                    <div className="font-black text-slate-400 text-xl">
                                        {/* Contador (ej: 4 / 20) */}
                                        {indiceImagenAbierta + 1} / {imagenesVisibles.length}
                                    </div>
                                </div>
                            </div>

                            {/* --- CONTROLES FLOTANTES --- */}
                            
                            {/* Botón Cerrar (X) */}
                            <button 
                                onClick={() => setIndiceImagenAbierta(null)}
                                className="absolute -top-6 -right-4 md:-right-12 bg-red-500 text-white p-3 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] hover:scale-110 transition-transform z-50"
                                title="Cerrar imagen"
                            >
                                <X size={24} strokeWidth={3} />
                            </button>

                            {/* Botones PC (Flechas laterales) */}
                            <button 
                                onClick={anteriorFoto}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-20 bg-white text-slate-900 p-4 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 hover:scale-110 transition-all z-40 hidden md:block"
                                title="Imagen anterior"
                            >
                                <ChevronLeft size={32} strokeWidth={3} />
                            </button>

                            <button 
                                onClick={siguienteFoto}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-20 bg-white text-slate-900 p-4 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 hover:scale-110 transition-all z-40 hidden md:block"
                                title="Siguiente imagen"
                            >
                                <ChevronRight size={32} strokeWidth={3} />
                            </button>

                            {/* Botones Móvil (Debajo de la foto) */}
                             <div className="flex md:hidden gap-6 mt-6">
                                <button onClick={anteriorFoto} className="bg-white text-slate-900 p-4 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_#fff] hover:bg-yellow-300 transition-colors">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={siguienteFoto} className="bg-white text-slate-900 p-4 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_#fff] hover:bg-yellow-300 transition-colors">
                                    <ChevronRight size={24} />
                                </button>
                             </div>

                         </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default SchoolCenter;