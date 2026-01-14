const enemy = "スライム";

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("enemy").textContent = "敵：" + enemy;
}

document.getElementById("typing").addEventListener("input", function () {
  if (this.value === enemy) {
    alert("倒した！");
  }
});
