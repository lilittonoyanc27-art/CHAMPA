import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  Star,
  Zap,
  Check
} from 'lucide-react';

// --- Data ---
const GENDER_RULES = [
  {
    title: "Կանոն 1: -O վերջավորություն",
    description: "Իսպաներենում բառերի մեծ մասը, որոնք վերջանում են -O տառով, արական սեռի են:",
    examples: [
      { word: "El libro", translation: "Գիրքը" },
      { word: "El chico", translation: "Տղան" },
      { word: "El perro", translation: "Շունը" }
    ],
    color: "bg-blue-500"
  },
  {
    title: "Կանոն 2: Հոդերը (Articles)",
    description: "Արական սեռի բառերի հետ օգտագործում ենք EL (որոշյալ) կամ UN (անորոշ) հոդերը:",
    examples: [
      { word: "El gato", translation: "Կատուն (կոնկրետ)" },
      { word: "Un gato", translation: "Մի կատու (ցանկացած)" }
    ],
    color: "bg-indigo-500"
  },
  {
    title: "Կանոն 3: -OR վերջավորություն",
    description: "Բառերը, որոնք վերջանում են -OR-ով, սովորաբար արական սեռի են:",
    examples: [
      { word: "El doctor", translation: "Բժիշկը" },
      { word: "El profesor", translation: "Ուսուցիչը" },
      { word: "El amor", translation: "Սերը" }
    ],
    color: "bg-cyan-500"
  }
];

const QUIZ = [
  { question: "¿____ libro?", options: ["El", "La"], correct: "El" },
  { question: "¿____ chico?", options: ["Un", "Una"], correct: "Un" },
  { question: "¿____ doctor?", options: ["El", "La"], correct: "El" },
  { question: "¿____ perro?", options: ["Un", "Una"], correct: "Un" },
  { question: "Ո՞րն է արական սեռի վերջավորությունը:", options: ["-o", "-a"], correct: "-o" }
];

export default function SpanishMasculineGender() {
  const [view, setView] = useState<'menu' | 'theory' | 'quiz' | 'result'>('menu');
  const [step, setStep] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleQuiz = (option: string) => {
    if (feedback) return;
    if (option === QUIZ[quizIndex].correct) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (quizIndex < QUIZ.length - 1) {
        setQuizIndex(i => i + 1);
      } else {
        setView('result');
      }
    }, 1000);
  };

  const reset = () => {
    setView('menu');
    setStep(0);
    setQuizIndex(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      
      <AnimatePresence mode="wait">
        {view === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-xl w-full text-center space-y-8"
          >
            <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-3">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
              ԱՐԱԿԱՆ ՍԵՌ <br />
              <span className="text-blue-600">(MASCULINO)</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">
              Իսպաներենի քերականության ամենապարզ բացատրությունը:
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setView('theory')}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3"
              >
                <BookOpen className="w-6 h-6" />
                Սովորել Կանոնները
              </button>
              <button 
                onClick={() => setView('quiz')}
                className="w-full py-5 bg-white text-blue-600 border-2 border-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all"
              >
                Ստուգել Գիտելիքները
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
            className="max-w-lg w-full"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <div className={`w-12 h-12 ${GENDER_RULES[step].color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-slate-300 font-black text-sm uppercase tracking-widest">
                  {step + 1} / {GENDER_RULES.length}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 mb-4">{GENDER_RULES[step].title}</h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {GENDER_RULES[step].description}
              </p>

              <div className="space-y-3 mb-10">
                {GENDER_RULES[step].examples.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                    <span className="text-xl font-bold text-blue-600">{ex.word}</span>
                    <span className="text-slate-400 font-medium italic">{ex.translation}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => step < GENDER_RULES.length - 1 ? setStep(s => s + 1) : setView('quiz')}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                {step < GENDER_RULES.length - 1 ? 'Հաջորդը' : 'Անցնել Թեստին'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full"
          >
            <div className="mb-6 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-black text-slate-900">ՄԻԱՎՈՐ: {score}</span>
              </div>
              <span className="text-slate-400 font-bold">{quizIndex + 1} / {QUIZ.length}</span>
            </div>

            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-4 border-blue-100 text-center">
              <h3 className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">Ընտրիր ճիշտ հոդը</h3>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-12 tracking-tight">
                {QUIZ[quizIndex].question}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {QUIZ[quizIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleQuiz(opt)}
                    className={`py-6 rounded-3xl font-black text-2xl transition-all border-2 ${
                      feedback === 'correct' && opt === QUIZ[quizIndex].correct
                        ? 'bg-emerald-500 border-emerald-500 text-white scale-105'
                        : feedback === 'wrong' && opt === QUIZ[quizIndex].correct
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : feedback === 'wrong' && opt !== QUIZ[quizIndex].correct
                        ? 'bg-red-500 border-red-500 text-white opacity-50'
                        : 'bg-slate-50 border-slate-100 text-slate-900 hover:border-blue-600 hover:bg-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-8 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${feedback === 'correct' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}
                  >
                    {feedback === 'correct' ? <CheckCircle2 className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                    {feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է'}
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
            className="max-w-sm w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border-t-8 border-blue-600"
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">ԱՎԱՐՏՎԱԾ Է</h2>
            <p className="text-slate-400 font-medium mb-8">Դուք սովորեցիք արական սեռի հիմունքները:</p>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <span className="text-slate-300 font-black uppercase text-[10px] tracking-widest block mb-1">Արդյունք</span>
              <div className="text-5xl font-black text-slate-900">
                {score} <span className="text-xl text-slate-300">/ {QUIZ.length}</span>
              </div>
            </div>

            <button 
              onClick={reset}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
            >
              <RotateCcw className="w-5 h-5" />
              Կրկնել
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-6 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
        Իսպաներենի Դասեր • Masculino
      </footer>
    </div>
  );
}
