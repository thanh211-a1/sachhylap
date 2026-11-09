import React from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { Sparkles, BookOpen, RotateCcw, Award } from 'lucide-react';

interface Page13SummaryProps {
  narration?: NarrationItem;
  onGoToCover: () => void;
  onReplayIntro: () => void;
}

export const Page13Summary: React.FC<Page13SummaryProps> = ({
  narration,
  onGoToCover,
  onReplayIntro
}) => {
  return (
    <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 bg-parchment-dark text-[#F5E8D0] rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/60 shadow-2xl text-center">
      {/* Decorative Border */}
      <div className="absolute inset-3 border-2 border-[#C69C50]/40 rounded-xl pointer-events-none" />
      <div className="absolute inset-4 border border-[#E7C77A]/20 rounded-lg pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 pt-1 pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Award className="w-4 h-4" />
          <span>Trang 13 · Di Sản Vĩnh Cửu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#E7C77A] tracking-wide mt-1 gold-glow">
          NHỮNG DI SẢN VƯỢT THỜI GIAN
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-2" />
      </div>

      {/* Main Closing Reflection */}
      <div className="relative z-10 my-auto py-3 space-y-3.5 font-serif-body text-sm sm:text-base md:text-lg text-amber-100/90 leading-relaxed text-justify max-w-lg mx-auto">
        <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-heading font-bold first-letter:text-[#E7C77A] first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
          Văn minh Hy Lạp và La Mã cổ đại đã để lại cho nhân loại nhiều thành tựu có giá trị to lớn. Trong đó, chữ viết góp phần lưu giữ và truyền bá tri thức, còn văn học phản ánh đời sống tinh thần, trí tưởng tượng và những khát vọng cao đẹp của con người.
        </p>

        <p>
          Dù đã trải qua hàng nghìn năm, những di sản ấy vẫn tiếp tục hiện diện và có ảnh hưởng sâu sắc đến thế giới hiện đại.
        </p>

        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/60 border border-[#C69C50]/40 text-center italic text-[#E7C77A] font-semibold shadow-xs">
          “Khám phá lịch sử không chỉ là tìm hiểu quá khứ mà còn là cách để chúng ta hiểu hơn về hiện tại và trân trọng những giá trị mà nhân loại đã tạo dựng.”
        </div>

        <div className="pt-2 text-center">
          <div className="text-base sm:text-lg md:text-xl font-heading font-bold text-[#E7C77A] tracking-wider uppercase">
            CẢM ƠN THẦY CÔ VÀ CÁC BẠN ĐÃ THEO DÕI!
          </div>
          <div className="text-xs sm:text-sm font-sans text-[#C69C50] mt-1 font-medium">
            Trường THPT Cẩm Phả · Chuyên đề Thao Giảng Lịch Sử
          </div>
        </div>
      </div>

      {/* Action Buttons & Narration */}
      <div className="relative z-10 pt-2 border-t border-[#C69C50]/30 space-y-3">
        <AudioNarrationPlayer
          audioUrl={narration?.url}
          title={narration?.title || 'Tổng kết'}
          subtitle="Giọng đọc thuyết minh kết thúc (Admin tải lên)"
          compact
        />

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={onGoToCover}
            className="px-5 py-2 rounded-full border border-[#C69C50] bg-amber-950/70 hover:bg-[#C69C50] hover:text-[#171614] text-[#E7C77A] text-xs sm:text-sm font-heading font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Về Bìa Sách</span>
          </button>

          <button
            type="button"
            onClick={onReplayIntro}
            className="px-5 py-2 rounded-full border border-[#C69C50] bg-amber-950/70 hover:bg-[#C69C50] hover:text-[#171614] text-[#E7C77A] text-xs sm:text-sm font-heading font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Phát Lại Intro</span>
          </button>
        </div>
      </div>
    </div>
  );
};
