let enemyHP = 99;
let life = 3;
let currentEnemy = '';
let enemies = ['スライム', 'ゴブリン', 'ドラゴン'];

function startGame(diff) {
  // 難易度によるHP調整
  if(diff === 'easy') enemyHP = 50;
  if(diff === 'normal') enemyHP = 99;
  if(diff === 'hard') enemyHP = 150;

  life = 3;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  spawnEnemy();
}

function spawnEnemy() {
  // ランダムで敵を決定
  currentEnemy = enemies[Math.floor(Math.random()*enemies.length)];
  document.getElementById('enemy').textContent = '敵: ' + currentEnemy;
  document.getElementById('hp').textContent = 'HP: ' + enemyHP;
  document.getElementById('typing').value = '';
  document.getElementById('message').textContent = '敵の名前をタイプして倒せ！';

  // 入力欄にフォーカス
  document.getElementById('typing').focus();
}

// タイピング判定
document.getElementById('typing').addEventListener('input', function() {
  let input = this.value;
  if(input === currentEnemy) {
    enemyHP -= 20;
    document.getElementById('hp').textContent = 'HP: ' + enemyHP;
    this.value = '';

    if(enemyHP <= 0) {
      life--;
      document.getElementById('life').textContent = 'ライフ: ' + life;
      if(life <= 0) {
        document.getElementById('message').textContent = 'ゲームオーバー！';
        document.getElementById('typing').disabled = true;
      } else {
        enemyHP = 99; // 次の敵HP
        spawnEnemy();
      }
    } else {
      spawnEnemy();
    }
  }
});
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

  const input = document.getElementById("input");
  input.dataset.answer = w.roma;
  input.value = "";
  input.focus();
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
