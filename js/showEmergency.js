import { hideAll } from './utils.js';

export function showEmergency() {
  hideAll();
  const el = document.getElementById("emergencyInfo");
  el.innerHTML = `
    <h2>📞 응급 연락망</h2>
    <ul>
      <li>기획팀장 - 이정길 장로 - <a href="tel:01085713096" class="call-link">전화걸기</a></li>
      <br>
      <li>기획총무 - 노동훈 집사 - <a href="tel:01098334516" class="call-link">전화걸기</a></li>
    </ul>
    <hr>
    <h2>🚐 운전자</h2>
    <ul>
      <li>이건우 집사 - <a href="tel:01090934230" class="call-link">전화걸기</a></li>
      <br>
      <li>이찬희 형제 - <a href="tel:01099793096" class="call-link">전화걸기</a></li>
    </ul>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}




