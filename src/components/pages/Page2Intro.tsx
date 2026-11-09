import React from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { Scroll, Sparkles } from 'lucide-react';

interface Page2IntroProps {
  narration?: NarrationItem;
}

export const Page2Intro: React.FC<Page2IntroProps> = ({ narration }) => {
  return (
    <div className="relative h-full bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner p-4 sm:p-6">
      {/* Decorative Classical Borders */}
      <div className="absolute inset-2 sm:inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      <div className="relative z-10 min-h-full flex flex-col justify-between gap-3">
        {/* Top Header */}
        <div className="text-center pb-2 border-b border-[#C69C50]/30 shrink-0">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
            <Scroll className="w-4 h-4" />
            <span>Trang 02 · Khởi Đầu Hành Trình</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#39271D] tracking-wide mt-1">
            LỜI MỞ ĐẦU
          </h2>
          <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
        </div>

        {/* Main Narrative Body */}
        <div className="my-auto py-1 space-y-3 text-justify font-serif-body text-sm sm:text-base leading-relaxed text-[#2A1D15]">
          <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-heading font-bold first-letter:text-[#C69C50] first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
            Hy Lạp và La Mã cổ đại là hai nền văn minh rực rỡ, có những đóng góp to lớn đối với lịch sử phát triển của nhân loại. Những thành tựu của hai nền văn minh này không chỉ thể hiện trí tuệ, óc sáng tạo mà còn đặt nền móng cho nhiều lĩnh vực của thế giới hiện đại.
          </p>

          <p>
            Trong đó, chữ viết và văn học là những di sản đặc biệt quan trọng. Chữ viết giúp con người ghi chép, lưu giữ và truyền đạt tri thức; văn học phản ánh đời sống, tư tưởng, trí tưởng tượng và những khát vọng của con người cổ đại.
          </p>

          <div className="p-3 rounded-xl bg-amber-900/10 border-2 border-[#C69C50]/40 shadow-xs text-center italic font-semibold text-[#8C4A28] text-xs sm:text-sm md:text-base leading-relaxed">
            “Hãy cùng mở cuốn sách và khám phá những thành tựu đặc sắc ấy!”
          </div>
        </div>

        {/* Classical Illustration and Audio Narration Player */}
        <div className="pt-2 border-t border-[#C69C50]/30 space-y-2 shrink-0">
          <AudioNarrationPlayer
            audioUrl={narration?.url}
            title={narration?.title || 'Lời mở đầu'}
            subtitle="Giọng đọc thuyết minh chính thức (Admin tải lên)"
            compact
          />
          <div className="flex justify-between items-center text-[11px] sm:text-xs text-amber-900/70 font-mono">
            <span>THPT CẨM PHẢ · TỔ LỊCH SỬ</span>
            <span>BẢO TÀNG SỐ HY LẠP – LA MÃ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
