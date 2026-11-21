import { SCENES } from './scenes.js';

export function applyShot(world, shotType, seed = 1) {
  world.shotSeed = Number(seed) || 1;
  if (shotType === 'title') {
    world.state = 'title';
  } else if (shotType === 'play') {
    world.startLevel(0);
    const scene = SCENES[0];
    world.levelFoundIds = scene.differences.slice(0, 4).map(d => d.id);
    world.totalFound = 4;
    world.timeLeft = 137;
    world.score = 450;
    world.totalClicks = 6;
    world.correctClicks = 4;
  } else if (shotType === 'level2') {
    world.startLevel(1);
    const scene = SCENES[1];
    world.levelFoundIds = scene.differences.slice(0, 2).map(d => d.id);
    world.totalFound = 14;
    world.timeLeft = 108;
    world.score = 1600;
    world.totalClicks = 16;
    world.correctClicks = 14;
  } else if (shotType === 'win') {
    world.currentLevel = SCENES.length - 1;
    const scene = SCENES[2];
    world.levelFoundIds = scene.differences.map(d => d.id);
    world.totalFound = 32;
    world.score = 3500;
    world.timeLeft = 0;
    world.totalClicks = 35;
    world.correctClicks = 32;
    world.state = 'win';
  }
}
