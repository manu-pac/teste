import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, TrendingUp, Compass, Star, ArrowRight, Search, FileSpreadsheet, ShieldCheck, ListTodo } from 'lucide-react';

function VulnerabilityCard({ title, subtitle, index, isDark = true }: { title: string; subtitle: string; index: number; isDark?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5 + index * 0.2, duration: 0.5, ease: "easeOut" }}
      className={`w-[45%] max-w-[400px] py-4 px-6 rounded-lg ${isDark ? 'border-white/20 border' : 'border-black/20 border'}`}
    >
      <p className={`text-[17px] leading-[130%] font-medium ${isDark ? 'text-white/90' : 'text-black/90'}`}>{title}</p>
      <p className={`text-[15px] leading-[130%] mt-1 ${isDark ? 'text-white/60' : 'text-black/60'}`}>{subtitle}</p>
    </motion.div>
  );
}

function RadarChart({ color = "red", isDark = true, variant = "first", isVisible = false }: { color?: "red" | "green"; isDark?: boolean; variant?: "first" | "second"; isVisible?: boolean }) {
  const [showChart, setShowChart] = useState(false);
  const [currentDataPoints, setCurrentDataPoints] = useState([30, 45, 20, 35, 25, 40]);
  const [currentColor, setCurrentColor] = useState({
    fill: "rgba(239, 68, 68, 0.15)",
    stroke: "rgb(239, 68, 68)"
  });
  const animationStarted = useRef(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (variant === "second" && isVisible && !animationStarted.current) {
  animationStarted.current = true;

  fetch("https://splendid-treacle-638f28.netlify.app/.netlify/functions/typebot-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ request: "get-latest" }) // optional dummy body
  })
    .then(res => res.json())
    .then(data => {
      const finalDataPoints = data.dataPoints || [85, 90, 80, 95, 88, 92];
      const finalColor = {
        fill: "rgba(34, 197, 94, 0.15)",
        stroke: "rgb(34, 197, 94)"
      };

      const duration = 1500;
      const frames = 60;
      const interval = duration / frames;
      let frame = 0;

      const animation = setInterval(() => {
        frame++;
        const progress = frame / frames;

        const newDataPoints = currentDataPoints.map((start, i) => {
          const end = finalDataPoints[i];
          return Math.round(start + (end - start) * progress);
        });

        const startRed = 239;
        const startGreen = 68;
        const endRed = 34;
        const endGreen = 197;

        const currentRed = Math.round(startRed + (endRed - startRed) * progress);
        const currentGreen = Math.round(startGreen + (endGreen - startGreen) * progress);

        setCurrentColor({
          fill: `rgba(${currentRed}, ${currentGreen}, 68, 0.15)`,
          stroke: `rgb(${currentRed}, ${currentGreen}, 68)`
        });

        setCurrentDataPoints(newDataPoints);

        if (frame >= frames) {
          clearInterval(animation);
        }
      }, interval);
    });
}
      const finalColor = {
        fill: "rgba(34, 197, 94, 0.15)",
        stroke: "rgb(34, 197, 94)"
      };
      
      const duration = 1500;
      const frames = 60;
      const interval = duration / frames;
      let frame = 0;

      const animation = setInterval(() => {
        frame++;
        const progress = frame / frames;
        
        const newDataPoints = currentDataPoints.map((start, i) => {
          const end = finalDataPoints[i];
          return Math.round(start + (end - start) * progress);
        });
        
        const startRed = 239;
        const startGreen = 68;
        const endRed = 34;
        const endGreen = 197;
        
        const currentRed = Math.round(startRed + (endRed - startRed) * progress);
        const currentGreen = Math.round(startGreen + (endGreen - startGreen) * progress);
        
        setCurrentColor({
          fill: `rgba(${currentRed}, ${currentGreen}, 68, 0.15)`,
          stroke: `rgb(${currentRed}, ${currentGreen}, 68)`
        });
        
        setCurrentDataPoints(newDataPoints);
        
        if (frame >= frames) {
          clearInterval(animation);
        }
      }, interval);
      
      return () => clearInterval(animation);
    }
  }, [variant, isVisible]);
    
  const angles = [0, 60, 120, 180, 240, 300];
  const labels = ['ITEM 1', 'ITEM 2', 'ITEM 3', 'ITEM 4', 'ITEM 5', 'ITEM 6'];

  const getPoint = (angle: number, value: number) => {
    const radius = (value / 100) * 45;
    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
    return { x, y };
  };

  const getLabelPosition = (angle: number) => {
    const radius = 52;
    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
    return { x, y };
  };

  const axisLines = angles.map(angle => {
    const point = getPoint(angle, 100);
    return `M 50 50 L ${point.x} ${point.y}`;
  });

  const dataPathPoints = currentDataPoints.map((value, i) => {
    const point = getPoint(angles[i], value);
    return `${point.x},${point.y}`;
  }).join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="w-full aspect-square relative"
    >
      <AnimatePresence>
        {showChart && [1, 2, 3, 4].map((scale) => (
          <motion.div 
            key={scale}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: scale * 0.25, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * scale }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.6)'}`,
              borderRadius: '50%',
            }}
          />
        ))}
      </AnimatePresence>

      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
        <AnimatePresence>
          {showChart && (
            <>
              {axisLines.map((path, i) => (
                <motion.path
                  key={i}
                  d={path}
                  stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.8)"}
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                />
              ))}

              <motion.polygon 
                points={dataPathPoints}
                fill={currentColor.fill}
                stroke={currentColor.stroke}
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{ transformOrigin: '50px 50px' }}
              />

              {currentDataPoints.map((value, i) => {
                const point = getPoint(angles[i], value);
                return (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="1.5"
                    fill={currentColor.stroke}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                    className="animate-pulse"
                  />
                );
              })}

              {labels.map((label, i) => {
                const pos = getLabelPosition(angles[i]);
                const textAnchor = pos.x > 51 ? "start" : pos.x < 49 ? "end" : "middle";
                const dy = pos.y > 51 ? "0.7em" : pos.y < 49 ? "-0.5em" : "0.35em";
                return (
                  <motion.text
                    key={i}
                    x={pos.x}
                    y={pos.y}
                    textAnchor={textAnchor}
                    dy={dy}
                    className={`text-[3px] font-light ${isDark ? 'fill-white/60' : 'fill-black/60'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.8 + i * 0.1 }}
                  >
                    {label}
                  </motion.text>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}

function FeatureBlock({ icon: Icon, title, description, index }: { icon: React.ElementType; title: string; description: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * index }}
      className="flex-1 px-8"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6">
          <Icon size={48} className="text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-lg leading-relaxed text-white/70">{description}</p>
      </div>
    </motion.div>
  );
}

const testimonials = [
  {
    quote: "A análise 360º transformou completamente nossa visão sobre TI. Agora temos clareza das prioridades e um caminho claro a seguir.",
    author: "João Silva",
    role: "CTO",
    company: "Tech Solutions",
    logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80&sat=-100"
  },
  {
    quote: "Finalmente conseguimos entender onde estávamos perdendo dinheiro e como otimizar nossos recursos de TI de forma eficiente.",
    author: "Maria Santos",
    role: "CEO",
    company: "Inovação Digital",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80&sat=-100"
  },
  {
    quote: "A abordagem sem jargão técnico permitiu que toda a equipe entendesse e se envolvesse no processo de transformação.",
    author: "Pedro Costa",
    role: "Diretor",
    company: "Future Corp",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80&sat=-100"
  }
];

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 5000);
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAnimating]);

  return (
    <div className="max-w-4xl mx-auto py-16">
      <div className="flex gap-2 mb-12 justify-center">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className="h-1 rounded-full bg-black/20 transition-all duration-300"
            style={{
              width: index === currentIndex ? '20px' : '6px'
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            
            <p className="text-3xl font-light text-black/80 mb-12 italic max-w-3xl">
              "{testimonials[currentIndex].quote}"
            </p>
            
            <div className="flex items-center gap-4">
              <img 
                src={testimonials[currentIndex].logo} 
                alt={testimonials[currentIndex].company}
                className="w-16 h-16 rounded-full object-cover grayscale contrast-125"
              />
              <div className="text-left">
                <p className="font-bold text-xl text-black">{testimonials[currentIndex].author}</p>
                <p className="text-black/60">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TimelineStep({ number, title, description, icon: Icon, isLeft }: { number: number; title: string; description: string; icon: React.ElementType; isLeft: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.2 }}
      className={`flex items-center gap-12 relative ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Connecting Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-px bg-white/20" />
      
      <div className="flex-1 relative">
        <div className={`flex items-center gap-4 ${isLeft ? 'justify-start' : 'justify-end'}`}>
          <div className={`w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center ${!isLeft && 'order-2'}`}>
            <Icon size={32} strokeWidth={1.5} />
          </div>
        </div>
        <div className={`mt-6 ${!isLeft && 'text-right'}`}>
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-lg text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="aspect-video bg-white/5 rounded-lg p-8 flex items-center justify-center">
          <Icon size={120} className="text-white/20" strokeWidth={1} />
        </div>
      </div>
    </motion.div>
  );
}

function Section({ color = "red", isDark = true, variant = "first", isVisible = false }: { color?: "red" | "green"; isDark?: boolean; variant?: "first" | "second" | "third" | "timeline"; isVisible?: boolean }) {
  if (variant === "timeline") {
    return (
      <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-white py-32">
        <div className="max-w-[1200px] mx-auto px-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-black mb-24"
          >
            Como funciona a Análise 360º?
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black rounded-[32px] p-16 md:p-24 w-full relative overflow-hidden"
          >
            {/* Flowing Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/20" />
            
            <div className="max-w-[1000px] mx-auto space-y-32">
              <TimelineStep 
                number={1}
                title="Diagnóstico Inicial"
                description="Nossa equipe realiza uma análise profunda da sua infraestrutura atual, identificando pontos críticos e oportunidades de melhoria em todos os aspectos da TI."
                icon={Search}
                isLeft={true}
              />
              
              <TimelineStep 
                number={2}
                title="Mapeamento de Processos"
                description="Documentamos todos os processos e fluxos de trabalho, identificando gargalos e ineficiências que impactam a produtividade da sua equipe."
                icon={FileSpreadsheet}
                isLeft={false}
              />
              
              <TimelineStep 
                number={3}
                title="Análise de Segurança"
                description="Realizamos uma avaliação completa das suas práticas de segurança, identificando vulnerabilidades e recomendando medidas de proteção adequadas."
                icon={ShieldCheck}
                isLeft={true}
              />
              
              <TimelineStep 
                number={4}
                title="Plano de Ação"
                description="Desenvolvemos um roteiro detalhado com recomendações práticas e um cronograma de implementação, priorizando as ações de maior impacto."
                icon={ListTodo}
                isLeft={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center">
      {variant === "third" ? (
        <div className="w-full">
          <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-black">
            <div className="py-10 max-w-[1200px] mx-auto px-12">
              <div className="flex gap-8">
                <FeatureBlock
                  icon={Brain}
                  title="ENTENDA DE VERDADE"
                  description="A gente fala a sua língua. Mesmo que você não seja da TI, vai entender o que está acontecendo e o que precisa ser feito — com clareza e sem jargão técnico."
                  index={0}
                />
                <FeatureBlock
                  icon={TrendingUp}
                  title="VEJA ONDE ESTÁ SEU TEMPO E DINHEIRO"
                  description="O diagnóstico mostra os gargalos invisíveis da sua TI — sistemas lentos, contratos mal utilizados, processos engessados. Você entende onde cortar desperdício e priorizar o que realmente importa."
                  index={1}
                />
                <FeatureBlock
                  icon={Compass}
                  title="SAIBA O QUE FAZER E POR ONDE COMEÇAR"
                  description="Nada de relatórios soltos. Você recebe um plano técnico com prioridades claras: o que corrigir, modernizar e evoluir — passo a passo, com foco em resultado."
                  index={2}
                />
              </div>
            </div>
          </div>
          
          <div className="py-4">
            <TestimonialCarousel />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-5 w-full">
          <div className="col-start-1 col-span-6 py-20">
            {variant === "first" ? (
              <>
                <div className="mb-16">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`text-[28px] font-light leading-[120%] mb-3 ${isDark ? 'text-white' : 'text-black'}`}
                  >
                    Empresa,
                  </motion.h1>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    <p className={`text-[52px] font-light leading-[110%] ${isDark ? 'text-white' : 'text-black'}`}>
                      Sua empresa tem
                    </p>
                    <p className={`text-[52px] font-bold leading-[110%] ${isDark ? 'text-white' : 'text-black'}`}>
                      vulnerabilidades
                    </p>
                  </motion.div>
                </div>

                <div className="space-y-3 mb-16">
                  <VulnerabilityCard 
                    title="Gestão de equipes fraca"
                    subtitle="Isso pode trazer problemas."
                    index={0}
                    isDark={isDark}
                  />
                  <VulnerabilityCard 
                    title="Gestão de equipes fraca"
                    subtitle="Isso pode trazer problemas."
                    index={1}
                    isDark={isDark}
                  />
                  <VulnerabilityCard 
                    title="Gestão de equipes fraca"
                    subtitle="Isso pode trazer problemas."
                    index={2}
                    isDark={isDark}
                  />
                </div>

                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2, duration: 0.5 }}
                  className={`w-[85%] font-black text-2xl px-8 py-4 rounded-lg transition-colors ${
                    isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'
                  }`}
                >
                  <span className="block text-center leading-tight">
                    Conheça seu<br />potencial
                  </span>
                </motion.button>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[28px] font-light leading-[120%] mb-3 text-black"
                  >
                    Este é seu potencial.
                  </motion.h1>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  >
                    <div className="text-[46px] leading-[110%] text-black">
                      <p className="font-light">
                        <span className="font-bold">Veja com clareza</span> o que
                      </p>
                      <p>
                        precisa mudar no seu TI
                      </p>
                    </div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                      className="text-xl leading-relaxed text-black/80 mt-6 max-w-[90%]"
                    >
                      A <span className="font-bold">diferença entre vulnerabilidade e potencial</span> está em entender o que acontece. Nossa <span className="font-bold">Análise 360º</span> revela o cenário real da sua TI em 6 pilares — em um relatório completo, sem tecnês e com plano de ação  para transformá-la em um aliado.
                    </motion.p>
                  </motion.div>
                </div>

                <div className="flex flex-col gap-3 mt-16 max-w-[90%]">
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="w-full h-[72px] font-bold text-xl px-10 rounded-lg transition-colors bg-black text-white hover:bg-black/90 whitespace-nowrap relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <span>Agende sua reunião grátis</span>
                      <span className="text-sm text-white/80 mt-0.5 font-normal">
                        Apenas 2 vagas disponíveis
                      </span>
                    </div>
                  </motion.button>
                  
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    className="w-full h-[52px] font-medium text-lg px-8 rounded-lg transition-colors border border-black/20 text-black hover:bg-black/5 whitespace-nowrap"
                    onClick={() => {
                      const element = document.getElementById('features-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Conheça o produto
                  </motion.button>
                </div>
              </>
            )}
          </div>

          <div className="col-start-7 col-span-6 h-full flex items-center justify-center">
            <RadarChart color={color} isDark={isDark} variant={variant} isVisible={isVisible} />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [secondSectionVisible, setSecondSectionVisible] = useState(false);
  const [thirdSectionVisible, setThirdSectionVisible] = useState(false);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSecondSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setThirdSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (thirdSectionRef.current) {
      observer.observe(thirdSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollPosition / windowHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMainCTAClick = () => {
    const element = document.getElementById('green-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const backgroundColor = `rgb(
    ${Math.round(scrollProgress * 255)},
    ${Math.round(scrollProgress * 255)},
    ${Math.round(scrollProgress * 255)}
  )`;

  return (
    <motion.div 
      className="min-h-screen"
      style={{ backgroundColor }}
    >
      <div className="max-w-[1200px] mx-auto px-12">
        <div className="relative">
          <div onClick={handleMainCTAClick}>
            <Section color="red" isDark={scrollProgress < 0.5} variant="first" isVisible={true} />
          </div>
          
          <div id="green-section" ref={secondSectionRef}>
            <Section color="green" isDark={false} variant="second" isVisible={secondSectionVisible} />
          </div>

          <div id="features-section" ref={thirdSectionRef}>
            <Section variant="third" isDark={false} isVisible={thirdSectionVisible} />
          </div>

          <Section variant="timeline" isDark={false} isVisible={true} />
        </div>
      </div>
    </motion.div>
  );
}

export default App;
