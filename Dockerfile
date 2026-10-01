# Production Dockerfile for ELECTROLOYAL on Railway
FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy project files
COPY package.json ./
COPY . .

# Keep a template copy of seed data to automatically populate empty Railway persistent volumes on first launch
RUN mkdir -p seed_data && cp -r data/* seed_data/

# Expose default port
EXPOSE 3000

# Start central server
CMD ["node", "server.js"]
