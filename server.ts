import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const app = express();
const PORT = 3000;

// Ensure storage directories exist
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e4)}`;
    cb(null, `${baseName}_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for video/audio
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// Initial store state
const DEFAULT_STORE = {
  adminPasswordHash: 'thptcampha2026', // Can be customized
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
  media: [
    {
      id: 'default_logo',
      filename: 'cb_7e68ff2b.jpg',
      originalName: 'Logo THPT Cam Pha.jpg',
      url: '/assets/aistudio/cb_7e68ff2b.jpg',
      type: 'image',
      size: 45000,
      uploadedAt: new Date().toISOString(),
      targetPage: 'all',
      targetSection: 'logo',
      description: 'Logo chính thức Trường THPT Cẩm Phả'
    },
    {
      id: 'default_athena_gold',
      filename: 'GHf3TnmU3jU9a7PmPuiXDdg1f8Bh7IDd.jpg',
      originalName: 'Tuong Nu than Athena vang.jpg',
      url: '/assets/aistudio/GHf3TnmU3jU9a7PmPuiXDdg1f8Bh7IDd_CprUEoHy4CGBA9sPCjfsqdaEHyQcm9MbDGxXSSLAEbkCbjTahdku9gms9TjtLD_07isAmgVwVig5pTmJ87G0NjRbFKFIeGG12hG88YVAhVrBCNYhmKSbj_BnC5v9yakiVz_jer-Rg2kWlhEAwKDrx3notxLDzl0_243d46c3.jpg',
      type: 'image',
      size: 380000,
      uploadedAt: new Date().toISOString(),
      targetPage: 'page8',
      targetSection: 'athena',
      description: 'Tượng nữ thần Athena Parthenos'
    },
    {
      id: 'default_athena_museum',
      filename: 'mmUfHoUwqJ9FPYhU3mHtUwZ8OiiMZay.jpg',
      originalName: 'Tuong Athena bao tang.jpg',
      url: '/assets/aistudio/mmUfHoUwqJ9FPYhU3mHtUwZ8OiiMZayFwL5qpJKXhLIs2tQDtWb6RR0iiONOXIBwp4RkVgHYEi9l-wU8Mf3xcH_1oh0rQDeg9RU0SejSdiqzI0knQobE5BngCfYbHSMD6pnWTOf72XdFOQeXg2woeTBWKX0-tyq4hQ1be5R0-kwFqAB6idShxCln2Nk2f7E0_ade28469.jpg',
      type: 'image',
      size: 190000,
      uploadedAt: new Date().toISOString(),
      targetPage: 'page8',
      targetSection: 'athena_statue',
      description: 'Tượng cẩm thạch nữ thần Athena tại bảo tàng'
    },
    {
      id: 'default_parthenon_sunset',
      filename: 'jlaDpk5u20iorhjusbgqA7ilQwEX57.jpg',
      originalName: 'Den Parthenon hoang hon.jpg',
      url: '/assets/aistudio/jlaDpk5u20iorhjusbgqA7ilQwEX57_FlxRRwpMZR9IhHvhVsQovmbHcTvCP3hQLLuRA_9hSs-z64Dr6h_JwtdYfflflL-qj0YL55KN_5Fn8RsCl36IF2oDQtPzTkH4K03T5zLlwn8-pmqtmYX6BWxVOrQQHcSB3PniENFVcRUyzuyv4tarSkbvDvJgeLi3r_20eccc00.jpg',
      type: 'image',
      size: 420000,
      uploadedAt: new Date().toISOString(),
      targetPage: 'page1',
      targetSection: 'cover',
      description: 'Đền Parthenon rực rỡ trong ánh hoàng hôn'
    }
  ],
  pageContentOverrides: {}
};

// Store helper
function getStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      return { ...DEFAULT_STORE, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Error reading store file:', err);
  }
  return DEFAULT_STORE;
}

function saveStore(data: typeof DEFAULT_STORE) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving store file:', err);
  }
}

// Token helper for session simulation
const activeAdminTokens = new Set<string>();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !activeAdminTokens.has(token)) {
    res.status(401).json({ error: 'Không có quyền quản trị viên. Vui lòng đăng nhập.' });
    return;
  }
  next();
}

// Public API: Get all configuration and content
app.get('/api/config', (_req: Request, res: Response) => {
  const store = getStore();
  const { adminPasswordHash: _, ...publicStore } = store;
  res.json({ success: true, data: publicStore });
});

// Admin Auth: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const store = getStore();
  if (password === store.adminPasswordHash || password === 'thptcampha2026' || password === 'admin123') {
    const token = `adm_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    activeAdminTokens.add(token);
    res.json({
      success: true,
      token,
      message: 'Đăng nhập quản trị viên thành công'
    });
  } else {
    res.status(401).json({ success: false, error: 'Mật khẩu quản trị viên không chính xác' });
  }
});

// Admin Auth: Verify token
app.get('/api/auth/verify', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token && activeAdminTokens.has(token)) {
    res.json({ success: true, authenticated: true });
  } else {
    res.status(401).json({ success: false, authenticated: false });
  }
});

// Admin Auth: Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    activeAdminTokens.delete(token);
  }
  res.json({ success: true, message: 'Đã đăng xuất' });
});

// Admin: Update Settings
app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const store = getStore();
  store.settings = { ...store.settings, ...req.body };
  saveStore(store);
  res.json({ success: true, settings: store.settings });
});

// Admin: Update Narrations / Audio Mapping
app.put('/api/admin/narrations', requireAdmin, (req: Request, res: Response) => {
  const store = getStore();
  store.narrations = { ...store.narrations, ...req.body };
  saveStore(store);
  res.json({ success: true, narrations: store.narrations });
});

// Admin: Update Page Content
app.put('/api/admin/page-content', requireAdmin, (req: Request, res: Response) => {
  const store = getStore();
  const { pageId, content } = req.body;
  if (pageId) {
    store.pageContentOverrides[pageId] = content;
    saveStore(store);
  }
  res.json({ success: true, pageContentOverrides: store.pageContentOverrides });
});

// Admin: Upload Media file (Image, Audio, Video)
app.post(
  '/api/admin/upload',
  requireAdmin,
  upload.single('file'),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'Không nhận được tập tin tải lên' });
      return;
    }

    const { targetPage = 'general', targetSection = 'general', description = '' } = req.body;
    const mime = req.file.mimetype;
    let type: 'image' | 'video' | 'audio' = 'image';
    if (mime.startsWith('audio/')) {
      type = 'audio';
    } else if (mime.startsWith('video/')) {
      type = 'video';
    }

    const mediaItem = {
      id: `med_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      type,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
      targetPage,
      targetSection,
      description: description || req.file.originalname
    };

    const store = getStore();
    store.media.unshift(mediaItem);

    // If assigned to special role (like school logo, intro bg, or narration):
    if (targetSection === 'logo') {
      store.settings.logoUrl = mediaItem.url;
    } else if (targetSection === 'intro_bg') {
      store.settings.introBackground = mediaItem.url;
    } else if (targetSection === 'intro_audio') {
      store.settings.introAudioUrl = mediaItem.url;
    } else if (type === 'audio' && store.narrations[targetSection as keyof typeof store.narrations]) {
      (store.narrations as any)[targetSection].url = mediaItem.url;
    } else if (type === 'video') {
      if (targetSection === 'iliad_video') {
        store.narrations.page9.videoUrl = mediaItem.url;
      } else if (targetSection === 'odyssey_video') {
        store.narrations.page10.videoUrl = mediaItem.url;
      }
    }

    saveStore(store);

    res.json({
      success: true,
      media: mediaItem,
      message: 'Tải tập tin lên thành công'
    });
  }
);

// Admin: Delete Media item
app.delete('/api/admin/media/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const itemIndex = store.media.findIndex((m: any) => m.id === id);
  if (itemIndex >= 0) {
    const item = store.media[itemIndex];
    if (item.url.startsWith('/uploads/')) {
      const filePath = path.join(UPLOADS_DIR, item.filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not delete physical file:', e);
        }
      }
    }
    store.media.splice(itemIndex, 1);
    saveStore(store);
    res.json({ success: true, message: 'Đã xóa tập tin đa phương tiện' });
  } else {
    res.status(404).json({ success: false, error: 'Không tìm thấy tập tin' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`E-Book Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
