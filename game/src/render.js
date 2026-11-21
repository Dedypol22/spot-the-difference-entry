import { CONFIG } from './config.js';
import { drawObject } from './draw-objects.js';

export function renderScene(ctx, scene, side, foundIds, hintId, hintPulse, crosshair) {
  const variant = side === 'left' ? 'left' : 'right';
  drawBackdrop(ctx, scene);

  for (const obj of scene.objects || []) drawObject(ctx, obj, variant);

  for (const diff of scene.differences) {
    drawObject(ctx, { ...diff, kind: diff.sprite, diffType: diff.type }, variant);
    const moved = variant === 'right' && diff.type === 'moved';
    const mx = diff.x + (moved ? diff.dx || 0 : 0);
    const my = diff.y + (moved ? diff.dy || 0 : 0);
    if (foundIds.includes(diff.id)) drawMarker(ctx, mx, my, diff.r, CONFIG.COLORS.GOLD);
    if (hintId === diff.id && hintPulse > 0) {
      const k = 1 - Math.min(1, hintPulse / CONFIG.TIMING.HINT_SECONDS);
      drawMarker(ctx, mx, my, diff.r + k * 22, CONFIG.COLORS.GOLD, Math.max(0, 1 - k) * 0.9);
    }
  }

  if (crosshair && crosshair.side === side) {
    const ox = side === 'left'
      ? CONFIG.PANEL_MARGIN
      : CONFIG.WIDTH - CONFIG.PANEL_MARGIN - CONFIG.PANEL_WIDTH;
    drawCrosshair(ctx, crosshair.x - ox, crosshair.y - CONFIG.PANEL_Y);
  }

  drawVignette(ctx);
}

function drawBackdrop(ctx, scene) {
  const W = CONFIG.PANEL_WIDTH;
  const H = CONFIG.PANEL_HEIGHT;
  const sky = scene.sky || ['#0a0d24', '#241a45', '#4a2545'];
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, sky[0]);
  g.addColorStop(0.6, sky[1]);
  g.addColorStop(0.85, sky[2]);
  g.addColorStop(1, sky[2]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  const ground = scene.id === 'harbor' ? [360, '#1d3550']
    : scene.id === 'garden' ? [470, '#4f8f3a']
    : [560, '#241a2e'];
  ctx.fillStyle = ground[1];
  ctx.fillRect(0, ground[0], W, H - ground[0]);

  if (scene.id === 'garden') {
    ctx.fillStyle = '#6aa84f';
    ctx.beginPath();
    ctx.moveTo(0, 470);
    ctx.quadraticCurveTo(160, 380, 310, 430);
    ctx.quadraticCurveTo(480, 360, 620, 450);
    ctx.lineTo(620, 470);
    ctx.fill();
  } else if (scene.id === 'harbor') {
    ctx.strokeStyle = 'rgba(255,255,255,.18)';
    ctx.lineWidth = 2;
    for (let y = 400; y < H; y += 34) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(W / 2, y + 8, W, y);
      ctx.stroke();
    }
    ctx.fillStyle = '#d9b382';
    ctx.fillRect(0, 612, W, H - 612);
    ctx.fillStyle = '#6b4a2b';
    ctx.fillRect(0, 600, 170, 12);
  }

  if (scene.id === 'market') {
    drawObject(ctx, { kind: 'moon', x: 505, y: 96, color: '#f7ecc8' }, 'left');
  } else {
    drawObject(ctx, {
      kind: 'sun',
      x: scene.id === 'garden' ? 92 : 150,
      y: scene.id === 'garden' ? 96 : 320,
      color: '#ffe9a8'
    }, 'left');
  }
}

function drawVignette(ctx) {
  const W = CONFIG.PANEL_WIDTH;
  const H = CONFIG.PANEL_HEIGHT;
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.28)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawMarker(ctx, x, y, r, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, r + 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawCrosshair(ctx, x, y) {
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 15, y); ctx.lineTo(x + 15, y);
  ctx.moveTo(x, y - 15); ctx.lineTo(x, y + 15);
  ctx.stroke();
  // Outer circle
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.stroke();
}
