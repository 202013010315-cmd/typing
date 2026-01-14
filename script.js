// ===== ステータス =====
let enemyHP = 100;
let playerHP = 100;
const enemyDamage = 20;
const playerDamage = 10;

const words = ["ほのお", "かみなり", "つるぎ", "まほう"];
let currentWord = "";

// コンボ管理
let comboCount = 0;
let comboTimeout;

// ===== 要素取得 =====
const enemyHpBar = document.querySelector(".enemy-hp");
const playerHpBar = document.querySelector(".player-hp");
const wordEl = document.querySelector(".word");
const inputEl = document.querySelector(".typing-input");
const comboEl = document.querySelector("#combo");

// ===== 初期単語 =====
nextWord();

// ===== 入力判定 =====
inputEl.addEventListener("input", () => {
  if (inputEl.value === currentWord) {
    inputEl.value = "";

    // コンボ
    comboCount++;
    comboEl.textContent = comboCount >= 2 ? comboCount + "コンボ!" : "";
    clearTimeout(comboTimeout);
    comboTimeout = setTimeout(() => { comboCount = 0; comboEl.textContent = ""; }, 1500);

    // 敵ダメージ
    enemyHP -= enemyDamage;
    if (enemyHP < 0) enemyHP = 0;
    updateHP();
    showDamage(enemyDamage, wordEl);
    shake();

    if (enemyHP === 0) {
      wordEl.textContent = "勝利！";
      inputEl.disabled = true;
      return;
    }

    // 敵の反撃
    setTimeout(() => {
      playerHP -= playerDamage;
      if (playerHP < 0) playerHP = 0;
      updateHP();
      showDamage(playerDamage, wordEl, false);
      shake();

      if (playerHP === 0) {
        wordEl.textContent = "ゲームオーバー";
        inputEl.disabled = true;
        return;
      }

      nextWord();
    }, 300);
  }
});

// ===== HP更新 =====
function updateHP() {
  enemyHpBar.style.width = enemyHP + "%";
  playerHpBar.style.width = playerHP + "%";
}

// ===== 次の単語 =====
function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordEl.textContent = currentWord;
  inputEl.focus();
}

// ===== 画面揺れ =====
function shake() {
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 300);
}

// ===== ダメージ数字表示 =====
function showDamage(amount, targetEl, isPlayer=false) {
  const dmg = document.createElement("div");
  dmg.className = "damage";
  dmg.textContent = "-" + amount;
  
  const rect = targetEl.getBoundingClientRect();
  dmg.style.left = rect.left + rect.width / 2 + "px";
  dmg.style.top = rect.top + "px";
  document.body.appendChild(dmg);

  setTimeout(() => { dmg.remove(); }, 800);
}
