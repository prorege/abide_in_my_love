// js/mode-change.js

// CSS background-image는 일반 이미지와 달리 DOMContentLoaded/문서 이미지 목록에 잡히지 않음.
// 깜빡임/지연 방지를 위해 반드시 "명시적 프리로드 + (가능 시) 디코드" 후 적용.
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      try {
        // 일부 브라우저는 decode 미지원이므로 옵셔널 호출
        if (img.decode) await img.decode();
      } catch {
        // decode 실패는 치명적 아님(로드는 성공) → 무시
      }
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

// 밤/낮 판정 로직(필요에 따라 OS 다크모드/사용자 설정과 조합해 확장 가능)
function isNightNow() {
  const hour = new Date().getHours();
  return hour >= 20 || hour < 5;
}

export async function initModeToggle() {
  // DOMContentLoaded 이전이면 대기
  if (document.readyState === 'loading') {
    await new Promise((resolve) =>
      document.addEventListener('DOMContentLoaded', resolve, { once: true })
    );
  }

  const html = document.documentElement;     // <html>
  const header = document.querySelector('#header'); // 배경 적용 대상

  if (!header) {
    // 헤더가 없다면 더 진행할 필요 없음
    console.warn('[mode-change] #header 요소를 찾을 수 없습니다.');
    return;
  }

  const DAY_URL = 'img/main_day.png';
  const NIGHT_URL = 'img/main_night.png';

  // 테마 적용(이미지 프리로드 후 CSS에 반영)
  const applyTheme = async () => {
    const night = isNightNow();
    const imageUrl = night ? NIGHT_URL : DAY_URL;

    // 1) 먼저 필요한 이미지를 프리로드(+디코드) → 화면 적용 시 깜빡임 최소화
    await preloadImage(imageUrl);

    // 2) html 클래스 토글
    html.classList.toggle('night-mode', night);
    html.classList.toggle('day-mode', !night);

    // 3) 배경 적용
    header.style.background = `
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, var(--color-bg-deep)),
      url('${imageUrl}')
    `;
    header.style.backgroundSize = 'cover';
    header.style.backgroundPosition = 'center';

    // 4) 다음 전환 대비로 반대 모드 이미지도 백그라운드 프리로드(선택)
    //    (네트워크 상황에 따라 체감이 좋아짐)
    const nextUrl = night ? DAY_URL : NIGHT_URL;
    preloadImage(nextUrl).catch(() => {}); // 백그라운드이므로 실패 무시
  };

  // 최초 1회 즉시 적용
  await applyTheme();

  // 1분마다 재평가(필요 시 인터벌 시간 조정)
  const INTERVAL_MS = 60 * 1000;
  setInterval(() => {
    // 시간 경계(예: 19:59→20:00)에서만 다시 적용해도 됨. 간단히 항상 호출.
    applyTheme().catch((e) => console.warn('[mode-change] 재적용 실패:', e));
  }, INTERVAL_MS);
}
