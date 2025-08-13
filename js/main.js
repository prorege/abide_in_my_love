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
import { initModeToggle } from './mode-change.js'; // ✅ 모드/이미지 준비

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

// 초기 로딩: CSV + 모드별 이미지 준비를 먼저 끝낸 뒤 UI 시작
window.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const appEl = document.getElementById('app');

  try {
    // 1) 데이터와 2) 밤/낮 배경이미지 준비를 병렬로 수행하고 모두 완료될 때까지 대기
    await Promise.all([
      loadCSV(),         // ✅ 참가자 CSV 미리 로드 & 캐싱
      initModeToggle()   // ✅ 밤/낮 배경 PNG 프리로드+디코드 후 적용
    ]);

    // 초기 텍스트 애니메이션 등 앱 초기화 (비동기라면 await 권장)
    await typingText();

    // 로딩 종료 후 앱 표시
    loadingEl.style.display = 'none';
    appEl.style.display = 'block';
  } catch (err) {
    console.error('초기화 오류:', err);
    if (loadingEl) {
      loadingEl.innerHTML = `<p>❌ 초기화 중 오류가 발생했습니다.</p>`;
    }
  }
});
