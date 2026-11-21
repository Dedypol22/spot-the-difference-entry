import { CONFIG, formatTime } from './config.js';
import { World } from './world.js';
import { setupInput } from './input.js';
import { renderScene } from './render.js';
import { SCENES } from './scenes.js';
import { AUDIO } from './audio.js';
import { applyShot } from './shots.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = CONFIG.WIDTH;
canvas.height = CONFIG.HEIGHT;

const world = new World();
const input = setupInput(canvas, (action) => world.handleAction(action));

let lastTime = 0;
function loop(time) {
  const dt = Math.min(0.1, (time - lastTime) / 1000);
  lastTime = time;

  world.update(dt);
  render();

  requestAnimationFrame(loop);
}

function render() {
  // Clear
  ctx.fillStyle = CONFIG.COLORS.INK;
  ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

  const scene = SCENES[world.currentLevel];

  if (world.state === 'play' || world.state === 'paused' || world.state === 'levelComplete' || world.state === 'win') {
    // HUD Header
    ctx.fillStyle = CONFIG.COLORS.HUD;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEADER_HEIGHT);

    ctx.fillStyle = CONFIG.COLORS.CREAM;
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(scene.name, 20, 40);

    ctx.textAlign = 'center';
    ctx.fillText(`Ditemukan: ${world.levelFoundIds.length}/${scene.differences.length}`, CONFIG.WIDTH / 2, 40);

    ctx.textAlign = 'right';
    ctx.fillText(`Skor: ${world.score}`, CONFIG.WIDTH - 20, 40);

    // Timer bar
    const timerWidth = 300;
    const timeRatio = Math.max(0, Math.min(1, world.timeLeft / scene.duration));
    ctx.fillStyle = '#444';
    ctx.fillRect(CONFIG.WIDTH / 2 - timerWidth / 2, 50, timerWidth, 10);
    ctx.fillStyle = world.timeLeft < CONFIG.TIMING.TIMER_RED ? CONFIG.COLORS.RED : CONFIG.COLORS.GOLD;
    ctx.fillRect(CONFIG.WIDTH / 2 - timerWidth / 2, 50, timerWidth * timeRatio, 10);
    ctx.fillStyle = CONFIG.COLORS.CREAM;
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(formatTime(world.timeLeft), CONFIG.WIDTH / 2 + timerWidth / 2 + 12, 60);

    // Panels
    const mid = CONFIG.WIDTH / 2;
    const margin = (mid - CONFIG.PANEL_WIDTH) / 2;
    const header = CONFIG.HEADER_HEIGHT;

    for (const [side, ox] of [['left', margin], ['right', mid + margin]]) {
      ctx.save();
      ctx.translate(ox, header);
      renderScene(ctx, scene, side, world.levelFoundIds, world.activeHintId, world.hintPulse, input.crosshair);
      ctx.strokeStyle = CONFIG.COLORS.PANEL_EDGE;
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, CONFIG.PANEL_WIDTH, CONFIG.PANEL_HEIGHT);
      ctx.restore();
    }

    // Footer
    ctx.fillStyle = CONFIG.COLORS.HUD;
    ctx.fillRect(0, CONFIG.HEIGHT - CONFIG.FOOTER_HEIGHT, CONFIG.WIDTH, CONFIG.FOOTER_HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Hint: ${world.hintsLeft} (H) | Cooldown: ${Math.ceil(world.hintCooldown / 1000)}s`, 20, CONFIG.HEIGHT - 15);
    ctx.textAlign = 'right';
    ctx.fillText(`M: ${AUDIO.isMuted() ? 'Muted' : 'Sound On'} | P: Pause | R: Restart`, CONFIG.WIDTH - 20, CONFIG.HEIGHT - 15);

    if (world.wrongFlash > 0) {
      ctx.fillStyle = `rgba(255, 0, 0, ${world.wrongFlash * 0.5})`;
      ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
    }
  }

  // Overlays
  if (world.state === 'title') {
    renderOverlay("PASAR MALAM", "Cari Perbedaannya!", "Tekan 1, 2, atau 3 untuk memilih level", `Skor Terbaik: ${world.bestScore}`);
  } else if (world.state === 'paused') {
    renderOverlay("PAUSED", "Tekan P untuk lanjut", "R untuk restart", "M untuk mute");
  } else if (world.state === 'levelComplete') {
    renderOverlay("LEVEL SELESAI!", "Bonus Waktu ditambahkan", "Klik untuk level berikutnya", "");
  } else if (world.state === 'win') {
    const acc = Math.round((world.correctClicks / Math.max(1, world.totalClicks)) * 100);
    renderOverlay("ANDA MENANG!", `Total Skor: ${world.score}`, `Akurasi: ${acc}%`, "Tekan R untuk main lagi");
  }
}

function renderOverlay(title, sub1, sub2, sub3) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

  ctx.fillStyle = CONFIG.COLORS.GOLD;
  ctx.textAlign = 'center';
  ctx.font = 'bold 60px sans-serif';
  ctx.fillText(title, CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 80);

  ctx.fillStyle = '#fff';
  ctx.font = '30px sans-serif';
  ctx.fillText(sub1, CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2);
  ctx.font = '24px sans-serif';
  ctx.fillText(sub2, CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 50);
  ctx.fillText(sub3, CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 90);
}

// Check for shots
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('shot')) {
  applyShot(world, urlParams.get('shot'), urlParams.get('seed') || 1);
  render(); // Single render for screenshot
} else {
  requestAnimationFrame(loop);
}

// Click to start/next
canvas.addEventListener('mousedown', () => {
  if (world.state === 'levelComplete') {
    world.nextLevel();
  } else if (world.state === 'win') {
    world.state = 'title';
  }
});
