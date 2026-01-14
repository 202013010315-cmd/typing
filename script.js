let enemyWord = "";
let enemyHP = 99;
let life = 3;
let damage = 20;

const enemies = ["スライム", "ゴブリン", "ドラゴン"];

function startGame(diff) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";

  life = 3;
  enemyHP = 99;

  if (diff === "easy") damage = 25;
  if (diff === "normal") damage = 20;
  if (diff === "hard") damage = 15;

  nextEnemy();
}

function nextEnemy() {
  enemyWord = enemies[Math.floor(Math.random() * enemies.length)];
  document.getElementById("enemy").textContent = "敵： " + enemyWord;
  updateUI();

  const e = document.getElementById("enemy");
  e.classList.add("shake");
  setTimeout(() => e.classList.remove("shake"), 300);

  const input = document.getElementById("typing");
  input.value = "";
  input.focus();
}

function updateUI() {
  document.getElementById("hp").textContent = "敵HP： " + enemyHP;
  document.getElementById("life").textContent = "ライフ： " + life;
}

document.getElementById("typing").addEventListener("input", function () {
  if (this.value === enemyWord) {
    enemyHP -= damage;
    this.value = "";

    if (enemyHP <= 0) {
      life--;
      if (life <= 0) {
        document.getElementById("msg").textContent = "ゲームオーバー";
        this.disabled = true;
        return;
      }
      enemyHP = 99;
      nextEnemy();
    } else {
      updateUI();
    }
  }
});
