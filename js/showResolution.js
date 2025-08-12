import { hideAll } from './utils.js';

export function showResolution() {
  hideAll();
  const el = document.getElementById("resolutionInfo");

  el.innerHTML = `
    <div class="resolution-card">
      <h2>✍️결단문✍️</h2>
      <p class="resolution-text">
        나는 하나님 앞에서 <br> 
        <strong>서로 사랑하라</strong>는 말씀에 순종하며,<br />
        이번 수련회 기간 이후 <span class="highlight"><br>
        하나님 사랑</span>과 <span class="highlight">이웃사랑</span>으로
        <br>하나님께 영광</strong>돌리겠습니다.
      </p>
      <a href="https://forms.gle/h393JJ6cpKTEoHp37" target="_blank" class="resolution-btn">
        🙏 결단문 작성하기
      </a>
    </div>
  `;
  
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
