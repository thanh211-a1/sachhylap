import React, { useState } from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { BookMarked, Sparkles, Milestone, ArrowRight } from 'lucide-react';

interface Page6LatinToQuocNguProps {
  narration?: NarrationItem;
}

export const Page6LatinToQuocNgu: React.FC<Page6LatinToQuocNguProps> = ({ narration }) => {
  const [activeEra, setActiveEra] = useState<'latin' | '1651' | 'modern'>('1651');

  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Milestone className="w-4 h-4" />
          <span>Trang 06 · Giao Lưu Văn Hóa</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-[#39271D] tracking-wide mt-1">
          TỪ CHỮ LATIN ĐẾN CHỮ QUỐC NGỮ VIỆT NAM
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* Core Narrative */}
      <div className="relative z-10 py-2 space-y-2 text-sm sm:text-base font-garamond text-[#2A1D15] leading-relaxed">
        <div className="p-3.5 rounded-xl bg-amber-950/5 border border-[#C69C50]/40 space-y-2 text-justify">
          <p>
            • <strong>Hệ mẫu tự Latin:</strong> Chữ Quốc ngữ của Việt Nam kế thừa trực tiếp hệ thống mẫu tự chữ cái Latin, kết hợp với các dấu phụ và dấu thanh âm tinh tế.
          </p>
          <p>
            • <strong>Bối cảnh lịch sử thế kỷ XVII:</strong> Chữ Quốc ngữ hình thành từ nỗ lực chung của nhiều giáo sĩ phương Tây (Bồ Đào Nha, Ý, Pháp...) cùng sự cộng tác chặt chẽ của các học giả, giáo dân người Việt.
          </p>
          <p>
            • <strong>Dấu mốc Alexandre de Rhodes (1651):</strong> Giáo sĩ Alexandre de Rhodes có công lao đặc biệt quan trọng trong việc hệ thống hóa và xuất bản cuốn <em>Từ điển Việt – Bồ – La</em> (Dictionarium Annamiticum Lusitanum et Latinum) tại Roma năm 1651.
          </p>
          <div className="p-2.5 rounded-lg bg-amber-900/10 border-l-3 border-[#C69C50] text-xs sm:text-sm italic text-[#8C4A28] leading-relaxed">
            * <em>Lưu ý khoa học:</em> Alexandre de Rhodes không phải là người duy nhất sáng tạo ra chữ Quốc ngữ, mà là người có đóng góp xuất sắc trong việc hoàn thiện, in ấn và phổ biến rộng rãi.
          </div>
        </div>
      </div>

      {/* Interactive Evolution Matrix */}
      <div className="relative z-10 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider text-[#8C4A28] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C69C50]" />
            Dấu ấn chuyển biến lịch sử (Chọn mốc thời gian):
          </span>
        </div>

        {/* 3 Interactive Tab Selectors */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-amber-900/15 rounded-xl border border-[#C69C50]/40">
          <button
            type="button"
            onClick={() => setActiveEra('latin')}
            className={`py-2 px-2.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all ${
              activeEra === 'latin'
                ? 'bg-[#2A1D15] text-[#E7C77A] shadow-sm'
                : 'text-[#39271D] hover:text-[#8C4A28]'
            }`}
          >
            Chữ Latin Cổ Đại
          </button>
          <button
            type="button"
            onClick={() => setActiveEra('1651')}
            className={`py-2 px-2.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all ${
              activeEra === '1651'
                ? 'bg-[#2A1D15] text-[#E7C77A] shadow-sm'
                : 'text-[#39271D] hover:text-[#8C4A28]'
            }`}
          >
            Năm 1651 (Từ Điển)
          </button>
          <button
            type="button"
            onClick={() => setActiveEra('modern')}
            className={`py-2 px-2.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all ${
              activeEra === 'modern'
                ? 'bg-[#2A1D15] text-[#E7C77A] shadow-sm'
                : 'text-[#39271D] hover:text-[#8C4A28]'
            }`}
          >
            Chữ Quốc Ngữ Nay
          </button>
        </div>

        {/* Dynamic Display Panel */}
        <div className="mt-2.5 p-3.5 rounded-xl bg-[#2A1D15] text-[#F5E8D0] border-2 border-[#C69C50]/60 shadow-md min-h-[95px] flex flex-col justify-center">
          {activeEra === 'latin' && (
            <div className="space-y-1.5 animate-fadeIn">
              <div className="text-xs text-[#C69C50] font-cinzel uppercase tracking-wider font-semibold">
                Mẫu tự Latin nguyên bản · Thời La Mã Cổ Đại
              </div>
              <div className="text-sm sm:text-base md:text-lg font-cinzel text-amber-200 tracking-widest font-bold">
                A B C D E F G H I K L M N O P Q R S T V X Y Z
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 font-garamond italic">
                Chưa có các ký tự ghi thanh điệu và phụ âm ghép của tiếng phương Đông.
              </p>
            </div>
          )}

          {activeEra === '1651' && (
            <div className="space-y-1.5 animate-fadeIn">
              <div className="text-xs text-[#C69C50] font-cinzel uppercase tracking-wider font-semibold">
                Dictionarium Annamiticum Lusitanum et Latinum · Roma 1651
              </div>
              <div className="text-sm sm:text-base md:text-lg font-garamond text-amber-200 font-bold tracking-wide">
                “Lịch-sử, Chúa blời, Đất nướcc, Con ngườii...”
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 font-garamond italic">
                Kết hợp mẫu tự Latin với dấu thanh sắc, huyền, hỏi, ngã, nặng và phụ âm ghép đặc thù của tiếng Việt thế kỷ XVII.
              </p>
            </div>
          )}

          {activeEra === 'modern' && (
            <div className="space-y-1.5 animate-fadeIn">
              <div className="text-xs text-[#C69C50] font-cinzel uppercase tracking-wider font-semibold">
                Hệ thống chữ viết chính thức của Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam
              </div>
              <div className="text-sm sm:text-base md:text-lg font-sans font-bold text-emerald-300 tracking-wider">
                A, Ă, Â, B, C, D, Đ, E, Ê, G, H, I, K, L, M, N, O, Ô, Ơ, P, Q, R, S, T, U, Ư, V, X, Y
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 font-garamond italic">
                Công cụ phổ cập tri thức toàn dân, khoa học hiện đại và hội nhập quốc tế rực rỡ.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Audio Narration */}
      <div className="relative z-10 pt-2.5 border-t border-[#C69C50]/30 space-y-2">
        <AudioNarrationPlayer
          audioUrl={narration?.url}
          title={narration?.title || 'Chữ Latin & Chữ Quốc ngữ'}
          subtitle="Giọng đọc thuyết minh chuyên đề (Admin tải lên)"
          compact
        />
        <div className="flex justify-between items-center text-xs text-amber-900/70 font-mono">
          <span>TỪ ĐIỂN VIỆT – BỒ – LA 1651</span>
          <span>DI SẢN KẾ THỪA VƯỢT THỜI GIAN</span>
        </div>
      </div>
    </div>
  );
};
