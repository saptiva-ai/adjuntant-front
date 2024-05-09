FROM node:20.12.1

# Read more at https://typicode.github.io/husky/how-to.html#ci-server-and-docker
ENV HUSKY=0
ENV NODE_ENV="production"

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

EXPOSE 3000

# Hardened node.js app for production. Read more at https://www.npmjs.com/package/pm2#container-support
CMD [ "pm2-runtime", "npm", "--", "start" ]