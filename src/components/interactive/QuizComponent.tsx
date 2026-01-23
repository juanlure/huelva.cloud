'use client';

import { useState } from 'react';

export default function QuizComponent({
    title,
    subtitle,
    questions, // [{ question, options: [{ text, points }] }]
    results // [{ minPoints, maxPoints, title, description, emoji }]
}: {
    title: string;
    subtitle: string;
    questions: any[];
    results: any[];
}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (points: number) => {
        const newScore = score + points;
        setScore(newScore);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const getResult = () => {
        return results.find(r => score >= r.minPoints && score <= r.maxPoints) || results[0];
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        const result = getResult();
        return (
            <div className="quiz-result bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 my-12 text-center border border-teal-100 shadow-sm animate-fadeIn">
                <span className="text-8xl block mb-6 animate-bounce-slow">{result.emoji}</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{result.title}</h2>
                <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">{result.description}</p>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={resetQuiz}
                        className="px-6 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 shadow-md transition-colors"
                    >
                        Repetir test
                    </button>
                    {/* Compartir simulado */}
                    <button
                        className="px-6 py-3 bg-white text-teal-600 rounded-full font-medium border-2 border-teal-600 hover:bg-teal-50 transition-colors"
                        onClick={() => alert("¡Enlace copiado al portapapeles!")}
                    >
                        Compartir resultado
                    </button>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="quiz-wrapper bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 my-12 border border-violet-100 shadow-sm">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <p className="text-gray-600 mt-2">{subtitle}</p>
            </div>

            {/* Progress */}
            <div className="progress-container mb-8">
                <div className="flex justify-between text-xs font-semibold text-violet-600 mb-1 uppercase tracking-wider">
                    <span>Progreso</span>
                    <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
                </div>
                <div className="progress-bar bg-white rounded-full h-3 shadow-inner">
                    <div
                        className="bg-violet-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="question-card bg-white rounded-xl p-8 shadow-lg">
                <span className="text-sm text-violet-600 font-medium uppercase tracking-wide">
                    Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-6">
                    {question.question}
                </h3>

                <div className="options space-y-3">
                    {question.options.map((option: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option.points)}
                            className="w-full p-4 text-left bg-gray-50 rounded-xl hover:bg-violet-50 hover:border-violet-300 border-2 border-transparent transition-all duration-200 group"
                        >
                            <div className="flex justify-between items-center">
                                <span className="group-hover:text-violet-900">{option.text}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-violet-500">→</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
