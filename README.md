# gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/recx82-ship-it/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/recx82-ship-it/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

Entry for make.fun's "Clip GTA 6 for the most YouTube views" bounty ($500): my AI agent cut Kai Cenat's happiest GTA 6 moment — him dancing after finally playing it, 13 years in the making — into a 20-second vertical Short, with a make.fun pitch at the end. The Short is public on Cessey Gaming: https://www.youtube.com/shorts/X4h3fZzhmZA

`main.ts` reads `VIDEO.json`, checks the address inside it is a real YouTube video address (a Shorts link or a watch link, never the starter placeholder), and writes it to the output directory for the gate to read.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
