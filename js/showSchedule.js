import { hideAll } from './utils.js';

export function showSchedule() {
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
}
