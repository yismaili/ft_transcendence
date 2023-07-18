FROM node:16-bullseye-slim

RUN apt update -y && apt install -y git; \
    npm install -g npm@latest && npm i -g @nestjs/cli;

WORKDIR /app

COPY ./tools /app
# RUN chmod +x ./initenv.sh

# ENTRYPOINT [ "./initenv.sh" ]
CMD ["npm", "run", "start:dev"]
