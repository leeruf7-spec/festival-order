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
export const HOLDER = '';

// 송금 앱 바로가기
// 토스아이디가 있으면 적기 (예: 'mir2026') → toss.me/아이디/금액 으로 금액까지 자동 입력. 비우면 토스 앱 송금화면으로 연결
export const TOSS_ID = '';
// 카카오페이 송금 링크 (카카오페이 앱 → 송금 → '송금코드' 또는 '링크 복사'로 받은 https://qr.kakaopay.com/... 주소)
export const KAKAOPAY_LINK = '';                // 예금주 (선택)

// 5) 휴대폰 푸시 알림: ntfy 앱에서 이 주제를 구독한 폰 전부에 알림 (끄려면 '')
export const NTFY_TOPIC = 'festival-order-3e841809';

// 6) 주문 후 몇 분 뒤에 손님 폰에 '음식 나왔어요' 알람 (관리자가 '완료' 누르면 그 즉시 울림)
export const READY_MINUTES = 5;

// 8) 손님 폰 푸시 알림 (테이블링처럼 앱 밖에서도 알림) — 공개키. 비밀키는 Vercel 환경변수 VAPID_PRIVATE_KEY에
export const VAPID_PUBLIC_KEY = 'BK54-vc9bxllW5G3ie5ADI1_oyY3nphMwK-0vIrPOwdXF0aQeJcIXR7aG8iO0DGoHN6Fa-4H06PxXOnCPZ6J4Vs';

// 7) 타임세일 (한국시간, 매일) — 바꾸면 firestore.rules의 inSale()과 세일 가격도 같이 바꿀 것!
export const SALE = { start: '22:00', end: '22:30', prices: { udon: 3000, set: 6000 } };

// 4) 메뉴 (wait = 조리 대기 시간, 분) — 가격 바꾸면 firestore.rules의 가격도 같이 바꿀 것!
export const MENU = [
  { key: 'udon',  name: '우동',     en: 'Udon', price: 4000, emoji: '🍜', wait: 2 },
  { key: 'mandu', name: '뿌링만두', en: 'Bburinkle Dumplings', price: 3500, emoji: '🥟', wait: 5 },
  { key: 'set',   name: '세트 (우동+뿌링만두)', en: 'Set (Udon + Dumplings)', price: 7000, emoji: '🎁', note: '500원 할인', noteEn: '₩500 off', wait: 5 },
];
