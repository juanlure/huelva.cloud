'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, RefreshCw, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const QUESTIONS = [
    {
        id: 1,
        question: "¿Cómo pides un café con mucha leche y poco café?",
        options: [
            { id: 'a', text: 'Un manchado', value: 0 },
            { id: 'b', text: 'Una nube', value: 10 },
            { id: 'c', text: 'Un cortado largo de leche', value: 5 },
            { id: 'd', text: 'Póngame lo que usted quiera, jefe', value: 2 }
        ]
    },
    {
        id: 2,
        question: "Es 3 de agosto por la tarde, ¿dónde estás?",
        options: [
            { id: 'a', text: 'En las Colombinas, empezando con un ponche', value: 10 },
            { id: 'b', text: 'En el centro comercial con el aire acondicionado', value: 0 },
            { id: 'c', text: 'En la playa de Punta Umbría', value: 7 },
            { id: 'd', text: 'Dormido la siesta hasta las 21:00', value: 5 }
        ]
    },
    {
        id: 3,
        question: "Te ponen un plato de jamón, ¿qué es lo primero que miras?",
        options: [
            { id: 'a', text: 'El brillo de la grasa (el sudado)', value: 10 },
            { id: 'b', text: 'Si tiene mucha cantidad', value: 2 },
            { id: 'c', text: 'Si viene con picos', value: 5 },
            { id: 'd', text: 'Si es del súper', value: 0 }
        ]
    }
];

export default function Quiz() {
    const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const handleStart = () => {
        setStep('quiz');
        setCurrentQuestion(0);
        setScore(0);
    };

    const handleAnswer = (value: number) => {
        setScore(score + value);
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setStep('result');
        }
    };

    const getResult = () => {
        const maxScore = QUESTIONS.length * 10;
        const percentage = (score / maxScore) * 100;

        if (percentage > 80) return { title: 'Choquero de Pura Cepa', desc: 'Llevas Huelva en la sangre. Las Colombinas no empiezan hasta que tú llegas.' };
        if (percentage > 50) return { title: 'Onubense Adoptado', desc: 'Te defiendes bien, pero todavía te pierdes buscando el Monumento a la Fe Descubridora.' };
        return { title: 'Guiri Total', desc: '¿Huy-va? No pasa nada, pídete unas gambas y empieza a aprender.' };
    };

    return (
        <section className="bg-navy rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/10 rounded-full -mr-32 -mt-32 blur-3xl" />

            <AnimatePresence mode="wait">
                {step === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-10 text-center space-y-6"
                    >
                        <span className="px-4 py-1 bg-terracotta/20 text-terracotta border border-terracotta/30 text-xs font-bold uppercase tracking-widest rounded-full">
                            Interactive Test
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold">¿Eres Choquero o Guiri?</h2>
                        <p className="text-white/70 max-w-lg mx-auto text-lg">
                            Demuestra cuánto sabes de la capital del mundo (Huelva, por si tenías dudas).
                        </p>
                        <button
                            onClick={handleStart}
                            className="px-10 py-4 bg-terracotta hover:bg-terracotta-600 text-white rounded-full font-bold transition-all transform hover:scale-105 inline-flex items-center space-x-2"
                        >
                            <span>Empezar Test</span>
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {step === 'quiz' && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative z-10"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-terracotta font-mono font-bold">
                                0{currentQuestion + 1} / 0{QUESTIONS.length}
                            </span>
                            <div className="h-1 bg-white/10 flex-1 mx-6 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-terracotta"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">
                            {QUESTIONS[currentQuestion].question}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {QUESTIONS[currentQuestion].options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.value)}
                                    className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-terracotta/50 transition-all group"
                                >
                                    <span className="text-white/40 group-hover:text-terracotta transition-colors mb-2 block font-mono text-sm">
                                        OPCIÓN {option.id.toUpperCase()}
                                    </span>
                                    <span className="text-lg font-medium">{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 text-center space-y-8"
                    >
                        <div className="mx-auto w-24 h-24 bg-terracotta rounded-full flex items-center justify-center mb-6">
                            <Check size={48} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{getResult().title}</h2>
                            <p className="text-white/70 text-xl max-w-md mx-auto">
                                {getResult().desc}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                            <button
                                onClick={handleStart}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all flex items-center space-x-2"
                            >
                                <RefreshCw size={18} />
                                <span>Repetir</span>
                            </button>
                            <button className="px-8 py-3 bg-terracotta hover:bg-terracotta-600 text-white rounded-full font-bold transition-all flex items-center space-x-2">
                                <Share2 size={18} />
                                <span>Compartir resultado</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
