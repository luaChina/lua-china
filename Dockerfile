FROM node:8.9

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8080

ENV HOST 0.0.0.0
ENV PORT 8080

CMD ["npm", "run", "start"]
