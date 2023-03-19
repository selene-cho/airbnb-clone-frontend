const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export async function getRooms() {
  const response = await fetch(`${BASE_URL}/rooms/`); // 백엔드 해당 url에서 fetch
  const json = await response.json(); // response 로부터 json 추출
  return json;
}
