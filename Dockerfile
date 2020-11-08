FROM node:14.15.0-alpine3.12

WORKDIR /var/app

COPY . .

RUN npm start

CMD ["npm", "start"]
