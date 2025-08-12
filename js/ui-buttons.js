// 맨 위로 이동 버튼
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 수정 요청 버튼 (모달 열기)
const editRequestBtn = document.getElementById("editRequestBtn");
editRequestBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 동작 방지
  const modal = document.getElementById("editModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // 배경 스크롤 방지
  modal.classList.add("show");
});
