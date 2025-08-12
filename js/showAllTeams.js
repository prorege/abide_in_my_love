// js/showAllTeams.js
import { hideAll } from './utils.js';
import { loadCSV } from './utils/loadCSV.js';

export async function showAllTeams() {
  hideAll();

  const data = await loadCSV();
  console.log("🔥 CSV 데이터:", data);

  if (!data || data.length === 0) {
    console.error("❌ CSV 데이터가 비어있습니다.");
    document.getElementById("allTeams").innerHTML = "<p>⚠️ 참가자 데이터가 없습니다.</p>";
    return;
  }

  const teamMap = new Map();

  // CSV 컬럼명에 맞춰 데이터 분류
  data.forEach((row) => {
    const team = (row["조번호"] || "").toString().trim();
    const name = (row["이름"] || "").trim();
    const member = (row["팀장팀원"] || "").trim();

    // ✅ 숫자가 아닌 조번호는 제외
    if (!team || isNaN(Number(team)) || !name || !member || team.includes("-")) return;

    if (!teamMap.has(team)) teamMap.set(team, []);
    teamMap.get(team).push({ 이름: name, 역할: member });
  });

  const el = document.getElementById("allTeams");
  el.style.display = "block";

  // 조 번호 기준 정렬
  const sorted = [...teamMap.entries()].sort(([a], [b]) => Number(a) - Number(b));

  const rows = sorted
    .map(([team, people]) => {
      const leader = people.find((p) => p.역할 === "조장");
      const members = people
        .filter((p) => p.역할 !== "조장")
        .map((p) => p.이름)
        .sort((a, b) => a.localeCompare(b, "ko"))
        .join(" ");

      return `
        <tr>
          <td><strong>${team}</strong></td>
          <td>${leader ? leader.이름 : "<span style='color:red;'>없음</span>"}</td>
          <td>${members}</td>
        </tr>
      `;
    })
    .join("");

  el.innerHTML = `
    <h2>👥 전체 조 명단</h2>
    <table class="result-table">
      <thead>
        <tr>
          <th>조</th>
          <th>조장</th>
          <th>조원</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  el.scrollIntoView({ behavior: "smooth" });
}
