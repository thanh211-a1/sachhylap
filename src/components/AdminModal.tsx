import React, { useState, useEffect } from 'react';
import { AppConfigData, MediaItem } from '../types';
import {
  X,
  Upload,
  Lock,
  LogOut,
  FolderOpen,
  Mic,
  Film,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Settings,
  Layers,
  Save,
  Trash2,
  Play,
  RotateCcw
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfigData;
  onConfigUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated
}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('campha_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tabs: 'overview' | 'media' | 'narrations' | 'identity' | 'intro'
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'narrations' | 'identity' | 'intro'>('overview');

  // Upload Form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetPage, setTargetPage] = useState('page8');
  const [targetSection, setTargetSection] = useState('page8_athena');
  const [fileDescription, setFileDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);

  // Settings form states
  const [schoolName, setSchoolName] = useState(config.settings.schoolName);
  const [department, setDepartment] = useState(config.settings.department);
  const [motto, setMotto] = useState(config.settings.motto);
  const [introEnabled, setIntroEnabled] = useState(config.settings.introEnabled);
  const [introTitle, setIntroTitle] = useState(config.settings.introTitle);
  const [introSubtitle, setIntroSubtitle] = useState(config.settings.introSubtitle);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState('');

  useEffect(() => {
    setSchoolName(config.settings.schoolName);
    setDepartment(config.settings.department);
    setMotto(config.settings.motto);
    setIntroEnabled(config.settings.introEnabled);
    setIntroTitle(config.settings.introTitle);
    setIntroSubtitle(config.settings.introSubtitle);
  }, [config]);

  // Auth check on mount
  useEffect(() => {
    if (token) {
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) {
            setToken(null);
            localStorage.removeItem('campha_admin_token');
          }
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem('campha_admin_token');
        });
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        localStorage.setItem('campha_admin_token', data.token);
        setPasswordInput('');
      } else {
        setAuthError(data.error || 'Mật khẩu không chính xác');
      }
    } catch (err) {
      setAuthError('Không thể kết nối máy chủ');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        // Safe ignore
      }
    }
    setToken(null);
    localStorage.removeItem('campha_admin_token');
  };

  const handleUploadFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !token) return;

    setIsUploading(true);
    setUploadFeedback(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('targetPage', targetPage);
    formData.append('targetSection', targetSection);
    formData.append('description', fileDescription);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUploadFeedback({ message: 'Tải tập tin lên máy chủ thành công!', isSuccess: true });
        setSelectedFile(null);
        setFileDescription('');
        onConfigUpdated();
      } else {
        setUploadFeedback({ message: data.error || 'Lỗi khi tải tập tin', isSuccess: false });
      }
    } catch (err) {
      setUploadFeedback({ message: 'Lỗi mạng khi tải lên tập tin', isSuccess: false });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!token) return;
    if (!confirm('Bạn có chắc chắn muốn xóa tập tin này khỏi hệ thống?')) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        onConfigUpdated();
      }
    } catch (err) {
      alert('Lỗi khi xóa tập tin');
    }
  };

  const handleSaveSettings = async () => {
    if (!token) return;
    setIsSavingSettings(true);
    setSettingsSavedMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          schoolName,
          department,
          motto,
          introEnabled,
          introTitle,
          introSubtitle
        })
      });
      if (res.ok) {
        setSettingsSavedMessage('Cập nhật cài đặt thành công!');
        onConfigUpdated();
        setTimeout(() => setSettingsSavedMessage(''), 3000);
      }
    } catch (err) {
      alert('Không thể lưu cài đặt');
    } finally {
      setIsSavingSettings(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs select-none">
      <div className="max-w-4xl w-full bg-[#1C1612] text-[#F5E8D0] rounded-2xl border-2 border-[#C69C50] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#2A1D15] via-[#38271B] to-[#2A1D15] border-b border-[#C69C50]/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C69C50]/20 border border-[#C69C50] flex items-center justify-center text-[#E7C77A]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-bold text-[#E7C77A]">
                HỆ THỐNG QUẢN TRỊ ADMIN · THPT CẨM PHẢ
              </h2>
              <div className="text-xs text-amber-200/70 font-mono">
                Quản lý tư liệu, thuyết minh, video & cấu hình sách điện tử
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#C69C50] hover:text-[#E7C77A] hover:bg-black/40 transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ quản trị"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Login or Admin Dashboard */}
        {!token ? (
          /* Login Form */
          <div className="p-8 sm:p-12 my-auto max-w-md mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-950/80 border-2 border-[#C69C50] mx-auto flex items-center justify-center text-[#E7C77A] shadow-lg">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold text-[#E7C77A]">
                ĐĂNG NHẬP QUẢN TRỊ VIÊN
              </h3>
              <p className="text-xs sm:text-sm font-serif-body text-stone-400 mt-1">
                Khu vực dành riêng cho Giáo viên & Quản trị viên phụ trách thao giảng.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <input
                type="password"
                placeholder="Nhập mật khẩu quản trị..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-[#C69C50]/60 text-amber-100 placeholder-stone-500 text-sm sm:text-base focus:outline-none focus:border-[#E7C77A]"
              />

              {authError && (
                <div className="text-xs sm:text-sm text-rose-400 font-medium">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C69C50] to-[#E7C77A] text-[#171614] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:brightness-110 transition-all active:scale-95 cursor-pointer"
              >
                {isLoggingIn ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}
              </button>
            </form>

            <div className="text-xs text-stone-500 font-mono">
              Mật khẩu mặc định: <code className="text-amber-300 font-bold">thptcampha2026</code>
            </div>
          </div>
        ) : (
          /* Admin Dashboard Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 p-3 bg-[#17120E] border-b md:border-b-0 md:border-r border-[#C69C50]/30 flex md:flex-col gap-1.5 shrink-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg text-xs font-cinzel font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-[#C69C50] text-[#171614] shadow-sm'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Tổng quan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-3 py-2 rounded-lg text-xs font-cinzel font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'bg-[#C69C50] text-[#171614] shadow-sm'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Tập tin tải lên ({config.media.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('narrations')}
                className={`px-3 py-2 rounded-lg text-xs font-cinzel font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'narrations'
                    ? 'bg-[#C69C50] text-[#171614] shadow-sm'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Gán Thuyết Minh</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('identity')}
                className={`px-3 py-2 rounded-lg text-xs font-cinzel font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'identity'
                    ? 'bg-[#C69C50] text-[#171614] shadow-sm'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Logo & Trường</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('intro')}
                className={`px-3 py-2 rounded-lg text-xs font-cinzel font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'intro'
                    ? 'bg-[#C69C50] text-[#171614] shadow-sm'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Màn Hình Intro</span>
              </button>
            </div>

            {/* Main Tab Content */}
            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-4">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-black/40 border border-[#C69C50]/40">
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Trang sách</div>
                      <div className="text-2xl font-cinzel font-bold text-[#E7C77A]">13 / 13</div>
                      <div className="text-[10px] text-stone-500 mt-1">Đầy đủ định dạng dọc</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-[#C69C50]/40">
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Tập tin tư liệu</div>
                      <div className="text-2xl font-cinzel font-bold text-[#E7C77A]">{config.media.length}</div>
                      <div className="text-[10px] text-stone-500 mt-1">Ảnh, video, audio</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-[#C69C50]/40">
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Mục thuyết minh</div>
                      <div className="text-2xl font-cinzel font-bold text-[#E7C77A]">14</div>
                      <div className="text-[10px] text-stone-500 mt-1">Trang & 5 vị thần</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-[#C69C50]/40">
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Trạng thái Intro</div>
                      <div className="text-base font-cinzel font-bold text-emerald-400 mt-1">
                        {config.settings.introEnabled ? 'Đang bật' : 'Tắt'}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-1">Điện ảnh 20s</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-950/20 border border-[#C69C50]/40 space-y-2">
                    <h4 className="text-xs font-cinzel font-bold text-[#E7C77A] uppercase tracking-wider">
                      Hướng dẫn tải tư liệu cho buổi thao giảng
                    </h4>
                    <p className="text-xs text-stone-300 font-garamond leading-relaxed">
                      Để chuẩn bị bài học tốt nhất, Quý Thầy/Cô có thể vào mục <strong>Tập tin tải lên</strong> để tải các file ảnh chụp tư liệu, video mô phỏng sử thi (MP4/WebM) và các file ghi âm bài giảng (MP3/WAV/OGG). Toàn bộ dữ liệu được lưu thực tế trên máy chủ và cập nhật trực tiếp vào từng trang sách!
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA UPLOADER & LIST */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  {/* Upload Form Box */}
                  <form onSubmit={handleUploadFile} className="p-4 rounded-xl bg-black/50 border border-[#C69C50]/50 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#E7C77A] uppercase tracking-wider">
                      <Upload className="w-4 h-4 text-[#C69C50]" />
                      <span>Tải tập tin mới từ máy tính</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">
                          Chọn file (Ảnh, Video MP4, Audio MP3/WAV):
                        </label>
                        <input
                          type="file"
                          accept="image/*,video/mp4,video/webm,audio/mp3,audio/wav,audio/ogg"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          required
                          className="w-full text-xs text-stone-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#C69C50] file:text-[#171614] hover:file:bg-[#E7C77A] cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">
                          Gán vào trang / mục đích:
                        </label>
                        <select
                          value={targetSection}
                          onChange={(e) => setTargetSection(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-[#C69C50]/50 text-xs text-amber-100"
                        >
                          <option value="logo">Logo chính thức trường</option>
                          <option value="intro_bg">Hình nền Intro</option>
                          <option value="intro_audio">Nhạc nền Intro</option>
                          <option value="page2">Thuyết minh Trang 2 (Lời mở đầu)</option>
                          <option value="page4">Thuyết minh Trang 4 (Chữ viết Hy Lạp)</option>
                          <option value="page5">Thuyết minh Trang 5 (Chữ viết La Mã)</option>
                          <option value="page6">Thuyết minh Trang 6 (Chữ Latin & Quốc ngữ)</option>
                          <option value="page7">Thuyết minh Trang 7 (Văn học tổng quan)</option>
                          <option value="page8_general">Thuyết minh Trang 8 (Thần thoại chung)</option>
                          <option value="page8_zeus">Thuyết minh Thần Zeus</option>
                          <option value="page8_athena">Thuyết minh Nữ thần Athena</option>
                          <option value="page8_poseidon">Thuyết minh Thần Poseidon</option>
                          <option value="page8_apollo">Thuyết minh Thần Apollo</option>
                          <option value="page8_aphrodite">Thuyết minh Nữ thần Aphrodite</option>
                          <option value="iliad_video">Video Sử thi Iliad (Trang 9)</option>
                          <option value="odyssey_video">Video Sử thi Odyssey (Trang 10)</option>
                          <option value="page13">Thuyết minh Trang 13 (Tổng kết)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">
                          Mô tả tập tin:
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Ghi âm thuyết minh bài giảng..."
                          value={fileDescription}
                          onChange={(e) => setFileDescription(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-[#C69C50]/50 text-xs text-amber-100"
                        />
                      </div>
                    </div>

                    {uploadFeedback && (
                      <div
                        className={`text-xs p-2 rounded-lg ${
                          uploadFeedback.isSuccess ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                        }`}
                      >
                        {uploadFeedback.message}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isUploading || !selectedFile}
                        className="px-4 py-2 rounded-lg bg-[#C69C50] hover:bg-[#E7C77A] text-[#171614] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploading ? 'Đang tải lên...' : 'Tải lên máy chủ'}</span>
                      </button>
                    </div>
                  </form>

                  {/* Uploaded Media Table */}
                  <div className="space-y-2">
                    <div className="text-xs font-cinzel font-bold text-[#E7C77A] uppercase tracking-wider">
                      Danh sách tập tin đã lưu trữ ({config.media.length})
                    </div>

                    <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto custom-scrollbar">
                      {config.media.map((item) => (
                        <div
                          key={item.id}
                          className="p-2.5 rounded-xl bg-black/40 border border-[#C69C50]/30 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-[#2A1D15] border border-[#C69C50]/50 flex items-center justify-center shrink-0">
                              {item.type === 'image' && <ImageIcon className="w-4 h-4 text-[#E7C77A]" />}
                              {item.type === 'video' && <Film className="w-4 h-4 text-sky-400" />}
                              {item.type === 'audio' && <Mic className="w-4 h-4 text-emerald-400" />}
                            </div>

                            <div className="min-w-0">
                              <div className="font-semibold text-amber-200 truncate">
                                {item.originalName}
                              </div>
                              <div className="text-[10px] text-stone-400 truncate">
                                {item.description} · Mục: <span className="text-[#C69C50]">{item.targetSection}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-[10px] text-stone-300"
                            >
                              Xem / Nghe
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteMedia(item.id)}
                              className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
                              title="Xóa tập tin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NARRATIONS MAPPING */}
              {activeTab === 'narrations' && (
                <div className="space-y-3">
                  <div className="text-xs font-cinzel font-bold text-[#E7C77A] uppercase tracking-wider">
                    Bản đồ liên kết Lời Thuyết Minh & Video từng trang
                  </div>
                  <p className="text-xs text-stone-300 font-garamond">
                    Thuyết minh sẽ tự động phát tại các trang tương ứng khi học sinh hoặc giáo viên bấm nút "Nghe thuyết minh".
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(config.narrations).map(([key, item]) => {
                      if (!item) return null;
                      return (
                        <div key={key} className="p-3 rounded-xl bg-black/40 border border-[#C69C50]/30 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-cinzel font-bold text-[#E7C77A]">{item.title}</span>
                            <span className="text-[10px] font-mono text-stone-500 uppercase">{key}</span>
                          </div>
                          <div className="text-[11px] text-stone-400 truncate">
                            File âm thanh: {item.url ? (
                              <span className="text-emerald-400 font-mono">✓ {item.url}</span>
                            ) : (
                              <span className="text-amber-500/70 italic">Chưa tải lên</span>
                            )}
                          </div>
                          {item.videoUrl !== undefined && (
                            <div className="text-[11px] text-stone-400 truncate">
                              Video: {item.videoUrl ? (
                                <span className="text-sky-400 font-mono">✓ {item.videoUrl}</span>
                              ) : (
                                <span className="text-amber-500/70 italic">Chưa tải lên</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: SCHOOL IDENTITY */}
              {activeTab === 'identity' && (
                <div className="space-y-4 max-w-lg">
                  <div className="text-xs font-cinzel font-bold text-[#E7C77A] uppercase tracking-wider">
                    Thông tin đơn vị & Nhận diện Trường
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-400 mb-1">Cơ quan chủ quản:</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-[#C69C50]/60 text-amber-100"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Tên trường:</label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-[#C69C50]/60 text-amber-100 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Khẩu hiệu / Phương châm:</label>
                      <input
                        type="text"
                        value={motto}
                        onChange={(e) => setMotto(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-[#C69C50]/60 text-amber-100"
                      />
                    </div>

                    {settingsSavedMessage && (
                      <div className="text-xs text-emerald-400 font-medium">
                        {settingsSavedMessage}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      disabled={isSavingSettings}
                      className="px-5 py-2 rounded-xl bg-[#C69C50] hover:bg-[#E7C77A] text-[#171614] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSavingSettings ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: INTRO SETTINGS */}
              {activeTab === 'intro' && (
                <div className="space-y-4 max-w-lg">
                  <div className="text-xs font-cinzel font-bold text-[#E7C77A] uppercase tracking-wider">
                    Cài đặt màn hình mở đầu (Intro điện ảnh)
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="introToggle"
                        checked={introEnabled}
                        onChange={(e) => setIntroEnabled(e.target.checked)}
                        className="w-4 h-4 rounded accent-[#C69C50]"
                      />
                      <label htmlFor="introToggle" className="text-stone-300 font-medium cursor-pointer">
                        Bật màn hình Intro điện ảnh khi mở website
                      </label>
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Tiêu đề chính Intro:</label>
                      <input
                        type="text"
                        value={introTitle}
                        onChange={(e) => setIntroTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-[#C69C50]/60 text-amber-100 font-cinzel font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Tiêu đề phụ Intro:</label>
                      <input
                        type="text"
                        value={introSubtitle}
                        onChange={(e) => setIntroSubtitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-[#C69C50]/60 text-amber-100 font-cinzel font-bold"
                      />
                    </div>

                    {settingsSavedMessage && (
                      <div className="text-xs text-emerald-400 font-medium">
                        {settingsSavedMessage}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      disabled={isSavingSettings}
                      className="px-5 py-2 rounded-xl bg-[#C69C50] hover:bg-[#E7C77A] text-[#171614] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSavingSettings ? 'Đang lưu...' : 'Lưu Cài Đặt Intro'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
