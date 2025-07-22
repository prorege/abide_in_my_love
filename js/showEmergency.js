import { hideAll } from './utils.js';

export function showEmergency() {
  hideAll();
  const el = document.getElementById("emergencyInfo");
  el.innerHTML = `
    <h3>📞 응급 연락망</h3>
    <ul>
      <li>총괄: 박00 목사 010-xxxx-xxxx</li>
      <li>의료: 김00 권사 010-xxxx-xxxx</li>
      <li>안전: 이00 집사 010-xxxx-xxxx</li>
    </ul>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
