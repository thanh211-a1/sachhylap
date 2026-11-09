import React from 'react';
import { Compass, ArrowRight, Bookmark } from 'lucide-react';

interface Page3TocProps {
  onSelectPage: (pageNumber: number) => void;
}

interface TocItem {
  number: string;
  title: string;
  targetPage: number;
  subtitle: string;
}

const TOC_ITEMS: TocItem[] = [
  {
    number: '01',
    title: 'Chữ viết Hy Lạp và La Mã',
    targetPage: 4,
    subtitle: 'Hệ thống nguyên âm & Nguồn gốc chữ viết phương Tây'
  },
  {
    number: '02',
    title: 'Dấu ấn chữ Latin đối với chữ Quốc ngữ Việt Nam',
    targetPage: 6,
    subtitle: 'Từ Roma đến Từ điển Việt – Bồ – La 1651'
  },
  {
    number: '03',
    title: 'Văn học Hy Lạp và La Mã',
    targetPage: 7,
    subtitle: 'Kịch trường, thơ ca & Khát vọng con người cổ đại'
  },
  {
    number: '04',
    title: 'Thần thoại cổ đại',
    targetPage: 8,
    subtitle: 'Thế giới các vị thần đỉnh Olympus'
  },
  {
    number: '05',
    title: 'Sử thi Iliad và Odyssey',
    targetPage: 9,
    subtitle: 'Bản hùng ca Homer: Chiến tranh Troy & Hành trình trở về'
  },
  {
    number: '06',
    title: 'Trò chơi tương tác: Thử tài nhà sử học',
    targetPage: 11,
    subtitle: 'Kéo thả phân loại 12 thành tựu tiêu biểu'
  },
  {
    number: '07',
    title: 'Kiểm tra kiến thức',
    targetPage: 12,
    subtitle: '10 câu trắc nghiệm thử thách thời gian thực'
  },
  {
    number: '08',
    title: 'Tổng kết',
    targetPage: 13,
    subtitle: 'Những di sản vượt thời gian cho thế giới hiện đại'
  }
];

export const Page3Toc: React.FC<Page3TocProps> = ({ onSelectPage }) => {
  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Compass className="w-4 h-4" />
          <span>Trang 03 · Danh Mục Chủ Đề</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#39271D] tracking-wide mt-1">
          MỤC LỤC TÁC PHẨM
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* List of 8 items */}
      <div className="relative z-10 my-auto py-2 space-y-2">
        {TOC_ITEMS.map((item) => (
          <button
            key={item.number}
            type="button"
            onClick={() => onSelectPage(item.targetPage)}
            className="w-full text-left p-3 rounded-xl border border-[#C69C50]/40 bg-amber-900/5 hover:bg-amber-900/15 hover:border-[#C69C50] transition-all group flex items-center justify-between gap-3 shadow-xs active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-[#C69C50]/20 border border-[#C69C50]/60 font-cinzel font-bold text-sm text-[#8C4A28] flex items-center justify-center shrink-0">
                {item.number}
              </span>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-semibold text-[#2A1D15] group-hover:text-[#8C4A28] transition-colors truncate font-cinzel">
                  {item.title}
                </div>
                <div className="text-xs text-amber-900/75 truncate mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-[#8C4A28] shrink-0">
              <span className="hidden sm:inline text-xs text-stone-500 font-normal">Tr.</span>
              <span className="text-[#C69C50] font-bold">{item.targetPage.toString().padStart(2, '0')}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#C69C50]" />
            </div>
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <div className="relative z-10 pt-2.5 border-t border-[#C69C50]/30 flex justify-between items-center text-xs text-amber-900/70 font-mono">
        <span>BẤM VÀO MỤC ĐỂ ĐẾN THẲNG TRANG</span>
        <Bookmark className="w-4 h-4 text-[#C69C50]" />
      </div>
    </div>
  );
};
