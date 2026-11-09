import React, { useState } from 'react';
import { AudioNarrationPlayer } from '../AudioNarrationPlayer';
import { NarrationsMap } from '../../types';
import { Sparkles, Crown, Shield, Waves, Sun, Heart, X, Volume2 } from 'lucide-react';

interface Page8MythologyProps {
  narrations?: NarrationsMap;
}

interface Deity {
  id: string;
  greekName: string;
  romanName: string;
  title: string;
  symbols: string;
  description: string;
  imageUrl: string;
  audioKey: keyof NarrationsMap;
  icon: React.ElementType;
}

const DEITIES: Deity[] = [
  {
    id: 'zeus',
    greekName: 'ZEUS',
    romanName: 'Jupiter',
    title: 'Vua của các vị thần · Cai quản bầu trời và sấm sét',
    symbols: 'Tia sét, chim đại bàng, cây sồi',
    description: 'Chúa tể tối cao trên đỉnh Olympus, người giữ gìn trật tự và công lý trong vũ trụ. Mỗi khi ngài nổi giận, sấm chớp rền vang khắp cõi trời đất.',
    imageUrl: '/assets/aistudio/jlaDpk5u20iorhjusbgqA7ilQwEX57_FlxRRwpMZR9IhHvhVsQovmbHcTvCP3hQLLuRA_9hSs-z64Dr6h_JwtdYfflflL-qj0YL55KN_5Fn8RsCl36IF2oDQtPzTkH4K03T5zLlwn8-pmqtmYX6BWxVOrQQHcSB3PniENFVcRUyzuyv4tarSkbvDvJgeLi3r_20eccc00.jpg',
    audioKey: 'page8_zeus',
    icon: Crown
  },
  {
    id: 'athena',
    greekName: 'ATHENA',
    romanName: 'Minerva',
    title: 'Nữ thần trí tuệ và chiến tranh chính nghĩa',
    symbols: 'Cú vọ, cây ô liu, khiên Aegis mang đầu Medusa',
    description: 'Sinh ra từ vầng trán của thần Zeus trong bộ áo giáp vàng sáng loáng. Athena bảo trợ cho các anh hùng mưu trí, nghệ thuật dệt may và các thành bang văn minh, đặc biệt là thành Athens.',
    imageUrl: '/assets/aistudio/GHf3TnmU3jU9a7PmPuiXDdg1f8Bh7IDd_CprUEoHy4CGBA9sPCjfsqdaEHyQcm9MbDGxXSSLAEbkCbjTahdku9gms9TjtLD_07isAmgVwVig5pTmJ87G0NjRbFKFIeGG12hG88YVAhVrBCNYhmKSbj_BnC5v9yakiVz_jer-Rg2kWlhEAwKDrx3notxLDzl0_243d46c3.jpg',
    audioKey: 'page8_athena',
    icon: Shield
  },
  {
    id: 'poseidon',
    greekName: 'POSEIDON',
    romanName: 'Neptune',
    title: 'Thần biển cả, đại dương và những cơn động đất',
    symbols: 'Cây đinh ba, chiến mã, cá heo',
    description: 'Ngự trị cung điện nguy nga dưới đáy đại dương sâu thẳm. Chỉ với một cú đâm đinh ba, ngài có thể làm dấy lên những cơn cuồng phong bão táp hoặc tạo ra những nguồn nước ngọt tinh khiết.',
    imageUrl: '/assets/aistudio/DWdiVczIXu4LR_mXZJJHrJTQ214dW2dcnPnLfjxhf_LgkbwVfcThU73L4FCTZJuiobBasfI089uL8JUSzZJdfgNigCPM9eakIjR4Fnc9c6zPCroVM1LMk3IxbxEdEZcRfpg_LnBQgAa88bVz-sNBkeEScBmEiMi7vnt5zpDOcvWy_biQvazVH87P-0sL_Nnl_9a0b84a6.jpg',
    audioKey: 'page8_poseidon',
    icon: Waves
  },
  {
    id: 'apollo',
    greekName: 'APOLLO',
    romanName: 'Phoebus',
    title: 'Thần ánh sáng, âm nhạc, thơ ca và thuật tiên tri',
    symbols: 'Cây đàn lia, cung vàng, vòng nguyệt quế',
    description: 'Vị thần biểu trưng cho sự hài hòa, vẻ đẹp nam tính lý tưởng, y thuật và chân lý. Trung tâm đền thờ Delphi của ngài là nơi lưu giữ những lời sấm truyền huyền bí dẫn lối vận mệnh Hy Lạp.',
    imageUrl: '/assets/aistudio/Mw3xsD3UyWlKU6kTR05ivbGY5DbeiXR6HfFxP5oubt9E3Uoj9hcrspQ_QbDo6qh_2Bicn12py3XiuP44QYzF6oEGEf8UrBzWKMagnHalyy3imSLIzbZZovWyPXP_xAxHY3PmPoWA0ptI39hT_rfmoDijPXQfVs0oLRAYxddj4alQoMui4fBozvRqxNvSU6iy_71aeac3e.jpg',
    audioKey: 'page8_apollo',
    icon: Sun
  },
  {
    id: 'aphrodite',
    greekName: 'APHRODITE',
    romanName: 'Venus',
    title: 'Nữ thần tình yêu, sắc đẹp và sinh sôi nảy nở',
    symbols: 'Bồ câu trắng, vỏ sò biển, hoa hồng',
    description: 'Sinh ra từ bọt biển trắng xóa ngoài khơi đảo Síp, ngài mang đến cho nhân gian vẻ đẹp quyến rũ bất tận, khát khao lãng mạn và nguồn cảm hứng vô tận cho thi ca và điêu khắc cổ điển.',
    imageUrl: '/assets/aistudio/8ELqgBE8piPTuKI1YVhWb97TCRtk_EDAmvZUOSCDuDiURjwKQHZclsHqnu3pv7J4UfGJ-utHqH-vAnTI8Evsvfgrl8Nh3UoMx3s3fqpU3PvAk8sgsFS3qXfav_hLo9Ywu-2Ut1likA_02doXR_pUZeiIzhe3mrNhLQUfRPs6rDnuWhm_OFP0Ct2OAca6x0nF_4370694a.jpg',
    audioKey: 'page8_aphrodite',
    icon: Heart
  }
];

export const Page8Mythology: React.FC<Page8MythologyProps> = ({ narrations }) => {
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);

  return (
    <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 bg-parchment rounded-r-2xl overflow-y-auto custom-scrollbar border-2 border-[#C69C50]/40 shadow-inner">
      {/* Decorative Border */}
      <div className="absolute inset-3 border border-[#C69C50]/30 rounded-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center pb-2.5 border-b border-[#C69C50]/30">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C69C50] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Trang 08 · Đỉnh Olympus Huyền Thoại</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#39271D] tracking-wide mt-1">
          THẾ GIỚI THẦN THOẠI CỔ ĐẠI
        </h2>
        <div className="w-20 h-0.5 bg-[#C69C50] mx-auto mt-1.5" />
      </div>

      {/* Narrative */}
      <div className="relative z-10 py-1.5 text-sm sm:text-base font-serif-body text-[#2A1D15] leading-relaxed text-justify">
        <p className="p-3 rounded-xl bg-amber-950/5 border border-[#C69C50]/30 shadow-xs">
          Thần thoại là tập hợp những câu chuyện dân gian kể về các vị thần, anh hùng và hiện tượng tự nhiên. Qua đó phản ánh cách con người cổ đại giải thích nguồn gốc vũ trụ, niềm tin và thế giới quan duy mỹ đặc sắc của người Hy Lạp – La Mã.
        </p>
      </div>

      {/* 5 Deities Showcase */}
      <div className="relative z-10 py-1">
        <div className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#8C4A28] mb-2 flex items-center justify-between">
          <span>5 vị thần tối cao (Nhấn để phóng to & nghe):</span>
          <span className="text-xs text-amber-900/70 font-mono">Olympus Deities</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {DEITIES.map((deity) => {
            const IconComponent = deity.icon;
            const isSelected = selectedDeity?.id === deity.id;
            return (
              <button
                key={deity.id}
                type="button"
                onClick={() => setSelectedDeity(deity)}
                className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between gap-1 shadow-xs active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'border-[#C69C50] bg-[#C69C50] text-[#171614] shadow-md ring-2 ring-[#E7C77A]'
                    : 'border-[#C69C50]/35 bg-amber-900/10 hover:bg-amber-900/20 hover:border-[#C69C50] text-[#39271D]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#39271D] text-[#E7C77A] flex items-center justify-center shrink-0 border border-[#C69C50]/50 shadow-inner">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-heading font-bold leading-tight truncate w-full mt-0.5">
                  {deity.greekName}
                </div>
                <div className="text-[10px] sm:text-xs text-stone-600 font-medium truncate w-full">
                  {deity.romanName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Deity Full Modal / Zoom View */}
        {selectedDeity && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="max-w-md w-full bg-[#2A1D15] text-[#F5E8D0] rounded-2xl border-2 border-[#C69C50] p-5 sm:p-6 shadow-2xl relative animate-scaleIn flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedDeity(null)}
                className="absolute top-3.5 right-3.5 text-[#C69C50] hover:text-[#E7C77A] p-1.5 rounded-full bg-black/50 transition-colors"
                aria-label="Đóng chi tiết vị thần"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image banner */}
              <div className="w-full h-48 rounded-xl overflow-hidden border border-[#C69C50]/60 mb-3.5 relative bg-black/40">
                <img
                  src={selectedDeity.imageUrl}
                  alt={selectedDeity.greekName}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D15] via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex justify-between items-end">
                  <div>
                    <span className="text-xs text-[#E7C77A] uppercase tracking-widest font-heading">
                      Thần thoại Hy Lạp – La Mã
                    </span>
                    <h3 className="text-xl font-heading font-bold text-white drop-shadow">
                      {selectedDeity.greekName} · {selectedDeity.romanName}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Title & Lore */}
              <div className="space-y-2.5 text-sm font-serif-body leading-relaxed">
                <div className="text-sm sm:text-base font-heading font-semibold text-[#E7C77A]">
                  {selectedDeity.title}
                </div>
                <div className="p-2.5 rounded-lg bg-[#171614] border border-[#C69C50]/30 text-xs sm:text-sm text-amber-200">
                  <strong className="text-[#C69C50]">Biểu tượng:</strong> {selectedDeity.symbols}
                </div>
                <p className="text-stone-300">
                  {selectedDeity.description}
                </p>
              </div>

              {/* Audio player for this God */}
              <div className="mt-4 pt-3 border-t border-[#C69C50]/30">
                <AudioNarrationPlayer
                  audioUrl={narrations?.[selectedDeity.audioKey]?.url}
                  title={`Thuyết minh: ${selectedDeity.greekName} (${selectedDeity.romanName})`}
                  subtitle="Admin tải lên"
                  compact
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* General Mythology Narration Audio */}
      <div className="relative z-10 pt-2 border-t border-[#C69C50]/30 space-y-2">
        <AudioNarrationPlayer
          audioUrl={narrations?.page8_general?.url}
          title={narrations?.page8_general?.title || 'Thế giới thần thoại Hy Lạp'}
          subtitle="Giọng đọc thuyết minh chuyên đề (Admin tải lên)"
          compact
        />
        <div className="flex justify-between items-center text-xs text-amber-900/70 font-mono">
          <span>5 VỊ THẦN ĐỈNH OLYMPUS</span>
          <span>BIỂU TƯỢNG VĂN MINH CỔ ĐẠI</span>
        </div>
      </div>
    </div>
  );
};
