# This Dockerfile is for the local development environment.
# It installs all dependencies and uses nodemon for hot-reloading.
FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY . .

# The command is specified in the docker-compose.yml file (npm run dev)
CMD ["npm", "run", "dev"]
