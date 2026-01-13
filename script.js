let enemyWord = "";
let enemyHP = 99;
let life = 3;

const enemies = ["スライム", "ゴブリン", "ドラゴン"];

function startGame(diff) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";

  life = 3;
  enemyHP = 99;

  nextEnemy();
}

function nextEnemy() {
  enemyWord = enemies[Math.floor(Math.random() * enemies.length)];
  document.getElementById("enemy").textContent = "敵：" + enemyWord;
  document.getElementById("hp").textContent = "HP：" + enemyHP;
  document.getElementById("life").textContent = "ライフ：" + life;
  document.getElementById("typing").value = "";
  document.getElementById("typing").focus();

  // 敵出現時のエフェクト
  document.getElementById("enemy").classList.add("shake");
  setTimeout(() => {
    document.getElementById("enemy").classList.remove("shake");
  }, 300);
}

document.getElementById("typing").addEventListener("input", function () {
  if (this.value === enemyWord) {
    enemyHP -= 20;
    this.value = "";

    // ダメージ時のエフェクト
    document.getElementById("enemy").classList.add("shake");
    setTimeout(() => {
      document.getElementById("enemy").classList.remove("shake");
    }, 300);

    if (enemyHP <= 0) {
      life--;
      if (life <= 0) {
        document.getElementById("msg").textContent = "ゲームオーバー";
        this.disabled = true;
      } else {
        enemyHP = 99;
        nextEnemy();
      }
    } else {
      nextEnemy();
    }
  }
});
