# 축제 분식 주문 (Firebase 버전)

## 파일
- config.js : Firebase 설정, 계좌, 메뉴 (여기만 수정)
- firestore.rules : Firebase 콘솔 규칙 탭에 붙여넣을 내용
- index.html / admin.html / qr.html / db.js

## 설정 순서
1. console.firebase.google.com → 프로젝트 추가
2. 웹 앱(</>) 추가 → firebaseConfig 값을 config.js에 붙여넣기
3. Firestore Database 만들기(서울, 프로덕션 모드) → 규칙 탭에 firestore.rules 붙여넣고 게시
4. Authentication → 이메일/비밀번호 사용 → 사용자 추가 (admin@festival-order.com / 원하는 비밀번호)
5. Authentication → 설정 → 승인된 도메인에 Vercel 주소 추가
6. GitHub에 파일 올리기 → Vercel 자동 배포

## 휴대폰 알림
- 알림 받을 폰마다 ntfy 앱 설치 → + 눌러 config.js의 NTFY_TOPIC 값 구독
- 관리자 페이지를 켜두면 새 주문 시 소리+진동

## 전광판
- /board.html : 노트북/TV용 실시간 주문 전광판 (새 주문·음식 완료 시 소리+음성, 마스코트 뿌링이)
