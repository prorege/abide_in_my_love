import { showAllTeams } from './showAllTeams.js';

window.addEventListener("DOMContentLoaded", async () => {
  const loadingEl = document.getElementById("loading");
  const appEl = document.getElementById("app");

  try {
    await showAllTeams();  // 전체 조 명단을 기본으로 보여줌
  } catch (err) {
    console.error("초기 데이터 로딩 오류:", err);
    loadingEl.innerHTML = `<p>❌ 로딩 중 오류가 발생했습니다.</p>`;
    return;
  }

  // 로딩 완료되면 앱 표시
  loadingEl.style.display = "none";
  appEl.style.display = "block";
});
