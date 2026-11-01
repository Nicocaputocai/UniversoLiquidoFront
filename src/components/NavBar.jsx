import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 font-bold text-xl tracking-tight text-amber-600">
            Universo Líquido
          </Link>
          
          {/* Menú Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-zinc-800">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link to="/cursos" className="font-medium text-zinc-700 hover:text-amber-600 transition">Cursos</Link>
            <Link to="/nosotros" className="font-medium text-zinc-700 hover:text-amber-600 transition">Sobre nosotros</Link>
            <Link to="/faq" className="font-medium text-zinc-700 hover:text-amber-600 transition">Preguntas frecuentes</Link>
            <Link to="/contacto" className="font-medium text-zinc-700 hover:text-amber-600 transition">Contactanos</Link>
          </div>
        </div>
      </div>
      
      {/* Menú Mobile Desplegable */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#FDFBF7] border-b border-zinc-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <Link to="/cursos" onClick={closeMenu} className="block font-medium text-lg text-zinc-800">Cursos</Link>
              <Link to="/nosotros" onClick={closeMenu} className="block font-medium text-lg text-zinc-800">Sobre nosotros</Link>
              <Link to="/faq" onClick={closeMenu} className="block font-medium text-lg text-zinc-800">Preguntas frecuentes</Link>
              <Link to="/contacto" onClick={closeMenu} className="block font-medium text-lg text-zinc-800">Contactanos</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}