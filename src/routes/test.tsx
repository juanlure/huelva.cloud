import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { QUIZ, rankForScore } from "@/data/quiz";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/test")({
  component: TestPage,
  head: () =>
    seoHead({
      title: "Test: ¿cuánto sabes de Huelva? Gamba, Colón, Onuba",
      description:
        "Diez preguntas sobre Huelva: gamba blanca, choco, Palos de la Frontera, Jabugo y Doñana. El test del onubense.",
      path: "/test",
    }),
});

function TestPage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const done = step >= QUIZ.length;
  const question = QUIZ[step];
  const rank = useMemo(() => rankForScore(score), [score]);

  if (done) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <p className="text-kicker text-tinto">
          {score} / {QUIZ.length}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{rank.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{rank.dek}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/guides">Las guías</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStep(0);
              setScore(0);
              setPicked(null);
            }}
          >
            Repetir
          </Button>
        </div>
      </main>
    );
  }

  if (!question) return null;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-kicker text-tinto">
        El test del onubense · {step + 1} / {QUIZ.length}
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
        {question.prompt}
      </h1>
      <p className="mt-3 text-sm text-muted">{question.hint}</p>

      <div className="mt-8 grid gap-3">
        {question.options.map((option) => {
          const selected = picked === option.id;
          const reveal = picked !== null;
          const good = reveal && option.correct;
          const bad = reveal && selected && !option.correct;
          return (
            <button
              key={option.id}
              type="button"
              disabled={picked !== null}
              onClick={() => {
                setPicked(option.id);
                if (option.correct) setScore((s) => s + 1);
              }}
              className={cn(
                "rounded-xl px-4 py-4 text-left text-base shadow-border transition-colors duration-150",
                !reveal && "bg-paper hover:bg-foam",
                good && "bg-foam text-tide",
                bad && "bg-paper text-warn",
                reveal && !good && !bad && "bg-paper text-faint",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {picked ? (
        <Button className="mt-6" onClick={() => {
          setPicked(null);
          setStep((s) => s + 1);
        }}>
          {step === QUIZ.length - 1 ? "Ver resultado" : "Siguiente"}
        </Button>
      ) : null}
    </main>
  );
}
