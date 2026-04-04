/**
 * 天才専用ページ：初期化・儀式・カウント・ログイン処理
 */
document.addEventListener("DOMContentLoaded", async () => {
    
    // --- 0. APIベースURL ---
    const API_BASE = (location.hostname === "192.168.3.71" || location.hostname === "localhost") 
                 ? "http://192.168.3.71:8080" 
                 : "https://xxxxx.onrender.com";

    // --- 1. 要素の取得 ---
    const countElement    = document.getElementById('arrival-count');
    const logo            = document.getElementById('trigger-logo');
    const counter         = document.getElementById('trigger-counter');
    const heart           = document.getElementById('trigger-heart');
    const loginForm       = document.getElementById('secret-login-form');
    const togglePass      = document.getElementById('toggle-pass');
    const passInput       = document.getElementById('admin-pass');
    
    // ログイン実行用
    const loginBtn        = document.getElementById('login-submit');
    const geniusInterface = document.querySelector('.genius-interface');

    let step = 0; // 儀式の進行状況

    // --- 2. 人数カウント処理 ---
// ブラウザの記憶(LocalStorage)から「訪問済みか」を確認
const hasVisited = localStorage.getItem('is_genius_member');

try {
    const response = await fetch(`${API_BASE}/api/admin/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 初めてなら increment: true, 2回目以降なら false を送る
        body: JSON.stringify({ 
            increment: !hasVisited 
        })
    });

    if (response.ok) {
        const data = await response.json();
        animateCount(countElement, 0, data.count, 2000);
        
        // 成功したら「訪問済み」の印をブラウザに刻む
        localStorage.setItem('is_genius_member', 'true');
    }
} catch (err) {
    console.error("Count API Error:", err);
}

    // --- 3. 儀式ギミック (ロゴ → 人数 → ハート) ---
    if (logo) {
        logo.addEventListener('click', () => {
            step = 1;
            logo.style.filter = "drop-shadow(0 0 20px #ff4fa3)";
        });
    }

    if (counter) {
        counter.addEventListener('click', () => {
            if (step === 1) {
                step = 2;
                counter.style.textShadow = "0 0 10px #ff4fa3";
            }
        });
    }

    if (heart) {
        heart.addEventListener('click', () => {
            if (step === 2) {
                step = 3;
                loginForm.style.display = 'flex';
                loginForm.style.animation = "fadeIn 0.5s forwards";
            }
        });
    }

    // --- 4. パスワード表示切り替え ---
    if (togglePass && passInput) {
        togglePass.addEventListener('click', () => {
            const isPassword = passInput.type === 'password';
            passInput.type = isPassword ? 'text' : 'password';
            togglePass.textContent = isPassword ? '🔒' : '👁️'; // 絵文字を入れ替えて分かりやすく
        });
    }

    // --- 5. ログイン実行 (ENTER SYSTEM ボタン) ---
    // ここを DOMContentLoaded の中に入れたことで、確実にボタンを捕まえられます
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const idValue = document.getElementById('admin-id').value;
            const passValue = document.getElementById('admin-pass').value;
            const kotobaValue = document.getElementById('admin-kotoba').value;

            try {
                const response = await fetch(`${API_BASE}/api/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        id: idValue, 
                        pass: passValue, 
                        kotoba: kotobaValue
                    }),
                    credentials: "include"
                });

                const result = await response.json();

                if (result.success) {
                    window.location.href = `${API_BASE}/admin-home.html`;
                    showFailure(geniusInterface);
                }
            } catch (err) {
                console.error("Login Error:", err);
                showFailure(geniusInterface);
            }
        });
    }
});

/**
 * 失敗時の演出：全てを消し去り「残☆念」を突きつける
 */
function showFailure(container) {
    if (container) {
        container.innerHTML = `
            <div style="
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                font-size: 10rem; 
                color: #ff4fa3; 
                text-shadow: 0 0 20px #ff4fa3;
                font-family: 'Kaisei Decol', serif;
            ">
                残☆念
            </div>
        `;
    }
    localStorage.removeItem('is_genius');
}

/**
 * 数字アニメーション
 */
function animateCount(el, start, end, duration) {
    if (!el) return;
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        el.innerText = current.toString().padStart(4, '0');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}