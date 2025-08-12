const textElement = document.getElementById('typing-text');
// const text = `2025 안디옥교회\n대학청년 연합 수련회\n[나의 사랑 안에 거하라]`;
const text = `작업중`;
let index = 0;
let isDeleting = false;
let delay = 200;

function typeEffect() {
  const visibleText = isDeleting
    ? text.substring(0, index--)
    : text.substring(0, index++);

  textElement.textContent = visibleText;

  if (!isDeleting && index > text.length) {
    // 타이핑 완료 후 2초 멈춤
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, 3000);
    return;
  }

  if (isDeleting && index === 0) {
    // 삭제 완료 후 재시작
    isDeleting = false;
  }

  setTimeout(typeEffect, isDeleting ? 50 : delay);
}

export function typingText() {
  typeEffect();
}