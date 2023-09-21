#!/bin/bash
apt update -y && apt install -y git
npm install -g npm@latest && npm i -g @nestjs/cli
npm install
exec "$@"
