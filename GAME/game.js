// =============================================
// Candy Catcher — game.js
// Ricardo's Summer Builder Program
// =============================================
// HOW THE GAME WORKS:
//   - Candy falls from the top of the canvas
//   - Move the basket with arrow keys or mouse
//   - Catch candy to score points
//   - Miss 3 = game over
//   - Speed increases every 10 points
// =============================================

const canvas  = document.getElementById("game-canvas");
const ctx     = canvas.getContext("2d");
const W       = canvas.width;
const H       = canvas.height;

// ---- Game State ----
let score      = 0;
let lives      = 3;
let highScore  = 0;
let gameActive = false;
let animId     = null;
let lastTime   = 0;
let spawnTimer = 0;

// ---- Basket ----
const basket = {
  x:      W / 2,
  y:      H - 50,
  width:  90,
  height: 30,
  speed:  7,
  color:  "#e63946"
};

// ---- Candy pool ----
let candies = [];

// ---- Keyboard state ----
const keys = { ArrowLeft: false, ArrowRight: false };

// ---- Candy types ----
const CANDY_TYPES = [
  { emoji: "🍬", points: 1,  speed: 1.8, size: 28 },
  { emoji: "🍭", points: 2,  speed: 2.2, size: 30 },
  { emoji: "🍫", points: 3,  speed: 2.8, size: 26 },
  { emoji: "⭐", points: 5,  speed: 3.5, size: 24 },   // Rare, fast, worth more
  { emoji: "💣", points: -2, speed: 2.5, size: 26 },   // Bomb — don't catch!
];

// ---- Emoji rendering helper ----
function drawEmoji(emoji, x, y, size) {
  ctx.font = size + "px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, x, y);
}

// ---- Spawn a new candy ----
function spawnCandy() {
  // Random candy type — stars are rarer
  const roll = Math.random();
  let type;
  if (roll < 0.05)      type = CANDY_TYPES[3];  // star (5%)
  else if (roll < 0.15) type = CANDY_TYPES[4];  // bomb (10%)
  else if (roll < 0.35) type = CANDY_TYPES[2];  // chocolate (20%)
  else if (roll < 0.60) type = CANDY_TYPES[1];  // lollipop (25%)
  else                   type = CANDY_TYPES[0];  // basic candy (40%)

  // Speed increases with score
  const speedBoost = Math.floor(score / 10) * 0.4;

  candies.push({
    x:      Math.random() * (W - 40) + 20,
    y:      -20,
    emoji:  type.emoji,
    points: type.points,
    speed:  type.speed + speedBoost,
    size:   type.size,
    caught: false
  });
}

// ---- Spawn interval decreases as score climbs ----
function getSpawnInterval() {
  const base = 1200;  // ms between candies
  const reduction = Math.floor(score / 5) * 80;
  return Math.max(400, base - reduction);
}

// ---- Draw the basket ----
function drawBasket() {
  const bx = basket.x - basket.width / 2;
  const by = basket.y - basket.height / 2;
  const bw = basket.width;
  const bh = basket.height;

  // Basket body
  ctx.fillStyle = basket.color;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 8);
  ctx.fill();

  // Basket rim (lighter)
  ctx.fillStyle = "#ff6b75";
  ctx.fillRect(bx, by, bw, 6);

  // Handle lines
  ctx.strokeStyle = "#c1121f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(bx + 15, by);
  ctx.lineTo(bx + 15, by - 12);
  ctx.moveTo(bx + bw - 15, by);
  ctx.lineTo(bx + bw - 15, by - 12);
  ctx.stroke();
}

// ---- Draw background ----
function drawBackground() {
  // Dark gradient sky
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#1a0a2e");
  grad.addColorStop(1, "#2d1b4e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Ground line
  ctx.fillStyle = "#3d2057";
  ctx.fillRect(0, H - 15, W, 15);
}

// ---- Draw score popup ----
let popups = [];

function addPopup(x, y, text, color) {
  popups.push({ x, y, text, color, life: 1.0 });
}

function updateAndDrawPopups(dt) {
  popups = popups.filter(p => p.life > 0);
  popups.forEach(p => {
    p.life -= dt * 0.002;
    p.y -= dt * 0.06;
    ctx.globalAlpha = p.life;
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = p.color;
    ctx.fillText(p.text, p.x, p.y);
    ctx.globalAlpha = 1;
  });
}

// ---- Lives display ----
function updateHUD() {
  document.getElementById("score-display").textContent = score;
  document.getElementById("best-display").textContent  = highScore;

  const heartMap = ["", "❤️", "❤️❤️", "❤️❤️❤️"];
  document.getElementById("lives-display").textContent = heartMap[Math.max(0, lives)] || "💀";
}

// ---- Main game loop ----
function gameLoop(timestamp) {
  if (!gameActive) return;

  const dt = timestamp - lastTime;
  lastTime = timestamp;

  // Spawn candies on a timer
  spawnTimer += dt;
  if (spawnTimer >= getSpawnInterval()) {
    spawnCandy();
    spawnTimer = 0;
  }

  // Clear + draw background
  drawBackground();

  // Move and draw candies
  for (let i = candies.length - 1; i >= 0; i--) {
    const c = candies[i];
    c.y += c.speed * (dt / 16);

    // Check catch
    const bLeft  = basket.x - basket.width  / 2;
    const bRight = basket.x + basket.width  / 2;
    const bTop   = basket.y - basket.height / 2;
    const bBot   = basket.y + basket.height / 2;

    if (
      c.y + c.size / 2 >= bTop &&
      c.y - c.size / 2 <= bBot &&
      c.x >= bLeft &&
      c.x <= bRight
    ) {
      // Caught!
      if (c.points > 0) {
        score += c.points;
        if (score > highScore) highScore = score;
        addPopup(c.x, c.y, "+" + c.points, "#ffd60a");
      } else {
        // Bomb caught — lose a life
        lives--;
        addPopup(c.x, c.y, c.points.toString(), "#e63946");
        if (lives <= 0) {
          candies.splice(i, 1);
          endGame();
          return;
        }
      }
      candies.splice(i, 1);
      continue;
    }

    // Missed — fell past bottom
    if (c.y > H + 20) {
      if (c.points > 0) {
        // Only lose a life for missing actual candy (not bombs)
        lives--;
        if (lives <= 0) {
          candies.splice(i, 1);
          endGame();
          return;
        }
      }
      candies.splice(i, 1);
      continue;
    }

    drawEmoji(c.emoji, c.x, c.y, c.size);
  }

  drawBasket();
  updateAndDrawPopups(dt);
  updateHUD();

  // Move basket with keyboard
  if (keys.ArrowLeft)  basket.x = Math.max(basket.width / 2,     basket.x - basket.speed * (dt / 16));
  if (keys.ArrowRight) basket.x = Math.min(W - basket.width / 2, basket.x + basket.speed * (dt / 16));

  animId = requestAnimationFrame(gameLoop);
}

// ---- Start ----
function startGame() {
  score      = 0;
  lives      = 3;
  candies    = [];
  popups     = [];
  spawnTimer = 0;
  basket.x   = W / 2;
  gameActive = true;

  document.getElementById("overlay").classList.add("hidden");
  updateHUD();

  lastTime = performance.now();
  animId   = requestAnimationFrame(gameLoop);
}

// ---- End ----
function endGame() {
  gameActive = false;
  if (animId) cancelAnimationFrame(animId);

  if (score > highScore) highScore = score;

  const overlay  = document.getElementById("overlay");
  const title    = document.getElementById("overlay-title");
  const scoreEl  = document.getElementById("overlay-score");
  const bestEl   = document.getElementById("overlay-best");
  const msgEl    = document.getElementById("overlay-message");
  const btn      = document.getElementById("start-btn");

  title.textContent    = "Game Over! 💀";
  scoreEl.textContent  = "Score: " + score;
  bestEl.textContent   = "High Score: " + highScore;
  scoreEl.style.display = "block";
  bestEl.style.display  = "block";

  if (score >= 30)      msgEl.textContent = "Legendary. You are a candy catching machine. 🏆";
  else if (score >= 20) msgEl.textContent = "Excellent! You really know your candy. 🌟";
  else if (score >= 10) msgEl.textContent = "Nice game! Keep practicing to beat your best.";
  else                  msgEl.textContent = "Tough one. Watch out for bombs next time! 💣";

  btn.textContent = "Play Again";
  overlay.classList.remove("hidden");
}

// ---- Input: Keyboard ----
document.addEventListener("keydown", e => {
  if (e.key in keys) {
    keys[e.key] = true;
    e.preventDefault();
  }
});

document.addEventListener("keyup", e => {
  if (e.key in keys) keys[e.key] = false;
});

// ---- Input: Mouse ----
canvas.addEventListener("mousemove", e => {
  if (!gameActive) return;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  basket.x = Math.max(basket.width / 2, Math.min(W - basket.width / 2, mouseX));
});

// ---- Input: Touch (mobile) ----
canvas.addEventListener("touchmove", e => {
  if (!gameActive) return;
  e.preventDefault();
  const rect  = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const touchX = touch.clientX - rect.left;
  basket.x = Math.max(basket.width / 2, Math.min(W - basket.width / 2, touchX));
}, { passive: false });

// ---- Start button ----
document.getElementById("start-btn").addEventListener("click", startGame);

// ---- Draw initial idle frame ----
drawBackground();
drawBasket();
