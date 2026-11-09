export interface AppSettings {
  schoolName: string;
  department: string;
  motto: string;
  logoUrl: string;
  introEnabled: boolean;
  introDuration: number;
  introTitle: string;
  introSubtitle: string;
  introBackground: string;
  introAudioUrl: string;
  presentationSoundEnabled: boolean;
}

export interface NarrationItem {
  url: string;
  title: string;
  videoUrl?: string;
}

export interface NarrationsMap {
  page2: NarrationItem;
  page4: NarrationItem;
  page5: NarrationItem;
  page6: NarrationItem;
  page7: NarrationItem;
  page8_general: NarrationItem;
  page8_zeus: NarrationItem;
  page8_athena: NarrationItem;
  page8_poseidon: NarrationItem;
  page8_apollo: NarrationItem;
  page8_aphrodite: NarrationItem;
  page9: NarrationItem;
  page10: NarrationItem;
  page13: NarrationItem;
  [key: string]: NarrationItem | undefined;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  size: number;
  uploadedAt: string;
  targetPage: string;
  targetSection: string;
  description: string;
}

export interface AppConfigData {
  settings: AppSettings;
  narrations: NarrationsMap;
  media: MediaItem[];
  pageContentOverrides: Record<string, any>;
}
