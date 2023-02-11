FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm install

ENV PORT 3000

EXPOSE 3000


HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

CMD ["npm", "start"]