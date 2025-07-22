import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

const nameInput = document.getElementById("nameInput");

export async function findRoom() {
  hideAll();
  const name = nameInput.value.trim();
  const el = document.getElementById("roomInfo");
  el.style.display = "block";

  if (!name) return alert("이름을 입력해주세요.");

  try {
    // 1. 이름 일부 포함 검색 (예: "홍길동" 포함된 모든 사람)
    const q = query(
      collection(db, "participants"),
      where("name", ">=", name),
      where("name", "<=", name + '\uf8ff')
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      el.innerHTML = `<p>😢 '${name}' 을(를) 포함하는 참가자를 찾을 수 없습니다.</p>`;
      return;
    }

    // 2. 검색된 이름 목록이 여러 개면 선택 유도
    if (snap.size > 1) {
      el.innerHTML = `
        <h3>🔎 '${name}' 검색 결과 (${snap.size}명)</h3>
        <p>정확한 이름을 선택하세요:</p>
        <ul>
          ${snap.docs.map(doc => {
            const p = doc.data();
            return `<li><button onclick="window.__showRoom('${p.name}')">${p.name}</button></li>`;
          }).join("")}
        </ul>
      `;
    } else {
      // 검색 결과가 1명뿐일 경우 바로 출력
      const userData = snap.docs[0].data();
      await renderRoomInfo(userData.name, el);
    }

  } catch (err) {
    console.error("숙소 검색 오류:", err);
    el.innerHTML = `<p>❗ 오류가 발생했습니다.</p>`;
  }
}

// 🔁 선택된 이름으로 실제 숙소 정보 렌더링
async function renderRoomInfo(selectedName, el) {
  const q = query(collection(db, "participants"), where("name", "==", selectedName));
  const snap = await getDocs(q);

  if (snap.empty) {
    el.innerHTML = `<p>❗ 선택된 이름 '${selectedName}'의 참가자가 존재하지 않습니다.</p>`;
    return;
  }

  const userData = snap.docs[0].data();
  const room = userData.room;

  const roommatesSnap = await getDocs(query(collection(db, "participants"), where("room", "==", room)));
  const roommates = roommatesSnap.docs.map(doc => doc.data().name).sort();

  el.innerHTML = `
    <h3>🏠 숙소 정보</h3>
    <p><strong>${userData.name}</strong> 님의 숙소는 <strong>${room}</strong>입니다.</p>
    <h4>🏘 같은 숙소 참가자 (${roommates.length}명)</h4>
    <ul>
      ${roommates.map(n => `<li>${n}</li>`).join("")}
    </ul>
  `;
  el.scrollIntoView({ behavior: "smooth" });
}

// 글로벌로 함수 바인딩 (동적 버튼에서 사용)
window.__showRoom = (selectedName) => {
  const el = document.getElementById("roomInfo");
  renderRoomInfo(selectedName, el);
};
