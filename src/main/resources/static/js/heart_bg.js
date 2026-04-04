/**
 * 天才専用ページ：無限ハート上昇背景
 */
document.addEventListener("DOMContentLoaded", () => {
    const bgContainer = document.getElementById('heart-bg');
    if (!bgContainer) return;

    // ハートを生成する関数
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // 1. ランダムな色を決める (color-1 ～ color-5)
        const colorIndex = Math.floor(Math.random() * 5) + 1;
        heart.classList.add(`color-${colorIndex}`);

        // 2. ランダムな横位置 (0% ～ 100%)
        heart.style.left = Math.random() * 100 + 'vw';

        // 3. ランダムな大きさ (0.5倍 ～ 1.5倍)
        const scale = Math.random() * 1 + 0.5;
        heart.style.setProperty('transform', `scale(${scale}) rotate(-45deg)`);

        // 4. ランダムな上昇速度 (5秒 ～ 15秒)
        const duration = Math.random() * 10 + 5;
        heart.style.animationDuration = `${duration}s, 2s`; // 上昇と鼓動

        // 5. ランダムなアニメーション開始遅延 (0秒 ～ 10秒)
        // これにより、最初はハートが少なく、徐々に画面全体に広がる
        heart.style.animationDelay = `${Math.random() * 10}s`;

        bgContainer.appendChild(heart);

        // アニメーション終了後に要素を削除して、メモリリークを防ぐ
        // CSSのアニメーション時間（duration + delay）に合わせて削除
        setTimeout(() => {
            heart.remove();
        }, (duration + 10) * 1000); 
    }

    // --- ハートの量産体制 ---
    
    // 最初に50個ほど、様々な遅延時間で生成しておく
    for (let i = 0; i < 50; i++) {
        createHeart();
    }

    // その後、一定間隔（例：300ms）で新しいハートを1個ずつ追加し続ける
    // これにより「ずーっと」登っていく感じになる
    setInterval(createHeart, 300);
});