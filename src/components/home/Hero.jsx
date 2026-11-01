import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Asegurate de que la ruta coincida con donde guardaste Hero.jpg
import heroImg from '../../assets/Hero.jpg';

const DynamicText = () => {
  const words = ["Barista", "Bartender"];
const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWordIndex = loopNum % words.length;
      const fullText = words[currentWordIndex];

      if (isDeleting) {
        // Borrando letra a letra
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(75); // Velocidad al borrar (más rápido)
      } else {
        // Escribiendo letra a letra
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150); // Velocidad al escribir
      }
      // Lógica de pausas
      if (!isDeleting && text === fullText) {
        // Pausa cuando termina de escribir la palabra completa
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        // Pasa a la siguiente palabra cuando termina de borrar
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pausa antes de empezar la nueva palabra
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

 return (
   // Aumentamos el min-w a 280px para que la palabra más larga entre sin mover el resto
<span className="text-amber-500 font-bold inline-block min-w-[280px] md:min-w-[320px] text-left">
      {text}
      <span className="animate-pulse text-amber-500 font-normal">|</span>
    </span>
  );
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-900">
      
      {/* Capa 1: Imagen de fondo difuminada */}
      <img 
        src={heroImg} 
        alt="Arte Latte" 
        className="absolute inset-0 w-full h-full object-cover blur-[6px] scale-110"
      />
      
      {/* Capa 2: Filtro oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Capa 3: Contenido (Z-index superior) */}
      <div className="relative z-10 text-center px-4 max-w-4xl mt-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
          Tu carrera como <br className="md:hidden" />
          <DynamicText /> <br />
          comienza aquí
        </h1>
        <p className="text-lg md:text-2xl text-zinc-200 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Formación profesional intensiva. Aprendé técnicas reales para trabajar en las mejores barras y cafeterías.
        </p>
        <a 
          href="#cursos" 
          className="inline-block bg-amber-500 text-zinc-950 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:bg-amber-400 transition transform hover:-translate-y-1"
        >
          Ver formaciones
        </a>
      </div>
    </section>
  );
}