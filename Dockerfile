FROM node:20.19-slim

COPY . /app

WORKDIR /app

EXPOSE 80

ENV HOST 0.0.0.0
ENV PORT 80
CMD ["npm", "run", "start"]
