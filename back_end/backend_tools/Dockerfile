FROM node:18-bullseye-slim
RUN apt update -y && apt install -y git

WORKDIR /app
RUN npm install -g npm@latest && npm i -g @nestjs/cli
# COPY ./tools ./app
# RUN chmod +x ./app/initenv.sh

# ENTRYPOINT ["/app/initenv.sh"]
CMD ["npm", "run", "start:dev"]
