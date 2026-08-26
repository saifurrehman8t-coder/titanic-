import React, { useState } from 'react';
import { TITANIC_QUIZ_QUESTIONS } from '../data/quiz';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

export const TitanicQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = TITANIC_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < TITANIC_QUIZ_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="container py-8 max-w-2xl mx-auto space-y-8 animate-fade-in text-left">
      {/* Quiz Header */}
      <div className="text-center space-y-3">
        <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded border border-amber-500/40 font-mono">
          Interactive Dwell-Time Challenge
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold gold-gradient-text">
          Titanic History Trivia Challenge
        </h2>
        <p className="text-xs md:text-sm text-gray-400">
          Test your historical knowledge of construction, passengers, timeline, and wreck discovery!
        </p>
      </div>

      {!quizCompleted ? (
        <div className="glass-panel p-6 md:p-8 rounded-xl space-y-6">
          
          {/* Quiz Progress Counter */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-3 text-xs font-mono">
            <span className="text-amber-400 font-bold">
              Question {currentIdx + 1} of {TITANIC_QUIZ_QUESTIONS.length}
            </span>
            <span className="text-gray-400">Score: {score}</span>
          </div>

          {/* Question Text */}
          <h3 className="text-base md:text-lg font-bold text-gray-100 leading-snug">
            {currentQ.question}
          </h3>

          {/* Option Buttons */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "bg-slate-900/90 text-gray-200 border-gray-800 hover:border-amber-400/60";
              
              if (isAnswered) {
                if (idx === currentQ.correctAnswer) {
                  btnStyle = "bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-500/20 text-rose-300 border-rose-500/60";
                } else {
                  btnStyle = "bg-slate-950 text-gray-600 border-gray-900 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 rounded-lg border text-left text-xs md:text-sm flex items-center justify-between transition-all ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === currentQ.correctAnswer && (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                    <XCircle size={16} className="text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 space-y-1 animate-fade-in">
              <strong className="font-mono text-amber-400 block flex items-center gap-1">
                <HelpCircle size={12} /> Historical Context:
              </strong>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button 
                onClick={handleNext}
                className="btn btn-primary text-xs py-2 px-5 flex items-center gap-1"
              >
                {currentIdx + 1 === TITANIC_QUIZ_QUESTIONS.length ? 'View Final Score' : 'Next Question'}
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Completion Screen */
        <div className="glass-panel p-8 rounded-xl text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 mx-auto flex items-center justify-center text-3xl">
            🏆
          </div>

          <h3 className="text-xl font-bold text-gray-100">Quiz Completed!</h3>
          <p className="text-sm text-gray-300">
            You scored <strong className="text-amber-400 font-mono text-lg">{score} / {TITANIC_QUIZ_QUESTIONS.length}</strong>!
          </p>

          <p className="text-xs text-gray-400 max-w-md mx-auto">
            {score === TITANIC_QUIZ_QUESTIONS.length 
              ? "Flawless score! You are a master Titanic historian."
              : "Great effort! Explore our 52 blog archives to master every detail of Titanic history."}
          </p>

          <button 
            onClick={handleRestart}
            className="btn btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2"
          >
            <RotateCcw size={14} /> Retake Trivia Quiz
          </button>
        </div>
      )}
    </div>
  );
};
