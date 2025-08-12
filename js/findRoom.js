// js/findRoom.js
import { hideAll } from './utils.js';
import { loadCSV } from './utils/loadCSV.js';

// HTML 특수문자 이스케이프 함수
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[m]));
}

export async function findRoom() {
  hideAll();
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();
  const el = document.getElementById("roomInfo");
  el.style.display = "block";

  if (!name) {
    el.innerHTML = `<p>⚠️ 이름을 입력해주세요 ⬆</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  try {
    const data = await loadCSV();

    // 이름 포함 검색
    const matches = data.filter((p) => p["이름"].includes(name));

    if (matches.length === 0) {
      el.innerHTML = `<p>😢 '${escapeHTML(name)}' 을(를) 포함하는 참가자를 찾을 수 없습니다.</p>`;
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (matches.length > 1) {
      // 동명이인 선택 UI
      el.innerHTML = `
        <h3 class="card-title">🔎 '${escapeHTML(name)}' 검색 결과 (${matches.length}명)</h3>
        <p>정확한 이름을 선택하세요</p>
        <ul>
          ${matches
            .map(
              (p) =>
                `<li><button class="select-room-btn" data-name="${escapeHTML(p["이름"])}">${escapeHTML(
                  p["이름"]
                )}</button></li>`
            )
            .join("")}
        </ul>
      `;

      el.querySelectorAll(".select-room-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          renderRoomInfo(btn.dataset.name, el);
        });
      });

      el.scrollIntoView({ behavior: "smooth" });
    } else {
      await renderRoomInfo(matches[0]["이름"], el);
    }
  } catch (err) {
    console.error("숙소 검색 오류:", err);
    el.innerHTML = `<p>❗ 오류가 발생했습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
  }
}
async function renderRoomInfo(selectedName, el) {
  const data = await loadCSV();
  const userData = data.find((p) => p["이름"] === selectedName);

  if (!userData) {
    el.innerHTML = `<p>❗ 선택된 이름 '${escapeHTML(selectedName)}'의 참가자가 존재하지 않습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const room = userData["숙소위치"];

  // 부모 숙소 정보 확인 (단, "-"는 제외)
  let parentInfo = "";
  const fatherName = userData["아버지"]?.trim();
  const motherName = userData["어머니"]?.trim();

  const hasFather = fatherName && fatherName !== "-";
  const hasMother = motherName && motherName !== "-";

  if (hasFather || hasMother) {
    parentInfo += `<h4></h4>`;

    if (hasFather) {
      const father = data.find((p) => p["이름"] === fatherName);
      parentInfo += father
        ? `<p>👨 ${father["이름"]}의 숙소: ${father["숙소위치"]}</p>`
        : `<p>👨 ${escapeHTML(fatherName)} (등록 안됨)</p>`;
    }

    if (hasMother) {
      const mother = data.find((p) => p["이름"] === motherName);
      parentInfo += mother
        ? `<p>👩 ${mother["이름"]}의 숙소: ${mother["숙소위치"]}</p>`
        : `<p>👩 ${escapeHTML(motherName)} (등록 안됨)</p>`;
    }

    el.innerHTML = `
      <h2 class="card-title">👨‍👩‍👧 부모님 숙소 정보</h2>
      ${parentInfo}
    `;
  } else {
    // 부모님 정보가 없을 경우: 자신의 숙소 정보 출력
    if (!room) {
      el.innerHTML = `<p>⚠️ '${escapeHTML(userData["이름"])}' 님의 숙소 정보가 등록되어 있지 않습니다.</p>`;
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 같은 숙소 참가자 목록
    const roommates = data
      .filter((p) => p["숙소위치"] === room)
      .map((p) => p["이름"])
      .sort((a, b) => a.localeCompare(b, "ko"));

    el.innerHTML = `
      <h2 class="card-title">🏠 숙소 정보</h2>
      <p><strong class="emp">${escapeHTML(userData["이름"])}</strong> 님의 숙소는 <br>
      <strong class="emp">${escapeHTML(room)}</strong>입니다.</p>

      <h4>🏘 같은 숙소 참가자 (${roommates.length}명)</h4>
      <ul>
        ${roommates.map((n) => `<li>${escapeHTML(n)}</li>`).join("")}
      </ul>
    `;
  }

  el.scrollIntoView({ behavior: "smooth" });
}
