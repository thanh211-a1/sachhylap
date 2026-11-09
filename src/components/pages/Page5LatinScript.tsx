import React, { useState } from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { Landmark, ZoomIn, X, Shield } from 'lucide-react';

interface Page5LatinScriptProps {
  narration?: NarrationItem;
}

interface InscriptionDetail {
  title: string;
  latinText: string;
  translation: string;
  significance: string;
}

const INSCRIPTIONS: InscriptionDetail[] = [
  {
    title: 'Biểu Tượng SPQR (Senatus Populusque Romanus)',
    latinText: 'SENATVS POPVLVSQVE ROMANVS',
    translation: 'Viện Nguyên lão và Nhân dân La Mã',
    significance: 'Khắc trên các công trình công cộng, cổng khải hoàn môn và quân kỳ của các quân đoàn La Mã, tượng trưng cho chủ quyền tối cao của nền cộng hòa và đế chế.'
  },
  {
    title: 'Văn bia Cột Trajan (Trajan Column Inscription)',
    latinText: 'SENATVS POPVLVSQVE ROMANVS IMP CAESARI DIVI NERVAE F NERVAE TRAIANO AVG GERM DACICO...',
    translation: 'Vinh danh Hoàng đế Trajan sau các chiến dịch khải hoàn tại Dacia (năm 113 SCN).',
    significance: 'Mẫu mực tuyệt đỉnh của nghệ thuật khắc chữ hoa La Mã (Roman Square Capitals), là quy chuẩn hình học chuẩn mực cho kiểu chữ Serif hiện đại như Times New Roman hay Trajan Pro.'
  },
  {
    title: 'Luật Mười Hai Bảng (Lex Duodecim Tabularum)',
    latinText: 'SI IN IVS VOCAT ITO. NI IT ANTESTAMINO. IGITVR EM CAPITO.',
    translation: 'Nếu một bên bị đòi ra tòa, người đó phải đi. Nếu không chịu đi, hãy gọi nhân chứng rồi bắt giữ.',
    significance: 'Bộ luật thành văn đầu tiên của La Mã cổ đại (khoảng năm 450 TCN), được khắc trên các bảng đồng và dựng tại Công trường La Mã (Forum Romanum).'
  }
];

export const Page5LatinScript: React.FC<Page5LatinScriptProps> = ({ narration }) => {
  const [activeModal, setActiveModal] = useState<InscriptionDetail | null>(null);

  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Landmark className="w-4 h-4" />
          <span>Trang 05 · Di Sản Đế Chế</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#39271D] tracking-wide mt-1">
          CHỮ VIẾT LA MÃ
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* Core Narrative */}
      <div className="relative z-10 py-2 space-y-2 text-sm sm:text-base font-garamond text-[#2A1D15] leading-relaxed">
        <div className="p-3.5 rounded-xl bg-amber-950/5 border border-[#C69C50]/40 space-y-2 text-justify">
          <p>
            • <strong>Kế thừa và hoàn thiện:</strong> Người La Mã tiếp thu hệ thống chữ viết Hy Lạp thông qua trung gian người Etruscan tại vùng bán đảo Italy, từ đó phát triển thành bảng chữ cái <em>Latin</em> chuẩn mực.
          </p>
          <p>
            • <strong>Ứng dụng rộng rãi:</strong> Chữ Latin trở thành công cụ đắc lực trong quản lý nhà nước rộng lớn, soạn thảo luật pháp La Mã, ghi chép văn học hùng tráng và khắc bia ký trường tồn.
          </p>
          <p>
            • <strong>Sức sống vượt thời đại:</strong> Qua các thời kỳ lịch sử, hệ chữ cái Latin đã trở thành hệ chữ phổ biến và có sức ảnh hưởng sâu rộng nhất trên phạm vi toàn cầu hiện nay.
          </p>
        </div>
      </div>

      {/* Interactive Roman Stone Inscriptions & Latin Alphabet Showcase */}
      <div className="relative z-10 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider text-[#8C4A28] flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#C69C50]" />
            Bia đá khắc chữ La Mã tiêu biểu (Nhấn để phóng to):
          </span>
          <span className="text-xs text-amber-900/70 font-mono">Chữ Latin cổ</span>
        </div>

        {/* Latin Letters Strip */}
        <div className="mb-2.5 p-2.5 rounded-xl bg-[#2A1D15] border border-[#C69C50]/60 text-center shadow-xs">
          <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#C69C50] font-cinzel mb-1">
            Hệ mẫu tự Latin cổ điển (Classical Latin Alphabet)
          </div>
          <div className="text-sm sm:text-base md:text-lg font-cinzel font-bold text-[#E7C77A] tracking-[0.18em]">
            A B C D E F G H I K L M N O P Q R S T V X Y Z
          </div>
        </div>

        {/* 3 Clickable Inscription Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {INSCRIPTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveModal(item)}
              className="p-3 rounded-xl border border-[#C69C50]/40 bg-amber-900/10 hover:bg-amber-900/20 hover:border-[#C69C50] text-left transition-all group flex flex-col justify-between shadow-xs active:scale-[0.98]"
            >
              <div>
                <div className="text-xs sm:text-sm font-cinzel font-bold text-[#8C4A28] group-hover:text-[#C69C50] transition-colors leading-snug">
                  {item.title}
                </div>
                <div className="text-xs font-cinzel text-stone-600 mt-1 line-clamp-2 tracking-wide font-medium italic">
                  "{item.latinText}"
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-1 text-xs text-[#C69C50] font-mono font-medium">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Xem chi tiết</span>
              </div>
            </button>
          ))}
        </div>

        {/* Modal Detail */}
        {activeModal && (
          <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="max-w-lg w-full bg-[#2A1D15] text-[#F5E8D0] rounded-2xl border-2 border-[#C69C50] p-6 shadow-2xl relative animate-scaleIn">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-3.5 right-3.5 text-[#C69C50] hover:text-[#E7C77A] p-1 rounded-full hover:bg-black/40"
                aria-label="Đóng chi tiết bia đá"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-xs uppercase tracking-widest text-[#C69C50] font-cinzel">
                Tư liệu bia đá La Mã cổ đại
              </div>
              <h3 className="text-lg font-cinzel font-bold text-[#E7C77A] mt-1">
                {activeModal.title}
              </h3>
              
              <div className="my-3.5 p-3.5 rounded-xl bg-[#171614] border border-[#C69C50]/50 font-cinzel text-xs sm:text-sm text-amber-200 tracking-wider">
                "{activeModal.latinText}"
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm font-garamond leading-relaxed">
                <div>
                  <strong className="text-[#C69C50]">Dịch nghĩa:</strong> {activeModal.translation}
                </div>
                <div>
                  <strong className="text-[#C69C50]">Ý nghĩa lịch sử:</strong> {activeModal.significance}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audio Narration */}
      <div className="relative z-10 pt-2.5 border-t border-[#C69C50]/30 space-y-2">
        <AudioNarrationPlayer
          audioUrl={narration?.url}
          title={narration?.title || 'Chữ viết La Mã'}
          subtitle="Giọng đọc thuyết minh chuyên đề (Admin tải lên)"
          compact
        />
        <div className="flex justify-between items-center text-xs text-amber-900/70 font-mono">
          <span>THÀNH TỰU: BẢNG CHỮ CÁI LATIN</span>
          <span>QUY CHUẨN VĂN TỰ THẾ GIỚI</span>
        </div>
      </div>
    </div>
  );
};
