let hp = 99;
let life = 3;
let enemyWord = "";
let damage = 0;

const words = {
  easy: ["cat", "dog", "apple", "pen"],
  normal: ["banana", "typing", "battle", "javascript"],
  hard: ["programming", "difficulty", "development", "visualstudio"]
};

const hpSpan = document.getElementById("hp");
const lifeSpan = document.getElementById("life");
const enemy = document.getElementById("enemy");
const input = document.getElementById("input");
const message = document.getElementById("message");

function startGame(level) {
  damage = level === "easy" ? 10 : level === "normal" ? 20 : 30;
  input.disabled = false;
  input.value = "";
  message.textContent = "";
  nextEnemy(level);
}

function nextEnemy(level) {
  const list = words[level];
  enemyWord = list[Math.floor(Math.random() * list.length)];
  enemy.textContent = enemyWord;
  input.value = "";
  input.focus();
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (input.value === enemyWord) {
      message.textContent = "敵を倒した！";
      nextEnemy(getCurrentLevel());
    } else {
      takeDamage();
    }
  }
});

function takeDamage() {
  hp -= damage;
  if (hp <= 0) {
    life--;
    hp = 99;
    message.textContent = "ライフが減った！";
  } else {
    message.textContent = "ミス！ダメージ！";
  }

  if (life <= 0) {
    gameOver();
  }

  updateStatus();
}

function updateStatus() {
  hpSpan.textContent = hp;
  lifeSpan.textContent = life;
}

function gameOver() {
  enemy.textContent = "";
  input.disabled = true;
  message.textContent = "💀 ゲームオーバー";
}

function getCurrentLevel() {
  if (damage === 10) return "easy";
  if (damage === 20) return "normal";
  return "hard";
}
