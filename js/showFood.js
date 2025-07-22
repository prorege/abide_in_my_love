import { hideAll } from './utils.js';

export function showFood() {
  hideAll();
  const el = document.getElementById("foodInfo");
  el.innerHTML = `
    <h3>🍲 식단표</h3>
    <ul>
      <li>7/31 저녁: 불고기, 나물, 김치</li>
      <li>8/1 아침: 미역국, 계란말이</li>
      <li>8/1 점심: 제육볶음, 쌈채소</li>
      <li>8/1 저녁: 치킨, 떡볶이</li>
      <li>8/2 아침: 된장국, 멸치볶음</li>
    </ul>
  `;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
