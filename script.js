const style = document.createElement('style');
style.innerHTML = `
    @font-face {
        font-family: 'MaruBuri-Bold';
        src: url('TTF/MaruBuri-Bold.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'MaruBuri-Bold', sans-serif;
        margin: 0;
        padding: 0;
        background: white;
        color: var(--dark-blue);
        animation: fadeIn 1s ease-out;
    }
`;

document.head.appendChild(style);


// JSON 파일 로드
const teamDataUrl = "team_info.json";
const roomDataUrl = "room_info.json";

// 데이터를 저장할 변수
let teamData = [];
let roomData = [];

// 페이지 로드 시 JSON 데이터 로드
fetch(teamDataUrl)
    .then(response => response.json())
    .then(data => teamData = data.teams)
    .catch(error => console.error("Unable to load JSON file:", error));

fetch(roomDataUrl)
    .then(response => response.json())
    .then(data => roomData = data.rooms)
    .catch(error => console.error("Unable to load room data:", error));

// 초기화 및 숨기기 함수
function resetAndHide() {
    const divs = [
        document.getElementById("teamInfo"),
        document.getElementById("emergencyInfo"),
        document.getElementById("allTeams"),
        document.getElementById("scheduleInfo"),
        document.getElementById("roomInfo"),
        document.getElementById("allRooms"),
        document.getElementById("resolutionInfo"),
        document.getElementById("foodInfo"),

    ];

    divs.forEach(div => {
        div.innerHTML = "";
        div.style.display = "none";
    });
}


// 나의 조 찾기
function findTeam() {
    let name = document.getElementById("nameInput").value.trim();
    const resultDiv = document.getElementById("teamInfo");

    // 초기화 및 숨기기
    resetAndHide();
// 1번
    if (!name) {
        resultDiv.innerHTML = "<p>이름을 먼저 입력하세요 :)</p>";
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
        return;
    }

    // 동명이인 예외 처리
    if (name === "이시원") {
        // 지역 선택을 위한 팝업을 띄움
        let region = prompt("동명이인이 존재합니다. 지역을 선택해주세요. (구미 또는 서울)");

        if (region === "구미" || region === "서울") {
            // 해당 지역을 바탕으로 팀 정보 찾기
            const team = teamData.find(team => team.members.includes(name + `(${region})`) || team.leader === name + `(${region})` || team.subLeader === name + `(${region})`);

            if (team) {
                resultDiv.innerHTML = `
                    <h2>정결한 그릇, <br>${name}!</h2>
                    <h3>당신은 ${team.teamNumber}조입니다!</h3>
                    <hr>
                    <br>
                    <p><strong>조장</strong></p>
                    <p> | ${team.leader}</p>
                    <br>
                    <p><strong>부조장</strong></p>
                    <p> - ${team.subLeader}</p>
                    <br>
                    <p><strong>조원</strong></p>
                    <p>- ${team.members.join(", ")}</p>
                    <br>
                    <hr>
                    <br>
                    <p><strong>조별 장소1 :</strong> ${team.locations[0]}</p>
                    <p><strong>조별 장소2 :</strong> ${team.locations[1]}</p>
                    <p><strong>조별 장소3 :</strong> ${team.locations[2]}</p>
                    <br>
                `;
                resultDiv.style.display = "block";
                resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
            } else {
                resultDiv.innerHTML = `<p>"${name} (${region})"은/는 어떤 팀에도 속하지 않습니다.<br>
                "만약 등록을 했음에도 검색이 되지 않는다면 
                <a href="tel:010-7153-3922">010-7153-3922</a>으로 연락해주세요."</p>`;
                resultDiv.style.display = "block";
                resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
            }
        } else {
            alert("올바른 지역을 선택해주세요.");
        }
        return;
    }

    const team = teamData.find(team => team.members.includes(name) || team.leader === name || team.subLeader === name);

    if (team) {
        resultDiv.innerHTML = `
            <h2>정결한 청년, <br>${name}!</h2>
            <h3>당신은 ${team.teamNumber}조입니다!</h3>
            <hr>
            <br>
            <p><strong>조장</strong> | ${team.leader}</p>
            <br>
            <p><strong>부조장</strong> | ${team.subLeader}</p>
            <br>
            <p><strong>조원</strong> | ${team.members.join(", ")}</p>
            <br>
        `;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
    } else {
        resultDiv.innerHTML = `<p>"${name}"은/는 어떤 팀에도 속하지 않습니다.<br>
        "만약 등록을 했음에도 검색이 되지 않는다면 
        <a href="tel:010-7153-3922">010-7153-3922</a>으로 연락해주세요."</p>`;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
    }
}

// 이름으로 숙소 찾기
function findRoom() {
    let name = document.getElementById("nameInput").value.trim();
    const resultDiv = document.getElementById("roomInfo");

    // 초기화 및 숨기기
    resetAndHide();

    if (!name) {
        resultDiv.innerHTML = "<p>이름을 먼저 입력하세요 :)</p>";
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
        return;
    }

    const room = roomData.find(room => 
        room.members.includes(name) || room.leader === name || room.subLeader === name
    );
    
    if (room) {
        resultDiv.innerHTML = `
            <h3>${name}님의 숙소 정보</h3>
            <hr>
            <h3><strong>숙소 : ${room.location}</strong></h3>
            <h4><strong>방장 : ${room.leader} </strong></h4>
            <p>방원 : ${room.members.join(", ")}</p>
        `;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
    } else {
        resultDiv.innerHTML = `<p>"${name}"은/는 숙소에 배정되지 않았습니다.<br>
        "만약 등록을 했음에도 검색이 되지 않는다면 
        <strong><a href="tel:010-7153-3922">010-7153-3922</a></strong>으로 연락해주세요."</p>`;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
    }
}


function showAllTeams() {
    const resultDiv = document.getElementById("allTeams");

    // 초기화 및 숨기기
    resetAndHide();
    resultDiv.innerHTML = '<h2> 조편성 </h2><p>옆으로 밀어서 확인하세요 :)</p>';

    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>조</th>
                    <th>조장</th>
                    <th>부조장</th>
                    <th>조원</th>

                </tr>
            </thead>
            <tbody>
    `;
    // <th>조별모임장소1</th>
    // <th>조별모임장소2</th>
    // <th>조별모임장소3</th>
    teamData.forEach(team => {
        tableHtml += `
            <tr>
                <td>${team.teamNumber}</td>
                <td>${team.leader}</td>
                <td>${team.subLeader}</td>
                <td>${team.members.join(" ")}</td>

                
            </tr>
        `;
    });

    // <td>${team.locations[0]}</td>
    // <td>${team.locations[1]}</td>
    // <td>${team.locations[2]}</td>

    tableHtml += "</tbody></table>";
    resultDiv.innerHTML += tableHtml;
    resultDiv.style.display = "block";
    resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
}
function showAllRooms() {
    const resultDiv = document.getElementById("allRooms");

    // 초기화 및 숨기기
    resetAndHide();
    resultDiv.innerHTML = '<h2> 숙소 </h2><p>옆으로 밀어서 확인하세요 :)</p>';
    
    // 테이블의 기본 HTML 구조
    let tableHtml = `
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Location</th>
                    <th>방장</th>
                    <th>방원</th> <!-- 방원 열 추가 -->
                </tr>
            </thead>
            <tbody>
    `;

    // 각 Location에 대해 세로로 출력
    roomData.forEach(room => {
        tableHtml += "<tr>";

        // Location을 세로로 추가
        tableHtml += `<td>${room.location}</td>`;

        // 방장 추가
        tableHtml += `<td>${room.leader}</td>`;

        // // 부방장 추가
        // tableHtml += `<td>${room.subLeader || ""}</td>`; // 부방장이 없으면 빈 문자열 처리

    // 방원 추가 (방원의 수는 방마다 다를 수 있으므로)
    let membersHtml = room.members.join(" "); // 각 방원의 이름을 공백으로 구분하여 가로로 나열
    tableHtml += `<td>${membersHtml}</td>`; // 방원들을 가로로 출력

    tableHtml += "</tr>";

    });

    tableHtml += "</tbody></table>";
    resultDiv.innerHTML += tableHtml;
    resultDiv.style.display = "block";
    resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
}


// 비상 연락망 표시
function showEmergency() {
    const emergencyDiv = document.getElementById("emergencyInfo");

    // 초기화 및 숨기기
    resetAndHide();

    emergencyDiv.innerHTML = `
        <h2>비상 연락망</h2>

        <p><strong>| 보건 스태프 | </strong><br><a href="tel:010-6798-7754">010-8696-5407</a></p>
        <p><strong>| 안전(보안) 스태프 | </strong><br> <a href="tel:010-9979-3096">010-9979-3096 이찬희 회장</a>
        <br>
        <a href="tel:010-7153-3922">010-7153-3922 양세혁 총무
        </p>
    `;
    emergencyDiv.style.display = "block";
    emergencyDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동

}

// Schedule 정보 표시
function showSchedule() {
    const scheduleDiv = document.getElementById("scheduleInfo");

    // 초기화 및 숨기기
    resetAndHide();

    scheduleDiv.innerHTML = `
        <h2>Schedule</h2>
        <img src="img/schedule.png" alt="Schedule" style="max-width: 100%; height: auto;">
    `;
    scheduleDiv.style.display = "block";
    scheduleDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
}

function showResolution() {
    const resolutionDiv = document.getElementById("resolutionInfo");
    resetAndHide();

    resolutionDiv.innerHTML = `
        <h2><a href="https://forms.gle/Po5nWcFgWxESzVeYA">결단문 바로가기</a></h2>
    `;
    resolutionDiv.style.display = "block";
    resolutionDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
}
function showFood() {
    const resultDiv = document.getElementById("foodInfo");

    // 초기화 및 숨기기
    resetAndHide();
    
    // 초기화 후에 h2, p 태그 추가
    resultDiv.innerHTML = ` 
        <h2>Menu</h2>
        <p>...</p>
    `;

    // 식단표 데이터 로드
    fetch("menuData.json") // JSON 파일에서 데이터 로드
        .then(response => response.json())
        .then(menuData => {
            let tableHtml = `
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>시간</th>
                            <th>메뉴1</th>
                            <th>메뉴2</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            menuData.forEach(menu => {
                // 메뉴가 2개로 구분되어 있으면 메뉴1과 메뉴2를 각각 다른 셀에 출력
                if (menu.menu.length > 1 && menu.menu.some(item => item.startsWith("메뉴"))) {
                    const menu1 = menu.menu.find(item => item.startsWith("메뉴1:")) || "";
                    const menu2 = menu.menu.find(item => item.startsWith("메뉴2:")) || "";

                    tableHtml += `
                        <tr>
                            <td>${menu.date}</td>
                            <td>${menu.time}</td>
                            <td>${menu1.replace("메뉴1:", "").trim()}</td>
                            <td>${menu2.replace("메뉴2:", "").trim()}</td>
                        </tr>
                    `;
                } else {
                    // 메뉴가 1개일 경우 하나의 셀에 모두 출력
                    const menuItems = menu.menu.join(", ");
                    tableHtml += `
                        <tr>
                            <td>${menu.date}</td>
                            <td>${menu.time}</td>
                            <td colspan="2">${menuItems}</td>
                        </tr>
                    `;
                }
            });

            tableHtml += "</tbody></table>";
            resultDiv.innerHTML += tableHtml; // 기존 내용 뒤에 메뉴 테이블을 추가
            
            resultDiv.style.display = "block";
            resultDiv.scrollIntoView({ behavior: "smooth" }); // 스크롤 이동
        })
        .catch(error => {
            console.error("식단표 데이터를 불러오는 중 오류 발생:", error);
            resultDiv.innerHTML = "<p>식단표를 불러올 수 없습니다. 나중에 다시 시도해주세요.</p>";
            resultDiv.style.display = "block";
        });
}

function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄";  // 눈 모양
    document.body.appendChild(snowflake);

    const startLeft = Math.random() * window.innerWidth;
    const duration = Math.random() * 1 + 5; // 2~5초 랜덤 속도
    const size = Math.random() * 0 + 5; // 5~15px 크기

    snowflake.style.left = `${startLeft}px`;
    snowflake.style.fontSize = `${size}px`;
    snowflake.style.animationDuration = `${duration}s`;

    // 일정 시간 후 제거
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

// 눈이 계속 내리게 설정
setInterval(createSnowflake, 200);
