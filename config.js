// ================== 설정 파일 (여기만 고치면 됨) ==================

// 1) Firebase 콘솔 → 프로젝트 설정 → 내 앱 → SDK 설정 및 구성 → "구성"에 나오는 값을 그대로 붙여넣기
export const firebaseConfig = {
  apiKey: "AIzaSyBK7voDbjHvTiqSFSD6tY7JsiiAsX8DkUg",
  authDomain: "jnufest-eb692.firebaseapp.com",
  projectId: "jnufest-eb692",
  storageBucket: "jnufest-eb692.firebasestorage.app",
  messagingSenderId: "477159788367",
  appId: "1:477159788367:web:5581d16f2b54b9d762ff3a",
};

// 2) 관리자 계정 이메일 (Firebase Authentication에 이 이메일로 사용자 추가, firestore.rules에도 같은 값)
export const ADMIN_EMAIL = 'admin@festival-order.com';

// 3) 송금 정보
export const BANK = 'KB국민은행';        // 화면 표시용
export const TOSS_BANK = '국민은행';     // 토스 송금 링크용
export const ACCOUNT = '93350200849891'; // 하이픈 없이
export const HOLDER = '';                // 예금주 (선택)

// 5) 휴대폰 푸시 알림: ntfy 앱에서 이 주제를 구독한 폰 전부에 알림 (끄려면 '')
export const NTFY_TOPIC = 'festival-order-3e841809';

// 6) 주문 후 몇 분 뒤에 손님 폰에 '음식 나왔어요' 알람 (관리자가 '완료' 누르면 그 즉시 울림)
export const READY_MINUTES = 5;

// 4) 메뉴 — 가격 바꾸면 firestore.rules의 가격도 같이 바꿀 것!
export const MENU = [
  { key: 'udon',  name: '우동',     price: 4000, emoji: '🍜' },
  { key: 'mandu', name: '뿌링만두', price: 3500, emoji: '🥟' },
  { key: 'set',   name: '세트 (우동+뿌링만두)', price: 7000, emoji: '🎁', note: '500원 할인' },
];
