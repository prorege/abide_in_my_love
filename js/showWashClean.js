// js/showWashClean.js
import { hideAll } from './utils.js';

export function showWashClean() {
  hideAll();
  const el = document.getElementById("allwashclean");
  el.style.display = "block";

  // 1) 청소 점검자(전화부) 인덱스
  // phones 배열에 번호를 넣으면 각 구역 옆에 전화 버튼이 생깁니다.
  const checkerIndex = {
    "1층 화장실": { names: ["김선아", "김민서"], phones: ["010-6677-0929", "010-4474-0899"] }, // 예) ["010-1234-5678","010-2345-6789"]
    "2층 화장실": { names: ["정아영", "이건"],   phones: ["010-7320-5747", "010-4886-4918"] },
    "로비":        { names: ["박예진", ""],   phones: ["010-7442-1279"] },
    "복도":        { names: ["박예진", ""],   phones: ["010-7442-1279"] },
    "계단":        { names: ["박예진", ""],   phones: ["010-7442-1279"] },
    "중예배실":     { names: ["김하빈", ""],   phones: ["010-6331-1626"] },
  };

  // 2) 조별 배정
  const assignments = [
    { team: 1,  type: "설거지", task: "둘째날 저녁" },
    { team: 2,  type: "청소",   task: "로비" },
    { team: 3,  type: "청소",   task: "1층 화장실" },
    { team: 4,  type: "설거지", task: "셋째날 점심" },
    { team: 5,  type: "청소",   task: "중예배실" },
    { team: 6,  type: "청소",   task: "계단" },
    { team: 7,  type: "설거지", task: "첫째날 저녁" },
    { team: 8,  type: "설거지", task: "둘째날 점심" },
    { team: 9,  type: "청소",   task: "2층 화장실" },
    { team: 10, type: "청소",   task: "복도" },
  ];

  // 3) 스타일(1회만 삽입)
  if (!document.getElementById("washCleanStyles")) {
    const style = document.createElement("style");
    style.id = "washCleanStyles";
    style.textContent = `
      .wc-wrap { max-width: 1000px; margin: 0 auto; }
      .wc-card { background: var(--color-bg-card, #fff); border: 1px solid var(--color-border-light, #e5e7eb); border-radius: 14px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,.04); }
      .wc-title { margin: 0 0 12px; display:flex; align-items:center; gap:8px; font-size: 1.15rem; }
      .wc-note { margin: 6px 0 12px; color: var(--color-text-muted, #666); font-size:.95rem; }

      .wc-filter { display:flex; gap:8px; margin: 12px 0 12px; flex-wrap: wrap; }
      .wc-filter button {
        padding: 8px 14px; border-radius: 12px;
        border: 1px solid var(--color-border-light, #e5e7eb);
        background: var(--color-bg-hover, #bd2c2cff);
        cursor:pointer; font-size: 14px;
      }
      .wc-filter button.active { background: #536e64ff; border-color:#bfdbfe; }

      .wc-grid { width:100%; border-collapse: collapse; }
      .wc-grid th, .wc-grid td { padding: 10px 12px; border-bottom: 1px solid var(--color-border-light, #e5e7eb); text-align:left; vertical-align: middle; }
      .wc-grid thead th { position: sticky; top: 0; background: var(--color-bg-secondary, #f9fafb); z-index: 1; }
      .wc-grid tbody tr:nth-child(odd) { background: rgba(0,0,0,0.02); }

      .wc-badge { display:inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; border:1px solid transparent; }
      .wc-badge.wash { background: rgba(59,130,246,.10); border-color: rgba(59,130,246,.35); }   /* 설거지 */
      .wc-badge.clean { background: rgba(34,197,94,.10); border-color: rgba(34,197,94,.35); }   /* 청소 */

      .wc-callbar { display:flex; gap:6px; flex-wrap: wrap; }
      .wc-callbtn {
        display:inline-flex; align-items:center; gap:6px;
        background:#eef6ff; border:1px solid #bfdbfe; color:#1e40af;
        padding:8px 10px; border-radius:10px; text-decoration:none; font-size:13px;
        min-height: 20px; /* 모바일 터치 타겟 */
      }
      .wc-callbtn:hover { filter: brightness(0.98); }
      .wc-empty { padding: 12px; color: var(--color-text-muted, #666); }

      /* ===== 모바일(핸드폰) 최적화: 640px 이하에서 카드형 리스트로 전환 ===== */
      @media (max-width: 640px) {
        .wc-card { padding: 12px; border-radius: 12px; }
        .wc-title { font-size: 1.05rem; }
        .wc-note { font-size: .9rem; }

        /* 테이블을 카드형으로 */
        .wc-grid { border: 0; }
        .wc-grid thead { display: none; }
        .wc-grid tbody { display: grid; grid-template-columns: 1fr; gap: 10px; }
        .wc-grid tr {
          display: grid;
          grid-template-columns: 1fr;
          background: var(--color-bg-card, #fff);
          border: 1px solid var(--color-border-light, #e5e7eb);
          border-radius: 12px;
          overflow: hidden;
        }
        .wc-grid td {
          display: flex; justify-content: space-between; gap: 12px;
          padding: 10px 12px; border: 0; border-bottom: 1px solid var(--color-border-light, #eef1f5);
        }
        .wc-grid td:last-child { border-bottom: 0; }
        .wc-grid td::before {
          content: attr(data-label);
          font-weight: 600;
          color: var(--color-text-muted, #667085);
        }

        /* 전화 버튼 영역은 한 줄에 꽉 차게 */
        .wc-callbar { gap: 8px; }
        .wc-callbtn { flex: 1 1 auto; justify-content: center; }
      }
    `;
    document.head.appendChild(style);
  }

  // 4) 공통 뷰 컨테이너
  el.innerHTML = `
    <div class="wc-wrap">
      <div class="wc-card">
        <h3 class="wc-title">🧽 청소 & 설거지 담당</h3>
        <p class="wc-note">🗣 설거지 4개 조와 청소가 빨리 끝나는 조는 <strong>중예배실</strong> 청소 및 원위치에 동역해주세요!</p>

        <div class="wc-filter">
          <button data-mode="ALL" class="active">전체</button>
          <button data-mode="WASH">🍽 설거지</button>
          <button data-mode="CLEAN">🧹 청소</button>
        </div>

        <div id="wc-table-area" style="overflow:auto; border-radius:12px;"></div>
      </div>
    </div>
  `;

  const tableArea = el.querySelector("#wc-table-area");

  // 5) 유틸: 구역(task)로 점검자/전화 추출
  const getChecker = (task) => {
    const info = checkerIndex[task];
    if (!info) return { namesText: "-", phones: [] };
    const namesText = info.names?.join("       ") || "-";
    return { namesText, phones: info.phones || [] };
  };

  // 6) 배정 테이블 렌더러 (mode: ALL | WASH | CLEAN)
  const renderAssignmentTable = (mode = "ALL") => {
    const filtered = assignments
      .filter(a => {
        if (mode === "WASH")  return a.type === "설거지";
        if (mode === "CLEAN") return a.type === "청소";
        return true; // ALL
      })
      .sort((a, b) => a.team - b.team);

    const rows = filtered.map(a => {
      const isWash = a.type === "설거지";
      const cls   = isWash ? "wash" : "clean";
      const icon  = isWash ? "🍽" : "🧹";

      // 설거지는 시간 담당이라 점검자/전화 없음
      const { namesText, phones } = isWash ? { namesText: "-", phones: [] } : getChecker(a.task);

      const phoneBtns = phones.length
        ? `<div class="wc-callbar">
             ${phones.map((p, i) =>
               `<a class="wc-callbtn" href="tel:${p}" title="${namesText}">
                  📞 ${i === 0 ? "전화(↑)" : "전화(↑)"}
                </a>`).join("  ")}
           </div>`
        : "-";

      return `
        <tr>
          <td data-label="조"><strong>${a.team}조</strong></td>
          <td data-label="구분"><span class="wc-badge ${cls}">${icon} ${a.type}</span></td>
          <td data-label="담당(구역/시간)">${a.task}</td>
          <td data-label="담당자">${namesText}</td>
          <td data-label="연락">${phoneBtns}</td>
        </tr>
      `;
    }).join("");

    tableArea.innerHTML = `
      <table class="wc-grid">
        <thead>
          <tr>
            <th style="width:80px">조</th>
            <th style="width:110px">구분</th>
            <th>담당(구역/시간)</th>
            <th style="min-width:180px">청소 점검자</th>
            <th style="min-width:120px">연락</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  };

  // 7) 초기 렌더: 전체
  renderAssignmentTable("ALL");

  // 8) 필터 이벤트
  el.querySelectorAll(".wc-filter button").forEach(btn => {
    btn.addEventListener("click", () => {
      el.querySelectorAll(".wc-filter button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderAssignmentTable(btn.dataset.mode);
    });
  });
    el.scrollIntoView({ behavior: "smooth" });

}
