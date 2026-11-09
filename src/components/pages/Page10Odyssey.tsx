import React from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationItem } from '../../types';
import { Compass, Film, Skull, Anchor, Video } from 'lucide-react';

interface Page10OdysseyProps {
  narration?: NarrationItem;
}

const TRIALS = [
  { name: 'Quái vật khổng lồ Cyclops (Polyphemus)', desc: 'Odysseus dùng mưu kế chuốc rượu say rồi chọc thủng một mắt gã khổng lồ để cứu thoát thủy thủ đoàn.' },
  { name: 'Tiếng hát mê hoặc của thủy quái Siren', desc: 'Cho quân lính nhét sáp ong vào tai, còn tự trói mình vào cột buồm để lắng nghe mà không bị cám dỗ lao xuống biển.' },
  { name: 'Quái vật Scylla & Vòng xoáy Charybdis', desc: 'Lựa chọn đau đớn qua eo biển tử thần, đối mặt sự cuồng nộ vô tận của thần biển cả Poseidon.' },
  { name: 'Trở về đảo Ithaca & Trừng phạt bọn cầu hôn', desc: 'Cải trang làm người ăn xin, giương chiếc cung cổ đại bắn xuyên 12 chiếc rìu để đoàn tụ cùng người vợ Penelope chung thủy.' }
];

export const Page10Odyssey: React.FC<Page10OdysseyProps> = ({ narration }) => {
  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Trang 10 · Khát Vọng Trở Về</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#39271D] tracking-wide mt-1">
          ODYSSEY – HÀNH TRÌNH TRỞ VỀ QUÊ HƯƠNG
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* Core Narrative */}
      <div className="relative z-10 py-1.5 space-y-2 text-sm sm:text-base font-serif-body text-[#2A1D15] leading-relaxed">
        <div className="p-3.5 rounded-xl bg-amber-950/5 border border-[#C69C50]/30 space-y-2 text-justify shadow-xs">
          <p>
            • <strong>Thiên trường ca 10 năm lưu lạc:</strong> <em>Odyssey</em> thuật lại cuộc hành trình 10 năm vượt bao hiểm nguy trên biển cả của người anh hùng Odysseus (Ulysses) để trở về quê hương Ithaca sau khi thành Troy thất thủ.
          </p>
          <p>
            • <strong>Tôn vinh trí tuệ con người:</strong> Tác phẩm ca ngợi mưu trí, nghị lực phi thường, tình yêu gia đình son sắt và niềm khao khát cháy bỏng được trở về với mái ấm quê nhà.
          </p>
        </div>
      </div>

      {/* Trials Grid */}
      <div className="relative z-10 py-1">
        <div className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#8C4A28] mb-2 flex items-center gap-1.5">
          <Anchor className="w-3.5 h-3.5 text-[#C69C50]" />
          Những thử thách gian nan của người anh hùng:
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          {TRIALS.map((t) => (
            <div key={t.name} className="p-2.5 rounded-xl bg-amber-900/10 border border-[#C69C50]/30 shadow-xs">
              <div className="text-sm font-heading font-bold text-[#8C4A28]">{t.name}</div>
              <div className="text-xs sm:text-sm font-serif-body text-stone-600 mt-1 line-clamp-2 leading-snug">{t.desc}</div>
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
          title={narration?.title || 'Sử thi Odyssey'}
          subtitle="Giọng đọc thuyết minh chuyên đề (Admin tải lên)"
          compact
        />
        <div className="flex justify-between items-center text-xs text-amber-900/70 font-mono">
          <span>TÁC GIẢ: HOMER (THẾ KỶ VIII TCN)</span>
          <span>BẢN HÙNG CA Ý CHÍ VÀ TÌNH YÊU QUÊ HƯƠNG</span>
        </div>
      </div>
    </div>
  );
};
