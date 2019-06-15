FROM node

WORKDIR /
COPY ./package.json .

RUN npm install
RUN npm audit fix 