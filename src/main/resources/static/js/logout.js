/**
 * ログアウト処理専用スクリプト
 */
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault(); // aタグのデフォルト動作を無効化

            if (!confirm("聖域（管理画面）から離脱しますか？\n再度入るには儀式が必要です。")) {
                return;
            }

            try {
                // Java側のログアウトAPIを叩く
                // ※絶対パスで指定するか、環境に合わせて書き換えてください
                const API_BASE = (location.hostname === "192.168.3.71" || location.hostname === "localhost") 
                               ? "http://192.168.3.71:8080" 
                               : "https://xxxxx.onrender.com";

                const response = await fetch(`${API_BASE}/api/admin/logout`, {
                    method: 'POST',
                    credentials: "include" // セッションCookieを送るために必須
                });

                if (response.ok) {
                    console.log("Session destroyed. Farewell, Genius.");
                    
                    // フロント側の「入室記録」も消しておく
                    localStorage.removeItem('is_genius_member');

                    // 魚の儀式ページ（3000番）へ強制送還
                    window.location.href = "http://192.168.3.71:3031/index.html";
                } else {
                    alert("ログアウトに失敗しました。サーバーが応答しません。");
                }
            } catch (err) {
                console.error("Logout Error:", err);
                alert("通信エラーが発生しました。");
            }
        });
    }
});