import React, { useState } from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { Languages, Info, X } from 'lucide-react';

interface Page4GreekScriptProps {
  narration?: NarrationItem;
}

interface GreekLetter {
  upper: string;
  lower: string;
  name: string;
  sound: string;
  meaning: string;
}

const GREEK_LETTERS: GreekLetter[] = [
  { upper: 'Α', lower: 'α', name: 'Alpha', sound: '/a/', meaning: 'Ký tự đầu tiên, cải biến từ chữ Aleph (Phoenicia), bổ sung làm nguyên âm mở quan trọng nhất.' },
  { upper: 'Β', lower: 'β', name: 'Beta', sound: '/b/', meaning: 'Phát triển từ chữ Beth (ngôi nhà) của Phoenicia, biểu thị phụ âm môi.' },
  { upper: 'Γ', lower: 'γ', name: 'Gamma', sound: '/g/', meaning: 'Biểu thị âm tắc vòm họng hữu thanh, tiền thân của chữ C và G trong chữ Latin.' },
  { upper: 'Δ', lower: 'δ', name: 'Delta', sound: '/d/', meaning: 'Hình tam giác biểu thị cánh cửa, là nguồn gốc của ký tự D trong hệ chữ cái Latin.' },
  { upper: 'Ε', lower: 'ε', name: 'Epsilon', sound: '/e/', meaning: 'Nguyên âm ngắn quan trọng ("e thanh tú"), đánh dấu bước đột phá biểu âm Hy Lạp.' },
  { upper: 'Ζ', lower: 'ζ', name: 'Zeta', sound: '/z/', meaning: 'Ký tự thứ 6 trong bảng mẫu tự Hy Lạp, biểu thị âm xát răng.' },
  { upper: 'Η', lower: 'η', name: 'Eta', sound: '/ɛː/', meaning: 'Nguyên âm dài, có nguồn gốc từ chữ Het của người Phoenicia.' },
  { upper: 'Θ', lower: 'θ', name: 'Theta', sound: '/tʰ/ hoặc /θ/', meaning: 'Phụ âm bật hơi, thường thấy trong các từ ngữ toán học và triết học.' },
  { upper: 'Ι', lower: 'ι', name: 'Iota', sound: '/i/', meaning: 'Ký tự nhỏ nhất trong bảng chữ cái, bắt nguồn từ chữ Yodh (bàn tay).' },
  { upper: 'Λ', lower: 'λ', name: 'Lambda', sound: '/l/', meaning: 'Ký tự biểu trưng của xứ Sparta (Lacedaemon) trên những tấm khiên đồng.' },
  { upper: 'Π', lower: 'π', name: 'Pi', sound: '/p/', meaning: 'Ký tự đại diện cho tỷ lệ chu vi đường tròn trên đường kính trong hình học cổ điển.' },
  { upper: 'Ω', lower: 'ω', name: 'Omega', sound: '/ɔː/', meaning: 'Ký tự cuối cùng của bảng chữ cái, tượng trưng cho sự trọn vẹn và vĩnh cửu.' }
];

export const Page4GreekScript: React.FC<Page4GreekScriptProps> = ({ narration }) => {
  const [selectedLetter, setSelectedLetter] = useState<GreekLetter | null>(null);

  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Languages className="w-4 h-4" />
          <span>Trang 04 · Nguồn Gốc Chữ Viết</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#39271D] tracking-wide mt-1">
          CHỮ VIẾT HY LẠP
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* Core Knowledge Text */}
      <div className="relative z-10 py-2 space-y-2 text-sm sm:text-base font-garamond text-[#2A1D15] leading-relaxed">
        <div className="p-3.5 rounded-xl bg-amber-950/5 border border-[#C69C50]/40 space-y-2 text-justify">
          <p>
            • <strong>Tiếp thu tinh hoa:</strong> Người Hy Lạp cổ đại tiếp thu hệ thống chữ viết từ các thương nhân người Phoenicia vào khoảng thế kỷ VIII TCN.
          </p>
          <p>
            • <strong>Cải tiến mang tính cách mạng:</strong> Họ bổ sung các ký tự biểu thị <em>nguyên âm</em> (như Alpha, Epsilon, Iota, Omicron, Upsilon...), khắc phục hạn chế chỉ ghi phụ âm của chữ Phoenicia.
          </p>
          <p>
            • <strong>Tầm ảnh hưởng vĩ đại:</strong> Sự hoàn thiện này giúp chữ viết diễn đạt trọn vẹn tư tưởng triết học, thi ca và khoa học, trở thành một trong những nền tảng then chốt cho chữ viết phương Tây.
          </p>
        </div>
      </div>

      {/* Interactive Greek Alphabet Grid */}
      <div className="relative z-10 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider text-[#8C4A28] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#C69C50]" />
            Khám phá 12 ký tự tiêu biểu (Nhấn để xem chi tiết):
          </span>
          <span className="text-xs text-amber-900/70 font-mono">24 Ký tự</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {GREEK_LETTERS.map((letter) => {
            const isSelected = selectedLetter?.name === letter.name;
            return (
              <button
                key={letter.name}
                type="button"
                onClick={() => setSelectedLetter(isSelected ? null : letter)}
                className={`p-2.5 rounded-xl border text-center transition-all transform active:scale-95 flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-[#C69C50] bg-[#C69C50] text-[#171614] shadow-md scale-105 font-bold'
                    : 'border-[#C69C50]/35 bg-amber-900/10 hover:bg-amber-900/20 hover:border-[#C69C50] text-[#2A1D15]'
                }`}
              >
                <div className="text-xl sm:text-2xl font-cinzel font-bold leading-none">
                  {letter.upper} <span className="text-sm font-normal opacity-85">{letter.lower}</span>
                </div>
                <div className="text-xs font-sans font-semibold mt-1 tracking-tight truncate">
                  {letter.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Letter Info Box */}
        {selectedLetter && (
          <div className="mt-3 p-3.5 rounded-xl bg-[#2A1D15] text-[#F5E8D0] border-2 border-[#C69C50] shadow-lg relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              className="absolute top-2.5 right-2.5 text-[#C69C50] hover:text-[#E7C77A] p-1 rounded-full hover:bg-black/40"
              aria-label="Đóng bảng thông tin ký tự"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-2xl font-cinzel font-bold text-[#E7C77A]">
                {selectedLetter.upper} {selectedLetter.lower}
              </span>
              <span className="text-sm font-bold text-[#C69C50] uppercase font-cinzel">
                {selectedLetter.name} ({selectedLetter.sound})
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/95 leading-relaxed font-garamond">
              {selectedLetter.meaning}
            </p>
          </div>
        )}
      </div>

      {/* Audio Narration Section */}
      <div className="relative z-10 pt-2.5 border-t border-[#C69C50]/30 space-y-2">
        <AudioNarrationPlayer
          audioUrl={narration?.url}
          title={narration?.title || 'Chữ viết Hy Lạp'}
          subtitle="Giọng đọc thuyết minh chuyên đề (Admin tải lên)"
          compact
        />
        <div className="flex justify-between items-center text-xs text-amber-900/70 font-mono">
          <span>THÀNH TỰU: BỔ SUNG NGUYÊN ÂM</span>
          <span>HỆ CHỮ PHOENICIA → HY LẠP</span>
        </div>
      </div>
    </div>
  );
};
