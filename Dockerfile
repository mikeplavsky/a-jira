FROM node

WORKDIR /a-jira

COPY package.json .
COPY package-lock.json .

ENV VERSION=0.1
RUN npm install 


