import React, { useState, useEffect, useRef } from 'react';
import { AppSettings } from '../types';
import { Sparkles, Play, FastForward, Volume2, VolumeX, BookOpen } from 'lucide-react';

interface CinematicIntroProps {
  settings: AppSettings;
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ settings, onComplete }) => {
  const [currentScene, setCurrentScene] = useState<1 | 2 | 3 | 4>(1);
  const [isTransitioningToBook, setIsTransitioningToBook] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Time sequence:
  // Scene 1: 0 - 4s (Khởi đầu nền văn minh)
  // Scene 2: 4 - 9s (Giới thiệu nhà trường)
  // Scene 3: 9 - 14s (Giới thiệu chủ đề)
  // Scene 4: 14s+ (Cuốn sách xuất hiện & Nút bắt đầu)
  useEffect(() => {
    const t1 = setTimeout(() => setCurrentScene(2), 4000);
    const t2 = setTimeout(() => setCurrentScene(3), 9000);
    const t3 = setTimeout(() => setCurrentScene(4), 14000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStartDiscovery = () => {
    setIsTransitioningToBook(true);
    if (audioRef.current) {
      // Fade out audio gracefully
      const fadeInterval = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.1) {
          audioRef.current.volume -= 0.1;
        } else {
          clearInterval(fadeInterval);
          if (audioRef.current) audioRef.current.pause();
        }
      }, 80);
    }
    setTimeout(() => {
      onComplete();
    }, 1100);
  };

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onComplete();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0806] select-none text-[#F4EAD4] flex items-center justify-center">
      {/* Background Music if uploaded by Admin */}
      {settings.introAudioUrl && (
        <audio
          ref={audioRef}
          src={settings.introAudioUrl}
          autoPlay
          loop
        />
      )}

      {/* Panoramic Architectural Background with Cinematic Zoom */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform ${
          currentScene === 1 ? 'scale-100 filter brightness-50' :
          currentScene === 2 ? 'scale-105 filter brightness-75' :
          currentScene === 3 ? 'scale-110 filter brightness-90' :
          'scale-115 filter brightness-70'
        }`}
        style={{
          backgroundImage: `url("${settings.introBackground || '/assets/aistudio/jlaDpk5u20iorhjusbgqA7ilQwEX57_FlxRRwpMZR9IhHvhVsQovmbHcTvCP3hQLLuRA_9hSs-z64Dr6h_JwtdYfflflL-qj0YL55KN_5Fn8RsCl36IF2oDQtPzTkH4K03T5zLlwn8-pmqtmYX6BWxVOrQQHcSB3PniENFVcRUyzuyv4tarSkbvDvJgeLi3r_20eccc00.jpg'}")`
        }}
      />

      {/* Atmospheric Vignette & Gold Dust Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Top Controls: Audio toggle & Skip Button */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-3">
        {settings.introAudioUrl && (
          <button
            type="button"
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-black/60 border border-[#C69C50]/50 text-[#E7C77A] hover:bg-[#C69C50] hover:text-black transition-colors backdrop-blur-xs"
            aria-label={isMuted ? 'Bật âm thanh intro' : 'Tắt âm thanh intro'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
        <button
          type="button"
          onClick={handleSkip}
          className="px-4 py-2 rounded-full bg-black/70 border border-[#C69C50]/60 text-xs sm:text-sm font-heading font-semibold text-amber-200 hover:bg-[#C69C50] hover:text-black transition-all flex items-center gap-2 backdrop-blur-xs shadow-md cursor-pointer"
        >
          <span>Bỏ qua giới thiệu</span>
          <FastForward className="w-4 h-4" />
        </button>
      </div>

      {/* Scene Navigation Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              currentScene === s ? 'w-10 bg-[#E7C77A]' : 'w-2.5 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* ================= CẢNH 1: KHỞI ĐẦU NỀN VĂN MINH (0 - 4s) ================= */}
      {currentScene === 1 && (
        <div className="relative z-20 text-center px-4 max-w-2xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C69C50] font-heading font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-[#E7C77A] animate-spin" />
            <span>KHÁM PHÁ BẢO TÀNG SỐ HY LẠP – LA MÃ CỔ ĐẠI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-wider text-white gold-glow leading-tight">
            NƠI KHỞI NGUỒN CỦA TRI THỨC VÀ NGHỆ THUẬT
          </h1>
          <p className="mt-3 text-sm sm:text-base font-serif-body italic text-amber-100/80 tracking-wider">
            Hơn hai thiên niên kỷ trước bên bờ Địa Trung Hải huyền thoại...
          </p>
        </div>
      )}

      {/* ================= CẢNH 2: GIỚI THIỆU NHÀ TRƯỜNG (4 - 9s) ================= */}
      {currentScene === 2 && (
        <div className="relative z-20 text-center px-4 max-w-xl animate-fadeIn flex flex-col items-center">
          {/* Animated Gold Halo */}
          <div className="relative mb-5">
            <div className="absolute -inset-4 rounded-full bg-[#E7C77A]/25 blur-xl animate-pulse" />
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-3 border-[#C69C50] p-1.5 bg-[#171614]/80 shadow-2xl relative z-10 overflow-hidden flex items-center justify-center">
              <img
                src={settings.logoUrl || '/assets/aistudio/cb_7e68ff2b.jpg'}
                alt={settings.schoolName}
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C69C50] font-semibold">
            {settings.department}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#E7C77A] tracking-wider mt-1 drop-shadow-lg">
            {settings.schoolName}
          </h2>
          <div className="mt-3 px-5 py-1.5 rounded-full border border-[#C69C50]/60 bg-black/50 text-xs sm:text-base font-sans tracking-[0.15em] uppercase text-amber-100 font-medium shadow-md">
            {settings.motto}
          </div>
        </div>
      )}

      {/* ================= CẢNH 3: GIỚI THIỆU CHỦ ĐỀ (9 - 14s) ================= */}
      {currentScene === 3 && (
        <div className="relative z-20 text-center px-4 max-w-3xl animate-fadeIn flex flex-col items-center">
          {/* Unrolling Scroll Container */}
          <div className="relative w-full p-6 sm:p-9 rounded-2xl bg-gradient-to-r from-[#2A1D15]/95 via-[#38271B]/95 to-[#2A1D15]/95 border-2 border-[#C69C50] shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-[#C69C50] text-[#171614] text-xs font-heading font-bold uppercase tracking-widest shadow-md">
              CHUYÊN ĐỀ LỊCH SỬ THAO GIẢNG
            </div>

            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-heading text-[#C69C50] tracking-widest mb-2 opacity-90">
              <span className="font-latin-glyph">Α Β Γ Δ</span>
              <span>·</span>
              <span className="font-latin-glyph">A B C D</span>
              <span>·</span>
              <span className="font-heading">HOMER</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-heading font-black uppercase text-[#F5E8D0] leading-snug gold-glow">
              {settings.introTitle}
            </h2>

            <div className="mt-4 inline-block px-6 py-2 rounded-full border-2 border-[#E7C77A] bg-amber-950/80 shadow-md">
              <span className="text-lg sm:text-2xl font-heading font-bold text-[#E7C77A] tracking-[0.15em]">
                {settings.introSubtitle}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= CẢNH 4: CUỐN SÁCH XUẤT HIỆN & BẮT ĐẦU (14s+) ================= */}
      {currentScene === 4 && (
        <div className="relative z-20 text-center px-4 max-w-md animate-fadeIn flex flex-col items-center">
          {/* Floating 3D Book Silhouette with golden aura */}
          <div className="relative mb-5 group cursor-pointer" onClick={handleStartDiscovery}>
            <div className="absolute -inset-6 rounded-3xl bg-amber-500/20 blur-2xl group-hover:bg-amber-500/35 transition-all" />
            <div className="w-52 sm:w-60 h-68 sm:h-76 rounded-r-2xl border-2 border-[#C69C50] bg-gradient-to-br from-[#2E2017] via-[#1A120E] to-[#120B08] p-5 shadow-2xl flex flex-col justify-between text-center relative z-10 transform hover:scale-105 transition-transform duration-500">
              <div className="text-xs font-heading text-[#C69C50] tracking-widest uppercase">
                {settings.schoolName}
              </div>
              <div className="my-auto py-2">
                <BookOpen className="w-12 h-12 text-[#E7C77A] mx-auto mb-2 animate-pulse" />
                <div className="text-sm font-heading font-bold text-amber-200 tracking-wider">
                  VĂN MINH HY LẠP – LA MÃ
                </div>
                <div className="text-xs text-[#C69C50] font-sans mt-1">
                  Chữ Viết & Văn Học
                </div>
              </div>
              <div className="text-[10px] font-mono text-amber-300/60 uppercase">
                PORTRAIT E-BOOK · 3D
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base font-serif-body italic text-amber-100/90 mb-4 tracking-wide">
            "Ngược dòng thời gian – Khám phá những di sản vượt thời đại."
          </p>

          <button
            type="button"
            onClick={handleStartDiscovery}
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C69C50] via-[#E7C77A] to-[#C69C50] text-[#171614] font-heading font-black text-sm sm:text-base uppercase tracking-[0.15em] shadow-xl hover:shadow-amber-500/40 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-[#171614]" />
            <span>BẮT ĐẦU KHÁM PHÁ</span>
          </button>
        </div>
      )}

      {/* Cinematic Flash Transition Overlay */}
      {isTransitioningToBook && (
        <div className="absolute inset-0 z-50 bg-gradient-to-b from-[#E7C77A] via-[#C69C50] to-[#171614] opacity-90 transition-opacity duration-1000 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-[#171614] mx-auto animate-spin" />
            <div className="mt-3 text-sm font-cinzel font-bold text-[#171614] uppercase tracking-widest">
              Đang mở cuốn sách lịch sử...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
