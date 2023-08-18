FROM debian:10

WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

# Copy your application files into the container
COPY . /app

# Install application dependencies
RUN npm install next

# Sleep for 60 seconds before the container exits
CMD ["npm", "run", "dev"]

