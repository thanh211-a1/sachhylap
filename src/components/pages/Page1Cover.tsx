import React from 'react';
import { BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { AppSettings } from '../../types';

interface Page1CoverProps {
  settings: AppSettings;
  onNext: () => void;
}

export const Page1Cover: React.FC<Page1CoverProps> = ({ settings, onNext }) => {
  return (
    <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 select-none text-center bg-parchment-dark rounded-r-2xl overflow-hidden border-2 border-[#C69C50]/60 shadow-2xl">
      {/* Background classical architectural texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter blur-[0.5px]"
        style={{ backgroundImage: `url("${settings.introBackground}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1510]/90 via-[#2A1D15]/85 to-[#171614]/95" />

      {/* Meander Greek Border Inset */}
      <div className="absolute inset-3 border-2 border-[#C69C50]/50 rounded-xl pointer-events-none" />
      <div className="absolute inset-4 border border-[#E7C77A]/25 rounded-lg pointer-events-none" />

      {/* Top Header: School Identification */}
      <div className="relative z-10 pt-2 flex flex-col items-center">
        {settings.logoUrl && (
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full border-2 border-[#C69C50] p-1.5 bg-amber-950/70 shadow-xl flex items-center justify-center overflow-hidden">
            <img
              src={settings.logoUrl}
              alt={settings.schoolName}
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
        )}
        <div className="text-xs uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          {settings.department}
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[#E7C77A] tracking-wider mt-0.5">
          {settings.schoolName}
        </h2>
        <div className="text-xs sm:text-sm text-amber-200/80 tracking-widest uppercase mt-0.5 font-medium">
          {settings.motto}
        </div>
      </div>

      {/* Centerpiece: Hero Title & Classical Imagery */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center">
        {/* Greek column / laurel motif */}
        <div className="flex items-center gap-3 mb-2 opacity-90">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C69C50]" />
          <span className="text-xs sm:text-sm text-[#E7C77A] font-heading font-semibold tracking-widest uppercase">SÁCH ĐIỆN TỬ TƯƠNG TÁC</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C69C50]" />
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold uppercase text-[#F5E8D0] leading-snug max-w-lg gold-glow">
          THÀNH TỰU TIÊU BIỂU CỦA VĂN MINH HY LẠP – LA MÃ CỔ ĐẠI
        </h1>

        <div className="mt-3.5 px-6 py-2 rounded-full border-2 border-[#C69C50] bg-gradient-to-r from-amber-950/90 via-[#39271D] to-amber-950/90 shadow-lg">
          <span className="text-sm sm:text-base md:text-lg font-heading font-bold text-[#E7C77A] tracking-[0.16em]">
            CHỮ VIẾT VÀ VĂN HỌC
          </span>
        </div>

        <p className="mt-3 text-xs sm:text-sm md:text-base font-serif-body italic text-amber-100/90 max-w-sm leading-relaxed">
          Tài liệu số hóa chuyên đề lịch sử phục vụ buổi thao giảng chuyên môn
        </p>

        {/* Small Roman & Greek glyph ornament */}
        <div className="mt-2.5 flex items-center justify-center gap-4 text-[#C69C50] text-sm sm:text-base font-latin-glyph opacity-80">
          <span>Α Ω</span>
          <span>·</span>
          <span>SPQR</span>
          <span>·</span>
          <span>ΙΛΙΑΣ</span>
        </div>
      </div>

      {/* Bottom CTA to start flipping */}
      <div className="relative z-10 pb-2 flex flex-col items-center">
        <button
          type="button"
          onClick={onNext}
          className="group px-7 py-3 rounded-full bg-gradient-to-r from-[#C69C50] via-[#E7C77A] to-[#C69C50] text-[#171614] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-amber-500/40 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#171614]" />
          <span>Mở Sách Khám Phá</span>
          <ChevronRight className="w-4 h-4 text-[#171614] group-hover:translate-x-0.5 transition-transform" />
        </button>
        <span className="text-xs text-amber-200/60 mt-2 font-mono">
          Nhấn nút hoặc dùng phím mũi tên để lật trang
        </span>
      </div>
    </div>
  );
};
