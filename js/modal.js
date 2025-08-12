import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded 실행됨");

  const modal = document.getElementById("editModal");
  const openBtn = document.getElementById("editRequestBtn");
  const closeBtn = document.getElementById("closeModal");
  const submitBtn = document.getElementById("submitEditBtn"); // 제출 버튼
  const msgEl = document.getElementById("editMsg");
  const textarea = document.getElementById("editContent");
  const nameInput = document.getElementById("editName"); // ✅ 이름 입력 필드 추가

  // 요소 검증 로그
  console.log("🔍 요소 확인:", { modal, openBtn, closeBtn, submitBtn, textarea, nameInput });

  // 모달 열기 버튼 이벤트
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      console.log("✏ 수정 요청 버튼 클릭됨");
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      modal.classList.add("show");
    });
  } else {
    console.warn("⚠ 수정 요청 버튼(editRequestBtn)을 찾을 수 없습니다.");
  }

  // 모달 닫기 버튼 이벤트
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      console.log("❌ 모달 닫기 버튼 클릭됨");
      closeModal();
    });
  }

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      console.log("🖱 모달 외부 클릭 감지됨");
      closeModal();
    }
  });

  // 제출 버튼 이벤트
  if (submitBtn) {
    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("✅ 제출 버튼 클릭됨");

      const name = nameInput.value.trim();
      const content = textarea.value.trim();

      if (!name) {
        console.warn("⚠ 이름이 비어있습니다.");
        alert("이름을 입력해주세요.");
        return;
      }

      if (!content) {
        console.warn("⚠ 내용이 비어있습니다.");
        alert("수정 내용을 입력해주세요.");
        return;
      }

      try {
        console.log("🔥 Firestore 저장 시도:", { name, content });
        const docRef = await addDoc(collection(db, "edit_requests"), {
          name,              // ✅ 이름 추가 저장
          content,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
        });
        console.log("✅ Firestore 저장 성공, 문서 ID:", docRef.id);

        msgEl.innerText = "✅ 수정 요청이 제출되었습니다. 감사합니다!";
        msgEl.style.color = "green";
        nameInput.value = "";
        textarea.value = "";

        setTimeout(() => {
          closeModal();
        }, 1500);
      } catch (error) {
        console.error("❌ Firestore 저장 오류:", error);
        msgEl.innerText = "❌ 저장 중 오류가 발생했습니다.";
        msgEl.style.color = "red";
      }
    });
  } else {
    console.warn("⚠ 제출 버튼(submitEditBtn)을 찾을 수 없습니다.");
  }

  // 모달 닫기 함수
  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      textarea.value = "";
      nameInput.value = "";
      msgEl.innerText = "";
      console.log("🔒 모달이 닫혔습니다.");
    }, 300);
  }
});
