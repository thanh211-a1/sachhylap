import React, { useState, useEffect } from 'react';
import { AppConfigData } from './types';
import { CinematicIntro } from './components/CinematicIntro';
import { PortraitEBook } from './components/PortraitEBook';
import { PresentationMode } from './components/PresentationMode';
import { AdminModal } from './components/AdminModal';

const DEFAULT_CONFIG: AppConfigData = {
  settings: {
    schoolName: 'TRƯỜNG THPT CẨM PHẢ',
    department: 'SỞ GD-ĐT QUẢNG NINH',
    motto: 'SÁNG TẠO – KHÁM PHÁ – CHINH PHỤC TRI THỨC',
    logoUrl: '/assets/aistudio/cb_7e68ff2b.jpg',
    introEnabled: true,
    introDuration: 20,
    introTitle: 'THÀNH TỰU TIÊU BIỂU CỦA VĂN MINH HY LẠP – LA MÃ CỔ ĐẠI',
    introSubtitle: 'CHỮ VIẾT VÀ VĂN HỌC',
    introBackground: '/assets/aistudio/jlaDpk5u20iorhjusbgqA7ilQwEX57_FlxRRwpMZR9IhHvhVsQovmbHcTvCP3hQLLuRA_9hSs-z64Dr6h_JwtdYfflflL-qj0YL55KN_5Fn8RsCl36IF2oDQtPzTkH4K03T5zLlwn8-pmqtmYX6BWxVOrQQHcSB3PniENFVcRUyzuyv4tarSkbvDvJgeLi3r_20eccc00.jpg',
    introAudioUrl: '',
    presentationSoundEnabled: true
  },
  narrations: {
    page2: { url: '', title: 'Lời mở đầu' },
    page4: { url: '', title: 'Chữ viết Hy Lạp' },
    page5: { url: '', title: 'Chữ viết La Mã' },
    page6: { url: '', title: 'Chữ Latin & Chữ Quốc ngữ' },
    page7: { url: '', title: 'Văn học Hy Lạp & La Mã' },
    page8_general: { url: '', title: 'Thế giới thần thoại Hy Lạp' },
    page8_zeus: { url: '', title: 'Thần Zeus' },
    page8_athena: { url: '', title: 'Nữ thần Athena' },
    page8_poseidon: { url: '', title: 'Thần Poseidon' },
    page8_apollo: { url: '', title: 'Thần Apollo' },
    page8_aphrodite: { url: '', title: 'Nữ thần Aphrodite' },
    page9: { url: '', title: 'Sử thi Iliad', videoUrl: '' },
    page10: { url: '', title: 'Sử thi Odyssey', videoUrl: '' },
    page13: { url: '', title: 'Tổng kết' }
  },
  media: [],
  pageContentOverrides: {}
};

export function App() {
  const [config, setConfig] = useState<AppConfigData>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check URL parameters for ?autostart=1 or /admin
  const searchParams = new URLSearchParams(window.location.search);
  const isAutostart = searchParams.get('autostart') === '1';
  const isAdminDirect = window.location.pathname.startsWith('/admin') || searchParams.get('admin') === '1';

  const [showIntro, setShowIntro] = useState(!isAutostart);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdminOpen, setIsAdminOpen] = useState(isAdminDirect);
  const [isPresentation, setIsPresentation] = useState(false);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setConfig(json.data);
          if (!json.data.settings.introEnabled) {
            setShowIntro(false);
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch server config, using defaults:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#12100E] text-[#F4EAD4] font-sans antialiased">
      {/* Cinematic Intro Screen */}
      {showIntro ? (
        <CinematicIntro
          settings={config.settings}
          onComplete={() => setShowIntro(false)}
        />
      ) : isPresentation ? (
        /* Presentation Mode (Projector optimized) */
        <PresentationMode
          config={config}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onExit={() => setIsPresentation(false)}
          onReplayIntro={() => setShowIntro(true)}
        />
      ) : (
        /* Default Portrait E-Book View */
        <PortraitEBook
          config={config}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
          onTogglePresentation={() => setIsPresentation(true)}
          isPresentationMode={false}
        />
      )}

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onConfigUpdated={fetchConfig}
      />
    </div>
  );
}

export default App;
