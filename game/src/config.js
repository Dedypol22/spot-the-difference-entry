export const CONFIG = {
  WIDTH: 1280,
  HEIGHT: 800,
  HEADER_HEIGHT: 76,
  FOOTER_HEIGHT: 56,
  PANEL_WIDTH: 620,
  PANEL_HEIGHT: 668,
  PANEL_Y: 76,
  PANEL_MARGIN: 10,
  PANEL_GAP: 20,

  FONT: '"Segoe UI", system-ui, -apple-system, Roboto, "DejaVu Sans", Arial, sans-serif',

  COLORS: {
    INK: '#0a0d18',
    DEEP: '#121629',
    HUD: '#141a2e',
    HUD_LINE: '#2c3554',
    CREAM: '#fdf3dd',
    GOLD: '#f6c85f',
    GOLD_BRIGHT: '#ffe9a8',
    GOLD_DARK: '#b8892f',
    RED: '#e8555a',
    RED_DARK: '#a32b34',
    MINT: '#7ee0b8',
    BLUE: '#5aa9e6',
    WHITE: '#ffffff',
    PANEL_EDGE: '#2b3350'
  },

  POINTS: {
    FIND: 100,
    COMBO_STEP: 25,
    COMBO_MAX: 5,
    WRONG: -25,
    HINT: -50,
    TIME_BONUS: 10
  },

  TIMING: {
    HINT_SECONDS: 3,
    HINT_COOLDOWN: 10,
    COMBO_WINDOW: 5,
    WRONG_FLASH: 0.55,
    TOAST_SECONDS: 1.1,
    TIMER_RED: 30
  },

  HINTS_PER_LEVEL: 3
};

export const LAYOUT = {
  header: { x: 0, y: 0, w: CONFIG.WIDTH, h: CONFIG.HEADER_HEIGHT },
  footer: {
    x: 0,
    y: CONFIG.HEIGHT - CONFIG.FOOTER_HEIGHT,
    w: CONFIG.WIDTH,
    h: CONFIG.FOOTER_HEIGHT
  },
  left: {
    x: CONFIG.PANEL_MARGIN,
    y: CONFIG.PANEL_Y,
    w: CONFIG.PANEL_WIDTH,
    h: CONFIG.PANEL_HEIGHT
  },
  right: {
    x: CONFIG.WIDTH - CONFIG.PANEL_MARGIN - CONFIG.PANEL_WIDTH,
    y: CONFIG.PANEL_Y,
    w: CONFIG.PANEL_WIDTH,
    h: CONFIG.PANEL_HEIGHT
  }
};

export function formatTime(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
