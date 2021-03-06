FROM node:14.14

COPY . /app

WORKDIR /app

RUN npm install && npm run build --prod

EXPOSE 80

ENV HOST 0.0.0.0
ENV PORT 80
CMD ["npm", "run", "start"]
