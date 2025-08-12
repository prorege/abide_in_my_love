export async function initModeToggle() {
  if (document.readyState === "loading") {
    await new Promise((resolve) =>
      document.addEventListener("DOMContentLoaded", resolve)
    );
  }

  const html = document.documentElement; // ✅ <html>
  const header = document.querySelector("#header");

  function applyTheme() {
    const hour = new Date().getHours();
    const isNight = (hour >= 20 || hour < 5);

    // ✅ html에 클래스 적용
    html.classList.toggle("night-mode", isNight);
    html.classList.toggle("day-mode", !isNight);

    // ✅ 헤더 배경 이미지 변경
    const imageUrl = isNight ? "img/main_night.png" : "img/main_day.png";
    header.style.background = `
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, var(--color-bg-deep)),
      url('${imageUrl}')
    `;
    header.style.backgroundSize = "cover";
    header.style.backgroundPosition = "center";
  }

  applyTheme();
  setInterval(applyTheme, 60 * 1000); // 1분마다 자동 갱신
}
