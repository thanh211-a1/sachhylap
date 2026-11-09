import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, calculateQuizScore, getRankGrade } from '../../utils/quiz';
import { HelpCircle, Timer, CheckCircle, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTION_TIME_LIMIT = 20;

export const Page12Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  // Countdown timer logic
  useEffect(() => {
    if (isCompleted || showExplanation) return;

    if (timeLeft <= 0) {
      // Time is up for current question
      setShowExplanation(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isCompleted, showExplanation]);

  const handleSelectAnswer = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (showExplanation) return;
    setSelectedChoice(choice);
    setAnswers((prev) => ({ ...prev, [currentQ.id]: choice }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setShowExplanation(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedChoice(null);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const finalScore = calculateQuizScore(answers);
  const rankInfo = getRankGrade(finalScore);

  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider text-[#C69C50] font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Trang 12 · Kiểm Tra Kiến Thức</span>
          </div>

          {!isCompleted && (
            <div className="flex items-center gap-2">
              {/* Question progress */}
              <span className="text-xs sm:text-sm font-mono font-semibold text-[#8C4A28]">
                Câu {currentQuestionIndex + 1} / 10
              </span>

              {/* Countdown clock */}
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs sm:text-sm font-mono font-bold border transition-colors ${
                  timeLeft <= 5
                    ? 'bg-rose-900/30 text-rose-700 border-rose-500 animate-pulse'
                    : 'bg-amber-900/20 text-[#8C4A28] border-[#C69C50]/60'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#39271D] tracking-wide text-center mt-1">
          THỬ THÁCH KIẾN THỨC LỊCH SỬ
        </h2>
      </div>

      {/* Main Body: Question or Results Screen */}
      {isCompleted ? (
        <div className="relative z-10 my-auto p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#2A1D15] via-[#38271B] to-[#1E1510] text-[#F5E8D0] border-2 border-[#C69C50] text-center shadow-xl space-y-3.5 animate-fadeIn">
          <Trophy className="w-14 h-14 text-[#E7C77A] mx-auto animate-bounce" />
          
          <div className="text-xs sm:text-sm uppercase tracking-widest text-[#C69C50] font-heading font-semibold">
            KẾT QUẢ BÀI KIỂM TRA
          </div>

          <div className="text-4xl sm:text-5xl font-heading font-black text-[#E7C77A]">
            {finalScore} / 100 ĐIỂM
          </div>

          <div className="inline-block px-5 py-2 rounded-full border border-[#C69C50] bg-amber-950/60 shadow-inner">
            <span className={`text-base sm:text-lg font-heading font-bold ${rankInfo.badgeColor}`}>
              Xếp loại: {rankInfo.grade}
            </span>
          </div>

          <p className="text-sm sm:text-base font-serif-body text-amber-100/90 max-w-sm mx-auto leading-relaxed">
            {rankInfo.message}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C69C50] via-[#E7C77A] to-[#C69C50] text-[#171614] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại Bài Kiểm Tra</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Display */
        <div className="relative z-10 my-auto py-2 space-y-3">
          {/* Question Text */}
          <div className="p-4 rounded-xl bg-amber-950/10 border border-[#C69C50]/50 shadow-xs">
            <div className="text-xs font-mono text-[#8C4A28] font-bold uppercase tracking-wider mb-1">
              Câu hỏi số {currentQuestionIndex + 1}:
            </div>
            <h3 className="text-base sm:text-lg font-heading font-bold text-[#2A1D15] leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Choices A, B, C, D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedChoice === opt.key;
              const isCorrect = opt.key === currentQ.correctAnswer;
              
              let btnStyle = 'border-[#C69C50]/40 bg-amber-900/10 hover:bg-amber-900/20 text-[#2A1D15] cursor-pointer';

              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-600 bg-emerald-800 text-white font-bold ring-2 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-600 bg-rose-800 text-white font-bold';
                } else {
                  btnStyle = 'border-stone-300 bg-stone-200/50 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={showExplanation}
                  onClick={() => handleSelectAnswer(opt.key)}
                  className={`p-3 rounded-xl border text-left text-sm sm:text-base transition-all flex items-start gap-3 shadow-xs ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full border border-current font-heading font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {opt.key}
                  </span>
                  <span className="flex-1 font-sans leading-snug">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation Section */}
          {showExplanation && (
            <div className="p-3.5 rounded-xl bg-[#2A1D15] text-[#F5E8D0] border border-[#C69C50] shadow-md animate-fadeIn space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-heading font-bold">
                  {selectedChoice === currentQ.correctAnswer ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> Chính xác! (+10 điểm)
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Đáp án đúng là {currentQ.correctAnswer}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-3.5 py-1.5 rounded-lg bg-[#C69C50] hover:bg-[#E7C77A] text-[#171614] text-xs sm:text-sm font-heading font-bold flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm font-serif-body text-amber-100/90 leading-relaxed italic">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 pt-2 border-t border-[#C69C50]/30 flex justify-between items-center text-xs text-amber-900/70 font-mono">
        <span>MỖI CÂU 20 GIÂY · ĐÚNG: +10 ĐIỂM</span>
        <span>TRƯỜNG THPT CẨM PHẢ</span>
      </div>
    </div>
  );
};
