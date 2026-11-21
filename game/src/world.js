import { CONFIG } from './config.js';
import { SCENES } from './scenes.js';
import { AUDIO } from './audio.js';

export class World {
  constructor() {
    this.state = 'title'; // title, play, levelComplete, win, paused
    this.currentLevel = 0;
    this.score = 0;
    this.totalFound = 0;
    this.levelFoundIds = [];
    this.timeLeft = 0;
    this.hintsLeft = CONFIG.HINTS_PER_LEVEL;
    this.hintCooldown = 0;
    this.activeHintId = null;
    this.hintPulse = 0;
    this.combo = 0;
    this.lastFindTime = 0;
    this.totalClicks = 0;
    this.correctClicks = 0;
    this.bestScore = Number(localStorage.getItem('bestScore')) || 0;
    this.wrongFlash = 0;
  }

  startLevel(index) {
    this.currentLevel = index;
    const scene = SCENES[this.currentLevel];
    this.levelFoundIds = [];
    this.timeLeft = scene.duration;
    this.hintsLeft = CONFIG.HINTS_PER_LEVEL;
    this.hintCooldown = 0;
    this.activeHintId = null;
    this.state = 'play';
    this.combo = 0;
    this.lastFindTime = 0;
    AUDIO.init();
  }

  update(dt) {
    if (this.state === 'play') {
      this.timeLeft -= dt;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.state = 'title'; // Game over (simplified)
      }

      if (this.hintCooldown > 0) {
        this.hintCooldown -= dt * 1000;
      }

      if (this.activeHintId !== null) {
        this.hintPulse -= dt;
        if (this.hintPulse <= 0) {
          this.activeHintId = null;
        }
      }

      if (this.wrongFlash > 0) {
        this.wrongFlash -= dt;
      }
    }
  }

  handleAction(action) {
    if (action.type === 'click') {
      if (this.state !== 'play') return;
      this.totalClicks++;
      const scene = SCENES[this.currentLevel];
      let diff = null;
      let best = Infinity;
      for (const d of scene.differences) {
        if (this.levelFoundIds.includes(d.id)) continue;
        const ox = action.side === 'right' && d.type === 'moved' ? d.dx || 0 : 0;
        const dx = d.x + ox - action.x;
        const dy = d.y - action.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= d.r + 15 && dist < best) {
          best = dist;
          diff = d;
        }
      }

      if (diff && !this.levelFoundIds.includes(diff.id)) {
        this.levelFoundIds.push(diff.id);
        this.totalFound++;
        this.correctClicks++;

        // Combo
        const now = Date.now();
        if (now - this.lastFindTime < CONFIG.TIMING.COMBO_WINDOW * 1000) {
          this.combo++;
        } else {
          this.combo = 1;
        }
        this.lastFindTime = now;

        const points = CONFIG.POINTS.FIND + (this.combo - 1) * 20;
        this.score += points;
        AUDIO.find();

        if (this.levelFoundIds.length === scene.differences.length) {
          this.finishLevel();
        }
      } else {
        this.score = Math.max(0, this.score + CONFIG.POINTS.WRONG);
        this.wrongFlash = CONFIG.TIMING.WRONG_FLASH;
        this.combo = 0;
        AUDIO.wrong();
      }
    } else if (action.type === 'hint') {
      this.useHint();
    } else if (action.type === 'pause') {
      if (this.state === 'play') this.state = 'paused';
      else if (this.state === 'paused') this.state = 'play';
    } else if (action.type === 'restart') {
      this.startLevel(this.currentLevel);
    } else if (action.type === 'mute') {
      AUDIO.toggleMute();
    } else if (action.type === 'selectLevel') {
      if (this.state === 'title') {
        this.score = 0;
        this.totalFound = 0;
        this.totalClicks = 0;
        this.correctClicks = 0;
        this.startLevel(action.level);
      }
    }
  }

  useHint() {
    if (this.state !== 'play' || this.hintsLeft <= 0 || this.hintCooldown > 0 || this.score + CONFIG.POINTS.HINT < 0) return;

    const scene = SCENES[this.currentLevel];
    const unfound = scene.differences.filter(d => !this.levelFoundIds.includes(d.id));
    if (unfound.length > 0) {
      this.activeHintId = unfound[Math.floor(Math.random() * unfound.length)].id;
      this.hintPulse = CONFIG.TIMING.HINT_SECONDS;
      this.hintsLeft--;
      this.hintCooldown = CONFIG.TIMING.HINT_COOLDOWN * 1000;
      this.score = Math.max(0, this.score + CONFIG.POINTS.HINT);
      AUDIO.hint();
    }
  }

  finishLevel() {
    const bonus = Math.floor(this.timeLeft * CONFIG.POINTS.TIME_BONUS);
    this.score += bonus;
    AUDIO.fanfare();

    if (this.currentLevel < SCENES.length - 1) {
      this.state = 'levelComplete';
    } else {
      this.state = 'win';
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        localStorage.setItem('bestScore', this.bestScore);
      }
    }
  }

  nextLevel() {
    this.startLevel(this.currentLevel + 1);
  }
}
