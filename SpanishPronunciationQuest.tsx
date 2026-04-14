import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Star,
  Music
} from 'lucide-react';

// --- Types ---
interface Rule {
  letter: string;
  sound: string;
  example: string;
  translation: string;
  explanation: string;
}

interface Challenge {
  word: string;
  options: string[];
  correct: string;
  rule: string;
}

// --- Data ---
const RULES: Rule[] = [
  { letter: 'H', sound: 'Լուռ (չի արտասանվում)', example: 'Hola', translation: 'Ողջույն', explanation: 'Իսպաներենում H տառը երբեք չի արտասանվում:' },
  { letter: 'LL', sound: 'Յ (Y)', example: 'Tortilla', translation: 'Տորտիլյա', explanation: 'Կրկնակի L-ը արտասանվում է որպես «Յ»:' },
  { letter: 'Ñ', sound: 'ՆՅ (NY)', example: 'España', translation: 'Իսպանիա', explanation: 'Այս տառը արտասանվում է փափուկ «ՆՅ»:' },
  { letter: 'J', sound: 'Խ (KH)', example: 'Jardín', translation: 'Այգի', explanation: 'J տառը միշտ արտասանվում է որպես կոշտ «Խ»:' },
  { letter: 'V', sound: 'Բ (B)', example: 'Vino', translation: 'Գինի', explanation: 'Իսպաներենում V-ն և B-ն արտասանվում են գրեթե նույն կերպ՝ որպես «Բ»:' },
  { letter: 'Z', sound: 'Ս (S)', example: 'Zapato', translation: 'Կոշիկ', explanation: 'Z տառը արտասանվում է որպես «Ս» (Իսպանիայում՝ միջատամնային Ս):' },
];

const CHALLENGES: Challenge[] = [
  { word: 'Juego', options: ['Ջուեգո', 'Խուեգո', 'Գուեգո'], correct: 'Խուեգո', rule: 'J = Խ' },
  { word: 'Llama', options: ['Լամա', 'Յամա', 'Ջամա'], correct: 'Յամա', rule: 'LL = Յ' },
  { word: 'Niño', options: ['Նինո', 'Նինյո', 'Նինոյ'], correct: 'Նինյո', rule: 'Ñ = ՆՅ' },
  { word: 'Jirafa', options: ['Ջիրաֆա', 'Խիրաֆա', 'Գիրաֆա'], correct: 'Խիրաֆա', rule: 'J = Խ' },
  { word: 'Zorro', options: ['Զոռո', 'Սոռո', 'Ժոռո'], correct: 'Սոռո', rule: 'Z = Ս' },
  { word: 'Hijo', options: ['Հիջո', 'Իխո', 'Խիխո'], correct: 'Իխո', rule: 'H-ն լուռ է, J-ն՝ Խ' },
];

export default function SpanishPronunciationQuest() {
  const [view, setView] = useState<'menu' | 'theory' | 'game' | 'result'>('menu');
  const [currentRule, setCurrentRule] = useState(0);
  const [currentGame, setCurrentGame] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleAnswer = (option: string) => {
    if (feedback) return;
    const isCorrect = option === CHALLENGES[currentGame].correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentGame < CHALLENGES.length - 1) {
        setCurrentGame(g => g + 1);
      } else {
        setView('result');
      }
    }, 1500);
  };

  const reset = () => {
    setView('menu');
    setCurrentRule(0);
    setCurrentGame(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      
      <AnimatePresence mode="wait">
        {view === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl w-full text-center space-y-8"
          >
            <div className="relative inline-block">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-32 h-32 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6"
              >
                <Volume2 className="w-16 h-16 text-indigo-900" />
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 bg-pink-500 p-2 rounded-full shadow-lg"
              >
                <Music className="w-6 h-6" />
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
              ԻՍՊԱՆԵՐԵՆԻ <br />
              <span className="text-yellow-400">ԱՐՏԱՍԱՆՈՒԹՅՈՒՆ</span>
            </h1>
            
            <p className="text-indigo-300 font-bold text-lg md:text-xl max-w-md mx-auto leading-relaxed">
              Սովորիր կարդալ իսպաներեն ճիշտ և խաղա հետաքրքիր խաղը:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              <button 
                onClick={() => setView('theory')}
                className="group relative bg-white text-indigo-900 p-6 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_10px_0_rgb(199,210,254)] active:translate-y-2 active:shadow-none flex items-center justify-center gap-3"
              >
                <BookOpen className="w-6 h-6" />
                Տեսություն
              </button>
              <button 
                onClick={() => setView('game')}
                className="group relative bg-pink-500 text-white p-6 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-pink-400 transition-all shadow-[0_10px_0_rgb(157,23,77)] active:translate-y-2 active:shadow-none flex items-center justify-center gap-3"
              >
                <Gamepad2 className="w-6 h-6" />
                Խաղալ
              </button>
            </div>
          </motion.div>
        )}

        {view === 'theory' && (
          <motion.div 
            key="theory"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-xl w-full bg-white text-indigo-900 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[5rem] -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest">
                  Կանոն {currentRule + 1} / {RULES.length}
                </span>
                <button onClick={reset} className="text-indigo-300 hover:text-indigo-600 transition-colors">
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentRule}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-indigo-900 text-white rounded-3xl flex items-center justify-center text-5xl font-black shadow-xl">
                      {RULES[currentRule].letter}
                    </div>
                    <div>
                      <p className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-1">Հնչյունը</p>
                      <h2 className="text-3xl font-black text-indigo-900">{RULES[currentRule].sound}</h2>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100">
                    <p className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-2">Օրինակ</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black text-indigo-900 italic">{RULES[currentRule].example}</span>
                      <span className="text-indigo-400 font-bold">— {RULES[currentRule].translation}</span>
                    </div>
                  </div>

                  <p className="text-indigo-600 font-medium leading-relaxed text-lg">
                    {RULES[currentRule].explanation}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-10 flex gap-4">
                {currentRule > 0 && (
                  <button 
                    onClick={() => setCurrentRule(r => r - 1)}
                    className="flex-1 py-4 bg-indigo-100 text-indigo-600 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-200 transition-all"
                  >
                    Հետ
                  </button>
                )}
                <button 
                  onClick={() => currentRule < RULES.length - 1 ? setCurrentRule(r => r + 1) : setView('game')}
                  className="flex-[2] py-4 bg-indigo-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-800 transition-all flex items-center justify-center gap-2"
                >
                  {currentRule < RULES.length - 1 ? 'Հաջորդը' : 'Սկսել Խաղը'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'game' && (
          <motion.div 
            key="game"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full space-y-8"
          >
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="bg-pink-500 p-2 rounded-xl shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-2xl tracking-tighter">ՄԻԱՎՈՐ: {score}</span>
              </div>
              <div className="h-2 flex-1 mx-8 bg-indigo-900/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentGame / CHALLENGES.length) * 100}%` }}
                  className="h-full bg-yellow-400"
                />
              </div>
              <span className="font-black text-indigo-400">{currentGame + 1} / {CHALLENGES.length}</span>
            </div>

            <div className="bg-white text-indigo-900 rounded-[4rem] p-10 md:p-16 shadow-2xl text-center relative overflow-hidden border-8 border-indigo-200">
              <div className="relative z-10">
                <p className="text-indigo-300 font-black uppercase tracking-[0.2em] text-sm mb-4">Ինչպե՞ս է կարդացվում</p>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-indigo-900 mb-12 drop-shadow-sm">
                  {CHALLENGES[currentGame].word}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {CHALLENGES[currentGame].options.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(option)}
                      className={`group relative py-6 rounded-[2rem] font-black text-2xl transition-all border-4 ${
                        feedback === 'correct' && option === CHALLENGES[currentGame].correct
                          ? 'bg-emerald-500 border-emerald-600 text-white scale-105 shadow-xl'
                          : feedback === 'wrong' && option === CHALLENGES[currentGame].correct
                          ? 'bg-emerald-500 border-emerald-600 text-white'
                          : feedback === 'wrong' && option !== CHALLENGES[currentGame].correct
                          ? 'bg-red-500 border-red-600 text-white opacity-50'
                          : 'bg-indigo-50 border-indigo-100 text-indigo-900 hover:border-indigo-900 hover:bg-white'
                      }`}
                    >
                      {option}
                      {feedback === 'correct' && option === CHALLENGES[currentGame].correct && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-6 top-1/2 -translate-y-1/2">
                          <CheckCircle2 className="w-8 h-8" />
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
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 p-4 rounded-2xl bg-indigo-900 text-white font-bold flex items-center justify-center gap-3"
                  >
                    {feedback === 'correct' ? (
                      <>
                        <CheckCircle2 className="text-emerald-400" />
                        <span>Ճիշտ է! {CHALLENGES[currentGame].rule}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-400" />
                        <span>Սխալ է: {CHALLENGES[currentGame].rule}</span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {view === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white text-indigo-900 rounded-[4rem] p-12 text-center shadow-2xl border-8 border-yellow-400"
          >
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <TrophyIcon className="w-12 h-12 text-indigo-900" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Գերազանց է!</h2>
            <p className="text-indigo-400 font-bold mb-8 italic">Դուք ավարտեցիք արտասանության մարտահրավերը:</p>
            
            <div className="bg-indigo-50 rounded-3xl p-8 mb-10">
              <p className="text-indigo-300 font-black uppercase text-xs tracking-widest mb-2">Ձեր արդյունքը</p>
              <div className="text-6xl font-black text-indigo-900">
                {score} <span className="text-2xl text-indigo-300">/ {CHALLENGES.length}</span>
              </div>
            </div>

            <button 
              onClick={reset}
              className="w-full py-6 bg-indigo-900 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-indigo-800 transition-all shadow-xl flex items-center justify-center gap-4"
            >
              <RotateCcw className="w-6 h-6" />
              Կրկնել
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-6 text-indigo-400/50 text-xs font-bold uppercase tracking-widest">
        Իսպաներենի Դասեր • Արտասանություն
      </footer>
    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
