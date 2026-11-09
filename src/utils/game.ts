export type CategoryType = 'CHỮ VIẾT' | 'VĂN HỌC';

export interface GameItem {
  id: number;
  title: string;
  category: CategoryType;
  iconName?: string;
  hint?: string;
}

export const GAME_ITEMS: GameItem[] = [
  { id: 1, title: 'Bảng chữ cái Hy Lạp', category: 'CHỮ VIẾT', hint: 'Hệ thống gồm 24 ký tự tiếp thu từ người Phoenicia' },
  { id: 2, title: 'Bảng chữ cái Latin', category: 'CHỮ VIẾT', hint: 'Phát triển từ chữ Hy Lạp qua người Etruscan' },
  { id: 3, title: 'Thần thoại Hy Lạp', category: 'VĂN HỌC', hint: 'Thế giới các vị thần trên đỉnh Olympus' },
  { id: 4, title: 'Sử thi Iliad', category: 'VĂN HỌC', hint: 'Khắc họa cuộc chiến thành Troy và cơn thịnh nộ của Achilles' },
  { id: 5, title: 'Sử thi Odyssey', category: 'VĂN HỌC', hint: 'Hành trình 10 năm gian nan của người anh hùng Odysseus' },
  { id: 6, title: 'Việc bổ sung nguyên âm vào hệ thống chữ viết Phoenicia', category: 'CHỮ VIẾT', hint: 'Cải tiến mang tính cách mạng của người Hy Lạp' },
  { id: 7, title: 'Những câu chuyện về thần Zeus', category: 'VĂN HỌC', hint: 'Truyền thuyết về vua của các vị thần và sấm sét' },
  { id: 8, title: 'Chữ Quốc ngữ sử dụng hệ chữ cái Latin', category: 'CHỮ VIẾT', hint: 'Dấu ấn đặc biệt của chữ Latin đối với văn hóa Việt Nam' },
  { id: 9, title: 'Các tác phẩm kể về hành trình của người anh hùng Odysseus', category: 'VĂN HỌC', hint: 'Tác phẩm văn học sử thi bất hủ' },
  { id: 10, title: 'Những câu chuyện giải thích nguồn gốc vũ trụ và tự nhiên', category: 'VĂN HỌC', hint: 'Hệ thống thần thoại cổ đại phong phú' },
  { id: 11, title: 'Các bia đá khắc chữ Latin', category: 'CHỮ VIẾT', hint: 'Chứng tích ghi chép luật pháp và lịch sử La Mã' },
  { id: 12, title: 'Các truyền thuyết về Athena và Poseidon', category: 'VĂN HỌC', hint: 'Văn học dân gian phản ánh niềm tin cổ xưa' }
];

export interface GameState {
  score: number;
  placedItems: Record<number, CategoryType>;
  remainingItemIds: number[];
  completed: boolean;
}

export function evaluatePlacement(
  itemId: number,
  targetCategory: CategoryType
): { isCorrect: boolean; pointsDelta: number } {
  const item = GAME_ITEMS.find((it) => it.id === itemId);
  if (!item) {
    return { isCorrect: false, pointsDelta: 0 };
  }
  const isCorrect = item.category === targetCategory;
  const pointsDelta = isCorrect ? 10 : -5;
  return { isCorrect, pointsDelta };
}

export function updateGameState(
  currentState: GameState,
  itemId: number,
  targetCategory: CategoryType
): GameState {
  const { isCorrect, pointsDelta } = evaluatePlacement(itemId, targetCategory);
  const newScore = Math.max(0, currentState.score + pointsDelta);
  
  if (isCorrect) {
    const newPlaced = { ...currentState.placedItems, [itemId]: targetCategory };
    const newRemaining = currentState.remainingItemIds.filter((id) => id !== itemId);
    return {
      score: newScore,
      placedItems: newPlaced,
      remainingItemIds: newRemaining,
      completed: newRemaining.length === 0
    };
  } else {
    return {
      ...currentState,
      score: newScore
    };
  }
}
