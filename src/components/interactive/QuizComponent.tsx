'use client';

import { useState } from 'react';
import styles from './QuizComponent.module.css';

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
            <div className={styles.quizResult}>
                <span className={styles.emoji}>{result.emoji}</span>
                <h2 className={styles.resultTitle}>{result.title}</h2>
                <p className={styles.resultDescription}>{result.description}</p>

                <div className={styles.buttonGroup}>
                    <button
                        onClick={resetQuiz}
                        className={styles.primaryButton}
                    >
                        Repetir test
                    </button>
                    {/* Compartir simulado */}
                    <button
                        className={styles.secondaryButton}
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
        <div className={styles.quizWrapper}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>

            {/* Progress */}
            <div className={styles.progressContainer}>
                <div className={styles.progressMeta}>
                    <span>Progreso</span>
                    <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
                </div>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className={styles.questionCard}>
                <span className={styles.questionMeta}>
                    Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <h3 className={styles.questionText}>
                    {question.question}
                </h3>

                <div className={styles.options}>
                    {question.options.map((option: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option.points)}
                            className={styles.optionButton}
                        >
                            <span className={styles.optionText}>{option.text}</span>
                            <span className={styles.arrow}>→</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
