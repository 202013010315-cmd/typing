let playerHp = 99;
let life = 3;
let enemyHp = 0;
let maxEnemyHp = 0;
let difficulty = "";

const enemies = [
  { name: "スライム", hp: 30 },
  { name: "ゴブリン", hp: 50 },
  { name: "ドラゴン", hp: 80 }
];

const words = [
  { jp: "たたかう", roma: "tatakau" },
  { jp: "まほう", roma: "mahou" },
  { jp: "ゆうしゃ", roma: "yuusya" }
];

const bgm = document.getElementById("bgm");

function startGame(diff) {
  difficulty = diff;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  bgm.play();
  spawnEnemy();
}

function spawnEnemy() {
  const e = enemies[Math.floor(Math.random() * enemies.length)];
  enemyHp = e.hp;
  maxEnemyHp = e.hp;

  document.getElementById("enemyName").textContent = e.name;
  updateEnemyHp();
  nextWord();
}

function nextWord() {
  const w = words[Math.floor(Math.random() * words.length)];
  document.getElementById("word").textContent =
    `${w.jp}（${w.roma}）`;
  document.getElementById("input").dataset.answer = w.roma;
  document.getElementById("input").value = "";
  document.getElementById("input").focus();
}

document.getElementById("input").addEventListener("input", () => {
  const input = document.getElementById("input");
  if (input.value === input.dataset.answer) {
    enemyHp -= getDamage();
    updateEnemyHp();
    nextWord();

    if (enemyHp <= 0) {
      spawnEnemy();
    }
  }
});

function getDamage() {
  if (difficulty === "easy") return 10;
  if (difficulty === "normal") return 15;
  return 20;
}

function updateEnemyHp() {
  document.getElementById("enemyHpBar").style.width =
    (enemyHp / maxEnemyHp * 100) + "%";
}
}

function nextWord() {
  const w = words[Math.floor(Math.random() * words.length)];
  document.getElementById("word").textContent =
    `${w.jp}（${w.roma}）`;
  document.getElementById("input").dataset.answer = w.roma;
  document.getElementById("input").value = "";
  document.getElementById("input").focus();
}

document.getElementById("input").addEventListener("input", () => {
  const input = document.getElementById("input");
  if (input.value === input.dataset.answer) {
    enemyHp -= getDamage();
    updateEnemyHp();
    nextWord();

    if (enemyHp <= 0) {
      spawnEnemy();
    }
  }
});

function getDamage() {
  if (difficulty === "easy") return 10;
  if (difficulty === "normal") return 15;
  return 20;
}

function updateEnemyHp() {
  document.getElementById("enemyHpBar").style.width =
    (enemyHp / maxEnemyHp * 100) + "%";
}

el("input").addEventListener("input", () => {
  if (el("input").value === el("input").dataset.answer) {
    combo++;
    skill = Math.min(skill + 10, 100);
    enemyHp -= 12 + combo * 2;

    effect("HIT!");
    updateUI();

    if (enemyHp <= 0) {
      stage++;
      startStage();
    }
    nextWord();
  }
});

function startTimer() {
  clearInterval(timer);
  time = 100;
  timer = setInterval(() => {
    time--;
    el("time").style.width = time + "%";
    if (time <= 0) {
      combo = 0;
      damage();
      time = 100;
    }
  }, 80);
}

function damage() {
  playerHp -= 20;
  screenShake();
  if (playerHp <= 0) {
    life--;
    playerHp = 99;
  }
  if (life <= 0) gameOver();
  updateUI();
}

function useSkill() {
  if (skill === 100) {
    enemyHp -= 120;
    skill = 0;
    effect("🔥 SKILL 🔥");
    screenShake();
    updateUI();
  }
}

function updateUI() {
  el("enemyHpBar").style.width = (enemyHp / maxEnemyHp * 100) + "%";
  el("playerHpBar").style.width = (playerHp / 99 * 100) + "%";
  el("life").textContent = life;
  el("combo").textContent = combo;
  el("skill").textContent = skill + "%";
}

function screenShake() {
  const s = el("screen");
  s.classList.add("shake");
  setTimeout(() => s.classList.remove("shake"), 200);
}

function effect(text) {
  const e = document.createElement("div");
  e.textContent = text;
  e.className = "effect-text";
  e.style.left = Math.random() * 80 + "%";
  e.style.top = "40%";
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 600);
}

function gameOver() {
  clearInterval(timer);
  bgm.pause();
  const best = localStorage.getItem("bestStage") || 1;
  if (stage > best) localStorage.setItem("bestStage", stage);
  alert(`GAME OVER\n最高ステージ: ${localStorage.getItem("bestStage")}`);
  location.reload();
}

startStage();
