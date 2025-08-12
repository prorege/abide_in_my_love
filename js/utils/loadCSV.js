// js/utils/loadCSV.js

let participantsCache = []; // CSV 데이터 캐시

/**
 * CSV 파일을 불러오고 파싱하여 객체 배열로 반환
 * @returns {Promise<Array<Object>>} 참가자 데이터 배열
 */
export async function loadCSV() {
  // 이미 캐싱된 경우 재사용
  if (participantsCache.length > 0) {
    return participantsCache;
  }

  try {
    // CSV 파일 fetch (public 루트 경로에 participants.csv 배치)
    const response = await fetch('data.csv');
    if (!response.ok) {
      throw new Error(`CSV 파일을 불러올 수 없습니다. (${response.status})`);
    }

    const csvText = await response.text();

    // 줄 단위로 분리
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',').map(h => h.trim());

    // CSV 내용을 객체 배열로 변환
    const data = rows.slice(1).map(row => {
      const values = row.split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });

    // 캐시 저장
    participantsCache = data;
    return data;
  } catch (error) {
    console.error('❌ CSV 로드 오류:', error);
    return [];
  }
}

/**
 * 캐시 초기화 (CSV 재로딩이 필요할 경우 호출)
 */
export function clearCSVCache() {
  participantsCache = [];
}
