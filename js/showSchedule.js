import { hideAll } from './utils.js';

export function showSchedule() {
  hideAll();
  const el = document.getElementById("scheduleInfo");

  el.innerHTML = `
    <h2 class="schedule-title">📅 일정표 📅</h2>
    <div class="schedule-buttons">
      <button class="day-btn" data-day="day1"><h2>1일차<br>(목)</h2></button>
      <button class="day-btn" data-day="day2"><h2>2일차<br>(금)</h2></button>
      <button class="day-btn" data-day="day3"><h2>3일차<br>(토)</h2></button>
    </div>

    <div id="scheduleCardContainer"></div>
  `;

  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });

  const scheduleData = {
    day1: [
      { time: "09:30–10:30", title: "접수" },
      { time: "10:30–11:00", title: "찬양과 기도" },
      { time: "11:00–12:00", title: "개회예배", type: "lecture" },
      { time: "12:00–13:30", title: "점심식사", note: "금식기도: 1조 / 부스활동 조별미션" },
      { time: "13:30–14:00", title: "찬양과 기도" },
      { time: "14:00–15:30", title: "전도특강 1", note: "이영희 전도사", type: "special" },
      { time: "15:30–16:00", title: "휴식" },
      { time: "16:00–17:30", title: "전도특강 2", note: "최병호 집사", type: "special" },
      { time: "17:30–19:30", title: "저녁식사", note: "금식기도: 2조 / 부스활동 조별미션" },
      { time: "19:30–20:00", title: "찬양과 기도" },
      { time: "20:00–22:00", title: "강의 1", type: "lecture" },
      { time: "22:00~", title: "마무리 및 취침" }
    ],
    day2: [
      { time: "07:30–08:00", title: "조별 QT 1" },
      { time: "08:00–09:30", title: "아침식사", note: "금식기도: 3조" },
      { time: "09:30–10:00", title: "찬양과 기도" },
      { time: "10:00–12:00", title: "강의 2", type: "lecture" },
      { time: "12:00–13:30", title: "점심식사", note: "금식기도: 4조 / 부스활동 조별미션" },
      { time: "13:30–14:00", title: "찬양과 기도" },
      { time: "14:00–15:30", title: "선교특강 1", note: "김궁헌 목사", type: "special" },
      { time: "15:30–16:00", title: "휴식" },
      { time: "16:00–17:30", title: "선교특강 2", note: "방선기 목사", type: "special" },
      { time: "17:30–19:30", title: "저녁식사", note: "금식기도: 5조 / 부스활동 조별미션" },
      { time: "19:30–20:00", title: "찬양과 기도" },
      { time: "20:00–22:00", title: "강의 3", type: "lecture" },
      { time: "22:00~", title: "마무리 및 취침" }
    ],
    day3: [
      { time: "07:30–08:00", title: "조별 QT 2" },
      { time: "08:00–09:30", title: "아침식사", note: "금식기도: 6조" },
      { time: "09:30–10:00", title: "찬양과 기도" },
      { time: "10:00–11:00", title: "폐회예배", type: "lecture" },
      { time: "11:00–11:30", title: "스케치 영상" },
      { time: "11:30–12:00", title: "사진촬영" },
      { time: "12:00–14:30", title: "점심식사 및 정리정돈" }
    ]
  };

  const container = document.getElementById("scheduleCardContainer");

  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      const data = scheduleData[day];

      container.innerHTML = `
        <div class="schedule-card">
          <table>
            <thead><tr><th>시간</th><th>내용</th><th>비고</th></tr></thead>
            <tbody>
              ${data.map(item => `
                <tr class="${item.type || ''}">
                  <td>${item.time}</td>
                  <td>${item.title}</td>
                  <td>${item.note || ''}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
      container.scrollIntoView({ behavior: "smooth" });
    });
  });
}
