import { hideAll } from './utils.js';

export function showResolution() {
  hideAll();
  const el = document.getElementById("resolutionInfo");
  el.innerHTML = `
    <h3>✍️ 결단문</h3>
    <p>나는 하나님 앞에서 서로 사랑하라는 말씀에 순종하며, 이번 수련회 기간 동안 <strong>말과 행동, 사랑</strong>으로 주님을 증거하겠습니다.</p>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
