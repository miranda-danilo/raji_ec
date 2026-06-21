import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Globe, Users, Target, 
  Rocket, BookOpen, Briefcase, HeartHandshake, 
  Award, TrendingUp, Lightbulb, Mail, ArrowRight,
  ShieldCheck, MonitorSmartphone, Megaphone, 
  Landmark, Palette, UserCheck, MessageCircle, Phone,
  MapPin, Navigation, Info, Calendar, User, Map
} from 'lucide-react';

const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '', once = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.15 }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [once]);

  const baseClasses = `transition-all duration-1000 ease-[cubic-bezier(0.17,0.55,0.55,1)] ${className}`;
  
  let transformClass = '';
  if (!isVisible) {
    if (direction === 'up') transformClass = 'opacity-0 translate-y-10';
    else if (direction === 'down') transformClass = 'opacity-0 -translate-y-10';
    else if (direction === 'left') transformClass = 'opacity-0 -translate-x-10';
    else if (direction === 'right') transformClass = 'opacity-0 translate-x-10';
    else if (direction === 'scale') transformClass = 'opacity-0 scale-95';
  } else {
    transformClass = 'opacity-100 translate-y-0 translate-x-0 scale-100';
  }

  return (
    <div ref={domRef} className={`${baseClasses} ${transformClass}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const provinciasEcuador = [
  { 
    id: 'imbabura', name: 'Imbabura', active: true, color: 'emerald', top: '16%', left: '46%',
    flag: '/assets/flags/bandera-imbabura.png',
    description: 'Coordinación norte enfocada en interculturalidad, desarrollo comunitario y derechos humanos.',
    cantons: [
      { name: 'Otavalo', flag: '/assets/flags/bandera-otavalo.png' },
      { name: 'Ibarra', flag: '/assets/flags/bandera-ibarra.png' }
    ]
  },
  { 
    id: 'pichincha', name: 'Pichincha', active: true, color: 'cyan', top: '28%', left: '46%',
    flag: '/assets/flags/bandera-pichincha.png',
    description: 'Coordinación de enlace gubernamental, debates de gestión pública y proyectos de innovación política.',
    cantons: [
      { name: 'Quito', flag: '/assets/flags/bandera-quito.png' }
    ]
  },
  { 
    id: 'manabi', name: 'Manabí', active: true, color: 'blue', top: '42%', left: '22%',
    flag: '/assets/flags/bandera-manabi.png',
    description: 'Sede central de coordinación, enfocada en desarrollo sostenible costero y liderazgo juvenil.',
    cantons: [
      { name: 'Jipijapa', flag: '/assets/flags/bandera-jipijapa.png' }
    ]
  },
  { 
    id: 'azuay', name: 'Azuay', active: true, color: 'pink', top: '72%', left: '42%',
    flag: '/assets/flags/bandera-azuay.png',
    description: 'Centro de desarrollo cultural, arte para el cambio social y promoción de los derechos humanos.',
    cantons: [
      { name: 'Cuenca', flag: '/assets/flags/bandera-cuenca.png' }
    ]
  },
  
  // Provincias Próximamente (Sin banderas por ahora)
  { id: 'carchi', name: 'Carchi', active: false, top: '10%', left: '50%' },
  { id: 'esmeraldas', name: 'Esmeraldas', active: false, top: '15%', left: '26%' },
  { id: 'sucumbios', name: 'Sucumbíos', active: false, top: '18%', left: '68%' },
  { id: 'napo', name: 'Napo', active: false, top: '32%', left: '58%' },
  { id: 'orellana', name: 'Orellana', active: false, top: '35%', left: '72%' },
  { id: 'cotopaxi', name: 'Cotopaxi', active: false, top: '34%', left: '44%' },
  { id: 'tungurahua', name: 'Tungurahua', active: false, top: '38%', left: '48%' },
  { id: 'pastaza', name: 'Pastaza', active: false, top: '48%', left: '65%' },
  { id: 'los-rios', name: 'Los Ríos', active: false, top: '46%', left: '30%' },
  { id: 'bolivar', name: 'Bolívar', active: false, top: '50%', left: '36%' },
  { id: 'chimborazo', name: 'Chimborazo', active: false, top: '53%', left: '42%' },
  { id: 'guayas', name: 'Guayas', active: false, top: '58%', left: '28%' },
  { id: 'canar', name: 'Cañar', active: false, top: '62%', left: '40%' },
  { id: 'el-oro', name: 'El Oro', active: false, top: '75%', left: '26%' },
  { id: 'loja', name: 'Loja', active: false, top: '82%', left: '33%' },
  { id: 'zamora', name: 'Zamora Chinchipe', active: false, top: '82%', left: '48%' },
  { id: 'morona', name: 'Morona Santiago', active: false, top: '62%', left: '62%' },
  { id: 'santaelena', name: 'Santa Elena', active: false, top: '58%', left: '14%' },
  { id: 'galapagos', name: 'Galápagos', active: false, top: '10%', left: '8%', isIsland: true }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProv, setActiveProv] = useState(provinciasEcuador[0]);

  useEffect(() => {
    document.documentElement.style.backgroundColor = '#020b14';
    document.body.style.backgroundColor = '#020b14';
    document.body.style.overflowX = 'hidden';

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020b14] font-sans text-slate-200 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {}
      <nav className={`fixed w-full z-50 py-4 transition-all duration-300 ${isScrolled ? 'bg-[#020b14]/95 backdrop-blur-xl shadow-xl' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer">
            <img 
              src="/assets/image.png" 
              alt="Logo RAJI" 
              className="h-10 w-10 object-cover rounded-xl border border-cyan-500/30"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=RAJI'; }}
            />
            <span className="font-extrabold text-sm md:text-lg tracking-wider text-white">COORDINACIÓN ECUADOR</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#nosotros" className="font-semibold text-slate-300 hover:text-cyan-400 transition-colors text-sm xl:text-base">Nosotros</a>
            <a href="#objetivos" className="font-semibold text-slate-300 hover:text-cyan-400 transition-colors text-sm xl:text-base">Objetivos</a>
            <a href="#alianzas" className="font-semibold text-slate-300 hover:text-cyan-400 transition-colors text-sm xl:text-base">Alianzas</a>
            <a href="#cobertura" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors text-sm xl:text-base flex items-center gap-1">
              <MapPin size={16} /> Cobertura
            </a>
            <a href="#proyectos" className="font-semibold text-slate-300 hover:text-cyan-400 transition-colors text-sm xl:text-base">Proyectos</a>
            <a href="#unete" className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2 group text-sm xl:text-base">
              Únete a RAJI <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button 
            className="lg:hidden p-2 text-white hover:text-cyan-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú Móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#031120] flex flex-col p-6 gap-4 shadow-2xl">
            <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 font-semibold text-lg p-2 hover:text-cyan-400">Nosotros</a>
            <a href="#objetivos" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 font-semibold text-lg p-2 hover:text-cyan-400">Objetivos</a>
            <a href="#alianzas" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 font-semibold text-lg p-2 hover:text-cyan-400">Alianzas</a>
            <a href="#cobertura" onClick={() => setMobileMenuOpen(false)} className="text-cyan-400 font-semibold text-lg p-2 hover:text-cyan-300">Cobertura Nacional</a>
            <a href="#proyectos" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 font-semibold text-lg p-2 hover:text-cyan-400">Proyectos</a>
            <a href="#unete" onClick={() => setMobileMenuOpen(false)} className="bg-cyan-600 text-white px-6 py-3 rounded-xl font-bold text-center mt-2">Únete a RAJI</a>
          </div>
        )}
      </nav>

      {}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden w-full">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" 
            alt="Jóvenes líderes" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020b14] via-[#020b14]/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            
            <ScrollReveal direction="down" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020b14]/90 border border-cyan-500/50 text-cyan-300 font-semibold text-sm md:text-base mb-8 shadow-lg">
                <ShieldCheck size={18} className="text-emerald-400" />
                Acreditados por la Federación para la Paz Universal (UPF-ONU)
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tighter">
                <span className="text-white drop-shadow-md text-6xl lg:text-8xl">RAJI</span> <br />
                <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100">Coordinación de Ecuador</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
              <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                Red de Acción Juvenil Internacional. Liderazgo, Participación y Empoderamiento para el <strong className="text-emerald-400 font-bold">Desarrollo Sostenible</strong> y la <strong className="text-cyan-400 font-bold">Justicia Social.</strong>
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="scale" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#unete" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1">
                  Únete a RAJI <ChevronRight size={20} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <main className="flex-grow w-full">
        
        {}
        <section id="nosotros" className="py-20 relative bg-[#041527] w-full">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-800 to-transparent"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              
              <ScrollReveal direction="left" delay={100} className="h-full">
                <div className="bg-[#020b14] h-full p-8 md:p-10 rounded-3xl border border-cyan-900/50 hover:border-cyan-500/50 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-600/10 rounded-full blur-2xl"></div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">¿Quiénes Somos?</h2>
                  <p className="text-slate-300 leading-relaxed text-lg mb-6 font-medium">
                    <strong className="text-white">RAJI-Organización Juvenil Internacional</strong> es una organización dedicada a la formación y empoderamiento de líderes en temas de emprendimiento, gestión pública y ODS.
                  </p>
                  <div className="space-y-4">
                    <p className="text-cyan-400 font-bold mb-4">Buscamos impulsar la democracia y la justicia social a través de:</p>
                    <ListItem icon={<BookOpen size={20}/>} text="Capacitación estratégica e incidencia política." />
                    <ListItem icon={<ShieldCheck size={20}/>} text="Defensa activa de los Derechos Humanos." />
                    <ListItem icon={<Globe size={20}/>} text="Promoción del desarrollo sostenible global." />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={200} className="h-full">
                <div className="bg-[#020b14] h-full p-8 md:p-10 rounded-3xl border border-emerald-900/50 hover:border-emerald-500/50 transition-colors relative overflow-hidden">
                   <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl"></div>
                  <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Conectando Líderes Globales</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Nuestra Visión</h2>
                  <p className="text-slate-300 leading-relaxed text-lg mb-6 font-medium">
                    Impactamos a la sociedad promoviendo el desarrollo personal y comunitario a través del compromiso con el cambio social.
                  </p>
                  <div className="bg-[#041527] p-5 rounded-xl border border-slate-800">
                    <p className="text-slate-300 leading-relaxed font-medium">
                      Establecemos puentes entre jóvenes políticos a nivel mundial para fortalecer su liderazgo y generar un impacto positivo y duradero en la sociedad civil.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {}
        <section id="objetivos" className="py-20 relative bg-[#020b14] w-full">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Objetivos Estratégicos</h2>
                <div className="h-1 w-16 bg-cyan-500 mx-auto rounded-full"></div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ScrollReveal direction="up" delay={100}><CardBox icon={<BookOpen size={24}/>} title="Educación Integral" desc="Brindar herramientas en liderazgo político y gobernanza." color="cyan" /></ScrollReveal>
              <ScrollReveal direction="up" delay={200}><CardBox icon={<Globe size={24}/>} title="Networking Global" desc="Establecer conexiones entre instituciones y referentes." color="emerald" /></ScrollReveal>
              <ScrollReveal direction="up" delay={300}><CardBox icon={<MonitorSmartphone size={24}/>} title="Innovación Digital" desc="Organizar eventos digitales de soluciones innovadoras." color="blue" /></ScrollReveal>
              <ScrollReveal direction="up" delay={400}><CardBox icon={<Users size={24}/>} title="Empoderamiento" desc="Impulsar la participación activa de las mujeres." color="pink" /></ScrollReveal>
            </div>
          </div>
        </section>

        {}
        <section id="alianzas" className="py-24 bg-[#041527] relative w-full overflow-hidden border-y border-cyan-900/30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Alianzas Estratégicas</h2>
                <p className="text-lg text-slate-300 font-medium mb-8">
                  Colaboramos con las instituciones y organizaciones más prestigiosas para potenciar el impacto de nuestros miembros.
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full"></div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <ScrollReveal direction="up" delay={100}><AllianceBadge name="Jóvenes Juntos" highlight color="cyan" /></ScrollReveal>
              <ScrollReveal direction="up" delay={200}><AllianceBadge name="FEUE" highlight color="emerald" /></ScrollReveal>
              <ScrollReveal direction="up" delay={300}><AllianceBadge name="UPF - ONU" highlight color="cyan" /></ScrollReveal>
            </div>
          </div>
        </section>

        {}
        <section id="estructura" className="py-20 relative bg-[#020b14] w-full">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Estructura y Roles</h2>
                <p className="text-lg text-slate-300 font-medium">
                  Una red sólida y organizada. Descubre cómo operamos a nivel nacional e internacional para garantizar el éxito de nuestros proyectos.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ScrollReveal direction="up" delay={100}>
                <div className="bg-[#031120] p-8 rounded-3xl border border-cyan-900/50 hover:border-cyan-400 transition-colors group h-full">
                  <div className="w-14 h-14 bg-cyan-950/50 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <Globe size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Coordinación Nacional</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Registra actividades, gestiona cronogramas y consolida informes mensuales trabajando en directo con la Dirección Internacional RAJI.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="bg-[#031120] p-8 rounded-3xl border border-emerald-900/50 hover:border-emerald-400 transition-colors group h-full">
                  <div className="w-14 h-14 bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                    <HeartHandshake size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Gestión de Alianzas</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Creación de lazos con Gobiernos Locales, Ministerios de Educación y Deportes para promover voluntariado y participación juvenil.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="bg-[#031120] p-8 rounded-3xl border border-blue-900/50 hover:border-blue-400 transition-colors group h-full">
                  <div className="w-14 h-14 bg-blue-950/50 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <Map size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Dirección Territorial</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Responsables de convocar voluntarios a nivel provincial y cantonal. Focados en actividades de campo urbanas y rurales.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <div className="bg-[#031120] p-8 rounded-3xl border border-pink-900/50 hover:border-pink-400 transition-colors group h-full">
                  <div className="w-14 h-14 bg-pink-950/50 rounded-2xl flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Embajadores Educativos</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Líderes en escuelas y universidades que coordinan la intervención de Responsabilidad Social y Derechos Humanos en las aulas.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {}
        <section id="cobertura" className="py-24 relative bg-[#041527] w-full overflow-hidden border-y border-cyan-900/30">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan-950/50 border border-cyan-800 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Navigation className="text-cyan-400" size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Presencia en Ecuador</h2>
                <p className="text-lg text-slate-300 font-medium">
                  Selecciona una provincia en el mapa para conocer nuestra cobertura, cantones activos o postularte para liderar tu zona.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              
              {/* CONTENEDOR DEL MAPA (Izquierda) */}
              <ScrollReveal direction="right" delay={200} className="w-full lg:w-5/12 flex justify-center order-2 lg:order-1">
                <div className="relative w-full max-w-[400px] aspect-[4/5] bg-[#020b14] rounded-[3rem] border border-slate-800 p-4 shadow-2xl flex items-center justify-center overflow-hidden">
                  
                  {/* Silueta SVG Detallada de Ecuador */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] opacity-60" fill="#01060b" stroke="#06b6d4" strokeWidth="0.5" strokeLinejoin="round">
                      <path d="M 32,5 C 40,2 48,5 52,6 C 60,8 65,10 70,14 C 75,18 85,15 90,16 C 92,18 95,25 96,30 C 96,35 90,40 88,45 C 85,55 82,65 78,70 C 72,78 68,85 62,90 C 58,95 52,98 48,97 C 42,95 38,98 32,95 C 28,92 32,85 28,80 C 25,75 22,78 18,75 C 22,70 28,68 28,62 C 28,58 15,62 10,62 C 5,62 5,55 8,50 C 12,45 15,48 18,40 C 20,35 15,30 18,22 C 20,15 25,12 32,5 Z" />
                    </svg>
                  </div>

                  {/* Cuadro de Galápagos */}
                  <div className="absolute top-12 left-4 w-20 h-20 border border-slate-700/80 rounded-xl bg-[#041527]/80 backdrop-blur-sm pointer-events-none flex flex-col items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-10 h-10 opacity-60" fill="#01060b" stroke="#06b6d4" strokeWidth="2">
                      <path d="M 30,30 Q 40,20 50,40 Q 40,60 20,50 Z M 70,40 Q 80,35 85,45 Q 75,55 65,45 Z" />
                    </svg>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-1">Galápagos</span>
                  </div>

                  {/* Contenedor Absoluto para los Pines */}
                  <div className="absolute inset-0 p-6 pointer-events-none">
                    <div className="relative w-full h-full">
                      {provinciasEcuador.map((prov) => (
                        <div 
                          key={prov.id}
                          className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group pointer-events-auto"
                          style={{ top: prov.top, left: prov.left }}
                          onClick={() => setActiveProv(prov)}
                        >
                          {prov.active && (
                            <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                              activeProv.id === prov.id 
                                ? prov.color === 'emerald' ? 'bg-emerald-400' : prov.color === 'cyan' ? 'bg-cyan-400' : prov.color === 'blue' ? 'bg-blue-400' : 'bg-pink-400'
                                : 'bg-cyan-500/50'
                            }`}></div>
                          )}
                          
                          <div className={`relative rounded-full border-2 border-[#020b14] flex items-center justify-center transition-all duration-300 ${
                            prov.active 
                              ? activeProv.id === prov.id 
                                ? `w-6 h-6 scale-110 shadow-lg ${prov.color === 'emerald' ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : prov.color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : prov.color === 'blue' ? 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'bg-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.8)]'}`
                                : 'w-4 h-4 bg-cyan-500 hover:bg-cyan-300 hover:scale-125 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                              : 'w-2 h-2 bg-slate-600 hover:bg-slate-400 hover:scale-150'
                          }`}>
                          </div>

                          <div className="absolute left-1/2 -top-8 -translate-x-1/2 bg-[#020b14] border border-slate-700 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                            {prov.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </ScrollReveal>

              {/* PANEL DE INFORMACIÓN (Derecha) */}
              <ScrollReveal direction="left" delay={300} className="w-full lg:w-7/12 order-1 lg:order-2">
                <div className="bg-[#020b14] border border-cyan-900/50 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[420px] flex flex-col justify-center transition-all duration-500">
                  
                  {activeProv.active && (
                    <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-colors duration-500 ${
                      activeProv.color === 'emerald' ? 'bg-emerald-500' : activeProv.color === 'cyan' ? 'bg-cyan-500' : activeProv.color === 'blue' ? 'bg-blue-500' : 'bg-pink-500'
                    }`}></div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-slate-300 text-sm font-bold uppercase tracking-wider border border-slate-700">
                        Provincia
                      </span>
                      {activeProv.active ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/50 text-emerald-400 text-xs font-bold uppercase border border-emerald-900/50">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Activo
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-slate-400 text-xs font-bold uppercase border border-slate-800">
                          <Info size={12} /> Zona Disponible
                        </span>
                      )}
                    </div>
                    
                    {/* Nombre y Bandera de la Provincia */}
                    <div className="flex items-center gap-4 mb-6">
                      {activeProv.flag && (
                        <img 
                          src={activeProv.flag} 
                          alt={`Bandera de ${activeProv.name}`} 
                          className="w-16 h-10 md:w-20 md:h-12 object-cover rounded shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-slate-700" 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <h3 className={`text-4xl md:text-5xl font-black transition-colors duration-300 ${
                        activeProv.active 
                          ? activeProv.color === 'emerald' ? 'text-emerald-400' : activeProv.color === 'cyan' ? 'text-cyan-400' : activeProv.color === 'blue' ? 'text-blue-400' : 'text-pink-400'
                          : 'text-slate-400'
                      }`}>
                        {activeProv.name}
                      </h3>
                    </div>

                    {activeProv.active ? (
                      <>
                        <p className="text-slate-300 text-lg leading-relaxed font-medium mb-10 border-l-4 border-cyan-800 pl-4">
                          {activeProv.description}
                        </p>

                        <div>
                          <h4 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                            <Target size={16}/> Cantones con Presencia
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {/* Banderas y nombres de los Cantones */}
                            {activeProv.cantons.map((canton, index) => (
                              <span key={index} className="px-4 py-2 bg-[#031120] border border-slate-700 rounded-xl text-slate-200 font-semibold shadow-md flex items-center gap-3 hover:border-cyan-700 transition-colors cursor-default group">
                                {canton.flag ? (
                                  <img 
                                    src={canton.flag} 
                                    alt={`Bandera de ${canton.name}`} 
                                    className="w-7 h-5 object-cover rounded-[2px] shadow-sm border border-slate-700 transition-transform group-hover:scale-110" 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                ) : (
                                  <MapPin size={16} className={activeProv.color === 'emerald' ? 'text-emerald-400' : activeProv.color === 'cyan' ? 'text-cyan-400' : activeProv.color === 'blue' ? 'text-blue-400' : 'text-pink-400'} />
                                )}
                                {canton.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      // BLOQUE PARA ZONAS DISPONIBLES: Botón para Postularse
                      <div className="bg-[#031120] border border-slate-800 rounded-2xl p-8 text-center mt-4 shadow-inner">
                        <UserCheck size={40} className="text-cyan-600 mx-auto mb-4" />
                        <h4 className="text-2xl font-bold text-white mb-3">¡Lidera RAJI en {activeProv.name}!</h4>
                        <p className="text-slate-400 font-medium text-sm mb-8 max-w-md mx-auto">
                          Aún no tenemos presencia oficial aquí. Buscamos jóvenes comprometidos para asumir la <strong>Dirección de tu Provincia</strong> y expandir nuestro impacto.
                        </p>
                        <a 
                          href="https://docs.google.com/forms/d/e/1FAIpQLSdU-bvvFQMZ-eQq5j4l8giV6S_lrGChs9huZ1IMijlCFV577w/viewform?usp=sharing&ouid=100037291006540345139" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-bold px-8 py-3.5 rounded-full hover:from-cyan-500 hover:to-emerald-500 transition-all shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                        >
                          Postularme Ahora <ArrowRight size={18} />
                        </a>
                      </div>
                    )}
                  </div>

                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {}
        <section id="proyectos" className="py-24 bg-[#020b14] relative w-full">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Proyectos Destacados</h2>
                <p className="text-lg text-slate-300 font-medium">
                  Conoce cómo nuestros voluntarios están transformando la sociedad mediante acciones reales, educación e innovación.
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full mt-6"></div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Proyecto 1: Liderazgo Movilidad */}
              <ScrollReveal direction="up" delay={100}>
                <ProjectCard 
                  image="/assets/raji2.jpg"
                  title="Seminario de Liderazgo Juvenil"
                  objective="Enseñar habilidades blandas y de liderazgo a jóvenes en movilidad humana para su inserción y participación activa."
                  colab="HIAS y ACNUR"
                  prov="Modalidad Híbrida"
                  benef="Jóvenes (18 a 29 años)"
                />
              </ScrollReveal>

              {/* Proyecto 2: Consulta Popular */}
              <ScrollReveal direction="up" delay={200}>
                <ProjectCard 
                  image="/assets/raji3.jpg"
                  title="Jornada Virtual sobre Política"
                  objective="Fomentar la participación y fiscalización ciudadana, promoviendo la transparencia y la incidencia juvenil estatal."
                  colab="CPCCS Imbabura"
                  prov="Imbabura / Virtual"
                  benef="Adolescentes (13 a 29 años)"
                />
              </ScrollReveal>

              {/* Proyecto 3: Economía Circular / Voluntariado Animal */}
              <ScrollReveal direction="up" delay={300}>
                <ProjectCard 
                  image="/assets/raji1.jpg"
                  title="Impacto Ambiental y Bienestar"
                  objective="Concientizar e incentivar el cuidado de la fauna urbana y promover prácticas de economía circular en la comunidad."
                  colab="Dogs Care / Aliados"
                  prov="Atuntaqui, Imbabura"
                  benef="Comunidad Local"
                />
              </ScrollReveal>

            </div>
          </div>
        </section>

        {}
        <section id="actividades" className="py-20 bg-[#041527] border-y border-cyan-900/30 w-full">
          <div className="container mx-auto px-6 md:px-12">
            <ScrollReveal direction="up" delay={100}>
              <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Nuestras Actividades</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal direction="up" delay={100}><ActivityRow icon={<Megaphone />} title="Conferencias Internacionales" desc="Debates con expertos sobre desafíos globales." /></ScrollReveal>
              <ScrollReveal direction="up" delay={200}><ActivityRow icon={<HeartHandshake />} title="Servicio Comunitario" desc="Proyectos que fortalecen el liderazgo territorial." /></ScrollReveal>
              <ScrollReveal direction="up" delay={300}><ActivityRow icon={<Landmark />} title="Participación Política" desc="Espacios de contribución a nivel local y nacional." /></ScrollReveal>
              <ScrollReveal direction="up" delay={400}><ActivityRow icon={<Palette />} title="Fomento de la cultura y el arte" desc="Teatro, fotografía y escritura para el cambio social." /></ScrollReveal>
            </div>
          </div>
        </section>

        {}
        <section className="py-20 bg-[#020b14] relative w-full">
          <div className="container mx-auto px-6 md:px-12">
            
            <ScrollReveal direction="scale" delay={100}>
              <div className="bg-gradient-to-r from-[#031120] to-[#020b14] rounded-3xl p-8 md:p-12 border border-cyan-900/50 shadow-lg mb-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-24 h-24 bg-[#020b14] rounded-full border-2 border-cyan-500 flex items-center justify-center">
                    <UserCheck size={40} className="text-cyan-400" />
                  </div>
                </div>
                <div className="md:w-3/4 text-center md:text-left z-10">
                  <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-2 block">¿Qué es ser Voluntario?</span>
                  <h3 className="text-2xl font-extrabold text-white mb-3">100% Compromiso Activo</h3>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    Ser voluntario implica dedicar tiempo y habilidades para un impacto real. Adquiere experiencia y contribuye al bienestar colectivo.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12">
              <ScrollReveal direction="up" delay={100}>
                <div>
                  <h2 className="text-3xl font-extrabold text-white mb-8">¿Por qué unirse a RAJI?</h2>
                  <div className="space-y-4">
                    <BenefitRow icon={<TrendingUp size={24}/>} title="Crecimiento Profesional" desc="Acceso a talleres, conferencias y mentorías." />
                    <BenefitRow icon={<Target size={24}/>} title="Networking de Élite" desc="Conexión directa con organizaciones y líderes mundiales." />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div>
                  <h2 className="text-3xl font-extrabold text-white mb-8">Nuestros Pilares</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <PillarCard title="Mujeres Líderes" desc="Plataformas para liderar cambios." />
                    <PillarCard title="Foros Globales" desc="Debates sobre el futuro de la sociedad." />
                    <PillarCard title="Emprendimiento" desc="Apoyo para ideas innovadoras." />
                    <PillarCard title="Red Internacional" desc="Conexión con la agenda global." />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {}
        <section id="ods" className="py-20 bg-[#041527] relative border-y border-cyan-900/30 w-full">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Compromiso ODS</h2>
                <p className="text-slate-300 font-medium">
                  Trabajamos por una sociedad donde todas las personas puedan desarrollarse con igualdad y dignidad. <br/> <span className="text-cyan-400 text-sm italic mt-2 inline-block">(Pasa el cursor por cada ODS para conocer nuestra acción)</span>
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ScrollReveal direction="scale" delay={100}><ODSCard color="bg-red-600/90" number="4" title="Educación" info="Formación integral en liderazgo político, debate y gobernanza para la juventud ecuatoriana." /></ScrollReveal>
              <ScrollReveal direction="scale" delay={200}><ODSCard color="bg-orange-600/90" number="5" title="Igualdad" info="Empoderamiento, creación de plataformas y participación activa de mujeres líderes en Ecuador." /></ScrollReveal>
              <ScrollReveal direction="scale" delay={300}><ODSCard color="bg-rose-800/90" number="8" title="Crecimiento" info="Apoyo directo al emprendimiento, incubación de ideas y la innovación tecnológica." /></ScrollReveal>
              <ScrollReveal direction="scale" delay={400}><ODSCard color="bg-pink-600/90" number="10" title="Desigualdades" info="Promoción activa de la justicia social, diversidad y defensa de los derechos humanos locales." /></ScrollReveal>
              <ScrollReveal direction="scale" delay={500}><ODSCard color="bg-blue-800/90" number="17" title="Alianzas" info="Generación de fuertes conexiones con instituciones, gobiernos y organizaciones internacionales." /></ScrollReveal>
            </div>
          </div>
        </section>

      </main>

      {/* 11 & 12. CALL TO ACTION Y FOOTER */}
      <footer id="unete" className="bg-[#01060b] text-white pt-24 pb-8 mt-32 md:mt-48 relative border-t border-cyan-900/20 w-full shrink-0">
        
        <div className="container mx-auto px-6 md:px-12 absolute left-0 right-0 top-0 -translate-y-1/2">
          <ScrollReveal direction="scale" delay={100}>
            <div className="bg-[#031120] rounded-3xl p-8 md:p-12 text-center shadow-2xl border border-cyan-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white relative z-10">¡Sé un Embajador!</h2>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8 relative z-10 font-medium">
                Únete a nuestra comunidad y represéntala dentro de tu colegio o universidad.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdU-bvvFQMZ-eQq5j4l8giV6S_lrGChs9huZ1IMijlCFV577w/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-cyan-600 text-white font-bold px-8 py-3 rounded-full hover:bg-cyan-500 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  ÚNETE A RAJI <ArrowRight size={18} />
                </a>
                <a 
                  href="https://wa.me/593980058762?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20cómo%20unirme%20a%20RAJI%20Ecuador." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-300 font-bold px-6 py-3 flex items-center justify-center gap-2 hover:text-cyan-100 transition-colors"
                >
                  <MessageCircle size={18} />
                  +593 98 005 8762
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="container mx-auto px-6 md:px-12 pt-40 md:pt-32">
          <div className="grid md:grid-cols-2 gap-10 pb-12 border-b border-slate-800">
            
            <ScrollReveal direction="up" delay={100}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="/assets/image.png" 
                    alt="Logo RAJI" 
                    className="h-8 w-8 object-cover rounded-md border border-cyan-500/30"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=RAJI'; }}
                  />
                  <span className="font-extrabold tracking-wide text-white">RAJI COORDINACIÓN ECUADOR</span>
                </div>
                <p className="text-slate-400 font-medium text-sm max-w-sm">
                  Red de Acción Juvenil Internacional - Coordinación Ecuador. Liderazgo y Empoderamiento para el Desarrollo Sostenible.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <div>
                <h4 className="text-base font-bold mb-4 text-white flex items-center gap-2">
                  <MessageCircle className="text-cyan-400" size={18}/> ¿Preguntas? Contáctanos
                </h4>
                <ul className="space-y-3 text-slate-400 font-medium text-sm">
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="text-cyan-400" />
                    <a href="mailto:rajiecuador@gmail.com" className="hover:text-cyan-400 transition-colors font-semibold">
                      rajiecuador@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={16} className="text-cyan-400" />
                    <a href="tel:+5930980058762" className="hover:text-cyan-400 transition-colors font-semibold">
                      +593 98 005 8762
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <a href="https://www.instagram.com/raji_ec/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors font-semibold">
                      @raji_ec
                    </a>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="pt-6 flex justify-between items-center text-slate-500 text-xs font-medium">
            <p>© {new Date().getFullYear()} RAJI Coordinación Ecuador. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


function ListItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-slate-300">
      <div className="text-emerald-400 shrink-0">{icon}</div>
      <p className="font-medium">{text}</p>
    </div>
  );
}

function CardBox({ icon, title, desc, color }) {
  const colorMap = {
    cyan: 'text-cyan-400 border-cyan-800 bg-[#020b14]',
    emerald: 'text-emerald-400 border-emerald-800 bg-[#020b14]',
    blue: 'text-blue-400 border-blue-800 bg-[#020b14]',
    pink: 'text-pink-400 border-pink-800 bg-[#020b14]'
  };

  const hoverMap = {
    cyan: 'hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.4)] hover:border-cyan-400',
    emerald: 'hover:shadow-[0_10px_30px_-10px_rgba(52,211,153,0.4)] hover:border-emerald-400',
    blue: 'hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.4)] hover:border-blue-400',
    pink: 'hover:shadow-[0_10px_30px_-10px_rgba(244,114,182,0.4)] hover:border-pink-400'
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 cursor-pointer ${colorMap[color].split(' bg-')[0]} bg-[#031120] ${hoverMap[color]} group`}>
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110 origin-left">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
      <p className="text-slate-400 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectCard({ image, title, objective, colab, prov, benef }) {
  return (
    <div className="bg-[#031120] rounded-3xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-colors group flex flex-col h-full">
      <div className="h-48 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Proyecto+RAJI'; }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{objective}</p>
        
        <div className="space-y-3 pt-4 border-t border-slate-800/50">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
            <Users size={14} className="text-emerald-400" />
            <span className="truncate"><strong>Aliados:</strong> {colab}</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
            <User size={14} className="text-blue-400" />
            <span className="truncate"><strong>Beneficiarios:</strong> {benef}</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
            <MapPin size={14} className="text-pink-400" />
            <span className="truncate"><strong>Sede:</strong> {prov}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityRow({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 bg-[#031120] p-5 rounded-2xl border border-slate-800">
      <div className="bg-cyan-950/50 p-2 rounded-lg text-cyan-400 border border-cyan-900/50 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-bold text-white mb-1">{title}</h4>
        <p className="text-slate-400 font-medium text-sm">{desc}</p>
      </div>
    </div>
  );
}

function BenefitRow({ icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start bg-[#031120] p-4 rounded-xl border border-slate-800">
      <div className="text-emerald-400 shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-slate-400 font-medium text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function PillarCard({ title, desc }) {
  return (
    <div className="bg-[#031120] p-4 rounded-xl border border-slate-800">
      <h4 className="font-bold text-cyan-400 mb-1 text-sm">{title}</h4>
      <p className="text-slate-400 font-medium text-xs">{desc}</p>
    </div>
  );
}

function ODSCard({ color, number, title, info }) {
  return (
    <div className={`${color} text-white p-4 rounded-xl flex flex-col h-32 md:h-40 relative overflow-hidden border border-white/10 group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="absolute -right-2 -bottom-2 text-6xl md:text-7xl font-black opacity-20 transition-opacity duration-300 group-hover:opacity-5">{number}</div>
      <span className="text-xl font-black opacity-90 drop-shadow-md mb-1 transition-all duration-300 group-hover:-translate-y-1">ODS {number}</span>
      <h4 className="font-bold text-xs md:text-sm leading-tight mt-auto uppercase drop-shadow-md transition-all duration-300 group-hover:opacity-0">{title}</h4>
      
      <div className="absolute inset-0 bg-black/85 p-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
        <h5 className="font-bold text-cyan-400 text-xs mb-1 uppercase tracking-widest border-b border-cyan-800 pb-1 w-full text-center">Acción RAJI</h5>
        <p className="text-white text-xs md:text-sm font-medium text-center leading-snug">{info}</p>
      </div>
    </div>
  );
}

function AllianceBadge({ name, highlight, color = 'cyan' }) {
  const highlightStyles = highlight 
    ? color === 'emerald' 
      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.1)] hover:shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:border-emerald-400' 
      : 'bg-cyan-950/30 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:border-cyan-400'
    : 'bg-[#020b14] border-slate-800 text-slate-300 font-semibold hover:border-emerald-500/50 hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]';

  return (
    <div className={`flex items-center justify-center text-center p-6 h-28 rounded-2xl border transition-all duration-300 cursor-default hover:-translate-y-2 group ${highlightStyles}`}>
      <span className="font-bold text-sm md:text-base transition-transform duration-300 group-hover:scale-105 leading-snug">
        {name}
      </span>
    </div>
  );
}