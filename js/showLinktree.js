import { hideAll } from './utils.js';

export function showLinktree() {
  hideAll();
  const el = document.getElementById("allLinktreeInfo");

  el.innerHTML = `
    <div class="resolution-card">
      <h2>
        <span style="
          font-weight: bold;
          font-size: 28px;
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-right: 8px;
          display: inline-block;
        ">
          IG
        </span>
        안디옥 인스타그램 모음
      </h2>
      <p class="resolution-text">
        안디옥교회의 인스타그램들을 <br> 
        <strong>링크</strong>로 모았습니다.<br />
        부스에서 활용될 수 있으니 <span class="highlight"><br>
        팔로우</span>와 <span class="highlight">구독</span>을
        <br></strong>해보세요!
      </p>
      <a href="https://linktr.ee/proregeuniv?utm_source=linktree_admin_share" target="_blank" class="resolution-btn">
        안디옥 인스타그램 보기
      </a>
    </div>
  `;
  
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
