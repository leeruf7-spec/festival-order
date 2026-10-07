// 관리자가 '음식 나왔어요'를 누르면 손님 폰으로 푸시 알림을 보내는 함수 (Vercel Serverless)
import webpush from 'web-push';
import { firebaseConfig, ADMIN_EMAIL, VAPID_PUBLIC_KEY } from '../config.js';

const FS = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!priv) return res.status(500).json({ error: 'VAPID_PRIVATE_KEY 환경변수가 없어요' });
  try {
    const { idToken, orderId } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    if (!idToken || !orderId || !/^[A-Za-z0-9]{10,40}$/.test(orderId)) return res.status(400).json({ error: 'bad request' });

    // 1) 관리자 확인 (Firebase 로그인 토큰 검사)
    const lu = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }) }).then(r => r.json());
    if (lu?.users?.[0]?.email !== ADMIN_EMAIL) return res.status(401).json({ error: 'not admin' });

    // 2) 주문번호 + 손님 구독정보 읽기 (관리자 권한으로)
    const auth = { headers: { Authorization: `Bearer ${idToken}` } };
    const [order, push] = await Promise.all([
      fetch(`${FS}/orders/${orderId}`, auth).then(r => r.json()),
      fetch(`${FS}/push/${orderId}`, auth).then(r => r.json()),
    ]);
    const sub = push?.fields?.sub?.stringValue;
    if (!sub) return res.status(200).json({ ok: false, reason: 'no-subscription' });
    const no = order?.fields?.no?.integerValue ?? '';

    // 3) 푸시 발송
    webpush.setVapidDetails('https://festival-order-two.vercel.app', VAPID_PUBLIC_KEY, priv);
    await webpush.sendNotification(JSON.parse(sub), JSON.stringify({
      title: `🍜 ${no}번 주문 나왔습니다! / Order #${no} is ready!`,
      body: '부스로 와주세요 · Please come to the booth',
      tag: 'ready-' + orderId, url: '/',
    }), { TTL: 600, urgency: 'high' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: false, reason: String(e.statusCode || e.message || e) });
  }
}
