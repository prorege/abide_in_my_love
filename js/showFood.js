import { hideAll } from './utils.js';

export function showFood() {
  hideAll();
  const el = document.getElementById("foodInfo");

  const foodData = {
    day1: {
      date: "8월 14일 (목)",
      breakfast: {
        menu: [""],
        wash: "1조"
      },
      lunch: {
        menu: [""],
        wash: "2조"
      },
      dinner: {
        menu: ["닭갈비", "콩나물 국", "양파, 오이무침", "김치", "단무지", "요구르트(헤헤 맛있겠다)"],
        wash: "3조"
      }
    },
    day2: {
      date: "8월 15일 (금)",
      breakfast: {
        menu: ["자율"],
        wash: "4조"
      },
      lunch: {
        menu: ["햄김치볶음밥", "계란후라이(헤헤헤)", "유부어묵탕", "단무지", "사과"],
        wash: "5조"
      },
      dinner: {
        menu: ["콩불고기", "된장국", "귤"],
        wash: "6조"
      }
    },
    day3: {
      date: "8월 16일 (토)",
      breakfast: {
        menu: ["자율"],
        wash: "7조"
      },
      lunch: {
        menu: ["돈까스", "냉모밀(와사비)", "단무지", "양배추샐러드", "판젤리"],
        wash: "8조"
      },
      dinner: {
        menu: ["내년에 만나요~"],
        wash: "전체"
      }
    }
  };

  el.innerHTML = `
    <h2 class="schedule-title">🍽 식단표 🍽</h2>
    <div class="schedule-buttons">
      <button class="day-btn" data-day="day1"><h2>1일차<br>(목)</h2></button>
      <button class="day-btn" data-day="day2"><h2>2일차<br>(금)</h2></button>
      <button class="day-btn" data-day="day3"><h2>3일차<br>(토)</h2></button>
    </div>
    <div id="foodCardContainer"></div>
  `;

  const container = document.getElementById("foodCardContainer");

  document.querySelectorAll(".day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const day = btn.dataset.day;
      const meals = foodData[day];

      container.innerHTML = `
        <div class="schedule-card">
          <h4>${meals.date}</h4>
          <table class="food-table">
            <thead>
              <tr><th>식사</th><th>메뉴</th><th>설거지</th></tr>
            </thead>
            <tbody>
              <tr class="breakfast">
                <td><strong>아침</strong></td>
                <td>${meals.breakfast.menu.join('<br>')}</td>
                <td>${meals.breakfast.wash}</td>
              </tr>
              <tr class="lunch">
                <td><strong>점심</strong></td>
                <td>${meals.lunch.menu.join('<br>')}</td>
                <td>${meals.lunch.wash}</td>
              </tr>
              <tr class="dinner">
                <td><strong>저녁</strong></td>
                <td>${meals.dinner.menu.join('<br>')}</td>
                <td>${meals.dinner.wash}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      container.scrollIntoView({ behavior: "smooth" });
    });
  });

  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
