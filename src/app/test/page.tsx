'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

const questions = [
  {
    question: "¿Qué se come un domingo en Punta Umbría?",
    options: [
      { text: "Paella mixta con chorizo", score: 0 },
      { text: "Unas coquinas y unos chocos fritos", score: 2 },
      { text: "Fish and chips", score: 0 },
      { text: "Pizza hawaiana", score: -1 }
    ]
  },
  {
    question: "¿Cuál es el grito de guerra oficial?",
    options: [
      { text: "¡Olé!", score: 0 },
      { text: "¡Viva el Betis!", score: 0 },
      { text: "¡Huelva, Huelva, Huelva!", score: 2 },
      { text: "¡A por ellos!", score: 0 }
    ]
  },
  {
    question: "Si te digo 'Aliquindoi', ¿qué haces?",
    options: [
      { text: "Me pongo alerta / presto atención", score: 2 },
      { text: "Te saludo de vuelta", score: 0 },
      { text: "Miro para otro lado", score: -1 },
      { text: "Pido otra cerveza", score: 0 }
    ]
  },
  {
    question: "¿Dónde se ven los mejores atardeceres?",
    options: [
      { text: "En el Muelle del Tinto", score: 2 },
      { text: "En Instagram", score: 0 },
      { text: "En Benidorm", score: -5 },
      { text: "Desde mi balcón", score: 1 }
    ]
  },
  {
    question: "¿Qué es un 'gurumelo'?",
    options: [
      { text: "Un dulce típico", score: 0 },
      { text: "Un tipo de seta deliciosa", score: 2 },
      { text: "Un pez de río", score: 0 },
      { text: "Un insulto cariñoso", score: 0 }
    ]
  }
];

export default function TestPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    if (score >= 8) return {
      title: "CHOQUERO DE PURA CEPA",
      desc: "Tú no has nacido, a ti te han pescado en la ría. Sabes más de Huelva que Colón. ¡Enhorabuena!",
      emoji: "🦐"
    };
    if (score >= 5) return {
      title: "CASI CHOQUERO",
      desc: "Se nota que te gusta lo bueno, pero te falta un par de romerías más. ¡Sigue así!",
      emoji: "🥘"
    };
    return {
      title: "TURISTA CURIOSO",
      desc: "Bienvenido/a. Tienes mucho que descubrir y mucha gamba que pelar. ¡Disfruta el viaje!",
      emoji: "📸"
    };
  };

  const result = finished ? getResult() : null;

  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>
          ¿<span className={styles.highlight}>Choquero</span> o Turista?
        </h1>
        
        {!finished ? (
          <div className={styles.quizCard}>
            <div className={styles.progress}>
              Pregunta {currentQ + 1} de {questions.length}
            </div>
            
            <h2 className={styles.question}>{questions[currentQ].question}</h2>
            
            <div className={styles.options}>
              {questions[currentQ].options.map((opt, idx) => (
                <button 
                  key={idx} 
                  className={styles.optionBtn}
                  onClick={() => handleAnswer(opt.score)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.resultCard}>
            <div className={styles.emoji}>{result?.emoji}</div>
            <h2 className={styles.resultTitle}>{result?.title}</h2>
            <p className={styles.resultDesc}>{result?.desc}</p>
            
            <button 
              className={styles.retryBtn}
              onClick={() => {
                setScore(0);
                setCurrentQ(0);
                setFinished(false);
              }}
            >
              Intentar de nuevo
            </button>
            
            <a href="/" className={styles.homeBtn}>Volver al inicio</a>
          </div>
        )}
      </div>
    </main>
  );
}
