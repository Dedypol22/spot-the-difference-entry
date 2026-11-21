export const SCENES = [
  {
    id: 'market',
    name: 'Pasar Malam',
    tagline: 'Lentera, gerobak, dan kucing pasar',
    duration: 180,
    seed: 1301,
    sky: ['#0a0d24', '#241a45', '#4a2545'],
    objects: [
      { kind: 'lights', x: 150, y: 108, scale: 2.2 },
      { kind: 'lights', x: 360, y: 96, scale: 2.0 },
      { kind: 'lights', x: 520, y: 112, scale: 1.8 },
      { kind: 'tree', x: 26, y: 586, scale: 1.2, color: '#2f7d4a' },
      { kind: 'tree', x: 598, y: 590, scale: 1.4, color: '#2f7d4a' },
      { kind: 'stall', x: 120, y: 552, scale: 1.7, color: '#6f3b2a' },
      { kind: 'stall', x: 315, y: 548, scale: 1.5, color: '#2f5f52' },
      { kind: 'stall', x: 500, y: 552, scale: 1.6, color: '#6f3b2a' },
      { kind: 'lantern', x: 140, y: 168, scale: 1.0 },
      { kind: 'lantern', x: 260, y: 176, scale: 0.9 },
      { kind: 'lantern', x: 520, y: 178, scale: 1.0 },
      { kind: 'becak', x: 415, y: 622, scale: 1.1, color: '#2f7f8f' },
      { kind: 'crate', x: 205, y: 640, scale: 0.8 }
    ],
    differences: [
      { id: 101, sprite: 'lantern', type: 'missing', x: 70, y: 150, r: 30, color: '#e8555a', scale: 1.15, label: 'Lentera kiri hilang' },
      { id: 102, sprite: 'bulb', type: 'missing', x: 395, y: 138, r: 22, color: '#ffe9a8', scale: 1.1, label: 'Lampu rangkaian hilang' },
      { id: 103, sprite: 'balloon', type: 'colour', x: 540, y: 205, r: 30, color: '#e8555a', altColor: '#5aa9e6', scale: 1.2, label: 'Balon berganti warna' },
      { id: 104, sprite: 'cat', type: 'extra', x: 80, y: 610, r: 34, color: '#cf7b3a', scale: 1.0, label: 'Kucing ekstra' },
      { id: 105, sprite: 'crate', type: 'moved', x: 255, y: 628, r: 34, dx: 46, dy: 0, color: '#a9743d', scale: 1.1, label: 'Krat berpindah' },
      { id: 106, sprite: 'flag', type: 'flipped', x: 470, y: 460, r: 26, color: '#f6c85f', label: 'Bendera terbalik' },
      { id: 107, sprite: 'menu', type: 'colour', x: 112, y: 470, r: 30, color: '#fdf3dd', altColor: '#7ee0b8', scale: 1.0, label: 'Papan menu berganti warna' },
      { id: 108, sprite: 'bird', type: 'extra', x: 235, y: 118, r: 24, color: '#8f9cc7', scale: 1.0, label: 'Burung ekstra' },
      { id: 109, sprite: 'bucket', type: 'extra', x: 560, y: 632, r: 26, color: '#5aa9e6', scale: 1.0, label: 'Ember ekstra' },
      { id: 110, sprite: 'kettle', type: 'missing', x: 330, y: 544, r: 26, color: '#cfd6e6', scale: 1.0, label: 'Ketel hilang' }
    ]
  },
  {
    id: 'garden',
    name: 'Taman Bunga',
    tagline: 'Kolam koi, kupu-kupu, dan air mancur',
    duration: 150,
    seed: 2402,
    sky: ['#8fd3f4', '#c8ecff', '#e8f7d4'],
    objects: [
      { kind: 'tree', x: 70, y: 430, scale: 1.5, color: '#2f8f4a' },
      { kind: 'tree', x: 565, y: 420, scale: 1.6, color: '#2f8f4a' },
      { kind: 'fountain', x: 310, y: 430, scale: 1.6 },
      { kind: 'pond', x: 300, y: 512, scale: 3.0, color: '#6fb7d8' },
      { kind: 'butterfly', x: 470, y: 262, scale: 0.9, color: '#ffd166' },
      { kind: 'flower', x: 140, y: 600, scale: 1.2, color: '#ff6b8a' },
      { kind: 'flower', x: 360, y: 620, scale: 1.1, color: '#b07cff' },
      { kind: 'flower', x: 500, y: 610, scale: 1.0, color: '#ffd166' }
    ],
    differences: [
      { id: 201, sprite: 'koi', type: 'extra', x: 390, y: 492, r: 30, color: '#ff8a3d', scale: 1.1, label: 'Ikan koi ekstra' },
      { id: 202, sprite: 'lilypad', type: 'missing', x: 205, y: 512, r: 28, color: '#3f8f4a', scale: 1.0, label: 'Daun teratai hilang' },
      { id: 203, sprite: 'butterfly', type: 'colour', x: 150, y: 296, r: 26, color: '#b07cff', altColor: '#ffd166', scale: 1.1, label: 'Kupu-kupu berganti warna' },
      { id: 204, sprite: 'flower', type: 'missing', x: 556, y: 452, r: 26, color: '#ff6b8a', scale: 1.0, label: 'Bunga hilang' },
      { id: 205, sprite: 'bee', type: 'extra', x: 330, y: 252, r: 22, color: '#f6c85f', scale: 1.0, label: 'Lebah ekstra' },
      { id: 206, sprite: 'bench', type: 'moved', x: 505, y: 588, r: 30, dx: -40, dy: 0, color: '#8a5a33', scale: 1.0, label: 'Bangku berpindah' },
      { id: 207, sprite: 'gnome', type: 'flipped', x: 92, y: 468, r: 30, color: '#e8555a', scale: 1.05, label: 'Kurcaci terbalik' },
      { id: 208, sprite: 'duck', type: 'extra', x: 245, y: 540, r: 30, color: '#fff6e0', scale: 1.0, label: 'Bebek ekstra' },
      { id: 209, sprite: 'dragonfly', type: 'extra', x: 425, y: 206, r: 24, color: '#5aa9e6', scale: 1.0, label: 'Capung ekstra' },
      { id: 210, sprite: 'wateringcan', type: 'colour', x: 178, y: 616, r: 28, color: '#4f9d5d', altColor: '#e8555a', scale: 1.0, label: 'Penyiram berganti warna' }
    ]
  },
  {
    id: 'harbor',
    name: 'Pelabuhan Senja',
    tagline: 'Mercusuar, perahu, dan camar',
    duration: 120,
    seed: 3503,
    sky: ['#241c46', '#7c3763', '#f08a4b'],
    objects: [
      { kind: 'lighthouse', x: 545, y: 360, scale: 2.2, color: '#e8555a' },
      { kind: 'boat', x: 420, y: 570, scale: 0.9, color: '#8a5a33' },
      { kind: 'gull', x: 300, y: 170, scale: 1.0 },
      { kind: 'gull', x: 470, y: 140, scale: 0.9 },
      { kind: 'crate', x: 200, y: 634, scale: 0.8 },
      { kind: 'bench', x: 300, y: 648, scale: 1.6, color: '#7a5233' }
    ],
    differences: [
      { id: 301, sprite: 'gull', type: 'extra', x: 170, y: 118, r: 26, color: '#f5f0e6', scale: 1.0, label: 'Camar ekstra' },
      { id: 302, sprite: 'lamp', type: 'missing', x: 545, y: 262, r: 28, color: '#ffe9a8', scale: 1.0, label: 'Lampu mercusuar hilang' },
      { id: 303, sprite: 'boat', type: 'moved', x: 175, y: 520, r: 46, dx: 44, dy: 0, color: '#c98a4b', scale: 1.0, label: 'Perahu berpindah' },
      { id: 304, sprite: 'buoy', type: 'colour', x: 368, y: 562, r: 24, color: '#ffd166', altColor: '#e8555a', scale: 1.0, label: 'Pelampung berganti warna' },
      { id: 305, sprite: 'crate', type: 'extra', x: 320, y: 455, r: 30, color: '#a9743d', scale: 1.0, label: 'Krat ekstra' },
      { id: 306, sprite: 'net', type: 'colour', x: 62, y: 492, r: 34, color: '#7ee0b8', altColor: '#f6a85f', scale: 1.0, label: 'Jaring berganti warna' },
      { id: 307, sprite: 'flag', type: 'flipped', x: 575, y: 240, r: 26, color: '#e8555a', label: 'Bendera terbalik' },
      { id: 308, sprite: 'crab', type: 'extra', x: 470, y: 632, r: 28, color: '#e8555a', scale: 1.0, label: 'Kepiting ekstra' },
      { id: 309, sprite: 'starfish', type: 'missing', x: 430, y: 630, r: 24, color: '#ff9d6b', scale: 1.0, label: 'Bintang laut hilang' },
      { id: 310, sprite: 'window', type: 'extra', x: 548, y: 320, r: 20, color: '#ffe9a8', scale: 1.0, label: 'Jendela ekstra' },
      { id: 311, sprite: 'rope', type: 'missing', x: 118, y: 620, r: 28, color: '#d9b382', scale: 1.0, label: 'Gulungan tali hilang' },
      { id: 312, sprite: 'postgull', type: 'flipped', x: 80, y: 590, r: 28, color: '#f5f0e6', scale: 1.0, label: 'Camar di tiang terbalik' }
    ]
  }
];

export function sceneById(id) {
  return SCENES.find(s => s.id === id) || SCENES[0];
}
