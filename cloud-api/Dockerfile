# STAGE 1: Base image with dependencies
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# STAGE 2: Development stage
FROM base AS development
ENV NODE_ENV=development
# Install all dependencies, including devDependencies
RUN npm install
COPY . .
# The command to run in development will be specified in docker-compose.yml
CMD ["npm", "run", "dev"]

# STAGE 3: Production builder stage
FROM base AS builder
ENV NODE_ENV=production
# Install all dependencies to build the project
RUN npm install
COPY . .
RUN npm run build

# STAGE 4: Final production stage
FROM node:18-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
# Copy production dependencies
COPY package*.json ./
RUN npm ci --only=production
# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000
CMD [ "node", "dist/index.js" ]