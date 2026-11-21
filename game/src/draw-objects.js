const KIND_ALIAS = { sign: 'sign', menu: 'sign', bulb: 'lantern', bird: 'gull' };

export function drawObject(ctx, obj, variant = 'left') {
  const kind = KIND_ALIAS[obj.kind || obj.sprite] || obj.kind || obj.sprite;
  const diff = obj.diffType || obj.type;
  if (diff === 'extra' && variant === 'left') return;
  if (diff === 'missing' && variant === 'right') return;

  let color = obj.color || '#fdf3dd';
  if (diff === 'colour' && variant === 'right') color = obj.altColor || color;
  const x = obj.x + (diff === 'moved' && variant === 'right' ? (obj.dx || 0) : 0);
  const y = obj.y + (diff === 'moved' && variant === 'right' ? (obj.dy || 0) : 0);
  const s = obj.scale || 1;

  ctx.save();
  ctx.translate(x, y);
  if (diff === 'flipped' && variant === 'right') ctx.scale(-1, 1);
  ctx.scale(s, s);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  switch (kind) {
    case 'stall':
      ctx.fillRect(-40, -10, 80, 42);
      ctx.fillStyle = '#f6c85f';
      for (let i = -40; i < 40; i += 16) ctx.fillRect(i, -30, 8, 20);
      ctx.strokeRect(-42, -12, 84, 46);
      break;
    case 'lantern':
      ctx.beginPath(); ctx.moveTo(0, -26); ctx.lineTo(0, -12); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 2, 11, 15, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#5a2a12'; ctx.fillRect(-8, -14, 16, 4); ctx.fillRect(-6, 14, 12, 4);
      break;
    case 'lights':
      ctx.beginPath(); ctx.moveTo(-40, -12); ctx.quadraticCurveTo(0, 12, 40, -12); ctx.stroke();
      for (let i = -30; i <= 30; i += 15) {
        ctx.beginPath(); ctx.arc(i, -4 + Math.abs(i) * 0.2, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffe9a8'; ctx.fill();
      }
      break;
    case 'balloon':
      ctx.beginPath(); ctx.ellipse(0, -4, 16, 20, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, 16); ctx.quadraticCurveTo(8, 40, 0, 58); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(-5, -10, 4, 0, 7); ctx.fill();
      break;
    case 'cat':
      ctx.beginPath(); ctx.ellipse(0, 8, 16, 13, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -10, 10, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-8, -16); ctx.lineTo(-4, -26); ctx.lineTo(0, -16); ctx.fill();
      ctx.beginPath(); ctx.moveTo(8, -16); ctx.lineTo(4, -26); ctx.lineTo(0, -16); ctx.fill();
      ctx.strokeStyle = color; ctx.beginPath(); ctx.moveTo(12, 12); ctx.quadraticCurveTo(30, 10, 26, -4); ctx.stroke();
      ctx.fillStyle = '#7ee0b8'; ctx.fillRect(-5, -12, 3, 3); ctx.fillRect(3, -12, 3, 3);
      break;
    case 'sign':
      ctx.fillRect(-22, -12, 44, 28);
      ctx.fillStyle = '#2a1a12'; ctx.fillRect(-16, -5, 32, 3); ctx.fillRect(-16, 3, 22, 3);
      ctx.strokeStyle = '#2a1a12'; ctx.strokeRect(-22, -12, 44, 28);
      break;
    case 'becak':
      ctx.fillRect(-24, -8, 40, 20);
      ctx.beginPath(); ctx.moveTo(-30, -8); ctx.lineTo(-14, -26); ctx.lineTo(14, -26); ctx.lineTo(24, -8); ctx.fill();
      ctx.fillStyle = '#1b1b1b';
      ctx.beginPath(); ctx.arc(-16, 20, 11, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(20, 20, 11, 0, 7); ctx.fill();
      break;
    case 'tree':
      ctx.fillStyle = '#6b4a2b'; ctx.fillRect(-5, -4, 10, 34);
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(0, -18, 20, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(-14, -6, 13, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(14, -6, 13, 0, 7); ctx.fill();
      break;
    case 'flower':
      ctx.strokeStyle = '#3f8f4a'; ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, -2); ctx.stroke();
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.ellipse(Math.cos(i * 1.047) * 9, -2 + Math.sin(i * 1.047) * 9, 6, 4, i * 1.047, 0, 7); ctx.fill();
      }
      ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(0, -2, 5, 0, 7); ctx.fill();
      break;
    case 'pond':
      ctx.beginPath(); ctx.ellipse(0, 0, 42, 18, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(0, 0, 28, 10, 0, 0, 7); ctx.stroke();
      break;
    case 'koi':
      ctx.beginPath(); ctx.ellipse(0, 0, 16, 8, 0, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(-26, -8); ctx.lineTo(-26, 8); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(8, -2, 3, 0, 7); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(9, -2, 1.4, 0, 7); ctx.fill();
      break;
    case 'butterfly':
      ctx.beginPath(); ctx.ellipse(-9, -4, 9, 12, -0.5, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.ellipse(9, -4, 9, 12, 0.5, 0, 7); ctx.fill();
      ctx.fillStyle = '#2a1a12'; ctx.fillRect(-2, -10, 4, 20);
      ctx.strokeStyle = '#2a1a12'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(-6, -20); ctx.moveTo(0, -10); ctx.lineTo(6, -20); ctx.stroke();
      break;
    case 'fountain':
      ctx.fillStyle = '#cfd8c9'; ctx.beginPath(); ctx.ellipse(0, 20, 30, 10, 0, 0, 7); ctx.fill();
      ctx.fillRect(-6, -14, 12, 34);
      ctx.beginPath(); ctx.ellipse(0, -16, 18, 6, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = '#9fd8ef'; ctx.beginPath(); ctx.moveTo(0, -18); ctx.quadraticCurveTo(-16, -34, -6, -40); ctx.moveTo(0, -18); ctx.quadraticCurveTo(16, -34, 6, -40); ctx.stroke();
      break;
    case 'bench':
      ctx.fillStyle = color; ctx.fillRect(-22, -4, 44, 7);
      ctx.fillRect(-22, -18, 44, 6);
      ctx.fillStyle = '#4a3222'; ctx.fillRect(-18, 3, 4, 16); ctx.fillRect(14, 3, 4, 16);
      break;
    case 'boat':
      ctx.beginPath(); ctx.moveTo(-30, 4); ctx.lineTo(30, 4); ctx.lineTo(20, 20); ctx.lineTo(-20, 20); ctx.fill();
      ctx.strokeStyle = '#4a3222'; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0, -34); ctx.stroke();
      ctx.fillStyle = '#fdf3dd'; ctx.beginPath(); ctx.moveTo(2, -32); ctx.lineTo(26, 0); ctx.lineTo(2, 0); ctx.fill();
      break;
    case 'lighthouse':
      ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.moveTo(-16, 40); ctx.lineTo(-9, -30); ctx.lineTo(9, -30); ctx.lineTo(16, 40); ctx.fill();
      ctx.fillStyle = color; ctx.fillRect(-12, -8, 24, 8); ctx.fillRect(-14, 16, 28, 8);
      ctx.fillStyle = '#2b3350'; ctx.fillRect(-11, -38, 22, 10);
      break;
    case 'crate':
      ctx.fillRect(-18, -16, 36, 32);
      ctx.strokeStyle = '#5a3a1e'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-18, -16); ctx.lineTo(18, 16); ctx.moveTo(18, -16); ctx.lineTo(-18, 16); ctx.stroke();
      ctx.strokeRect(-18, -16, 36, 32);
      break;
    case 'gull':
      ctx.beginPath(); ctx.ellipse(0, 2, 14, 8, 0, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(10, -8, 7, 0, 7); ctx.fill();
      ctx.fillStyle = '#f6a04d'; ctx.beginPath(); ctx.moveTo(16, -8); ctx.lineTo(24, -5); ctx.lineTo(16, -3); ctx.fill();
      ctx.fillStyle = '#9aa6c4'; ctx.beginPath(); ctx.ellipse(-2, -2, 9, 5, -0.3, 0, 7); ctx.fill();
      break;
    case 'net':
      ctx.strokeStyle = color; ctx.lineWidth = 1.5;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath(); ctx.moveTo(i * 8, -18); ctx.lineTo(i * 8, 24); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-26, i * 7); ctx.lineTo(26, i * 7); ctx.stroke();
      }
      ctx.fillStyle = '#d9b382'; ctx.beginPath(); ctx.arc(-26, -18, 4, 0, 7); ctx.arc(26, -18, 4, 0, 7); ctx.fill();
      break;
    case 'sun':
      ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath(); ctx.moveTo(Math.cos(i * 0.785) * 22, Math.sin(i * 0.785) * 22);
        ctx.lineTo(Math.cos(i * 0.785) * 29, Math.sin(i * 0.785) * 29); ctx.stroke();
      }
      break;
    case 'moon':
      ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fill();
      ctx.fillStyle = variant === 'right' ? color : '#2a2f43';
      ctx.beginPath(); ctx.arc(8, -5, 15, 0, 7); ctx.fill();
      break;
    case 'flag':
      ctx.strokeStyle = '#8a6a45'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, 26); ctx.lineTo(0, -26); ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(0, -26); ctx.lineTo(24, -20); ctx.lineTo(0, -12); ctx.fill();
      break;
    case 'kettle':
      ctx.beginPath(); ctx.ellipse(0, 2, 15, 13, 0, 0, 7); ctx.fill();
      ctx.fillStyle = '#7a6a5a'; ctx.fillRect(-6, -14, 12, 5);
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, -6, 9, Math.PI, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(24, -6); ctx.stroke();
      break;
    case 'bucket':
      ctx.beginPath(); ctx.moveTo(-14, -8); ctx.lineTo(14, -8); ctx.lineTo(10, 16); ctx.lineTo(-10, 16); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, -8, 14, Math.PI, 0); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-10, 0, 20, 4);
      break;
    case 'bee':
      ctx.beginPath(); ctx.ellipse(0, 0, 12, 9, 0, 0, 7); ctx.fill();
      ctx.fillStyle = '#2a1a12'; ctx.fillRect(-4, -8, 3, 16); ctx.fillRect(3, -8, 3, 16);
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      ctx.beginPath(); ctx.ellipse(-6, -10, 7, 4, -0.6, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.ellipse(5, -10, 7, 4, 0.6, 0, 7); ctx.fill();
      break;
    case 'gnome':
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(-12, -8); ctx.lineTo(12, -8); ctx.fill();
      ctx.fillStyle = '#f2c9a0'; ctx.beginPath(); ctx.arc(0, -2, 8, 0, 7); ctx.fill();
      ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.moveTo(-8, 4); ctx.lineTo(8, 4); ctx.lineTo(0, 20); ctx.fill();
      ctx.fillStyle = color; ctx.fillRect(-9, 4, 18, 14);
      break;
    case 'duck':
      ctx.beginPath(); ctx.ellipse(0, 6, 16, 10, 0, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(10, -6, 8, 0, 7); ctx.fill();
      ctx.fillStyle = '#f6a04d'; ctx.beginPath(); ctx.moveTo(17, -6); ctx.lineTo(26, -3); ctx.lineTo(17, 0); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(12, -8, 1.6, 0, 7); ctx.fill();
      break;
    case 'dragonfly':
      ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.beginPath(); ctx.ellipse(-8, -8, 10, 4, -0.5, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.ellipse(8, -8, 10, 4, 0.5, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-6, 0, 9, 3, 0.3, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6, 0, 9, 3, -0.3, 0, 7); ctx.fill();
      ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(0, 0, 3, 14, 0, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -14, 4, 0, 7); ctx.fill();
      break;
    case 'wateringcan':
      ctx.fillRect(-10, -12, 20, 24);
      ctx.beginPath(); ctx.moveTo(10, -8); ctx.lineTo(26, -18); ctx.lineTo(22, -10); ctx.lineTo(10, 0); ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(-2, -16, 9, Math.PI, 0); ctx.stroke();
      break;
    case 'lamp':
      ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -28); ctx.lineTo(0, -16); ctx.stroke();
      ctx.fillStyle = 'rgba(255,233,168,.35)'; ctx.beginPath(); ctx.arc(0, 0, 20, 0, 7); ctx.fill();
      ctx.fillStyle = '#4a3a2a'; ctx.fillRect(-10, -16, 20, 4);
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(-8, -12); ctx.lineTo(8, -12); ctx.lineTo(11, 8); ctx.lineTo(-11, 8); ctx.fill();
      break;
    case 'buoy':
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, 7); ctx.fill();
      ctx.fillStyle = '#fdf3dd'; ctx.fillRect(-14, -3, 28, 6);
      ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, -24); ctx.stroke();
      ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(0, -26, 3, 0, 7); ctx.fill();
      break;
    case 'crab':
      ctx.beginPath(); ctx.ellipse(0, 0, 16, 11, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(side * 12, -2); ctx.lineTo(side * 26, -10); ctx.stroke();
        ctx.beginPath(); ctx.arc(side * 28, -12, 4, 0, 7); ctx.stroke();
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath(); ctx.moveTo(side * 10, i * 5); ctx.lineTo(side * 20, i * 8 + 6); ctx.stroke();
        }
      }
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(-5, -4, 2, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(5, -4, 2, 0, 7); ctx.fill();
      break;
    case 'starfish': {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5;
        const rr = i % 2 ? 8 : 20;
        const px = Math.cos(a) * rr;
        const py = Math.sin(a) * rr;
        if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.arc(0, 0, 3, 0, 7); ctx.fill();
      break;
    }
    case 'window':
      ctx.fillStyle = '#2b3350'; ctx.fillRect(-12, -12, 24, 24);
      ctx.fillStyle = color; ctx.fillRect(-9, -9, 18, 18);
      ctx.strokeStyle = '#2b3350'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(0, 9); ctx.moveTo(-9, 0); ctx.lineTo(9, 0); ctx.stroke();
      break;
    case 'rope':
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.ellipse(0, 4 + i * 8, 22 - i * 3, 9 - i * 2, 0, 0, 7); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(20, 20); ctx.quadraticCurveTo(32, 10, 26, -6); ctx.stroke();
      break;
    case 'postgull':
      ctx.fillStyle = '#6b4a2b'; ctx.fillRect(-4, 0, 8, 70);
      ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(0, -10, 12, 7, 0, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(8, -18, 6, 0, 7); ctx.fill();
      ctx.fillStyle = '#f6a04d'; ctx.beginPath(); ctx.moveTo(13, -18); ctx.lineTo(20, -15); ctx.lineTo(13, -13); ctx.fill();
      break;
    case 'lilypad':
      ctx.beginPath(); ctx.ellipse(0, 0, 22, 12, 0, 0.35, Math.PI * 2 - 0.35); ctx.lineTo(0, 0); ctx.fill();
      ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(0, -4, 5, 0, 7); ctx.fill();
      break;
    default:
      ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill();
  }
  ctx.restore();
}
