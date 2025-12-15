FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY env.json ./
COPY static ./static

# Install production dependencies only
RUN npm install --production --omit=dev

# Copy only the built Nuxt app (server-side files)
COPY .nuxt ./.nuxt
COPY nuxt.config.js ./
COPY server ./server

EXPOSE 80

ENV HOST 0.0.0.0
ENV PORT 80
ENV NODE_ENV production

CMD ["npm", "run", "start"]
