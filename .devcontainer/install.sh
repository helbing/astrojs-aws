#!/bin/sh

. ${NVM_DIR}/nvm.sh && nvm install && nvm use
pnpm install
npx husky install
