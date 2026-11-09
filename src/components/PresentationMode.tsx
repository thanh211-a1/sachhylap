import React, { useEffect } from 'react';
import { PortraitEBook } from './PortraitEBook';
import { AppConfigData } from '../types';
import { Minimize2, ChevronLeft, ChevronRight, Bookmark, Volume2, VolumeX } from 'lucide-react';

interface PresentationModeProps {
  config: AppConfigData;
  currentPage: number;
  onPageChange: (page: number) => void;
  onExit: () => void;
  onReplayIntro: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  config,
  currentPage,
  onPageChange,
  onExit,
  onReplayIntro
}) => {
  useEffect(() => {
    // Attempt fullscreen if supported
    const elem = document.documentElement;
    if (elem.requestFullscreen && !document.fullscreenElement) {
      elem.requestFullscreen().catch(() => {
        // Fullscreen may require explicit user gesture in some iframe contexts
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0806] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Floating Ribbon: Exit Button & School Header */}
      <div className="absolute top-4 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 border border-[#C69C50]/70 pointer-events-auto backdrop-blur-md shadow-lg">
          {config.settings.logoUrl && (
            <img
              src={config.settings.logoUrl}
              alt="Logo"
              className="w-7 h-7 rounded-full border border-[#C69C50] bg-black"
            />
          )}
          <span className="text-xs sm:text-sm font-heading font-bold text-[#E7C77A] tracking-wider">
            {config.settings.schoolName} · CHẾ ĐỘ TRÌNH CHIẾU THAO GIẢNG
          </span>
        </div>

        <button
          type="button"
          onClick={onExit}
          className="px-4 py-2 rounded-full bg-black/85 border border-[#C69C50] text-[#E7C77A] hover:bg-[#C69C50] hover:text-[#171614] text-xs sm:text-sm font-heading font-bold flex items-center gap-2 transition-all shadow-lg pointer-events-auto backdrop-blur-md cursor-pointer"
        >
          <Minimize2 className="w-4 h-4" />
          <span>Thoát Trình Chiếu (Esc)</span>
        </button>
      </div>

      {/* Main Large Vertical Book Viewport */}
      <div className="flex-1 w-full h-full pt-12 pb-2">
        <PortraitEBook
          config={config}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onOpenAdmin={() => {}}
          onReplayIntro={onReplayIntro}
          onTogglePresentation={onExit}
          isPresentationMode={true}
        />
      </div>
    </div>
  );
};
