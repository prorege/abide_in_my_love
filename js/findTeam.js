import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

const nameInput = document.getElementById("nameInput");

export async function findTeam() {
  hideAll();
  const name = nameInput.value.trim();
  const el = document.getElementById("teamInfo");
  el.style.display = "block";

  if (!name) return alert("이름을 입력해주세요.");

  try {
    // 1. 이름 포함된 사람 검색 (동명이인 포함)
    const q = query(
      collection(db, "participants"),
      where("name", ">=", name),
      where("name", "<=", name + '\uf8ff')
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      el.innerHTML = `<p>😢 '${name}' 을(를) 포함한 참가자가 없습니다.</p>`;
      return;
    }

    // 2. 여러 명일 경우 선택 유도
    if (snap.size > 1) {
      el.innerHTML = `
        <h3>🔎 '${name}' 검색 결과 (${snap.size}명)</h3>
        <p>정확한 이름을 선택하세요:</p>
        <ul>
          ${snap.docs.map(doc => {
            const p = doc.data();
            return `<li><button onclick="window.__showTeam('${p.name}')">${p.name}</button></li>`;
          }).join("")}
        </ul>
      `;
    } else {
      const exact = snap.docs[0].data();
      await renderTeamInfo(exact.name, el);
    }

  } catch (error) {
    console.error("조 찾기 오류:", error);
    el.innerHTML = `<p>❗ 오류가 발생했습니다. 콘솔을 확인해주세요.</p>`;
  }
}

// 조 정보 렌더링
async function renderTeamInfo(selectedName, el) {
  const snap = await getDocs(query(collection(db, "participants"), where("name", "==", selectedName)));
  if (snap.empty) {
    el.innerHTML = `<p>❗ '${selectedName}' 참가자가 존재하지 않습니다.</p>`;
    return;
  }

  const userData = snap.docs[0].data();
  const teamNumber = userData.team;

  const snap2 = await getDocs(query(collection(db, "participants"), where("team", "==", teamNumber)));

  const teammates = snap2.docs
    .map(doc => doc.data())
    .sort((a, b) => a.member === "팀장" ? -1 : 1); // 팀장 먼저

  el.innerHTML = `
    <h3>✅ 조 정보</h3>
    <p><strong>${userData.name}</strong> 님은 <strong>${teamNumber}조</strong>입니다.</p>
    <h4>👥 ${teamNumber}조 구성원 (${teammates.length}명)</h4>
    <ul>
      ${teammates.map(p => `
        <li>${p.name} <span style="color:gray;">(${p.member})</span></li>
      `).join("")}
    </ul>
  `;

  el.scrollIntoView({ behavior: "smooth" });
}

// 글로벌에서 선택된 이름으로 조 정보 출력
window.__showTeam = (selectedName) => {
  const el = document.getElementById("teamInfo");
  renderTeamInfo(selectedName, el);
};
