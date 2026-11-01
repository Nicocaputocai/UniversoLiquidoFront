import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
// Cambiamos Briefcase por Award
import { GlassWater, Coffee, Award } from 'lucide-react';

// --- COMPONENTE DEL CONTADOR ANIMADO ---
const AnimatedCounter = ({ end, duration = 2, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60); 
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-extrabold text-amber-500 tracking-tight">
      {count}{suffix}
    </span>
  );
};

export default function MetricsAndSkills() {
  return (
    // Agregamos el bg-[#FDFBF7] y relative z-10 para tapar los puntitos
    <section id="nosotros" className="py-20 px-4 bg-[#FDFBF7] relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- SECCIÓN DE SKILLS --- */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 mb-16">
          ¿Por qué estudiar en Universo Líquido?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center bg-white/90 backdrop-blur-md rounded-3xl p-10 border border-zinc-200 shadow-xl shadow-zinc-200/50">
          {/* Skill 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-zinc-600 rounded-full w-24 h-24 flex items-center justify-center mb-6 shadow-lg">
              <GlassWater size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">Práctica 100% Real</h3>
            <p className="text-zinc-600 text-lg">Insumos de primera línea desde la primera clase.</p>
          </div>

          {/* Skill 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-zinc-600 rounded-full w-24 h-24 flex items-center justify-center mb-6 shadow-lg">
              <Coffee size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">Instructores Activos</h3>
            <p className="text-zinc-600 text-lg">Aprendé de profesionales líderes del sector.</p>
          </div>

          {/* Skill 3 (Actualizado) */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-zinc-600 rounded-full w-24 h-24 flex items-center justify-center mb-6 shadow-lg">
              <Award size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">Certificación Oficial</h3>
            <p className="text-zinc-600 text-lg">Obtené tu diploma al finalizar la cursada.</p>
          </div>
        </div>

        {/* --- SECCIÓN DE MÉTRICAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center bg-white/50 backdrop-blur-sm rounded-3xl p-10 border border-zinc-200 shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <AnimatedCounter end={2500} />
            <p className="text-zinc-500 font-bold text-lg mt-3 uppercase tracking-wider">Alumnos Recibidos</p>
          </div>
          
          <div className="flex flex-col items-center justify-center md:border-x md:border-zinc-300">
            <AnimatedCounter end={500} />
            <p className="text-zinc-500 font-bold text-lg mt-3 uppercase tracking-wider">Cursos Dictados</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <AnimatedCounter end={10} suffix=" Años" />
            <p className="text-zinc-500 font-bold text-lg mt-3 uppercase tracking-wider">De Experiencia</p>
          </div>
        </div>

      </div>
    </section>
  );
}