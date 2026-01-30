/**
 * @file Footer.tsx
 * @description PIE DE PÁGINA
 * 
 * Este componente cierra la web. Muestra información de contacto crítica, 
 * redes sociales y enlaces rápidos a herramientas externas (Moodle, Séneca, etc.).
 */

import React from 'react';
import { Github, Twitter, Instagram, MapPin, Phone, Mail, LucideIcon } from 'lucide-react';

/* 
 * =================================================================================
 *  CONFIGURACIÓN DEL PIE DE PÁGINA
 *  Edita aquí los datos de contacto y enlaces. No necesitas tocar el código HTML.
 * =================================================================================
 */

const CONFIGURACION_PIE = {
  
  // Identidad del Centro
  nombre: "IES VIRGEN DE CONSOLACIÓN",
  descripcion: "Formando profesionales y personas con futuro. Innovación, tecnología y creatividad en el corazón de Utrera.",
  
  // Información de Contacto
  contacto: {
    // Puedes añadir más líneas a la dirección si es necesario.
    direccion: [
      "P.º de Consolación, 3",
      "41710 Utrera, Sevilla"
    ],
    telefono: "955 83 95 65",
    email:    "41007904.edu@juntadeandalucia.es"
  },

  // Enlaces de Interés (Columna Derecha)
  enlaces: [
    { label: 'Secretaría Virtual', url: 'https://www.juntadeandalucia.es/educacion/secretariavirtual/' },
    { label: 'Plataforma Moodle',  url: 'https://educacionadistancia.juntadeandalucia.es/centros/' },
    { label: 'iPasen',             url: 'https://seneca.juntadeandalucia.es/seneca/jsp/portal/' },
    { label: 'Oferta Educativa',   url: '#oferta-educativa' }, // Enlace interno (dentro de la misma página)
    { label: 'Erasmus+',           url: 'https://erasmus-plus.ec.europa.eu/es' },
  ],

  // Redes Sociales
  redesSociales: [
    { label: 'Twitter',   url: 'https://x.com/IESVdeC', icon: Twitter },
    { label: 'Instagram', url: 'https://www.instagram.com/iesvirgendeconsolacion/?hl=es', icon: Instagram },
    { label: 'GitHub',    url: 'https://github.com/javiercodev', icon: Github },
  ],

  // Créditos finales
  copyright: "© 2026 IES Virgen de Consolación.",
  autoria: "Diseñado por el departamento de informática del centro."
};


/* 
 * =================================================================================
 *  COMPONENTE VISUAL
 * =================================================================================
 */

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 border-t-2 border-slate-900 text-white pt-16 pb-8 px-4 mt-12 relative overflow-hidden">
      
      {/* 
         ELEMENTO DECORATIVO: PATRÓN DE PUNTOS
         Crea una textura sutil de fondo. 'pointer-events-none' asegura que no interfiera con los clics.
      */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
            backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
        }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- GRID PRINCIPAL (3 Columnas) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* 
              COLUMNA 1: IDENTIDAD Y REDES
              Ocupa la mitad del ancho en pantallas grandes (md:col-span-2)
            */}
            <div className="col-span-1 md:col-span-2">
                
                {/* Nombre del centro tipo "etiqueta" */}
                <div className="inline-block bg-white text-blue-600 border-2 border-slate-900 px-4 py-2 rounded-xl font-black text-2xl mb-6 shadow-[4px_4px_0px_0px_#0f172a]">
                    {CONFIGURACION_PIE.nombre}
                </div>
                
                <p className="font-medium text-blue-100 max-w-sm mb-6">
                    {CONFIGURACION_PIE.descripcion}
                </p>
                
                {/* Botones de Redes Sociales */}
                <div className="flex gap-4">
                    {CONFIGURACION_PIE.redesSociales.map((social, i) => (
                        <a 
                            key={i} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer" /* Importante para seguridad y rendimiento al abrir pestañas nuevas */
                            className="w-10 h-10 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900 hover:bg-yellow-400 transition-colors"
                            aria-label={`Visitar nuestro perfil de ${social.label}`} /* Accesibilidad para lectores de pantalla */
                        >
                            <social.icon size={20} strokeWidth={2.5} />
                        </a>
                    ))}
                </div>
            </div>

            {/* 
              COLUMNA 2: DATOS DE CONTACTO 
            */}
            <div>
                <h4 className="font-black text-xl mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                  CONTACTO
                </h4>
                
                <ul className="space-y-4 font-bold">
                    {/* Dirección Postal */}
                    <li className="flex items-start gap-3">
                        <MapPin className="mt-1 flex-shrink-0" /> {/* shrink-0 evita que el icono se aplaste si el texto es largo */}
                        <span>
                            {CONFIGURACION_PIE.contacto.direccion.map((linea, index) => (
                                <React.Fragment key={index}>
                                    {linea}
                                    {/* Añadimos un salto de línea si NO es la última línea */}
                                    {index < CONFIGURACION_PIE.contacto.direccion.length - 1 && <br/>}
                                </React.Fragment>
                            ))}
                        </span>
                    </li>
                    
                    {/* Teléfono (Click para llamar) */}
                    <li className="flex items-center gap-3">
                        <Phone />
                        <a 
                          // Quitamos los espacios en blanco del número para el protocolo tel: (ej: "955 83..." -> "95583...")
                          href={`tel:${CONFIGURACION_PIE.contacto.telefono.replace(/\s/g, '')}`} 
                          className="hover:text-yellow-300"
                        >
                            {CONFIGURACION_PIE.contacto.telefono}
                        </a>
                    </li>
                    
                    {/* Email (Click para escribir) */}
                    <li className="flex items-center gap-3 break-all"> {/* break-all evita que un email largo rompa el diseño móvil */}
                        <Mail />
                        <a 
                          href={`mailto:${CONFIGURACION_PIE.contacto.email}`} 
                          className="hover:text-yellow-300"
                        >
                            {CONFIGURACION_PIE.contacto.email}
                        </a>
                    </li>
                </ul>
            </div>

            {/* 
              COLUMNA 3: ENLACES RÁPIDOS 
            */}
            <div>
                 <h4 className="font-black text-xl mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                    ENLACES
                 </h4>
                 
                 <ul className="space-y-3 font-bold text-blue-100">
                    {CONFIGURACION_PIE.enlaces.map((link) => (
                        <li key={link.label}>
                            <a 
                                href={link.url} 
                                // Animaciones suaves al pasar el ratón (subrayado y color)
                                className="hover:text-yellow-300 hover:underline decoration-2 underline-offset-4 transition-all"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                 </ul>
            </div>

        </div> {/* Fin del Grid Principal */}


        {/* --- BARRA INFERIOR (COPYRIGHT) --- */}
        <div className="border-t-2 border-blue-500 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold opacity-80 text-center md:text-left">
            <p>{CONFIGURACION_PIE.copyright}</p>
            <p>{CONFIGURACION_PIE.autoria}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;