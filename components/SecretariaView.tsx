/**
 * @file SecretariaView.tsx
 * @description VISTA: SECRETARÍA Y ADMINISTRACIÓN.
 * 
 * Centraliza la información de contacto, ubicación y trámites.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Printer, Clock, MapPin, ExternalLink, Users, Heart, Info, DollarSign } from 'lucide-react';

import BrutalCard from './ui/BrutalCard';
import BrutalButton from './ui/BrutalButton';


// =============================================================================
// DATOS DE CONTACTO Y CONFIGURACIÓN
// =============================================================================

const DATOS_CONTACTO = {
    telefono: "955 83 95 95",
    email:    "41007904.edu@g.educaand.es",
    fax:      "955 83 96 01",
    horario:  { manana: "8.00 - 14.30h", tarde: "15.15 - 21.30h" },
    
    // Dirección exacta para Google Maps
    direccion: {
        texto: "Paseo de Consolación, S/N, 41710 - Utrera (Sevilla)",
        // Enlace para abrir la aplicación de mapas del móvil
        urlGoogleMaps: "https://www.google.com/maps/search/?api=1&query=IES+Virgen+de+Consolación+Utrera+Paseo+de+Consolación"
    },

    // Enlace oficial de la Junta
    urlSecretariaVirtual: "https://www.juntadeandalucia.es/educacion/secretariavirtual/"
};


// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const SecretariaView: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 bg-yellow-50">
      <div className="max-w-6xl mx-auto">
        
        {/* --- 1. CABECERA --- */}
        <div className="mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-orange-400 text-white px-4 py-1 rounded-lg font-black text-sm mb-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000]"
          >
            SECRETARÍA Y GESTIÓN
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            TRÁMITES Y <span className="text-blue-600 text-outline-black">CONTACTO</span>
          </motion.h1>
          
          <p className="text-xl md:text-2xl font-bold text-slate-700 max-w-2xl leading-tight">
            Toda la información administrativa, horarios de atención y el espacio para las familias de nuestro centro.
          </p>
        </div>


        {/* --- 2. TARJETAS DE CONTACTO ACCIONABLES --- */}
        {/* Al hacer clic, el navegador intenta realizar la acción (Llamar, Email...) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Teléfono (Clic para llamar) */}
          <TarjetaContacto 
            icon={<Phone className="text-blue-600" size={24} />} 
            label="TELÉFONO" 
            value={DATOS_CONTACTO.telefono} 
            accion={`tel:${DATOS_CONTACTO.telefono.replace(/\s/g, '')}`} // Quitamos espacios para el protocolo tel:
            color="bg-blue-100"
          />
          
          {/* Email (Clic para escribir) */}
          <TarjetaContacto 
            icon={<Mail className="text-green-600" size={24} />} 
            label="EMAIL" 
            value={DATOS_CONTACTO.email} 
            accion={`mailto:${DATOS_CONTACTO.email}`}
            color="bg-green-100"
            esEmail={true} // Ajusta el tamaño de fuente
          />
          
          
          {/* Horario (Solo lectura) */}
          <TarjetaContacto 
            icon={<Clock className="text-orange-600" size={24} />} 
            label="HORARIO" 
            value={`Mañana: ${DATOS_CONTACTO.horario.manana}`}
            extra={`Tarde: ${DATOS_CONTACTO.horario.tarde}`} 
            color="bg-orange-100"
          />
        </div>


        {/* --- 3. UBICACIÓN Y TRÁMITES ONLINE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            
            {/* COLUMNA IZQUIERDA: MAPA */}
            <div className="lg:col-span-2">
                <BrutalCard className="p-0 h-full overflow-hidden flex flex-col" color="bg-white">
                    {/* Barra superior estilo ventana */}
                    <div className="bg-slate-900 text-white p-4 font-black flex items-center gap-2">
                        <MapPin size={20} className="text-blue-400" />
                        UBICACIÓN DEL CENTRO
                    </div>
                    
                    {/* IFRAME de Google Maps */}
                    {/* 'pb' en la URL suele referirse a identificadores, usamos la búsqueda por query para asegurar la ubicación correcta */}
                    <div className="w-full flex-1 min-h-[400px]">
                        <iframe 
                            title="Mapa de Ubicación IES Virgen de Consolación"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.509748684716!2d-5.776602024520339!3d37.18809937213689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd12850dc768407d%3A0xc48421c436b69b66!2sP.%C2%BA%20de%20Consolaci%C3%B3n%2C%2041710%20Utrera%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* Pie del mapa con botón externo */}
                    <div className="p-6 font-bold text-slate-600 border-t-2 border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
                        <div className="flex items-center gap-2 text-sm md:text-base">
                            <MapPin size={18} className="flex-shrink-0" />
                            <span>{DATOS_CONTACTO.direccion.texto}</span>
                        </div>
                        
                        <a href={DATOS_CONTACTO.direccion.urlGoogleMaps} target="_blank" rel="noopener noreferrer">
                            <BrutalButton variant="outline" size="sm" icon={<ExternalLink size={16}/>}>
                                Ver en Google Maps
                            </BrutalButton>
                        </a>
                    </div>
                </BrutalCard>
            </div>


            {/* COLUMNA DERECHA: TRÁMITES */}
            <div className="flex flex-col h-full">
                <BrutalCard className="p-8 bg-blue-600 text-white flex-1 flex flex-col justify-between" hoverEffect={true}>
                    <div>
                        <h3 className="text-3xl font-black mb-4 leading-tight">
                            SECRETARÍA VIRTUAL
                        </h3>
                        <p className="font-bold mb-8 text-blue-100 text-lg leading-relaxed">
                            Accede a la plataforma oficial de la Junta de Andalucía para realizar todos tus trámites administrativos sin desplazamientos.
                        </p>
                        
                        {/* Lista de trámites comunes */}
                        <ul className="space-y-4 mb-8">
                            {['Matriculación / Sobre Electrónico', 'Solicitud de Becas', 'Admisión en Ciclos', 'Consulta de calificaciones'].map(tramite => (
                                <li key={tramite} className="flex items-center gap-3 font-black border-b border-blue-400 pb-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0px_0px_5px_rgba(250,204,21,0.8)]"></div>
                                    <span className="text-sm md:text-base uppercase tracking-wide">{tramite}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Botón de Enlace Externo */}
                    <a 
                        href={DATOS_CONTACTO.urlSecretariaVirtual} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full"
                    >
                        <BrutalButton variant="secondary" className="w-full justify-center">
                            ACCEDER AHORA <ExternalLink size={18} className="ml-2"/>
                        </BrutalButton>
                    </a>
                </BrutalCard>
            </div>
        </div>


        {/* --- 4. SECCIÓN AMPA --- */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-[12px_12px_0px_0px_#cbd5e1]">
            <div className="relative z-10">
                
                {/* Cabecera AMPA */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-red-500 text-white border-2 border-white px-4 py-1 rounded-full font-black text-xs mb-4 inline-block"
                        >
                            FAMILIAS UNIDAS
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                            EL <span className="text-orange-500 underline decoration-white underline-offset-8 decoration-4">AMPA</span>
                        </h2>
                    </div>
                    
                    {/* Nota decorativa tipo "Post-it" */}
                    <BrutalCard className="p-4 bg-white text-slate-900 md:rotate-3 shadow-[8px_8px_0px_0px_#ef4444]">
                        <p className="font-black text-xl italic leading-none uppercase text-center">
                            "Juntos por la <br/>educación de <br/>nuestros hijos"
                        </p>
                    </BrutalCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Columna Texto */}
                    <div className="space-y-10">
                        <PuntoInfoAMPA 
                            icon={<Info size={24} className="text-blue-400" />}
                            titulo="¿Qué es el AMPA?"
                            texto="Es una asociación sin ánimo de lucro formada por las madres y los padres de todo el alumnado del instituto. Un punto de encuentro y trabajo independiente, abierto y plural."
                        />
                        <PuntoInfoAMPA 
                            icon={<Heart size={24} className="text-red-400" />}
                            titulo="¿Por qué es importante?"
                            texto="Somos corresponsables de la educación que nuestros hijos reciben. Es el único espacio de participación autónomo para aportar iniciativas y trabajar con la dirección del Centro."
                        />
                        <PuntoInfoAMPA 
                            icon={<Users size={24} className="text-green-400" />}
                            titulo="¿Cómo participar?"
                            texto="Participar es muy fácil: asiste a las asambleas, colabora en grupos de trabajo o simplemente propón tus ideas para mejorar el instituto."
                        />
                    </div>
                    
                    {/* Columna Caja Informativa */}
                    <div className="bg-white/5 border-2 border-white/20 p-8 rounded-3xl backdrop-blur-sm flex flex-col justify-center">
                        <h3 className="text-3xl font-black mb-8 border-b-2 border-orange-500 pb-4 text-orange-100">
                            INFORMACIÓN CLAVE
                        </h3>
                        
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="bg-orange-500 p-3 rounded-2xl h-fit border-2 border-white shrink-0">
                                    <DollarSign size={24} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl text-orange-500 mb-2">FINANCIACIÓN</h4>
                                    <p className="font-bold text-slate-300 leading-snug">
                                        Se financia exclusivamente a través de las cuotas de socios. Es la única vía para gestionar beneficios exclusivos para la comunidad educativa y realizar actividades extraescolares.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="bg-blue-500 p-3 rounded-2xl h-fit border-2 border-white shrink-0">
                                    <Info size={24} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl text-blue-500 mb-2">OBJETIVO</h4>
                                    <p className="font-bold text-slate-300 leading-snug">
                                        Defender una educación de calidad, democrática y crítica, promoviendo la participación activa en la vida del centro.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Elementos Decorativos de Fondo (Blur) */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[30%] aspect-square bg-orange-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
};


// =============================================================================
// SUB-COMPONENTES AUXILIARES
// =============================================================================

/**
 * Tarjeta de contacto que detecta si debe comportarse como un enlace o solo texto.
 */
interface ContactProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    extra?: string; // Info adicional (ej: horario tarde)
    color: string;
    accion?: string; // Enlace (tel:..., mailto:...)
    esEmail?: boolean; // Para ajustar tamaño fuente si es muy largo
}

const TarjetaContacto: React.FC<ContactProps> = ({ icon, label, value, extra, color, accion, esEmail = false }) => {
    
    // Contenido visual común
    const contenido = (
        <div className="flex flex-col items-center text-center gap-4 h-full">
            <div className="bg-white border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                {icon}
            </div>
            <div>
                <span className="font-black text-xs text-slate-500 uppercase tracking-widest block mb-1">
                    {label}
                </span>
                
                {/* Si es email largo, reducimos la fuente, si no, grande */}
                <h3 className={`font-black ${esEmail ? 'text-xs md:text-sm break-all' : 'text-xl'} text-slate-900 leading-tight`}>
                    {value}
                </h3>
                
                {extra && (
                    <p className="font-bold text-slate-600 text-sm mt-1 border-t border-slate-300 pt-1">
                        {extra}
                    </p>
                )}
            </div>
        </div>
    );

    // Si tiene acción (href), envolvemos en <a>, si no, solo mostramos el div
    return (
        <BrutalCard className={`p-6 ${color} h-full`} hoverEffect={true}>
            {accion ? (
                <a 
                    href={accion} 
                    className="block w-full h-full hover:opacity-80 transition-opacity"
                    aria-label={`Acción: ${label}`}
                >
                    {contenido}
                </a>
            ) : (
                contenido
            )}
        </BrutalCard>
    );
};

/**
 * Puntos informativos para la sección del AMPA
 */
const PuntoInfoAMPA = ({ icon, titulo, texto }: { icon: any, titulo: string, texto: string }) => (
    <motion.div 
        className="flex gap-6 items-start"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
    >
        <div className="flex-shrink-0 bg-white border-2 border-slate-900 p-3 rounded-2xl h-fit shadow-[4px_4px_0px_0px_#ef4444]">
            {icon}
        </div>
        <div>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-orange-500">
                {titulo}
            </h3>
            <p className="font-bold text-slate-300 leading-snug">
                {texto}
            </p>
        </div>
    </motion.div>
)

export default SecretariaView;