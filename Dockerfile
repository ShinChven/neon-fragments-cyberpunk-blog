FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install production dependencies
RUN npm install --production

# Copy built assets and server code
COPY dist ./dist

# Copy empty services/posts.json (or the one from build if needed, but user wants empty)
# We assume the zip contains services/posts.json
COPY services ./services

# Copy public assets if any (Vite puts them in dist/client, but if there are others...)
# COPY public ./public

EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Run the server
CMD ["node", "dist/server/index.js"]
