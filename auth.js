// auth.js
import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// DOM 요소 참조
const loginSection = document.getElementById("loginSection");
const modeSelect = document.getElementById("modeSelect");
const formSection = document.getElementById("formSection");
const searchSection = document.getElementById("searchSection");
const loginError = document.getElementById("loginError");

// 로그인 함수
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginError.textContent = "";
  } catch (error) {
    console.error(error);
    loginError.textContent = "로그인 실패: " + error.message;
  }
};

// 로그아웃 함수
window.logout = async function () {
  try {
    await signOut(auth);
    alert("로그아웃 되었습니다.");
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};

// 인증 상태 변경 감지
onAuthStateChanged(auth, user => {
  if (user) {
    loginSection.style.display = "none";
    modeSelect.style.display = "block";
  } else {
    loginSection.style.display = "block";
    modeSelect.style.display = "none";
    formSection.style.display = "none";
    searchSection.style.display = "none";
  }
});
