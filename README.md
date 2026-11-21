# spot-the-difference-entry

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Dedypol22/spot-the-difference-entry/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Dedypol22/spot-the-difference-entry/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

Pasar Malam — Cari Perbedaannya! A spot-the-difference game set in an Indonesian night market, entered in make.fun's "Make the best spot the difference game" bounty. Three hand-composed levels (Pasar Malam, Taman Bunga, Pelabuhan Senja) with 10, 10 and 12 differences, a 180/150/120-second clock, combo scoring, three hints per level, a wrong-click penalty and a best score kept between runs. Everything is drawn procedurally on a single 1280×800 canvas with plain JavaScript modules: no images, no libraries, no network requests at runtime.

Find every difference by clicking either picture, or move the crosshair with the arrow keys and press Space. `H` spends a hint, `P` pauses, `M` mutes the synthesized WebAudio sound, `R` restarts the level, and `1`/`2`/`3` choose a level from the title screen. Screenshots are taken from deterministic states reached with `?shot=play|level2|title|win&seed=1`.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in a desktop browser.

To build the graded bundle:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `game/` and `screenshots/` into `out/` and writes `out/dossier.json`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=6gd2qs3v&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
