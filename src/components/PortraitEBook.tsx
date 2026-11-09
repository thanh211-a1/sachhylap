import React, { useState, useEffect } from 'react';
import { AppConfigData } from '../types';
import { Page1Cover } from './pages/Page1Cover';
import { Page2Intro } from './pages/Page2Intro';
import { Page3Toc } from './pages/Page3Toc';
import { Page4GreekScript } from './pages/Page4GreekScript';
import { Page5LatinScript } from './pages/Page5LatinScript';
import { Page6LatinToQuocNgu } from './pages/Page6LatinToQuocNgu';
import { Page7LiteratureOverview } from './pages/Page7LiteratureOverview';
import { Page8Mythology } from './pages/Page8Mythology';
import { Page9Iliad } from './pages/Page9Iliad';
import { Page10Odyssey } from './pages/Page10Odyssey';
import { Page11ClassificationGame } from './pages/Page11ClassificationGame';
import { Page12Quiz } from './pages/Page12Quiz';
import { Page13Summary } from './pages/Page13Summary';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Maximize2,
  Lock,
  RotateCcw,
  Sparkles,
  Volume2
} from 'lucide-react';

interface PortraitEBookProps {
  config: AppConfigData;
  currentPage: number;
  onPageChange: (page: number) => void;
  onOpenAdmin: () => void;
  onReplayIntro: () => void;
  onTogglePresentation: () => void;
  isPresentationMode?: boolean;
}

const TOTAL_PAGES = 13;

const PAGE_TITLES: Record<number, string> = {
  1: 'Bìa Sách · Thành Tựu Văn Minh',
  2: 'Lời Mở Đầu',
  3: 'Mục Lục Tác Phẩm',
  4: 'Chữ Viết Hy Lạp',
  5: 'Chữ Viết La Mã',
  6: 'Từ Chữ Latin Đến Chữ Quốc Ngữ',
  7: 'Những Giá Trị Văn Học Rực Rỡ',
  8: 'Thế Giới Thần Thoại Cổ Đại',
  9: 'Sử Thi Iliad · Chiến Tranh Troy',
  10: 'Sử Thi Odyssey · Khát Vọng Trở Về',
  11: 'Trò Chơi: Thử Tài Nhà Sử Học',
  12: 'Kiểm Tra Kiến Thức',
  13: 'Những Di Sản Vượt Thời Gian'
};

export const PortraitEBook: React.FC<PortraitEBookProps> = ({
  config,
  currentPage,
  onPageChange,
  onOpenAdmin,
  onReplayIntro,
  onTogglePresentation,
  isPresentationMode = false
}) => {
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const goToNextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        onPageChange(currentPage + 1);
        setIsFlipping(false);
      }, 250);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        onPageChange(currentPage - 1);
        setIsFlipping(false);
      }, 250);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === 'Home') {
        onPageChange(1);
      } else if (e.key === 'End') {
        onPageChange(TOTAL_PAGES);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const renderCurrentPageContent = () => {
    switch (currentPage) {
      case 1:
        return <Page1Cover settings={config.settings} onNext={goToNextPage} />;
      case 2:
        return <Page2Intro narration={config.narrations.page2} />;
      case 3:
        return <Page3Toc onSelectPage={(p) => onPageChange(p)} />;
      case 4:
        return <Page4GreekScript narration={config.narrations.page4} />;
      case 5:
        return <Page5LatinScript narration={config.narrations.page5} />;
      case 6:
        return <Page6LatinToQuocNgu narration={config.narrations.page6} />;
      case 7:
        return <Page7LiteratureOverview narration={config.narrations.page7} />;
      case 8:
        return <Page8Mythology narrations={config.narrations} />;
      case 9:
        return <Page9Iliad narration={config.narrations.page9} />;
      case 10:
        return <Page10Odyssey narration={config.narrations.page10} />;
      case 11:
        return <Page11ClassificationGame />;
      case 12:
        return <Page12Quiz />;
      case 13:
        return (
          <Page13Summary
            narration={config.narrations.page13}
            onGoToCover={() => onPageChange(1)}
            onReplayIntro={onReplayIntro}
          />
        );
      default:
        return <Page1Cover settings={config.settings} onNext={goToNextPage} />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-2 sm:p-4 select-none">
      {/* Background Classical Ambient Library with Soft Floating Light */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-40 blur-[1px] -z-10 pointer-events-none"
        style={{
          backgroundImage: `url("/assets/aistudio/8ELqgBE8piPTuKI1YVhWb97TCRtk_EDAmvZUOSCDuDiURjwKQHZclsHqnu3pv7J4UfGJ-utHqH-vAnTI8Evsvfgrl8Nh3UoMx3s3fqpU3PvAk8sgsFS3qXfav_hLo9Ywu-2Ut1likA_02doXR_pUZeiIzhe3mrNhLQUfRPs6rDnuWhm_OFP0Ct2OAca6x0nF_4370694a.jpg")`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0907] via-transparent to-[#0D0907]/90 -z-10 pointer-events-none" />

      {/* Top Bar (Header) */}
      {!isPresentationMode && (
        <header className="w-full max-w-5xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-xl bg-black/70 border border-[#C69C50]/50 backdrop-blur-md shadow-lg z-30 mb-2">
          {/* Brand zone: School Identification */}
          <div className="flex items-center gap-3">
            {config.settings.logoUrl && (
              <img
                src={config.settings.logoUrl}
                alt="Logo THPT Cẩm Phả"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full border-2 border-[#C69C50] bg-amber-950 p-0.5 shadow-sm"
              />
            )}
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#C69C50] font-semibold truncate hidden sm:block">
                {config.settings.department}
              </div>
              <h1 className="text-sm sm:text-base font-cinzel font-bold text-[#E7C77A] tracking-wider truncate">
                {config.settings.schoolName}
              </h1>
            </div>
          </div>

          {/* Current Page Title */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-[#C69C50]/50 text-xs sm:text-sm font-cinzel text-amber-100 shadow-inner">
            <span className="text-[#C69C50] font-bold">Trang {currentPage}:</span>
            <span className="truncate max-w-xs">{PAGE_TITLES[currentPage]}</span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onReplayIntro}
              title="Phát lại Intro mở đầu"
              className="p-2 rounded-lg bg-stone-900/90 hover:bg-[#C69C50] hover:text-[#171614] text-amber-200 border border-[#C69C50]/50 transition-colors"
              aria-label="Phát lại Intro mở đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onTogglePresentation}
              title="Chế độ Trình chiếu thao giảng (Toàn màn hình)"
              className="px-3 py-1.5 rounded-lg bg-[#C69C50]/20 hover:bg-[#C69C50] text-[#E7C77A] hover:text-[#171614] border border-[#C69C50] text-xs sm:text-sm font-cinzel font-bold flex items-center gap-1.5 transition-all shadow-sm"
              aria-label="Chế độ Trình chiếu thao giảng"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Trình Chiếu</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              title="Quản trị viên (Upload tư liệu, âm thanh, video)"
              className="p-2 rounded-lg bg-stone-900/90 hover:bg-[#C69C50] hover:text-[#171614] text-amber-200 border border-[#C69C50]/50 transition-colors"
              aria-label="Đăng nhập quản trị viên"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* ================= PORTRAIT E-BOOK CONTAINER ================= */}
      {/* Strict Portrait Aspect Ratio (3:4 or 4:5), Centered, with 3D Page Thickness */}
      <div className="relative flex-1 w-full flex items-center justify-center my-auto min-h-0">
        <div
          className={`relative h-full max-h-[85vh] aspect-[3/4] sm:aspect-[4/5] flex rounded-2xl book-podium-shadow transition-transform duration-300 ${
            isFlipping
              ? flipDirection === 'next'
                ? 'rotate-y-[-6deg] scale-[0.98]'
                : 'rotate-y-[6deg] scale-[0.98]'
              : 'scale-100'
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* Left Book Spine & Gilded Page Stack Rim */}
          <div className="w-4 sm:w-6 h-full rounded-l-2xl bg-gradient-to-r from-[#17110C] via-[#38261A] to-[#24170F] border-y-2 border-l-2 border-[#C69C50]/70 flex flex-col justify-between py-8 px-1 shadow-2xl shrink-0">
            {/* Spine Gilded Ribs */}
            <div className="w-full h-1 bg-[#C69C50]/60 rounded-full" />
            <div className="w-full h-1 bg-[#C69C50]/60 rounded-full" />
            <div className="w-full h-1 bg-[#C69C50]/60 rounded-full" />
            <div className="w-full h-1 bg-[#C69C50]/60 rounded-full" />
            <div className="w-full h-1 bg-[#C69C50]/60 rounded-full" />
          </div>

          {/* Central Active Page Surface */}
          <main className="flex-1 h-full min-w-0 relative bg-parchment rounded-r-2xl overflow-hidden shadow-2xl">
            {/* Book Spine Deep Crease Shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/45 via-black/15 to-transparent z-20 pointer-events-none" />

            {/* Render Active Page Content */}
            <div className="w-full h-full relative z-10">
              {renderCurrentPageContent()}
            </div>
          </main>
        </div>
      </div>

      {/* ================= BOTTOM BAR CONTROLS ================= */}
      <footer className="w-full max-w-xl flex items-center justify-between px-5 py-2.5 mt-2 rounded-full bg-black/75 border border-[#C69C50]/50 backdrop-blur-md shadow-lg z-30">
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 rounded-full bg-stone-900 border border-[#C69C50]/50 text-amber-200 hover:bg-[#C69C50] hover:text-[#171614] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 text-xs sm:text-sm font-cinzel font-semibold active:scale-95"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Trang trước</span>
        </button>

        {/* Center: Table of Contents & Page Progress Slider */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onPageChange(3)}
            title="Mục lục sách"
            className="px-3 py-1.5 rounded-full bg-amber-950/70 border border-[#C69C50]/60 text-xs sm:text-sm font-cinzel font-medium text-[#E7C77A] hover:bg-[#C69C50] hover:text-[#171614] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Bookmark className="w-4 h-4 text-[#C69C50]" />
            <span className="hidden sm:inline">Mục lục</span>
          </button>

          {/* Progress dots / numbers */}
          <div className="text-xs sm:text-sm font-mono font-bold text-amber-100 flex items-center gap-1.5">
            <span>Trang</span>
            <span className="text-base sm:text-lg text-[#E7C77A]">{currentPage}</span>
            <span className="text-stone-500">/</span>
            <span className="text-stone-400">{TOTAL_PAGES}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage >= TOTAL_PAGES}
          className="px-3 py-1.5 rounded-full bg-stone-900 border border-[#C69C50]/50 text-amber-200 hover:bg-[#C69C50] hover:text-[#171614] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 text-xs sm:text-sm font-cinzel font-semibold active:scale-95"
          aria-label="Trang tiếp theo"
        >
          <span className="hidden sm:inline">Trang sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
