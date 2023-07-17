FROM node:16-bullseye-slim

RUN apt update -y && apt upgrade -y && apt install -y git;\
    npm install -g npm@latest && npm i -g @nestjs/cli;

WORKDIR /app

CMD ["npm", "run", "start:dev"]

