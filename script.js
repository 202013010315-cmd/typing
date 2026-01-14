const words = ["かみなり", "ほのお", "つるぎ", "まほう"];

let enemyHP;
let playerHP;
let currentWord;

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";

  enemyHP = 100;
  playerHP = 100;

  nextWord();
  updateStatus();
}

function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("word").textContent = currentWord;
  document.getElementById("typing").value = "";
  document.getElementById("typing").focus();
}

function updateStatus() {
  document.getElementById("enemy").textContent = "敵：モンスター";
  document.getElementById("enemyHp").textContent = "敵HP：" + enemyHP;
  document.getElementById("playerHp").textContent = "自分HP：" + playerHP;
}

document.getElementById("typing").addEventListener("input", function () {
  if (this.value === currentWord) {
    this.value = "";

    // ダメージ
    enemyHP -= 20;

    // 画面揺れ
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 300);

    if (enemyHP <= 0) {
      document.getElementById("msg").textContent = "敵を倒した！";
      return;
    }

    // 敵の反撃
    playerHP -= 10;
    if (playerHP <= 0) {
      document.getElementById("msg").textContent = "ゲームオーバー";
      this.disabled = true;
      return;
    }

    updateStatus();
    nextWord();
  }
});
