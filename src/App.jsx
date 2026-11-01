import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/home/Hero';
import MetricsAndSkills from './components/home/Metrics&Skills';
import CourseList from './components/home/CourseList';
import ContactForm from './components/home/ContactForm';

export default function App() {
  return (
    <Router>
      <div 
        className="min-h-screen text-zinc-800 font-sans flex flex-col"
        style={{ 
          backgroundColor: '#FDFBF7', 
          backgroundImage: 'radial-gradient(#d4c4b7 1px, transparent 1px)', 
          backgroundSize: '12px 12px' 
        }}
      >
        <NavBar />
        <Hero />
        <MetricsAndSkills />
        <CourseList />
        <ContactForm />
        {/* El contenido principal que cambia según la ruta */}
        <main className="flex-grow pt-16">

        </main>
      </div>
    </Router>
  );
}