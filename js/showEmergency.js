import { hideAll } from './utils.js';

export function showEmergency() {
  hideAll();
  const el = document.getElementById("emergencyInfo");
  el.innerHTML = `
    <h2>📞 응급 연락망</h2>
    <ul>
      <li>구미 청년 회장 - 이찬희 형제 - <a href="tel:01099793096" class="call-link">전화걸기</a></li>
      <br>
      <li>구미 대학 회장 - 신승민 형제 - <a href="tel:01080342717" class="call-link">전화걸기</a></li>
      <br>
      <li>구미 청년 총무 - 윤여상 형제 - <a href="tel:01040944057" class="call-link">전화걸기</a></li>
      <br>
      <li>구미 대학 총무 - 김민서 형제 - <a href="tel:01044740899" class="call-link">전화걸기</a></li>
    </ul>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}




