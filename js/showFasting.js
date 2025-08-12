// js/showFasting.js
import { hideAll } from './utils.js';
import { loadCSV } from './utils/loadCSV.js';

export async function showFasting() {
  hideAll();
  const el = document.getElementById("fastingInfo");
  el.style.display = "block";

  const nameInput = document.getElementById("nameInput").value.trim();
  if (!nameInput) {
    el.innerHTML = "<p>⚠️ 이름을 입력해주세요 ⬆</p>";
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  try {
    const data = await loadCSV();
    const user = data.find((p) => p["이름"] === nameInput);

    if (!user) {
      el.innerHTML = `<p>😢 '${nameInput}' 님을 찾을 수 없습니다.</p>`;
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const fasting = user["금식기도"];
    const labels = {
      "1": "1일차 점심",
      "2": "1일차 저녁",
      "3": "2일차 아침",
      "4": "2일차 점심",
      "5": "2일차 저녁",
      "6": "3일차 아침",
    };

    if (!fasting || fasting === "없음") {
      el.innerHTML = `<p><strong>${user["이름"]}</strong> 님은 금식기도에 참여하지 않습니다.</p>`;
    } else {
      const label = labels[fasting] || "미지정";
      el.innerHTML = `<p><strong>${user["이름"]}</strong> 님은 금식기도<br>
      <strong class="emp">${label}</strong><br> 입니다. 🙏</p>`;
    }

    el.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("금식기도 정보 조회 오류:", error);
    el.innerHTML = `<p>❗ 금식기도 정보를 불러오는 중 오류가 발생했습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
  }
}
