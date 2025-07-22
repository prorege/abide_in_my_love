import { db } from './firebase-config.js';
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const nameInput = document.getElementById("nameInput");
const resultSections = [
  "teamInfo", "roomInfo", "allTeams", "allRooms",
  "emergencyInfo", "scheduleInfo", "foodInfo", "resolutionInfo"
];

// 모든 결과 숨기기
function hideAll() {
  resultSections.forEach(id => {
    const el = document.getElementById(id);
    el.style.display = "none";
    el.innerHTML = "";
  });
}

// 참가자 조
window.findTeam = async function () {
  hideAll();
  const name = nameInput.value.trim();
  if (!name) return alert("이름을 입력해주세요.");

  const q = query(collection(db, "participants"), where("name", "==", name));
  const snap = await getDocs(q);
  const el = document.getElementById("teamInfo");

  el.style.display = "block";

  if (snap.empty) {
    el.innerHTML = `<p>😢 '${name}' 님을 찾을 수 없습니다.</p>`;
  } else {
    const data = snap.docs[0].data();
    el.innerHTML = `
      <h3>✅ 조 정보</h3>
      <p><strong>${data.name}</strong> 님은 <strong>${data.team}조</strong>입니다.</p>
    `;
  }
  el.scrollIntoView({ behavior: "smooth" });
};

// 참가자 숙소
window.findRoom = async function () {
  hideAll();
  const name = nameInput.value.trim();
  if (!name) return alert("이름을 입력해주세요.");

  const q = query(collection(db, "participants"), where("name", "==", name));
  const snap = await getDocs(q);
  const el = document.getElementById("roomInfo");

  el.style.display = "block";

  if (snap.empty) {
    el.innerHTML = `<p>😢 '${name}' 님을 찾을 수 없습니다.</p>`;
  } else {
    const data = snap.docs[0].data();
    el.innerHTML = `
      <h3>🏠 숙소 정보</h3>
      <p><strong>${data.name}</strong> 님의 숙소는 <strong>${data.room}</strong>입니다.</p>
    `;
  }
  el.scrollIntoView({ behavior: "smooth" });
};

// 전체 조
window.showAllTeams = async function () {
  hideAll();
  const snap = await getDocs(collection(db, "participants"));
  const teamMap = new Map();

  snap.forEach(doc => {
    const { team, name } = doc.data();
    if (!teamMap.has(team)) teamMap.set(team, []);
    teamMap.get(team).push(name);
  });

  const el = document.getElementById("allTeams");
  el.style.display = "block";

  const sorted = [...teamMap.entries()].sort((a, b) => a[0] - b[0]);
  el.innerHTML = `<h3>👥 전체 조 명단</h3>` + 
    sorted.map(([team, names]) => `<div><strong>${team}조</strong>: ${names.join(", ")}</div>`).join("");

  el.scrollIntoView({ behavior: "smooth" });
};

// 전체 숙소
window.showAllRooms = async function () {
  hideAll();
  const snap = await getDocs(collection(db, "participants"));
  const roomMap = new Map();

  snap.forEach(doc => {
    const { room, name } = doc.data();
    if (!roomMap.has(room)) roomMap.set(room, []);
    roomMap.get(room).push(name);
  });

  const el = document.getElementById("allRooms");
  el.style.display = "block";

  const sorted = [...roomMap.entries()].sort();
  el.innerHTML = `<h3>🏠 전체 숙소 배정표</h3>` + 
    sorted.map(([room, names]) => `<div><strong>${room}</strong>: ${names.join(", ")}</div>`).join("");

  el.scrollIntoView({ behavior: "smooth" });
};

// 일정
window.showSchedule = function () {
  hideAll();
  const el = document.getElementById("scheduleInfo");
  el.innerHTML = `
    <h3>📅 일정표</h3>
    <ul>
      <li>7/31(수) 오후: 개회예배 & 저녁집회</li>
      <li>8/1(목) 오전: 특강 / 오후: 활동 / 저녁: 찬양축제</li>
      <li>8/2(금) 오전: 폐회예배 및 귀가</li>
    </ul>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
};

// 식단
window.showFood = function () {
  hideAll();
  const el = document.getElementById("foodInfo");
  el.innerHTML = `
    <h3>🍲 식단표</h3>
    <ul>
      <li>7/31 저녁: 불고기, 나물, 김치</li>
      <li>8/1 아침: 미역국, 계란말이</li>
      <li>8/1 점심: 제육볶음, 쌈채소</li>
      <li>8/1 저녁: 치킨, 떡볶이</li>
      <li>8/2 아침: 된장국, 멸치볶음</li>
    </ul>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
};

// 응급 연락망
window.showEmergency = function () {
  hideAll();
  const el = document.getElementById("emergencyInfo");
  el.innerHTML = `
    <h3>📞 응급 연락망</h3>
    <ul>
      <li>총괄: 박00 목사 010-xxxx-xxxx</li>
      <li>의료: 김00 권사 010-xxxx-xxxx</li>
      <li>안전: 이00 집사 010-xxxx-xxxx</li>
    </ul>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
};

// 결단문
window.showResolution = function () {
  hideAll();
  const el = document.getElementById("resolutionInfo");
  el.innerHTML = `
    <h3>✍️ 결단문</h3>
    <p>나는 하나님 앞에서 서로 사랑하라는 말씀에 순종하며, 이번 수련회 기간 동안 <strong>말과 행동, 사랑</strong>으로 주님을 증거하겠습니다.</p>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
};
