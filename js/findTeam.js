// js/findTeam.js
import { hideAll } from './utils.js';
import { loadCSV } from './utils/loadCSV.js';

// HTML 특수문자 이스케이프 (텍스트 노출용)
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[m]));
}

const nameInput = document.getElementById("nameInput");

export async function findTeam() {
  hideAll();
  const nameRaw = nameInput.value.trim();
  const el = document.getElementById("teamInfo");
  el.style.display = "block";

  if (!nameRaw) {
    el.innerHTML = `<p>⚠️ 이름을 입력해주세요 ⬆</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  try {
    const data = await loadCSV();
    const q = nameRaw.toLowerCase();

    // 1) 이름 포함 검색 (대소문자 무시, 동명이인 가능)
    const matches = data.filter(p =>
      String(p["이름"] || "").toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      el.innerHTML = `<p>😢 '${escapeHTML(nameRaw)}' 을(를) 포함한 참가자가 없습니다.</p>`;
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 2) 여러 명이면 선택 버튼 표시 (inline onclick 제거)
    if (matches.length > 1) {
      el.innerHTML = `
        <h3>🔎 '${escapeHTML(nameRaw)}' 검색 결과 (${matches.length}명)</h3>
        <p>정확한 이름을 선택하세요</p>
        <ul>
          ${matches.map(p =>
            `<li><button class="select-team-btn" data-name="${escapeHTML(p["이름"])}">${escapeHTML(p["이름"])}</button></li>`
          ).join("")}
        </ul>
      `;

      el.querySelectorAll(".select-team-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          renderTeamInfo(btn.dataset.name, el);
        });
      });

      el.scrollIntoView({ behavior: "smooth" });
    } else {
      await renderTeamInfo(matches[0]["이름"], el);
    }
  } catch (error) {
    console.error("조 찾기 오류:", error);
    el.innerHTML = `<p>❗ 오류가 발생했습니다. 콘솔을 확인해주세요.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// 🔎 선택된 이름으로 조 정보 렌더링
async function renderTeamInfo(selectedName, el) {
  const data = await loadCSV();
  const s = String(selectedName || "");

  // 대소문자 무시 정확 일치
  const userData = data.find(p =>
    String(p["이름"] || "").toLowerCase() === s.toLowerCase()
  );

  if (!userData) {
    el.innerHTML = `<p>❗ '${escapeHTML(selectedName)}' 참가자가 존재하지 않습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // 🔥 '기획팀'은 표시 안 함 (조번호가 정확히 "기획팀")
  if (String(userData["조번호"]) === "기획팀") {
    el.innerHTML = `<p>⚠️ '${escapeHTML(userData["이름"])}' 님의 조 정보는 표시되지 않습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // 부모 정보 표시 (단, "-" 제외)
  const fatherName = String(userData["아버지"] || "").trim();
  const motherName = String(userData["어머니"] || "").trim();
  const hasFather = fatherName && fatherName !== "-";
  const hasMother = motherName && motherName !== "-";

  if (hasFather || hasMother) {
    let parentInfo = ``;

    if (hasFather) {
      const father = data.find(p => String(p["이름"] || "") === fatherName);
      parentInfo += father
        ? `<p>👨 ${escapeHTML(father["이름"])}의 조: ${escapeHTML(father["조번호"])} | 숙소: ${escapeHTML(father["숙소위치"])}</p>`
        : `<p>👨 ${escapeHTML(fatherName)} (등록 안됨)</p>`;
    }

    if (hasMother) {
      const mother = data.find(p => String(p["이름"] || "") === motherName);
      parentInfo += mother
        ? `<p>👩 ${escapeHTML(mother["이름"])}의 조: ${escapeHTML(mother["조번호"])} | 숙소: ${escapeHTML(mother["숙소위치"])}</p>`
        : `<p>👩 ${escapeHTML(motherName)} (등록 안됨)</p>`;
    }

    el.innerHTML = `
      <h2 class="card-title">👨‍👩‍👧 부모님 정보</h2>
      ${parentInfo}
    `;
  } else {
    // 부모 정보 없을 경우 본인 조 출력
    const teamNumber = String(userData["조번호"]);
    const teamMembers = data.filter(p => String(p["조번호"]) === teamNumber);

    // 조장, 부조장, 조원 분리
    const leader = teamMembers.find(p => p["팀장팀원"] === "조장");
    const subLeader = teamMembers.find(p => p["팀장팀원"] === "부조장");
    const members = teamMembers
      .filter(p => p["팀장팀원"] === "조원")
      .sort((a, b) => String(a["이름"]).localeCompare(String(b["이름"]), "ko"));

    el.innerHTML = `
      <h2 class="card-title">✅ 조 정보</h2>
      <p><strong class="emp">${escapeHTML(userData["이름"])}</strong> 님은 <strong class="emp">${escapeHTML(teamNumber)}조</strong><br>입니다.</p>

      <h4>👑 조장</h4>
      <ul>
        ${leader ? `<li>${escapeHTML(leader["이름"])}</li>` : `<li>등록된 조장이 없습니다.</li>`}
      </ul>
      <hr>
      <h4>🤝 부조장</h4>
      <ul>
        ${subLeader ? `<li>${escapeHTML(subLeader["이름"])}</li>` : `<li>등록된 부조장이 없습니다.</li>`}
      </ul>
      <hr>

      <h4>👥 조원 (${members.length}명)</h4>
      <ul>
        ${members.map(p => `<li>${escapeHTML(p["이름"])}</li>`).join("")}
      </ul>
    `;
  }

  el.scrollIntoView({ behavior: "smooth" });
}
