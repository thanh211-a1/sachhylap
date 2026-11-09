import React from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { Swords, Film, Users, Video } from 'lucide-react';

interface Page9IliadProps {
  narration?: NarrationItem;
}

const HEROES = [
  { name: 'Achilles', role: 'Dũng tướng số một phe Hy Lạp', desc: 'Sở hữu sức mạnh thần thánh nhưng chịu bi kịch gót chân tử huyệt và cơn thịnh nộ thiêu đốt.' },
  { name: 'Hector', role: 'Hoàng tử - Người bảo vệ thành Troy', desc: 'Biểu tượng của danh dự, lòng yêu nước kiên trung và đức hy sinh vì gia đình.' },
  { name: 'Agamemnon', role: 'Tổng chỉ huy liên quân Hy Lạp', desc: 'Vua xứ Mycenae đầy quyền uy, kiêu hãnh nhưng nhiều toan tính quyền lực.' },
  { name: 'Priam', role: 'Vua già thành Troy', desc: 'Người cha nhân từ dám đến tận trại Achilles để chuộc lại thi thể con trai Hector.' }
];

export const Page9Iliad: React.FC<Page9IliadProps> = ({ narration }) => {
  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Swords className="w-3.5 h-3.5" />
          <span>Trang 09 · Bản Hùng Ca Bất Hủ</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#39271D] tracking-wide mt-1">
          ILIAD – BẢN HÙNG CA VỀ CHIẾN TRANH TROY
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* Core Narrative */}
      <div className="relative z-10 py-1.5 space-y-2 text-sm sm:text-base font-serif-body text-[#2A1D15] leading-relaxed">
        <div className="p-3.5 rounded-xl bg-amber-950/5 border border-[#C69C50]/30 space-y-2 text-justify shadow-xs">
          <p>
            • <strong>Kiệt tác của Homer:</strong> <em>Iliad</em> là một trong hai thiên sử thi vĩ đại nhất của văn minh Hy Lạp, phản ánh cuộc đối đầu lịch sử kéo dài 10 năm giữa liên quân Hy Lạp (Achaeans) và thành Troy.
          </p>
          <p>
            • <strong>Trọng tâm tác phẩm:</strong> Khắc họa khúc ca bi tráng về <em>cơn giận của người anh hùng Achilles</em>, sự đối đầu giữa danh dự cá nhân và trách nhiệm cộng đồng, cùng những mất mát đau thương khôn nguôi của chiến tranh.
          </p>
        </div>
      </div>

      {/* Hero Characters Grid */}
      <div className="relative z-10 py-1">
        <div className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#8C4A28] mb-2 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#C69C50]" />
          Nhân vật biểu tượng trong sử thi Iliad:
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          {HEROES.map((h) => (
            <div key={h.name} className="p-2.5 rounded-xl bg-amber-900/10 border border-[#C69C50]/30 shadow-xs">
              <div className="text-sm font-heading font-bold text-[#8C4A28]">{h.name}</div>
              <div className="text-xs font-semibold text-stone-700">{h.role}</div>
              <div className="text-xs sm:text-sm font-serif-body text-stone-600 mt-1 line-clamp-2 leading-snug">{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Section (Admin Uploaded) */}
      <div className="relative z-10 py-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#8C4A28] flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#C69C50]" />
            Video tư liệu minh họa (Admin tải lên):
          </span>
        </div>

        {narration?.videoUrl ? (
          <div className="w-full rounded-xl overflow-hidden border border-[#C69C50] bg-black shadow-md aspect-video max-h-48">
            <video
              src={narration.videoUrl}
              controls
              className="w-full h-full object-contain"
              preload="metadata"
            >
              Trình duyệt không hỗ trợ thẻ video.
            </video>
          </div>
        ) : (
          <div className="w-full rounded-xl border-2 border-dashed border-[#C69C50]/50 bg-amber-950/10 p-3.5 text-center flex flex-col items-center justify-center gap-1.5">
            <Video className="w-7 h-7 text-[#C69C50]/70" />
            <div className="text-sm font-heading font-semibold text-[#8C4A28]">
              Video đang được cập nhật
            </div>
            <div className="text-xs text-stone-600 font-mono">
              Admin có thể tải video từ máy tính (MP4/WebM) trong khu vực Quản trị
            </div>
          </div>
        )}
      </div>

      {/* Audio Narration */}
      <div className="relative z-10 pt-2 border-t border-[#C69C50]/30 space-y-2">
        <AudioNarrationPlayer
          audioUrl={narration?.url}
          title={narration?.title || 'Sử thi Iliad'}
          subtitle="Giọng đọc thuyết minh chuyên đề (Admin tải lên)"
          compact
        />
        <div className="flex justify-between items-center text-xs text-amber-900/70 font-mono">
          <span>TÁC GIẢ: HOMER (THẾ KỶ VIII TCN)</span>
          <span>BẢN HÙNG CA CHIẾN TRANH TROY</span>
        </div>
      </div>
    </div>
  );
};
