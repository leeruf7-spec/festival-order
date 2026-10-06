// 동아리 마스코트 "뿌링이" — 직접 그린 오리지널 캐릭터 (SVG)
export const MASCOT_NAME = '뿌링이';

export function mascotSVG(id = 'm') {
  return `
<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" class="mascot-svg" aria-label="${MASCOT_NAME}">
  <defs>
    <radialGradient id="${id}-body" cx="45%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#FFE08A"/>
      <stop offset="55%" stop-color="#F6B93B"/>
      <stop offset="100%" stop-color="#D9821E"/>
    </radialGradient>
    <linearGradient id="${id}-band" x1="0" x2="1">
      <stop offset="0" stop-color="#FF4D3A"/><stop offset="1" stop-color="#E8261B"/>
    </linearGradient>
  </defs>
  <ellipse cx="110" cy="186" rx="62" ry="9" fill="rgba(0,0,0,.18)" class="m-shadow"/>
  <g class="m-body">
    <!-- 발 -->
    <ellipse cx="82" cy="176" rx="14" ry="8" fill="#C9741A"/>
    <ellipse cx="138" cy="176" rx="14" ry="8" fill="#C9741A"/>
    <!-- 만두 몸통 (반달) + 주름 -->
    <path d="M30 150 C 30 80, 70 40, 110 40 C 150 40, 190 80, 190 150 C 190 172, 30 172, 30 150 Z"
          fill="url(#${id}-body)" stroke="#B8661A" stroke-width="3"/>
    <path d="M58 70 q8 -12 18 -4 M86 52 q10 -12 20 -2 M114 50 q10 -12 20 -2 M142 60 q10 -10 18 2"
          fill="none" stroke="#B8661A" stroke-width="3" stroke-linecap="round"/>
    <!-- 뿌링 시즈닝 -->
    <g fill="#FFF3B0" opacity=".95">
      <circle cx="70" cy="92" r="2.6"/><circle cx="92" cy="78" r="2.2"/><circle cx="130" cy="74" r="2.4"/>
      <circle cx="154" cy="96" r="2.2"/><circle cx="60" cy="122" r="2"/><circle cx="165" cy="126" r="2.4"/>
      <circle cx="110" cy="66" r="2"/><circle cx="148" cy="80" r="1.8"/>
    </g>
    <g fill="#7BAE3A"><circle cx="80" cy="84" r="1.8"/><circle cx="140" cy="88" r="1.6"/><circle cx="118" cy="76" r="1.5"/></g>
    <!-- 머리띠 -->
    <path d="M44 104 Q110 84 176 104 L174 116 Q110 97 46 116 Z" fill="url(#${id}-band)"/>
    <text x="110" y="111" text-anchor="middle" font-size="11" font-weight="900" fill="#fff"
          font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif">미르</text>
    <path d="M174 108 l16 -8 l-2 12 z M174 110 l14 10 l-12 2 z" fill="#E8261B"/>
    <!-- 눈 -->
    <g class="m-eyes">
      <ellipse cx="86" cy="132" rx="12" ry="14" fill="#2B1D12"/>
      <ellipse cx="134" cy="132" rx="12" ry="14" fill="#2B1D12"/>
      <circle cx="90" cy="126" r="4.5" fill="#fff"/><circle cx="138" cy="126" r="4.5" fill="#fff"/>
      <circle cx="83" cy="137" r="2" fill="#fff" opacity=".7"/><circle cx="131" cy="137" r="2" fill="#fff" opacity=".7"/>
    </g>
    <!-- 볼, 입 -->
    <ellipse cx="66" cy="148" rx="10" ry="6" fill="#FF8A7A" opacity=".7"/>
    <ellipse cx="154" cy="148" rx="10" ry="6" fill="#FF8A7A" opacity=".7"/>
    <path class="m-mouth" d="M100 150 Q110 160 120 150" fill="none" stroke="#2B1D12" stroke-width="3.5" stroke-linecap="round"/>
    <!-- 팔 -->
    <path class="m-arm-l" d="M36 140 q-16 -6 -18 -20" fill="none" stroke="#D9821E" stroke-width="9" stroke-linecap="round"/>
    <path class="m-arm-r" d="M184 140 q16 -6 18 -20" fill="none" stroke="#D9821E" stroke-width="9" stroke-linecap="round"/>
  </g>
</svg>`;
}

export const MASCOT_CSS = `
.mascot-svg{width:100%;height:auto;overflow:visible}
.mascot-svg .m-body{transform-origin:110px 180px;animation:m-bob 2.4s ease-in-out infinite}
.mascot-svg .m-eyes{transform-origin:110px 132px;animation:m-blink 4s infinite}
.mascot-svg .m-arm-l{transform-origin:36px 140px;animation:m-wave 1.6s ease-in-out infinite}
.mascot-svg .m-shadow{transform-origin:110px 186px;animation:m-shadow 2.4s ease-in-out infinite}
.mascot-jump .m-body{animation:m-jump .55s ease-out 3}
.mascot-jump .m-arm-l,.mascot-jump .m-arm-r{animation:m-wave .3s ease-in-out infinite}
@keyframes m-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes m-shadow{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.9)}}
@keyframes m-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes m-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(18deg)}}
@keyframes m-jump{0%{transform:translateY(0) scale(1,1)}25%{transform:translateY(0) scale(1.08,.9)}55%{transform:translateY(-34px) scale(.95,1.06)}100%{transform:translateY(0) scale(1,1)}}
`;
