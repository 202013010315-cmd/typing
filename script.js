let stage = 1, life = 3, combo = 0, skill = 0;
let playerHp = 99, enemyHp, maxEnemyHp;
let time = 100, timer;

const words = [
  { jp: "ゆうしゃ", roma: "yuusya" },
  { jp: "まほう", roma: "mahou" },
  { jp: "たたかう", roma: "tatakau" }
];

const el = id => document.getElementById(id);

const bgm = el("bgm");
bgm.volume = 0.4;

function startStage() {
  bgm.play();
  el("stage").textContent = `STAGE ${stage}`;
  const boss = stage % 5 === 0;
  el("enemyName").textContent = boss ? "👑 BOSS" : "ENEMY";

  maxEnemyHp = boss ? 200 + stage * 20 : 80 + stage * 10;
  enemyHp = maxEnemyHp;

  nextWord();
  startTimer();
  updateUI();
}

function nextWord() {
  const w = words[Math.floor(Math.random() * words.length)];
  el("word").textContent = `${w.jp} (${w.roma})`;
  el("input").dataset.answer = w.roma;
  el("input").value = "";
  el("input").focus();
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
