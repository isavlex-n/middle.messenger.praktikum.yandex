FROM node:latest

WORKDIR /var/www
COPY ./server.js server.js
COPY ./dist dist

EXPOSE 3000
CMD node server.js