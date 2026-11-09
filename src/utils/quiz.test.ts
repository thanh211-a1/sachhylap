import test from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ_QUESTIONS, calculateQuizScore, getRankGrade } from './quiz';

test('QUIZ_QUESTIONS contains exactly 10 questions with valid choices', () => {
  assert.equal(QUIZ_QUESTIONS.length, 10);
  for (const q of QUIZ_QUESTIONS) {
    assert.equal(q.options.length, 4);
    assert.ok(['A', 'B', 'C', 'D'].includes(q.correctAnswer));
    assert.ok(q.explanation.length > 10);
  }
});

test('calculateQuizScore computes accurate 10 points per correct answer', () => {
  const perfectAnswers: Record<number, 'A' | 'B' | 'C' | 'D'> = {
    1: 'B',
    2: 'B',
    3: 'C',
    4: 'B',
    5: 'C',
    6: 'A',
    7: 'B',
    8: 'C',
    9: 'B',
    10: 'C'
  };
  assert.equal(calculateQuizScore(perfectAnswers), 100);

  const halfAnswers: Record<number, 'A' | 'B' | 'C' | 'D'> = {
    1: 'B',
    2: 'B',
    3: 'C',
    4: 'B',
    5: 'C'
  };
  assert.equal(calculateQuizScore(halfAnswers), 50);
});

test('getRankGrade accurately categorizes score according to project rubric', () => {
  assert.equal(getRankGrade(100).grade, 'Xuất sắc');
  assert.equal(getRankGrade(90).grade, 'Xuất sắc');
  assert.equal(getRankGrade(85).grade, 'Rất tốt');
  assert.equal(getRankGrade(75).grade, 'Tốt');
  assert.equal(getRankGrade(65).grade, 'Khá');
  assert.equal(getRankGrade(55).grade, 'Cần ôn tập thêm');
  assert.equal(getRankGrade(40).grade, 'Hãy thử lại nhé!');
});
