FROM node:8.9

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 80

ENV HOST 0.0.0.0
ENV PORT 80
CMD ["npm", "run", "start"]