// 🔥 ใส่ URL Web App ของคุณที่นี่ 🔥
const API_URL = 'https://script.google.com/macros/s/AKfycbzv9ukcOsxeEcob24leV9AS4wLg4jCcm48gzFx6dpLAPkGt15ke4UffsmNsk9MVT7fB/exec';

export async function callApi(action, payload = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      // ใช้ no-cors ไม่ได้หากต้องการอ่าน response JSON
      // Google Apps Script ต้อง Deploy เป็น "Anyone" เพื่อให้ CORS ผ่าน
      body: JSON.stringify({ action, ...payload })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { success: false, message: "Connection Failed. Please check internet." };
  }
}
