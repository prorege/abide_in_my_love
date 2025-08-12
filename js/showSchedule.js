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

  // ✅ 날짜를 day별로 분리
  const dates = {
    day1: "8/14(목)",
    day2: "8/15(금)",
    day3: "8/16(토)"
  };

  const scheduleData = {
    day1: [
      { time: "14:00–14:30", title: "접수" },
      { time: "14:30–17:00", title: "특강 1", note: "김지연 약사", type: "special" },
      { time: "17:00–18:30", title: "저녁식사" },
      { time: "18:30–21:00", title: "특강 2", note: "안환균 목사", type: "special" },
      { time: "21:00–21:10", title: "OT" },
      { time: "21:10–21:30", title: "쉬는 시간" },
      { time: "21:30–23:00", title: "찬양의 밤" },
      { time: "23:00~",       title: "취침" }
    ],
    day2: [
      { time: "05:00–06:00", title: "새벽 기도" },
      { time: "06:00–07:00", title: "아침 미션" },
      { time: "07:00–09:00", title: "세면 및 아침 식사" },
      { time: "09:00–11:00", title: "활동 1" },
      { time: "11:00–12:30", title: "개인 정비 시간" },
      { time: "12:30–13:30", title: "점심 식사", note: "조별 모임" },
      { time: "13:30–14:30", title: "활동 2" },
      { time: "14:30–17:00", title: "강의 1", type: "lecture" },
      { time: "17:00–19:30", title: "저녁 식사", note: "조별 모임" },
      { time: "19:30–22:00", title: "금요 기도회" },
      { time: "22:00–23:30", title: "찬양의 밤" },
      { time: "23:30~",       title: "취침" }
    ],
    day3: [
      { time: "05:00–06:00", title: "새벽 기도" },
      { time: "06:00–07:00", title: "아침 미션" },
      { time: "07:00–09:00", title: "세면 및 아침 식사" },
      { time: "09:00–11:00", title: "레크레이션" },
      { time: "11:00–13:30", title: "강의 2", type: "lecture" },
      { time: "13:30–14:00", title: "청소" },
      { time: "14:00–",       title: "점심 식사", note: "조별 모임" }
    ]
  };

  const container = document.getElementById("scheduleCardContainer");

  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      const data = scheduleData[day];

      container.innerHTML = `
        <div class="schedule-card">
          <!-- 날짜를 표 위에 표시 -->
          <h3 class="schedule-date">📌 ${dates[day]}</h3>
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
