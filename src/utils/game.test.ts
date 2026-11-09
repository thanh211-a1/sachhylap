import test from 'node:test';
import assert from 'node:assert/strict';
import { GAME_ITEMS, evaluatePlacement, updateGameState, GameState } from './game';

test('GAME_ITEMS has exactly 12 items as specified', () => {
  assert.equal(GAME_ITEMS.length, 12);
  const chuVietCount = GAME_ITEMS.filter((i) => i.category === 'CHỮ VIẾT').length;
  const vanHocCount = GAME_ITEMS.filter((i) => i.category === 'VĂN HỌC').length;
  assert.equal(chuVietCount, 5);
  assert.equal(vanHocCount, 7);
});

test('evaluatePlacement correctly awards +10 for correct category and penalizes -5 for incorrect', () => {
  // Item 1: Bảng chữ cái Hy Lạp -> CHỮ VIẾT
  const correctEval = evaluatePlacement(1, 'CHỮ VIẾT');
  assert.equal(correctEval.isCorrect, true);
  assert.equal(correctEval.pointsDelta, 10);

  const incorrectEval = evaluatePlacement(1, 'VĂN HỌC');
  assert.equal(incorrectEval.isCorrect, false);
  assert.equal(incorrectEval.pointsDelta, -5);
});

test('updateGameState tracks progress and score correctly without negative score', () => {
  const initial: GameState = {
    score: 0,
    placedItems: {},
    remainingItemIds: [1, 2, 3],
    completed: false
  };

  // Incorrect placement at 0 points should not drop below 0
  const stateAfterWrong = updateGameState(initial, 1, 'VĂN HỌC');
  assert.equal(stateAfterWrong.score, 0);
  assert.equal(stateAfterWrong.remainingItemIds.length, 3);

  // Correct placement
  const stateAfterCorrect = updateGameState(stateAfterWrong, 1, 'CHỮ VIẾT');
  assert.equal(stateAfterCorrect.score, 10);
  assert.equal(stateAfterCorrect.remainingItemIds.includes(1), false);
  assert.equal(stateAfterCorrect.placedItems[1], 'CHỮ VIẾT');
});
