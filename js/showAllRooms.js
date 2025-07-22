import { db } from '../firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

export async function showAllRooms() {
  hideAll();
  const snap = await getDocs(collection(db, "participants"));
  const roomMap = new Map();

  snap.forEach(doc => {
    const { room, name } = doc.data();
    if (!roomMap.has(room)) roomMap.set(room, []);
    roomMap.get(room).push(name);
  });

  const el = document.getElementById("allRooms");
  el.style.display = "block";

  const sorted = [...roomMap.entries()].sort();
  const rows = sorted.map(([room, names]) => `
    <tr>
      <td><strong>${room}</strong></td>
      <td>${names.join(", ")}</td>
    </tr>
  `).join("");

  el.innerHTML = `
    <h3>🏠 전체 숙소 배정표</h3>
    <table class="result-table">
      <thead><tr><th>숙소 위치</th><th>참가자 명단</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  el.scrollIntoView({ behavior: "smooth" });
}
