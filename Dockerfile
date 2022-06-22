FROM node:14.17.0

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80
CMD [ "node", "src/app/index.js" ]