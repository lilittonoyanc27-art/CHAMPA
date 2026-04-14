import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Plane, 
  Compass, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  Globe,
  Star,
  Camera,
  Music
} from 'lucide-react';

// --- Types ---
interface Destination {
  id: string;
  city: string;
  country: string;
  word: string;
  options: string[];
  correct: string;
  rule: string;
  image: string;
  color: string;
}

// --- Data ---
const DESTINATIONS: Destination[] = [
  {
    id: 'madrid',
    city: 'Madrid',
    country: 'España',
    word: 'Jardín',
    options: ['Ջարդին', 'Խարդին', 'Գարդին'],
    correct: 'Խարդին',
    rule: 'J = Խ (KH)',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80',
    color: '#FF6321' // Bold Orange
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'España',
    word: 'Zapato',
    options: ['Զապատո', 'Սապատո', 'Ժապատո'],
    correct: 'Սապատո',
    rule: 'Z = Ս (S)',
    image: 'https://images.unsplash.com/photo-1583997051651-825d30dfd1f6?auto=format&fit=crop&w=800&q=80',
    color: '#3B82F6' // Blue
  },
  {
    id: 'mexico',
    city: 'Ciudad de México',
    country: 'México',
    word: 'Tortilla',
    options: ['Տորտիլյա', 'Տորտիյա', 'Տորտիջա'],
    correct: 'Տորտիյա',
    rule: 'LL = Յ (Y)',
    image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80',
    color: '#10B981' // Emerald
  },
  {
    id: 'buenosaires',
    city: 'Buenos Aires',
    country: 'Argentina',
    word: 'Hola',
    options: ['Հոլա', 'Օլա', 'Խոլա'],
    correct: 'Օլա',
    rule: 'H-ը լուռ է (Silent)',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=80',
    color: '#8B5CF6' // Violet
  },
  {
    id: 'seville',
    city: 'Sevilla',
    country: 'España',
    word: 'España',
    options: ['Էսպանա', 'Էսպանյա', 'Էսպանջա'],
    correct: 'Էսպանյա',
    rule: 'Ñ = ՆՅ (NY)',
    image: 'https://images.unsplash.com/photo-1559564484-e484c204058a?auto=format&fit=crop&w=800&q=80',
    color: '#F43F5E' // Rose
  }
];

export default function SpanishPronunciationQuest3D() {
  const [gameState, setGameState] = useState<'intro' | 'traveling' | 'quest' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentDest = DESTINATIONS[currentIndex];

  const startJourney = () => {
    setGameState('traveling');
    setTimeout(() => setGameState('quest'), 2500);
  };

  const handleAnswer = (option: string) => {
    if (feedback) return;
    const isCorrect = option === currentDest.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < DESTINATIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setGameState('traveling');
        setTimeout(() => setGameState('quest'), 2500);
      } else {
        setGameState('result');
      }
    }, 2000);
  };

  const reset = () => {
    setGameState('intro');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-white selection:text-black">
      
      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-40 grayscale"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1920&q=80')` }}
            />
            <div className="absolute inset-0 z-1 bg-gradient-to-b from-black via-transparent to-black" />

            <div className="relative z-10 space-y-8 max-w-3xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                <div className="h-px w-12 bg-white/30" />
                <span className="text-xs uppercase tracking-[0.5em] font-bold text-white/60">The Grand Journey</span>
                <div className="h-px w-12 bg-white/30" />
              </motion.div>

              <motion.h1 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]"
              >
                SPANISH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">QUEST</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-white/60 font-medium max-w-md mx-auto italic"
              >
                Ճամփորդիր իսպանախոս աշխարհով և բացահայտիր ճիշտ արտասանության գաղտնիքները:
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={startJourney}
                className="group relative px-12 py-5 bg-white text-black rounded-full font-black text-xl uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                Սկսել Ճամփորդությունը
                <Plane className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {gameState === 'traveling' && (
          <motion.div 
            key="traveling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden"
          >
            {/* 3D Flight Simulation Effect */}
            <motion.div 
              animate={{ 
                scale: [1, 1.5],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 z-0 flex items-center justify-center"
            >
              <div className="w-[800px] h-[800px] border border-white/10 rounded-full animate-ping" />
              <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full" />
            </motion.div>

            <div className="relative z-10 text-center space-y-6">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Plane className="w-24 h-24 text-white mx-auto" />
              </motion.div>
              <h2 className="text-4xl font-black uppercase tracking-widest italic">
                Թռիչք դեպի...
              </h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black text-orange-500 tracking-tighter"
              >
                {currentDest.city}
              </motion.h3>
            </div>
          </motion.div>
        )}

        {gameState === 'quest' && (
          <motion.div 
            key="quest"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-screen flex flex-col md:flex-row"
          >
            {/* Left Side: Immersive Visual */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
              <motion.div 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${currentDest.image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-12 left-12 z-10 space-y-2">
                <div className="flex items-center gap-2 text-white/60 uppercase tracking-widest font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  {currentDest.country}
                </div>
                <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
                  {currentDest.city}
                </h2>
              </div>
            </div>

            {/* Right Side: Pronunciation Challenge */}
            <div 
              className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center relative"
              style={{ backgroundColor: currentDest.color }}
            >
              <div className="absolute top-12 right-12 text-black/20 font-black text-8xl pointer-events-none">
                0{currentIndex + 1}
              </div>

              <div className="max-w-md mx-auto w-full space-y-12 relative z-10">
                <div className="space-y-4">
                  <span className="text-black/60 font-black uppercase tracking-widest text-sm">Pronunciation Quest</span>
                  <h3 className="text-black text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
                    {currentDest.word}
                  </h3>
                  <div className="h-1 w-24 bg-black" />
                </div>

                <div className="space-y-4">
                  <p className="text-black font-bold text-lg">Ինչպե՞ս է ճիշտ արտասանվում այս բառը:</p>
                  <div className="grid grid-cols-1 gap-3">
                    {currentDest.options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={!!feedback}
                        onClick={() => handleAnswer(opt)}
                        className={`group relative py-6 px-8 rounded-2xl font-black text-2xl text-left transition-all border-2 ${
                          feedback === 'correct' && opt === currentDest.correct
                            ? 'bg-white border-white text-black scale-105 shadow-2xl'
                            : feedback === 'wrong' && opt === currentDest.correct
                            ? 'bg-white border-white text-black'
                            : feedback === 'wrong' && opt !== currentDest.correct
                            ? 'bg-black/20 border-transparent text-black/40'
                            : 'bg-transparent border-black/20 text-black hover:border-black hover:bg-black/5'
                        }`}
                      >
                        {opt}
                        {feedback === 'correct' && opt === currentDest.correct && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-6 top-1/2 -translate-y-1/2">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-3xl bg-black text-white shadow-2xl space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        {feedback === 'correct' ? <CheckCircle2 className="text-emerald-400" /> : <XCircle className="text-rose-400" />}
                        <span className="font-black uppercase tracking-widest">{feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է'}</span>
                      </div>
                      <p className="text-white/60 font-medium italic">Կանոն: {currentDest.rule}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen flex flex-col items-center justify-center p-6 text-center bg-zinc-950"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_100px_rgba(234,179,8,0.3)]"
            >
              <Trophy className="w-16 h-16 text-black" />
            </motion.div>

            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
              ՃԱՄՓՈՐԴՈՒԹՅՈՒՆԸ <br />
              <span className="text-orange-500">ԱՎԱՐՏՎԱԾ Է</span>
            </h2>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 mb-12 border border-white/10 max-w-md w-full">
              <span className="text-white/40 font-black uppercase tracking-widest text-xs block mb-2">Ձեր արդյունքը</span>
              <div className="text-8xl font-black tracking-tighter">
                {score}<span className="text-3xl text-white/20">/{DESTINATIONS.length}</span>
              </div>
              <p className="mt-4 text-white/60 font-medium italic">
                {score === DESTINATIONS.length ? "Դուք իսկական իսպանախոս եք!" : "Լավ փորձ էր, շարունակիր սովորել:"}
              </p>
            </div>

            <button 
              onClick={reset}
              className="px-12 py-5 bg-white text-black rounded-full font-black text-xl uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-4"
            >
              <RotateCcw className="w-6 h-6" />
              Նորից Սկսել
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navigation / Progress (Overlay) */}
      {gameState === 'quest' && (
        <div className="fixed top-8 left-8 right-8 z-50 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 pointer-events-auto">
            <Globe className="w-5 h-5 text-white/60" />
            <span className="font-black text-sm tracking-widest uppercase">Quest Progress</span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden ml-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(currentIndex / DESTINATIONS.length) * 100}%` }}
                className="h-full bg-white"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 pointer-events-auto">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="font-black text-lg">{score}</span>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: black;
          margin: 0;
        }
      `}} />
    </div>
  );
}
