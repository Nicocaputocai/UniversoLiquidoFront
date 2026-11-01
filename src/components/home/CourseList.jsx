import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, BarChart } from 'lucide-react';

const courses = [
  { 
    id: 1, 
    title: "Bartender Profesional", 
    level: "Principiante", 
    duration: "4 meses",
    desc: "Dominá desde cero las bases de la coctelería clásica y moderna. Preparate para liderar cualquier barra.", 
    temario: ["Manejo de herramientas de barra", "Cristalería y hielos", "Recetario de Coctelería Clásica", "Técnicas de batido y refrescado", "Atención al cliente"] 
  },
  { 
    id: 2, 
    title: "Barista Inicial", 
    level: "Principiante", 
    duration: "2 meses",
    desc: "El arte del café de especialidad. Aprendé sobre extracción perfecta, texturización de leche y calibración.", 
    temario: ["Historia y origen del café", "Calibración de molino", "El espresso perfecto", "Texturización de leche", "Iniciación al Arte Latte"] 
  },
  { 
    id: 3, 
    title: "Coctelería de Autor", 
    level: "Avanzado", 
    duration: "3 meses",
    desc: "Llevá tus creaciones a otro nivel. Creación de almíbares complejos, clarificados y técnicas de vanguardia.", 
    temario: ["Clarificados con leche (Milk Punch)", "Fat Wash (Lavado de grasas)", "Infusiones y maceraciones", "Diseño y rentabilidad de menú", "Garnishes modernos"] 
  },
  { 
    id: 4, 
    title: "Arte Latte Avanzado", 
    level: "Avanzado", 
    duration: "1 mes",
    desc: "Perfeccioná tus diseños y sorprendé a tus clientes con figuras complejas y vertido libre.", 
    temario: ["Técnicas de vertido libre (Free Pour)", "Diseño de Rosetta y Cisne", "Tulipán invertido", "Simetría y contraste", "Solución de errores comunes"] 
  }
];

export default function CourseList() {
  const [expandedCard, setExpandedCard] = useState(null);
  const scrollStartPos = useRef(0);

  const toggleCard = (id, e) => {
    const isClosing = expandedCard === id;
    const isAnotherOpen = expandedCard !== null && !isClosing;
    const cardNode = e.currentTarget.closest('.curso-card');

    if (isClosing) {
      setExpandedCard(null); 
    } else {
      setExpandedCard(id); 
      scrollStartPos.current = window.scrollY; 

      // Ajuste milimétrico para celular
      if (window.innerWidth < 768 && cardNode) {
        // Damos tiempo a que se contraiga la tarjeta anterior si la había
        const delay = isAnotherOpen ? 450 : 150;

        setTimeout(() => {
          const rect = cardNode.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          // Centramos la tarjeta dejando espacio para la barra de navegación (88px)
          const targetY = rect.top + scrollTop - 88;

          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }, delay);
      }
    }
  };

  useEffect(() => {
    if (!expandedCard) return;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const scrollThreshold = isMobile ? 99999 : 250;

      if (Math.abs(window.scrollY - scrollStartPos.current) > scrollThreshold) {
        setExpandedCard(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedCard]);

  return (
    <section id="cursos" className="py-24 px-4 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">Nuestras Formaciones</h2>
        <p className="text-lg text-zinc-600">Elegí el camino que mejor se adapte a tus objetivos.</p>
      </div>

      <div className="relative pb-24 space-y-6 md:space-y-0">
        {courses.map((curso, index) => (
          <motion.div
            key={curso.id}
            layout 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="curso-card w-full shadow-2xl rounded-3xl overflow-hidden bg-white border border-zinc-100 origin-top md:sticky md:mb-6"
            style={{ 
              top: `calc(5rem + ${index * 1.5}rem)`,
              zIndex: 10 + index 
            }}
          >
            {/* Header de la Tarjeta */}
            <div className="bg-zinc-900 p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500 text-zinc-950 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                  {curso.level}
                </span>
                <h3 className="text-3xl font-extrabold">{curso.title}</h3>
              </div>
              <div className="flex gap-4 text-sm font-medium text-zinc-300">
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-amber-500"/> {curso.duration}</span>
                <span className="flex items-center gap-1.5"><BarChart size={16} className="text-amber-500"/> Presencial</span>
              </div>
            </div>
            
            {/* Cuerpo de la Tarjeta */}
            <div className="p-8">
              <p className="text-zinc-600 text-lg mb-6 leading-relaxed">
                {curso.desc}
              </p>
              
              <button 
                onClick={(e) => toggleCard(curso.id, e)}
                className="w-full flex items-center justify-between py-4 px-6 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl font-bold text-zinc-800 transition-colors duration-300"
              >
                <span>Ver temario completo</span>
                <motion.div
                  animate={{ rotate: expandedCard === curso.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-amber-600" />
                </motion.div>
              </button>

              {/* Acordeón del Temario */}
              <AnimatePresence>
                {expandedCard === curso.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4">
                      <h4 className="font-bold text-sm uppercase text-zinc-400 mb-4 tracking-wider">¿Qué vas a aprender?</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {curso.temario.map((item, i) => (
                          <li key={i} className="flex items-start text-zinc-700">
                            <span className="text-amber-500 mr-2 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-end">
                        <a 
                          href="#contacto"
                          className="inline-block bg-amber-500 text-zinc-950 font-bold px-8 py-3 rounded-full hover:bg-amber-400 transition-transform transform hover:-translate-y-1 shadow-md"
                        >
                          Consultar fechas y aranceles
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}