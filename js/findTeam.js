// js/findTeam.js
import { hideAll } from './utils.js';
import { loadCSV } from './utils/loadCSV.js';

const nameInput = document.getElementById("nameInput");

export async function findTeam() {
  hideAll();
  const name = nameInput.value.trim();
  const el = document.getElementById("teamInfo");
  el.style.display = "block";

  if (!name) {
    el.innerHTML = `<p>⚠️ 이름을 입력해주세요 ⬆</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  try {
    const data = await loadCSV();

    // 1. 이름 포함 검색 (동명이인 가능)
    const matches = data.filter(p => p["이름"].includes(name));

    if (matches.length === 0) {
      el.innerHTML = `<p>😢 '${name}' 을(를) 포함한 참가자가 없습니다.</p>`;
      el.scrollIntoView({ behavior: "smooth" });    
      return;
    }

    // 2. 여러 명이면 선택 버튼 표시
    if (matches.length > 1) {
      el.innerHTML = `
        <h3>🔎 '${name}' 검색 결과 (${matches.length}명)</h3>
        <p>정확한 이름을 선택하세요</p>
        <ul>
          ${matches
            .map(
              (p) =>
                `<li><button onclick="window.__showTeam('${p["이름"]}')">${p["이름"]}</button></li>`
            )
            .join("")}
        </ul>
      `;
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
  const userData = data.find((p) => p["이름"] === selectedName);

  if (!userData) {
    el.innerHTML = `<p>❗ '${selectedName}' 참가자가 존재하지 않습니다.</p>`;
    return;
  }

    // 🔥 '기획팀조'는 표시 안 함
  if (userData["조번호"] === "기획팀") {
    el.innerHTML = `<p>⚠️ '${userData["이름"]}' 님의 조 정보는 표시되지 않습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
  
    return;
  }

  // 부모 정보 표시 (단, "-" 제외)
  const fatherName = userData["아버지"]?.trim();
  const motherName = userData["어머니"]?.trim();
  const hasFather = fatherName && fatherName !== "-";
  const hasMother = motherName && motherName !== "-";

  if (hasFather || hasMother) {
    let parentInfo = ``;

    if (hasFather) {
      const father = data.find((p) => p["이름"] === fatherName);
      parentInfo += father
        ? `<p>👨 ${father["이름"]}의 조: ${father["조번호"]} | 숙소: ${father["숙소위치"]}</p>`
        : `<p>👨 ${fatherName} (등록 안됨)</p>`;
    }

    if (hasMother) {
      const mother = data.find((p) => p["이름"] === motherName);
      parentInfo += mother
        ? `<p>👩 ${mother["이름"]}의 조: ${mother["조번호"]} | 숙소: ${mother["숙소위치"]}</p>`
        : `<p>👩 ${motherName} (등록 안됨)</p>`;
    }

    el.innerHTML = `
      <h2 class="card-title">👨‍👩‍👧부모님 정보</h2>
      ${parentInfo}
    `;
  } else {
    // 부모 정보 없을 경우 본인 조 출력
    const teamNumber = userData["조번호"];
    const teamMembers = data.filter((p) => p["조번호"] === teamNumber);

    // 조장, 부조장, 조원 분리
    const leader = teamMembers.find((p) => p["팀장팀원"] === "조장");
    const subLeader = teamMembers.find((p) => p["팀장팀원"] === "부조장");
    const members = teamMembers
      .filter((p) => p["팀장팀원"] === "조원")
      .sort((a, b) => a["이름"].localeCompare(b["이름"]));

    el.innerHTML = `
      <h2 class="card-title">✅ 조 정보</h2>
      <p><strong class="emp">${userData["이름"]}</strong> 님은 <strong class="emp">${teamNumber}조</strong><br>입니다.</p>

      <h4>👑 조장</h4>
      <ul>
        ${leader ? `<li>${leader["이름"]}</li>` : `<li>등록된 조장이 없습니다.</li>`}
      </ul>
      <hr>
      <h4>🤝 부조장</h4>
      <ul>
        ${subLeader ? `<li>${subLeader["이름"]}</li>` : `<li>등록된 부조장이 없습니다.</li>`}
      </ul>
      <hr>

      <h4>👥 조원 (${members.length}명)</h4>
      <ul>
        ${members.map((p) => `<li>${p["이름"]}</li>`).join("")}
      </ul>
    `;
  }

  // 현재 시간 및 이미지 표시
  // const now = new Date();
  // const formattedTime = now.toLocaleString("ko-KR", { hour12: false });

  // const today = now.getMonth() + 1;
  // const day = now.getDate();
  // let seatImage = "";

  // if (today === 7 && day <= 31) {
  //   seatImage = "../img/seat01.png";
  // } else if (today >= 8 || (today === 7 && day > 31)) {
  //   seatImage = "../img/seat02.png";
  // }

  // el.innerHTML += `
  //   <hr>
  //   <h3 class="emp">팀별 좌석 배치도</h3>
  //   ${
  //     seatImage
  //       ? `<div style="margin-top:15px; text-align:center;">
  //           <img src="${seatImage}" alt="좌석 배치도" style="max-width:100%; border-radius:8px; cursor: zoom-in;" onclick="openImagePopup('${seatImage}')">
  //         </div>`
  //       : ""
  //   }
  //   <p style="margin-top:10px; font-size:0.9rem; color:grey;">⏰ 조회 시각: ${formattedTime}</p>
        
  // `;

  el.scrollIntoView({ behavior: "smooth" });
}

// 글로벌 접근용
window.__showTeam = (selectedName) => {
  const el = document.getElementById("teamInfo");
  renderTeamInfo(selectedName, el);
};

// 이미지 팝업
window.openImagePopup = function (src) {
  const w = window.open("", "_blank");
  w.document.write(`<img src="${src}" style="width:100%; height:auto;">`);
};
