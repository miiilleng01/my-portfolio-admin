// --- 修正箇所1: APIのベースURLを定義 ---
const API_BASE = "http://192.168.3.71:8080"; 

const form = document.getElementById("uploadForm");
const typeSelect = document.querySelector('[name="type"]');
const imageInput = document.querySelector('[name="image"]');
const thumbArea = document.getElementById("thumbArea");

function checkThumbnail() {
  const type = typeSelect.value;
  const file = imageInput.files[0];

  if (!file) {
    thumbArea.style.display = "none";
    return;
  }

  const ext = file.name.split(".").pop().toLowerCase();

  if (type === "movie" && ext === "mp4") {
    thumbArea.style.display = "block";
  } else {
    thumbArea.style.display = "none";
  }
}

typeSelect.addEventListener("change", checkThumbnail);
imageInput.addEventListener("change", checkThumbnail);

form.addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    // --- 修正箇所2: 送信先をフルURLにする ---
    // --- 修正箇所3: credentials: "include" を追加してログイン情報を送る ---
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
      credentials: "include" // ★ これがないと Java 側で「未ログイン」扱いになります
    });

    if (!res.ok) throw new Error("送信エラー");

    alert("追加完了");

    form.reset();
    thumbArea.style.display = "none";

  } catch (err) {
    console.error(err);
    alert("送信に失敗しました。ログインが切れている可能性があります。");
  }
});