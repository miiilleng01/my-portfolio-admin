document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault(); 
            if (!confirm("ログアウトしますか？")) return;

            try {
                // Java側のAdminControllerにある /api/admin/logout を叩く
                const response = await fetch("http://192.168.3.71:8080/api/admin/logout", {
                    method: 'POST',
                    // ★ 自分のセッションIDをJavaに送るために必須
                    credentials: "include" 
                });

                if (response.ok) {
                    console.log("セッション破棄成功");
                    alert("ログアウトしました。");
                    window.location.replace("http://192.168.3.71:3031/index.html");
                } else {
                    alert("ログアウト処理に失敗しました。");
                }
            } catch (err) {
                console.error("Logout Error:", err);
                alert("サーバーと通信できませんでした。");
            }
        });
    }
});