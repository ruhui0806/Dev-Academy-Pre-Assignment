# syntax=docker/dockerfile:1

FROM node:16.19

ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install \
  && mv node_modules /node_modules
COPY . .
CMD [ "npm", "start" ]