FROM debian:10

WORKDIR /app

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
RUN npm install next --save-dev

ENTRYPOINT ["./run.sh"]
CMD [ "npm", "run", "start" ]