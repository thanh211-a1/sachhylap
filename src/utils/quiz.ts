export interface QuizQuestion {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Người Hy Lạp cổ đại tiếp thu hệ thống chữ viết từ dân tộc nào?',
    options: [
      { key: 'A', text: 'Ai Cập' },
      { key: 'B', text: 'Phoenicia' },
      { key: 'C', text: 'La Mã' },
      { key: 'D', text: 'Lưỡng Hà' }
    ],
    correctAnswer: 'B',
    explanation: 'Người Hy Lạp cổ đại đã tiếp thu bảng chữ cái của các thương nhân Phoenicia và cải tiến để phù hợp với ngữ âm của mình.'
  },
  {
    id: 2,
    question: 'Người Hy Lạp đã cải tiến chữ viết Phoenicia bằng cách nào?',
    options: [
      { key: 'A', text: 'Bỏ các phụ âm' },
      { key: 'B', text: 'Bổ sung các ký tự biểu thị nguyên âm' },
      { key: 'C', text: 'Chỉ sử dụng hình vẽ' },
      { key: 'D', text: 'Chuyển sang chữ tượng hình' }
    ],
    correctAnswer: 'B',
    explanation: 'Chữ Phoenicia ban đầu chỉ ghi phụ âm; người Hy Lạp đã sáng tạo thêm các ký tự nguyên âm như Alpha, Epsilon, Iota, Omicron, Upsilon...'
  },
  {
    id: 3,
    question: 'Người La Mã phát triển hệ chữ viết nào?',
    options: [
      { key: 'A', text: 'Chữ tượng hình' },
      { key: 'B', text: 'Chữ Phạn' },
      { key: 'C', text: 'Chữ Latin' },
      { key: 'D', text: 'Chữ Hán' }
    ],
    correctAnswer: 'C',
    explanation: 'Kế thừa ảnh hưởng từ chữ viết Hy Lạp qua người Etruscan, người La Mã phát triển bảng chữ cái Latin gồm các chữ cái A, B, C, D...'
  },
  {
    id: 4,
    question: 'Chữ Quốc ngữ Việt Nam sử dụng hệ chữ cái nào?',
    options: [
      { key: 'A', text: 'Hy Lạp' },
      { key: 'B', text: 'Latin' },
      { key: 'C', text: 'Ả Rập' },
      { key: 'D', text: 'Hán' }
    ],
    correctAnswer: 'B',
    explanation: 'Chữ Quốc ngữ dùng hệ thống mẫu tự Latin kết hợp với các dấu phụ và dấu thanh âm để ghi âm tiếng Việt.'
  },
  {
    id: 5,
    question: 'Alexandre de Rhodes có đóng góp nổi bật nào đối với chữ Quốc ngữ?',
    options: [
      { key: 'A', text: 'Là người duy nhất sáng tạo chữ Quốc ngữ' },
      { key: 'B', text: 'Sáng tạo bảng chữ cái Hy Lạp' },
      { key: 'C', text: 'Góp phần hệ thống hóa và phổ biến chữ Quốc ngữ qua từ điển năm 1651' },
      { key: 'D', text: 'Phát minh chữ Latin' }
    ],
    correctAnswer: 'C',
    explanation: 'Năm 1651 tại Roma, ông xuất bản cuốn "Từ điển Việt – Bồ – La" và cuốn sách ngữ pháp, giúp hệ thống hóa chữ Quốc ngữ.'
  },
  {
    id: 6,
    question: 'Hai bộ sử thi nổi tiếng gắn với tên tuổi Homer là gì?',
    options: [
      { key: 'A', text: 'Iliad và Odyssey' },
      { key: 'B', text: 'Aeneid và Iliad' },
      { key: 'C', text: 'Odyssey và Metamorphoses' },
      { key: 'D', text: 'Aeneid và Odyssey' }
    ],
    correctAnswer: 'A',
    explanation: 'Iliad và Odyssey là hai kiệt tác sử thi đỉnh cao của văn học Hy Lạp cổ đại gắn liền với tên tuổi thi hào Homer.'
  },
  {
    id: 7,
    question: 'Nhân vật anh hùng nổi bật trong sử thi Iliad là ai?',
    options: [
      { key: 'A', text: 'Zeus' },
      { key: 'B', text: 'Achilles' },
      { key: 'C', text: 'Odysseus' },
      { key: 'D', text: 'Apollo' }
    ],
    correctAnswer: 'B',
    explanation: 'Achilles là chiến binh dũng mãnh nhất của quân Hy Lạp, với cơn thịnh nộ nổi tiếng định đoạt số phận thành Troy.'
  },
  {
    id: 8,
    question: 'Sử thi Odyssey kể về nội dung gì?',
    options: [
      { key: 'A', text: 'Cuộc chiến giữa các vị thần' },
      { key: 'B', text: 'Sự hình thành thành Rome' },
      { key: 'C', text: 'Hành trình trở về quê hương của Odysseus' },
      { key: 'D', text: 'Cuộc chiến tranh Ba Tư' }
    ],
    correctAnswer: 'C',
    explanation: 'Odyssey miêu tả hành trình 10 năm vượt bao trùng khơi, quái vật và thử thách để trở về quê hương Ithaca gặp lại Penelope của Odysseus.'
  },
  {
    id: 9,
    question: 'Thần thoại Hy Lạp – La Mã phản ánh điều gì?',
    options: [
      { key: 'A', text: 'Chỉ các hoạt động kinh tế' },
      { key: 'B', text: 'Cách con người cổ đại giải thích nguồn gốc vũ trụ, tự nhiên và con người' },
      { key: 'C', text: 'Chỉ các sự kiện quân sự' },
      { key: 'D', text: 'Những quy định pháp luật' }
    ],
    correctAnswer: 'B',
    explanation: 'Thần thoại phản ánh trí tưởng tượng rực rỡ và nỗ lực của người cổ đại để lý giải các hiện tượng tự nhiên và nguồn gốc đời sống.'
  },
  {
    id: 10,
    question: 'Giá trị nổi bật của văn học Hy Lạp – La Mã cổ đại là gì?',
    options: [
      { key: 'A', text: 'Chỉ có giá trị giải trí' },
      { key: 'B', text: 'Không có ảnh hưởng đến văn học sau này' },
      { key: 'C', text: 'Để lại di sản có ảnh hưởng lâu dài đối với văn học và văn hóa nhân loại' },
      { key: 'D', text: 'Chỉ được lưu truyền trong thời cổ đại' }
    ],
    correctAnswer: 'C',
    explanation: 'Văn học Hy Lạp - La Mã là nền móng nghệ thuật, chuẩn mực nhân văn và nguồn cảm hứng bất tận cho văn học thế giới suốt hàng nghìn năm.'
  }
];

export type RankGrade = 'Xuất sắc' | 'Rất tốt' | 'Tốt' | 'Khá' | 'Cần ôn tập thêm' | 'Hãy thử lại nhé!';

export function calculateQuizScore(answers: Record<number, 'A' | 'B' | 'C' | 'D'>): number {
  let score = 0;
  for (const q of QUIZ_QUESTIONS) {
    if (answers[q.id] === q.correctAnswer) {
      score += 10;
    }
  }
  return score;
}

export function getRankGrade(score: number): { grade: RankGrade; message: string; badgeColor: string } {
  if (score >= 90) {
    return {
      grade: 'Xuất sắc',
      message: 'Kiến thức lịch sử của bạn vô cùng uyên bác và chuẩn xác!',
      badgeColor: 'text-amber-300'
    };
  }
  if (score >= 81) {
    return {
      grade: 'Rất tốt',
      message: 'Bạn nắm rất chắc các thành tựu của văn minh Hy Lạp – La Mã!',
      badgeColor: 'text-emerald-300'
    };
  }
  if (score >= 70) {
    return {
      grade: 'Tốt',
      message: 'Kết quả đáng khen ngợi! Bạn đã hiểu sâu các điểm mấu chốt.',
      badgeColor: 'text-sky-300'
    };
  }
  if (score >= 61) {
    return {
      grade: 'Khá',
      message: 'Bạn đã nắm được phần lớn kiến thức, cần chú ý thêm một vài chi tiết.',
      badgeColor: 'text-yellow-300'
    };
  }
  if (score >= 50) {
    return {
      grade: 'Cần ôn tập thêm',
      message: 'Hãy đọc lại các trang sử thi và chữ viết để củng cố bài học nhé!',
      badgeColor: 'text-orange-400'
    };
  }
  return {
    grade: 'Hãy thử lại nhé!',
    message: 'Đừng nản lòng! Hãy cùng đọc lại cuốn sách và chinh phục bài kiểm tra một lần nữa.',
    badgeColor: 'text-red-400'
  };
}
