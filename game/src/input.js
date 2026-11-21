import { CONFIG } from './config.js';

export function setupInput(canvas, onAction) {
  const state = {
    mouseX: 0,
    mouseY: 0,
    crosshair: { x: CONFIG.WIDTH / 4, y: CONFIG.HEIGHT / 2, side: 'left' }
  };

  const getSide = (x) => {
    const mid = CONFIG.WIDTH / 2;
    const margin = (mid - CONFIG.PANEL_WIDTH) / 2;
    if (x >= margin && x <= margin + CONFIG.PANEL_WIDTH) return 'left';
    if (x >= mid + margin && x <= mid + margin + CONFIG.PANEL_WIDTH) return 'right';
    return null;
  };

  const getPanelPos = (x, y) => {
    const side = getSide(x);
    if (!side) return null;

    const mid = CONFIG.WIDTH / 2;
    const margin = (mid - CONFIG.PANEL_WIDTH) / 2;
    const header = CONFIG.HEADER_HEIGHT;

    const px = side === 'left' ? x - margin : x - (mid + margin);
    const py = y - header;

    if (py < 0 || py > CONFIG.PANEL_HEIGHT) return null;

    return { side, x: px, y: py };
  };

  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (CONFIG.WIDTH / rect.width);
    const y = (e.clientY - rect.top) * (CONFIG.HEIGHT / rect.height);
    const pos = getPanelPos(x, y);
    if (pos) {
      onAction({ type: 'click', ...pos });
    }
  });

  window.addEventListener('keydown', (e) => {
    const speed = 20;
    const ch = state.crosshair;
    const mid = CONFIG.WIDTH / 2;
    const margin = (mid - CONFIG.PANEL_WIDTH) / 2;

    switch (e.key) {
      case 'ArrowLeft':
        ch.x -= speed;
        if (ch.x < margin) ch.x = margin;
        break;
      case 'ArrowRight':
        ch.x += speed;
        if (ch.x > CONFIG.WIDTH - margin) ch.x = CONFIG.WIDTH - margin;
        break;
      case 'ArrowUp':
        ch.y -= speed;
        if (ch.y < CONFIG.HEADER_HEIGHT) ch.y = CONFIG.HEADER_HEIGHT;
        break;
      case 'ArrowDown':
        ch.y += speed;
        if (ch.y > CONFIG.HEADER_HEIGHT + CONFIG.PANEL_HEIGHT) ch.y = CONFIG.HEADER_HEIGHT + CONFIG.PANEL_HEIGHT;
        break;
      case ' ':
      case 'Enter':
        const pos = getPanelPos(ch.x, ch.y);
        if (pos) onAction({ type: 'click', ...pos });
        break;
      case 'h':
      case 'H':
        onAction({ type: 'hint' });
        break;
      case 'p':
      case 'P':
      case 'Escape':
        onAction({ type: 'pause' });
        break;
      case 'r':
      case 'R':
        onAction({ type: 'restart' });
        break;
      case 'm':
      case 'M':
        onAction({ type: 'mute' });
        break;
      case '1':
      case '2':
      case '3':
        onAction({ type: 'selectLevel', level: parseInt(e.key) - 1 });
        break;
    }

    // Sync side
    const side = getSide(ch.x);
    if (side) {
      ch.side = side;
      const pos = getPanelPos(ch.x, ch.y);
      ch.px = pos.x;
      ch.py = pos.y;
    }
  });

  return state;
}
