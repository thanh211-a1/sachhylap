import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic } from 'lucide-react';

interface AudioNarrationPlayerProps {
  audioUrl?: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export const AudioNarrationPlayer: React.FC<AudioNarrationPlayerProps> = ({
  audioUrl,
  title,
  subtitle,
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reset state whenever audioUrl changes
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioUrl) return;
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) {
    return (
      <div className={`flex items-center gap-2 rounded-lg bg-amber-950/20 border border-amber-900/30 text-amber-900/70 dark:text-amber-200/60 ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2.5 text-xs'}`}>
        <Mic className="w-4 h-4 text-[#C69C50] shrink-0" />
        <span className="italic">
          {title ? `Thuyết minh: "${title}"` : 'Lời thuyết minh'}: Đang được cập nhật
        </span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-[#C69C50]/40 bg-gradient-to-r from-[#2A1D15] via-[#38271B] to-[#2A1D15] text-[#F5E8D0] shadow-md ${compact ? 'p-2.5' : 'p-3.5'}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Tạm dừng thuyết minh' : 'Phát thuyết minh'}
            className="w-8 h-8 rounded-full bg-[#C69C50] hover:bg-[#E7C77A] text-[#171614] flex items-center justify-center transition-transform hover:scale-105 shrink-0 shadow-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-[#E7C77A] truncate font-heading">
              {title}
            </div>
            {subtitle && (
              <div className="text-[10px] sm:text-xs text-amber-200/70 truncate">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRestart}
            title="Nghe lại từ đầu"
            aria-label="Nghe lại từ đầu"
            className="p-1.5 text-[#C69C50] hover:text-[#E7C77A] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={toggleMute}
            title={isMuted ? 'Bật âm' : 'Tắt âm'}
            aria-label={isMuted ? 'Bật âm' : 'Tắt âm'}
            className="p-1.5 text-[#C69C50] hover:text-[#E7C77A] transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[11px] font-mono text-amber-100/70 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Tiến độ phát âm thanh"
          className="w-full h-1.5 bg-[#171614] rounded-lg appearance-none cursor-pointer accent-[#C69C50]"
        />
      </div>
    </div>
  );
};
