#!/bin/bash
node -e "const hypotheticals = require('./hypotheticals.js'); console.log(JSON.stringify(hypotheticals.map((p, i) => ({ id: i + 1, text: p })), null, 2));" > hypotheticals.json