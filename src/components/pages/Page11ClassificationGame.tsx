import React, { useState } from 'react';
import { GAME_ITEMS, GameItem, CategoryType, evaluatePlacement, updateGameState, GameState } from '../../utils/game';
import { Gamepad2, RotateCcw, CheckCircle2, XCircle, Trophy, Sparkles, MoveRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Page11ClassificationGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    placedItems: {},
    remainingItemIds: GAME_ITEMS.map((item) => item.id),
    completed: false
  });

  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [selectedMobileItemId, setSelectedMobileItemId] = useState<number | null>(null);

  const handlePlace = (itemId: number, targetCategory: CategoryType) => {
    const { isCorrect, pointsDelta } = evaluatePlacement(itemId, targetCategory);
    const item = GAME_ITEMS.find((i) => i.id === itemId);

    if (isCorrect) {
      setFeedback({
        message: `Chính xác! "+10 điểm" cho "${item?.title}"`,
        isCorrect: true
      });
    } else {
      setFeedback({
        message: `Chưa đúng rồi! "-5 điểm". "${item?.title}" thuộc về ${item?.category}.`,
        isCorrect: false
      });
    }

    const nextState = updateGameState(gameState, itemId, targetCategory);
    setGameState(nextState);
    setSelectedMobileItemId(null);

    if (nextState.completed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }

    setTimeout(() => {
      setFeedback(null);
    }, 2500);
  };

  const handleRestart = () => {
    setGameState({
      score: 0,
      placedItems: {},
      remainingItemIds: GAME_ITEMS.map((item) => item.id),
      completed: false
    });
    setFeedback(null);
    setSelectedMobileItemId(null);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCategory: CategoryType) => {
    e.preventDefault();
    const idStr = e.dataTransfer.getData('text/plain');
    const id = Number(idStr) || draggedItemId;
    if (id) {
      handlePlace(id, targetCategory);
    }
    setDraggedItemId(null);
  };

  const remainingItems = GAME_ITEMS.filter((i) => gameState.remainingItemIds.includes(i.id));
  const chuVietPlaced = GAME_ITEMS.filter((i) => gameState.placedItems[i.id] === 'CHỮ VIẾT');
  const vanHocPlaced = GAME_ITEMS.filter((i) => gameState.placedItems[i.id] === 'VĂN HỌC');

  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider text-[#C69C50] font-semibold">
            <Gamepad2 className="w-4 h-4" />
            <span>Trang 11 · Hoạt Động Tương Tác</span>
          </div>

          {/* Live Score Counter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-lg bg-[#2A1D15] text-[#E7C77A] border border-[#C69C50] shadow-xs">
              Điểm: {gameState.score}
            </span>
            <button
              type="button"
              onClick={handleRestart}
              title="Chơi lại từ đầu"
              className="p-1.5 rounded-lg text-[#8C4A28] hover:text-[#C69C50] hover:bg-amber-900/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#39271D] tracking-wide text-center mt-1">
          THỬ TÀI NHÀ SỬ HỌC: PHÂN LOẠI THÀNH TỰU
        </h2>
        <p className="text-xs sm:text-sm font-serif-body text-stone-700 text-center italic mt-1">
          Kéo thả hoặc chạm chọn thẻ thành tựu vào đúng khu vực: <strong>CHỮ VIẾT</strong> hoặc <strong>VĂN HỌC</strong>
        </p>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`relative z-20 py-2 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 transition-all ${
            feedback.isCorrect
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-rose-800 text-white shadow-sm'
          }`}
        >
          {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Completed Win Banner */}
      {gameState.completed ? (
        <div className="relative z-10 my-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-[#39271D] to-amber-950 text-[#F5E8D0] border-2 border-[#C69C50] text-center shadow-lg space-y-3">
          <Trophy className="w-12 h-12 text-[#E7C77A] mx-auto animate-bounce" />
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#E7C77A]">
            HOÀN THÀNH XUẤT SẮC!
          </h3>
          <p className="text-sm font-serif-body text-amber-100">
            Bạn đã phân loại chính xác toàn bộ 12 thành tựu tiêu biểu của văn minh Hy Lạp – La Mã cổ đại với tổng số điểm là:
          </p>
          <div className="text-3xl sm:text-4xl font-heading font-black text-[#E7C77A]">
            {gameState.score} ĐIỂM
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="px-6 py-2.5 rounded-full bg-[#C69C50] hover:bg-[#E7C77A] text-[#171614] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Chơi Lại Lần Nữa
          </button>
        </div>
      ) : (
        /* Game Field: 2 Drop Zones & Cards Drawer */
        <div className="relative z-10 my-auto py-1 space-y-2.5">
          {/* 2 Target Drop Zones */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Zone 1: CHỮ VIẾT */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'CHỮ VIẾT')}
              onClick={() => {
                if (selectedMobileItemId) {
                  handlePlace(selectedMobileItemId, 'CHỮ VIẾT');
                }
              }}
              className={`p-2.5 rounded-xl border-2 transition-all min-h-[145px] flex flex-col justify-between ${
                selectedMobileItemId
                  ? 'border-[#C69C50] bg-amber-950/20 ring-2 ring-[#C69C50] cursor-pointer'
                  : 'border-[#C69C50]/50 bg-amber-900/10'
              }`}
            >
              <div className="text-center pb-1 border-b border-[#C69C50]/30">
                <div className="text-xs sm:text-sm font-heading font-bold text-[#8C4A28] uppercase tracking-wider">
                  CHỮ VIẾT
                </div>
                <div className="text-xs text-stone-600 font-mono">
                  Đã ghép: {chuVietPlaced.length} / 5
                </div>
              </div>

              {/* Placed badges */}
              <div className="py-1 flex flex-wrap gap-1 content-start flex-1">
                {chuVietPlaced.map((p) => (
                  <span
                    key={p.id}
                    className="text-[10px] sm:text-xs font-sans font-medium px-2 py-0.5 rounded-md bg-[#2A1D15] text-amber-200 border border-[#C69C50]/40 shadow-xs"
                  >
                    ✓ {p.title}
                  </span>
                ))}
              </div>

              <div className="text-[10px] sm:text-xs text-center text-stone-500 italic">
                {selectedMobileItemId ? 'Chạm để thả vào đây' : 'Kéo thả vào khu vực này'}
              </div>
            </div>

            {/* Zone 2: VĂN HỌC */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'VĂN HỌC')}
              onClick={() => {
                if (selectedMobileItemId) {
                  handlePlace(selectedMobileItemId, 'VĂN HỌC');
                }
              }}
              className={`p-2.5 rounded-xl border-2 transition-all min-h-[145px] flex flex-col justify-between ${
                selectedMobileItemId
                  ? 'border-[#C69C50] bg-amber-950/20 ring-2 ring-[#C69C50] cursor-pointer'
                  : 'border-[#C69C50]/50 bg-amber-900/10'
              }`}
            >
              <div className="text-center pb-1 border-b border-[#C69C50]/30">
                <div className="text-xs sm:text-sm font-heading font-bold text-[#8C4A28] uppercase tracking-wider">
                  VĂN HỌC
                </div>
                <div className="text-xs text-stone-600 font-mono">
                  Đã ghép: {vanHocPlaced.length} / 7
                </div>
              </div>

              {/* Placed badges */}
              <div className="py-1 flex flex-wrap gap-1 content-start flex-1">
                {vanHocPlaced.map((p) => (
                  <span
                    key={p.id}
                    className="text-[10px] sm:text-xs font-sans font-medium px-2 py-0.5 rounded-md bg-[#2A1D15] text-amber-200 border border-[#C69C50]/40 shadow-xs"
                  >
                    ✓ {p.title}
                  </span>
                ))}
              </div>

              <div className="text-[10px] sm:text-xs text-center text-stone-500 italic">
                {selectedMobileItemId ? 'Chạm để thả vào đây' : 'Kéo thả vào khu vực này'}
              </div>
            </div>
          </div>

          {/* Remaining Items Cards Drawer */}
          <div className="pt-1.5">
            <div className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#8C4A28] mb-1.5 flex justify-between">
              <span>Thẻ thành tựu ({remainingItems.length} thẻ còn lại):</span>
              <span className="text-stone-500 font-normal">Chạm hoặc kéo thả</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto custom-scrollbar p-1.5 rounded-xl bg-stone-900/5 border border-[#C69C50]/30">
              {remainingItems.map((item) => {
                const isSelected = selectedMobileItemId === item.id;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => setSelectedMobileItemId(isSelected ? null : item.id)}
                    className={`p-2 rounded-lg border text-xs sm:text-sm font-sans font-medium transition-all cursor-grab active:cursor-grabbing select-none text-center ${
                      isSelected
                        ? 'border-[#C69C50] bg-[#C69C50] text-[#171614] shadow-md ring-2 ring-[#E7C77A] scale-[1.02]'
                        : 'border-[#C69C50]/40 bg-parchment hover:border-[#C69C50] text-[#2A1D15] hover:bg-amber-100 shadow-xs'
                    }`}
                  >
                    <div className="truncate font-semibold">{item.title}</div>
                    {isSelected && (
                      <div className="text-[10px] font-mono mt-0.5 text-[#171614] flex items-center justify-center gap-1 font-bold">
                        <span>Chọn khu vực ở trên</span>
                        <MoveRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer rule note */}
      <div className="relative z-10 pt-2 border-t border-[#C69C50]/30 flex justify-between items-center text-xs text-amber-900/70 font-mono">
        <span>ĐÚNG: +10 ĐIỂM · SAI: -5 ĐIỂM</span>
        <span>TỔNG 12 THÀNH TỰU</span>
      </div>
    </div>
  );
};
