// js/main.js
import { findTeam } from './findTeam.js';
import { findRoom } from './findRoom.js';
import { showAllTeams } from './showAllTeams.js';
import { showAllRooms } from './showAllRooms.js';
import { showSchedule } from './showSchedule.js';
import { showFood } from './showFood.js';
import { showEmergency } from './showEmergency.js';
import { showResolution } from './showResolution.js';
import { showFasting } from './showFasting.js';
import { showAllFasting } from './showAllFasting.js';
import { typingText } from './typingText.js';
import { loadCSV } from './utils/loadCSV.js';
import { showLinktree } from './showLinktree.js';
import { showWashClean } from './showWashClean.js';

export const appHandlers = {
  findTeam,
  findRoom,
  showAllTeams,
  showAllRooms,
  showSchedule,
  showFood,
  showEmergency,
  showResolution,
  showFasting,
  showAllFasting,
  typingText,
  showLinktree,
  showWashClean
};

// 전역 핸들러 등록
window.appHandlers = appHandlers;

// 초기 로딩 시 CSV 데이터 미리 불러오기
window.addEventListener('DOMContentLoaded', async () => {
  await loadCSV(); // ✅ 참가자 CSV 미리 로드 & 캐싱
  typingText();
});
