FROM node:10-alpine
EXPOSE 8000
WORKDIR /app

COPY package.json package.json
COPY src src
COPY app.js app.js
COPY bin bin
COPY config config
COPY .sequelizerc .sequelizerc

RUN npm install

# CMD node ./bin/www
CMD ["npm", "run", "start:dev"]
