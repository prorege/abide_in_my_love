import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const formSection = document.getElementById("formSection");
const searchSection = document.getElementById("searchSection");
const modeSelect = document.getElementById("modeSelect");
const nameInput = document.getElementById("name");
// const roleInput = document.getElementById("role");
const memberInput = document.getElementById("member");

const churchInput = document.getElementById("church");
const teamInput = document.getElementById("team");
const roomInput = document.getElementById("room");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

let editingDocId = null;

// 화면 전환
document.querySelectorAll(".toggleToForm").forEach(btn =>
  btn.addEventListener("click", () => {
    modeSelect.style.display = "none";
    formSection.style.display = "block";
    searchSection.style.display = "none";
    clearForm();
  })
);

document.querySelectorAll(".toggleToSearch").forEach(btn =>
  btn.addEventListener("click", () => {
    modeSelect.style.display = "none";
    formSection.style.display = "none";
    searchSection.style.display = "block";
    searchResult.innerHTML = "";
  })
);

// 저장 또는 수정
window.submitParticipant = async function () {
  const participant = {
    name: nameInput.value.trim(),
    // role: roleInput.value,
    church: churchInput.value,
    team: teamInput.value,
    room: roomInput.value,
    member: memberInput.value
  };

  if (!participant.name || !participant.church || !participant.team || !participant.room || !participant.member) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  try {
    if (editingDocId) {
      const ref = doc(db, "participants", editingDocId);
      await updateDoc(ref, participant);
      alert("수정 완료되었습니다.");
    } else {
      await addDoc(collection(db, "participants"), participant);
      alert("저장 완료되었습니다.");
    }
    clearForm();
    editingDocId = null;
  } catch (error) {
    console.error("저장 오류:", error);
    alert("오류가 발생했습니다.");
  }
};

// 검색
window.searchParticipant = async function () {
  const keyword = searchInput.value.trim();
  if (!keyword) return;

  const q = query(collection(db, "participants"), where("name", "==", keyword));

  try {
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      searchResult.innerHTML = "<p>검색 결과가 없습니다.</p>";
      return;
    }

    searchResult.innerHTML = "";
    snapshot.forEach(docSnap => {
      const p = docSnap.data();
      const id = docSnap.id;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <strong>이름:</strong> ${p.name}<br/>
        <strong>역할:</strong> ${p.member}<br/>
        <strong>지교회:</strong> ${p.church}<br/>
        <strong>조:</strong> ${p.team}<br/>
        <strong>숙소:</strong> ${p.room}<br/>
        <button onclick="editParticipant('${id}')">수정</button>
        <button onclick="deleteParticipant('${id}')">삭제</button>
      `;
      searchResult.appendChild(card);
    });
  } catch (error) {
    console.error("검색 오류:", error);
    alert("검색 중 오류가 발생했습니다.");
  }
};

// 수정
window.editParticipant = async function (docId) {
  const ref = doc(db, "participants", docId);
  const snap = await getDocs(query(collection(db, "participants"), where("__name__", "==", docId)));
  snap.forEach(docSnap => {
    const p = docSnap.data();
    nameInput.value = p.name;
    // roleInput.value = p.role;
    churchInput.value = p.church;
    teamInput.value = p.team;
    roomInput.value = p.room;
    memberInput.value = p.member || "";
  });

  editingDocId = docId;
  formSection.style.display = "block";
  searchSection.style.display = "none";
  modeSelect.style.display = "none";
};

// 삭제
window.deleteParticipant = async function (docId) {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  try {
    await deleteDoc(doc(db, "participants", docId));
    alert("삭제 완료되었습니다.");
    searchParticipant();
  } catch (error) {
    console.error("삭제 오류:", error);
    alert("삭제 중 오류가 발생했습니다.");
  }
};

// 입력 초기화
function clearForm() {
  nameInput.value = "";
  // roleInput.value = "";
  churchInput.value = "";
  teamInput.value = "";
  roomInput.value = "";
  memberInput.value = "";

}
