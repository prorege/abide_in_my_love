// js/showAllRooms.js
import { hideAll } from './utils.js';
import { loadCSV } from './utils/loadCSV.js';

export async function showAllRooms() {
  hideAll();

  const data = await loadCSV();
  const roomMap = new Map();

  // 숙소별 참가자 분류 (숙소가 '-'인 경우 제외)
  data.forEach(({ 숙소위치, 이름 }) => {
    const room = (숙소위치 || "").trim();
    const name = (이름 || "").trim();

    // ✅ 숙소가 "-"거나 빈 값이면 스킵
    if (!room || room === "-" || !name) return;

    if (!roomMap.has(room)) roomMap.set(room, []);
    roomMap.get(room).push(name);
  });

  const el = document.getElementById("allRooms");
  el.style.display = "block";

  // 숙소명 기준 정렬
  const sorted = [...roomMap.entries()].sort((a, b) =>
    a[0].localeCompare(b[0], "ko")
  );

  // 숙소 리스트 UI 생성
  const roomsHTML = sorted
    .map(([room, names], idx) => `
      <div class="room-block">
        <button class="room-toggle" data-index="${idx}">🏠 ${room}</button>
        <div class="room-table" id="room-${idx}" style="display: none;">
          <table class="result-table">
            <thead><tr><th>숙소 이용 명단</th></tr></thead>
            <tbody>
              <tr>
                <td class="names-cell">
                  ${names
                    .sort((a, b) => a.localeCompare(b, "ko"))
                    .map(name => `<span class="name-tag">${name}</span>`)
                    .join("")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `)
    .join("");

  el.innerHTML = `
    <h2>🏠 전체 숙소 배정표</h2>
    <div class="room-list">
      ${roomsHTML}
    </div>
  `;

  // 토글 이벤트 바인딩
  document.querySelectorAll(".room-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const idx = button.getAttribute("data-index");
      const target = document.getElementById(`room-${idx}`);
      target.style.display = target.style.display === "none" ? "block" : "none";
    });
  });

  el.scrollIntoView({ behavior: "smooth" });
}
