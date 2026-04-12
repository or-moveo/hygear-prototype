#!/bin/bash
export PATH="/Users/or.bruchim/.nvm/versions/node/v25.4.0/bin:$PATH"
cd /Users/or.bruchim/hygear-prototype
exec node node_modules/vite/bin/vite.js --port 5174
