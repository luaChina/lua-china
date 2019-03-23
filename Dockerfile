FROM node:11.12

COPY . /app

WORKDIR /app

RUN npm install && npm run build --prod

EXPOSE 80

ENV HOST 0.0.0.0
ENV PORT 80
CMD ["npm", "run", "start"]
