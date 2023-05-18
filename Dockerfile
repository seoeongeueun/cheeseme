# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=14.17.6
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# Set production environment
ENV NODE_ENV=production

RUN df -h

# Create app directory
WORKDIR /app

# Copy server code
COPY server/package*.json ./server/
RUN cd server && npm install --production
COPY server/ ./server/

# Switch to client directory
WORKDIR /app/client

# Install production dependencies for client
COPY client/package*.json ./
RUN npm install --production

COPY client/ .

# Build client
#RUN npm run build

# Switch back to the server directory
WORKDIR /app/server

# RUN rm -rf /app/server/node_modules

# # Install production dependencies for server
 RUN npm install --production

# Expose the desired port
EXPOSE 3000

# Start the server
CMD [ "node", "server.js" ]