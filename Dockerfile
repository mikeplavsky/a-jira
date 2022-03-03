FROM node:16.14

WORKDIR /a-jira

COPY package.json .
COPY package-lock.json .

ENV VERSION=0.3
RUN npm install 


