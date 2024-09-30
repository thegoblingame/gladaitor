#!/bin/bash
node -e "const prompts = require('./prompts.js'); console.log(JSON.stringify(prompts.map((p, i) => ({ id: i + 1, text: p })), null, 2));" > prompts.json