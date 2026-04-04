// /**
//  * 天才専用ページ：オールインワン・スクリプト
//  */
// document.addEventListener("DOMContentLoaded", async () => {
    
//     const API_BASE = (location.hostname === "192.168.3.71" || location.hostname === "localhost") 
//                  ? "http://192.168.3.71:8080" 
//                  : "https://xxxxx.onrender.com";

//     // --- 1. 要素の取得 ---
//     const countElement    = document.getElementById('arrival-count');
//     const logo            = document.getElementById('trigger-logo');
//     const counter         = document.getElementById('trigger-counter');
//     const heartTrigger    = document.getElementById('trigger-heart'); // 定数名重複防止
//     const loginForm       = document.getElementById('secret-login-form');
//     const togglePass      = document.getElementById('toggle-pass');
//     const passInput       = document.getElementById('admin-pass');
//     const loginBtn        = document.getElementById('login-submit');

//     let step = 0;

//     // --- 2. 無限ハート背景の開始 ---
//     initHeartBackground();

//     // --- 3. 人数カウント処理 ---
//     const hasVisited = localStorage.getItem('is_genius_member');
//     try {
//         const response = await fetch(`${API_BASE}/api/admin/visit`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ increment: !hasVisited })
//         });
//         if (response.ok) {
//             const data = await response.json();
//             animateCount(countElement, 0, data.count, 2000);
//             localStorage.setItem('is_genius_member', 'true');
//         }
//     } catch (err) {
//         console.error("Count API Error:", err);
//     }

//     // --- 4. 儀式ギミック ---
//     if (logo) logo.addEventListener('click', () => { step = 1; logo.style.filter = "drop-shadow(0 0 20px #ff4fa3)"; });
//     if (counter) counter.addEventListener('click', () => { if (step === 1) { step = 2; counter.style.textShadow = "0 0 10px #ff4fa3"; } });
//     if (heartTrigger) heartTrigger.addEventListener('click', () => { if (step === 2) { step = 3; loginForm.style.display = 'flex'; } });

//     // --- 5. パスワード表示切り替え ---
//     if (togglePass && passInput) {
//         togglePass.addEventListener('click', () => {
//             const isPassword = passInput.type === 'password';
//             passInput.type = isPassword ? 'text' : 'password';
//             togglePass.textContent = isPassword ? '🔒' : '👁️';
//         });
//     }

//     // --- 6. ログイン実行 ---
//     if (loginBtn) {
//         loginBtn.addEventListener('click', async (e) => {
//             e.preventDefault();
//             const geniusWrap = document.getElementById('genius-wrap');
//             const idValue = document.getElementById('admin-id').value;
//             const passValue = document.getElementById('admin-pass').value;
//             const kotobaValue = document.getElementById('admin-kotoba').value;

//             try {
//                 const response = await fetch(`${API_BASE}/api/admin/login`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ id: idValue, pass: passValue, kotoba: kotobaValue }),
//                     credentials: "include" 
//                 });
//                 const result = await response.json();
//                 if (result.success) {
//                     window.location.href = `${API_BASE}/admin-home`;
//                 } else {
//                     showFailure(geniusWrap);
//                 }
//             } catch (err) {
//                 showFailure(geniusWrap);
//             }
//         });
//     }

//     // --- 関数定義エリア ---

//     function showFailure(container) {
//         const target = container || document.body;
//         target.innerHTML = `
//             <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;display:flex;justify-content:center;align-items:center;z-index:999999;color:#ff4fa3;font-size:clamp(5rem,15vw,10rem);text-shadow:0 0 20px #ff4fa3;font-family:'Kaisei Decol',serif;">
//                 残☆念
//             </div>
//         `;
//         document.body.style.overflow = 'hidden';
//     }

//     function animateCount(el, start, end, duration) {
//         if (!el) return;
//         let startTime = null;
//         function step(timestamp) {
//             if (!startTime) startTime = timestamp;
//             const progress = Math.min((timestamp - startTime) / duration, 1);
//             const current = Math.floor(progress * (end - start) + start);
//             el.innerText = current.toString().padStart(4, '0');
//             if (progress < 1) requestAnimationFrame(step);
//         }
//         requestAnimationFrame(step);
//     }
    

//     function initHeartBackground() {
//         const bg = document.getElementById('heart-bg');
//         if (!bg) return;

//         setInterval(() => {
//             const heart = document.createElement('div');
//             heart.classList.add('heart');
            
//             // ランダムな色クラス
//             const colorNum = Math.floor(Math.random() * 5) + 1;
//             heart.classList.add(`color-${colorNum}`);
            
//             // ランダムな横位置
//             heart.style.left = Math.random() * 100 + 'vw';
            
//             // --- ここを修正：上昇と鼓動の2つのアニメーションをセットする ---
//             const duration = Math.random() * 8 + 4; // 4〜12秒
//             heart.style.animation = `
//                 heartRise ${duration}s linear forwards, 
//                 heartPulse 2s infinite ease-in-out
//             `;
            
//             bg.appendChild(heart);

//             // アニメーションが終わったら消す
//             setTimeout(() => {
//                 if(heart.parentNode) heart.remove();
//             }, duration * 1000);
//         }, 300); // 0.3秒ごとに生成
//     }
// });