import { motion } from 'framer-motion';
import { User, Phone, Mail, BookOpen, Send } from 'lucide-react';

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego agregaremos la lógica para enviar el formulario (ej. a WhatsApp o un email)
    alert("¡Consulta enviada!");
  };

  return (
    <section id="contacto" className="pt-32 pb-24 px-4 bg-zinc-900 text-zinc-100 relative z-20 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.3)]">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            ¿Listo para empezar?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            Dejanos tus datos y te enviamos las fechas de inicio, aranceles y temarios completos.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-800/50 p-8 md:p-10 rounded-3xl border border-zinc-700/50 backdrop-blur-sm shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Nombre completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-zinc-500" />
                  </div>
                  <input 
                    type="text" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-zinc-100 placeholder:text-zinc-600" 
                    placeholder="Ej. Juan Pérez" 
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={18} className="text-zinc-500" />
                  </div>
                  <input 
                    type="tel" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-zinc-100 placeholder:text-zinc-600" 
                    placeholder="+54 9 11..." 
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Correo electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-zinc-500" />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-zinc-100 placeholder:text-zinc-600" 
                  placeholder="tu@email.com" 
                />
              </div>
            </div>

            {/* Selector de Curso */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">¿Qué formación te interesa?</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BookOpen size={18} className="text-zinc-500" />
                </div>
                <select 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-zinc-100 appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>Seleccioná un curso</option>
                  <option value="bartender">Bartender Profesional</option>
                  <option value="barista">Barista Inicial</option>
                  <option value="cocteleria-autor">Coctelería de Autor</option>
                  <option value="arte-latte">Arte Latte Avanzado</option>
                </select>
              </div>
            </div>

            {/* Botón Submit */}
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 mt-4 bg-amber-500 text-zinc-950 font-extrabold text-lg py-4 rounded-xl hover:bg-amber-400 transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              <Send size={20} />
              <span>Solicitar Información</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}