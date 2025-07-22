import { db } from '../firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

export async function showAllTeams() {
  hideAll();
  const snap = await getDocs(collection(db, "participants"));
  const teamMap = new Map();

  snap.forEach(doc => {
    const { team, name, member } = doc.data(); // member = "팀장" 또는 "팀원"
    if (!teamMap.has(team)) teamMap.set(team, []);
    teamMap.get(team).push({ name, member });
  });

  const el = document.getElementById("allTeams");
  el.style.display = "block";

  const sorted = [...teamMap.entries()].sort((a, b) => Number(a[0]) - Number(b[0]));
  const rows = sorted.map(([team, people]) => {
    const leader = people.find(p => p.member === "팀장");
    const members = people
      .filter(p => p.member !== "팀장")
      .map(p => p.name)
      .join(", ");

    return `
      <tr>
        <td><strong>${team}조</strong></td>
        <td>${leader ? leader.name : "없음"}</td>
        <td>${members}</td>
      </tr>
    `;
  }).join("");

  el.innerHTML = `
    <h3>👥 전체 조 명단</h3>
    <table class="result-table">
      <thead>
        <tr>
          <th>조 번호</th>
          <th>조장</th>
          <th>조원</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  el.scrollIntoView({ behavior: "smooth" });
}
