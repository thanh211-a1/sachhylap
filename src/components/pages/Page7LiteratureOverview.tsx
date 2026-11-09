import React, { useState } from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { Feather, Theater, BookOpenCheck, Flame } from 'lucide-react';

interface Page7LiteratureOverviewProps {
  narration?: NarrationItem;
}

export const Page7LiteratureOverview: React.FC<Page7LiteratureOverviewProps> = ({ narration }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('epic');

  const genres = [
    {
      id: 'epic',
      name: 'Sử thi (Epic)',
      desc: 'Những trường ca hùng vĩ miêu tả các trận chiến lịch sử, lòng dũng cảm phi thường và mối liên kết giữa con người với thần linh (tiêu biểu: Iliad, Odyssey, Aeneid).'
    },
    {
      id: 'myth',
      name: 'Thần thoại (Mythology)',
      desc: 'Hệ thống truyện kể dân gian giải thích nguồn gốc vũ trụ, các hiện tượng tự nhiên và phản ánh thế giới quan duy mỹ của cư dân Địa Trung Hải.'
    },
    {
      id: 'theater',
      name: 'Kịch trường (Drama)',
      desc: 'Bi kịch (Aeschylus, Sophocles, Euripides) và Hài kịch (Aristophanes) được trình diễn tại các khán đài ngoài trời, đào sâu vào số phận và bản lĩnh con người.'
    }
  ];

  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Theater className="w-4 h-4" />
          <span>Trang 07 · Di Sản Văn Chương</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#39271D] tracking-wide mt-1">
          NHỮNG GIÁ TRỊ VĂN HỌC RỰC RỠ
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* Core Narrative */}
      <div className="relative z-10 py-2 space-y-2 text-sm sm:text-base font-garamond text-[#2A1D15] leading-relaxed">
        <div className="p-3.5 rounded-xl bg-amber-950/5 border border-[#C69C50]/40 space-y-2 text-justify">
          <p>
            Văn học Hy Lạp và La Mã cổ đại phát triển vô cùng phong phú và đa dạng với nhiều thể loại rực rỡ, trong đó nổi bật nhất là <strong>thần thoại</strong> và <strong>sử thi</strong>.
          </p>
          <p>
            Các tác phẩm không chỉ phản ánh đời sống tinh thần, niềm tin tín ngưỡng và trí tưởng tượng kỳ vĩ của con người cổ đại mà còn gửi gắm những giá trị nhân văn sâu sắc: <em>lòng dũng cảm, danh dự hiệp sĩ, tình yêu quê hương, đạo đức gia đình</em> và <em>khát vọng bất diệt chinh phục thiên nhiên, làm chủ số phận</em>.
          </p>
        </div>
      </div>

      {/* Interactive Genre Showcase */}
      <div className="relative z-10 py-2">
        <div className="text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider text-[#8C4A28] mb-2 flex items-center gap-1.5">
          <Feather className="w-4 h-4 text-[#C69C50]" />
          Các thể loại đỉnh cao của văn học cổ đại:
        </div>

        <div className="grid grid-cols-3 gap-2 mb-2.5">
          {genres.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGenre(g.id)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedGenre === g.id
                  ? 'border-[#C69C50] bg-[#2A1D15] text-[#E7C77A] shadow-sm font-bold ring-1 ring-[#C69C50]'
                  : 'border-[#C69C50]/35 bg-amber-900/10 hover:bg-amber-900/20 text-[#39271D]'
              }`}
            >
              <div className="text-xs sm:text-sm font-cinzel font-bold leading-tight">
                {g.name}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Genre Detail Card */}
        <div className="p-3.5 rounded-xl bg-[#2A1D15] text-[#F5E8D0] border-2 border-[#C69C50]/60 shadow-md min-h-[85px] flex items-center">
          <p className="text-xs sm:text-sm font-garamond text-amber-100/95 leading-relaxed italic">
            {genres.find((g) => g.id === selectedGenre)?.desc}
          </p>
        </div>
      </div>

      {/* Audio Narration */}
      <div className="relative z-10 pt-2.5 border-t border-[#C69C50]/30 space-y-2">
        <AudioNarrationPlayer
          audioUrl={narration?.url}
          title={narration?.title || 'Văn học Hy Lạp & La Mã'}
          subtitle="Giọng đọc thuyết minh chuyên đề (Admin tải lên)"
          compact
        />
        <div className="flex justify-between items-center text-xs text-amber-900/70 font-mono">
          <span>THỂ LOẠI: THẦN THOẠI & SỬ THI</span>
          <span>CHUẨN MỰC NGHỆ THUẬT CỔ ĐIỂN</span>
        </div>
      </div>
    </div>
  );
};
