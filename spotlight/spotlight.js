const darkness = document.getElementById("darkness");
const dot = document.getElementById("dot");
const overlayText = document.getElementById("overlayText");

let mx = -999,
  my = -999,
  cx = -999,
  cy = -999;
let currentR = 0,
  targetR = 0;
let revealed = false;
const RADIUS = 190;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

(function tick() {
  cx = lerp(cx, mx, 0.12);
  cy = lerp(cy, my, 0.12);
  currentR = lerp(currentR, targetR, 0.1);

  darkness.style.setProperty("--x", cx + "px");
  darkness.style.setProperty("--y", cy + "px");
  darkness.style.setProperty("--r", Math.round(currentR) + "px");

  dot.style.left = mx + "px";
  dot.style.top = my + "px";
  requestAnimationFrame(tick);
})();

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (!revealed) {
    revealed = true;
    targetR = RADIUS;
    dot.style.opacity = "1";
    setTimeout(() => overlayText.classList.add("gone"), 500);
  }
});

document.addEventListener("mousedown", () => {
  targetR = RADIUS * 0.65;
});
document.addEventListener("mouseup", () => {
  targetR = RADIUS;
});
