FROM node:14.21.1-alpine3.16

ARG PORT=3100

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install --force

COPY . ./

EXPOSE $PORT

CMD [ "npm", "run", "start" ]