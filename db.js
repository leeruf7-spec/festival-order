import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, connectFirestoreEmulator, collection, doc, runTransaction, serverTimestamp, onSnapshot, query, orderBy, updateDoc, deleteDoc, addDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { firebaseConfig, ADMIN_EMAIL, MENU } from './config.js';

export const configured = !String(firebaseConfig.apiKey).includes('붙여넣기');
const app = initializeApp(configured ? firebaseConfig : { apiKey: 'x', projectId: 'demo-festival', appId: 'x' });
const db = getFirestore(app);
const auth = getAuth(app);
if (window.__EMULATOR__) { connectFirestoreEmulator(db, '127.0.0.1', 8080); connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true }); }

export const itemsOf = o => MENU.filter(m => o.qty?.[m.key] > 0).map(m => ({ ...m, qty: o.qty[m.key] }));

// 주문 생성 (주문번호는 트랜잭션으로 1, 2, 3… 순서대로)
export async function createOrder(name, qtyIn, pay = '계좌이체', prices = {}) {
  const qty = Object.fromEntries(MENU.map(m => [m.key, qtyIn[m.key] || 0]));
  const total = MENU.reduce((a, m) => a + (prices[m.key] ?? m.price) * qty[m.key], 0);
  const counterRef = doc(db, 'meta', 'counter');
  const orderRef = doc(collection(db, 'orders'));
  const no = await runTransaction(db, async tx => {
    const c = await tx.get(counterRef);
    const n = (c.exists() ? c.data().n : 0) + 1;
    if (c.exists()) tx.update(counterRef, { n }); else tx.set(counterRef, { n });
    tx.set(orderRef, { no: n, name, qty, total, pay, status: '입금대기', createdAt: serverTimestamp() });
    return n;
  });
  return { id: orderRef.id, no, name, qty, total, pay };
}

// 내 주문 하나만 실시간 감시 (손님용 — 다른 사람 주문은 못 봄)
export function watchOrder(id, cb) {
  return onSnapshot(doc(db, 'orders', id), d => { if (!d.exists()) return cb(null, id); const x = d.data(); cb({ id: d.id, ...x, createdAt: x.createdAt ? x.createdAt.toDate() : new Date() }, id); }, () => cb(null, id));
}

// 실시간 주문 목록 (관리자만 가능)
export function watchOrders(cb, onErr) {
  return onSnapshot(query(collection(db, 'orders'), orderBy('no', 'desc')), snap => {
    cb(snap.docs.map(d => { const x = d.data(); return { id: d.id, ...x, createdAt: x.createdAt ? x.createdAt.toDate() : new Date() }; }));
  }, onErr);
}

export const adminLogin = pw => signInWithEmailAndPassword(auth, ADMIN_EMAIL, pw);
export const adminLogout = () => signOut(auth);
export const onAdmin = cb => onAuthStateChanged(auth, u => cb(!!u && u.email === ADMIN_EMAIL));
export const setStatus = (id, status) => updateDoc(doc(db, 'orders', id), { status });
export const markSent = id => updateDoc(doc(db, 'orders', id), { status: '송금완료' });
export const removeOrder = id => deleteDoc(doc(db, 'orders', id));

// 후기
export const addReview = (name, stars, text) => addDoc(collection(db, 'reviews'), { name, stars, text, createdAt: serverTimestamp() });
export function watchReviews(cb, onErr) {
  return onSnapshot(query(collection(db, 'reviews'), orderBy('createdAt', 'desc')), snap => {
    cb(snap.docs.map(d => { const x = d.data(); return { id: d.id, ...x, createdAt: x.createdAt ? x.createdAt.toDate() : new Date() }; }));
  }, onErr);
}
export const removeReview = id => deleteDoc(doc(db, 'reviews', id));

// 손님 폰 푸시 구독 저장 (주문 1건당 1번)
export const savePush = (orderId, sub) => setDoc(doc(db, 'push', orderId), { sub: JSON.stringify(sub), createdAt: serverTimestamp() });
// 관리자: 손님 폰으로 '음식 나왔어요' 푸시 보내기 (Vercel /api/push 경유)
export async function sendReadyPush(orderId) {
  const u = auth.currentUser; if (!u) return;
  const idToken = await u.getIdToken();
  const r = await fetch('/api/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken, orderId }) });
  return r.json().catch(() => ({}));
}
