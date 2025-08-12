// js/showAllFasting.js
import { hideAll } from './utils.js';
import { loadCSV } from './utils/loadCSV.js';

export async function showAllFasting() {
  hideAll();
  const el = document.getElementById("allFastingInfo");
  el.style.display = "block";

  try {
    const data = await loadCSV();

    // 금식 기도 시간 라벨
    const fastingLabels = {
      "1": "1일차 점심",
      "2": "1일차 저녁",
      "3": "2일차 아침",
      "4": "2일차 점심",
      "5": "2일차 저녁",
      "6": "3일차 아침",
    };
    const order = ["1", "2", "3", "4", "5", "6"];

    // fasting별 인원 분류
    const fastingMap = {};
    data.forEach((p) => {
      const key = (p["금식기도"] || "").toString().trim();
      if (!fastingLabels[key]) return;
      if (!fastingMap[key]) fastingMap[key] = [];
      fastingMap[key].push({ 이름: p["이름"], 조번호: p["조번호"], 팀장팀원: p["팀장팀원"] });
    });

    // UI 생성 (토글 버튼 + 숨김 테이블)
    const fastingBlocks = order.map((key, idx) => {
      const label = fastingLabels[key];
      const names = fastingMap[key] || [];

      // 테이블 행 생성
      const rows =
        names.length > 0
          ? names
              .map(
                (p) =>
                  `<div class="fasting-member" data-team="${p.조번호}">
                    ${p.이름} (${p.조번호}조)
                  </div>`
              )
              .join("")
          : "—";

      return `
        <div class="room-block">
          <button class="room-toggle" data-index="${idx}">🙏 ${label}</button>
          <div class="room-table" id="fasting-${idx}" style="display:none;">
            <table class="fasting-table">
              <thead>
                <tr><th>금식기도자</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>${rows}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }).join("");

    // 전체 렌더링
    el.innerHTML = `
      <h2>🙏 전체 금식 기도자 명단</h2>
      <div class="fasting-list">
        ${fastingBlocks}
      </div>
      <div id="teamInfo" class="results" style="display:none; margin-top:20px;"></div>
    `;

    // 토글 이벤트 바인딩 (숙소 UI와 동일)
    document.querySelectorAll(".room-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        const target = document.getElementById(`fasting-${idx}`);
        target.style.display = target.style.display === "none" ? "block" : "none";
      });
    });
    el.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("전체 금식 기도자 조회 오류:", error);
    el.innerHTML = `<p>❗ 금식기도자 정보를 불러오는 중 오류가 발생했습니다.</p>`;
  }
}

// ✅ 조번호 클릭 시 팀원 출력
function showTeamMembers(teamNumber, allData) {
  const teamInfoEl = document.getElementById("teamInfo");
  const teamMembers = allData.filter((p) => p["조번호"].toString() === teamNumber);

  if (teamMembers.length === 0) {
    teamInfoEl.innerHTML = `<p>⚠️ ${teamNumber}조 데이터를 찾을 수 없습니다.</p>`;
    teamInfoEl.style.display = "block";
    return;
  }

  // 조장과 조원 분리
  const leader = teamMembers.find((p) => p["팀장팀원"] === "조장");
  const members = teamMembers
    .filter((p) => p["팀장팀원"] !== "조장")
    .map((p) => p["이름"])
    .sort((a, b) => a.localeCompare(b, "ko"));

  teamInfoEl.innerHTML = `
    <h3>👥 ${teamNumber}조 명단</h3>
    <table class="result-table">
      <thead><tr><th>조장</th><th>조원</th></tr></thead>
      <tbody>
        <tr>
          <td>${leader ? leader["이름"] : "<span style='color:red;'>없음</span>"}</td>
          <td>${members.join(", ")}</td>
        </tr>
      </tbody>
    </table>
  `;
  teamInfoEl.style.display = "block";
  teamInfoEl.scrollIntoView({ behavior: "smooth" });
}
