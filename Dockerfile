FROM node

WORKDIR /a-jira

COPY package.json .
COPY package-lock.json .

ENV VERSION=0.3
RUN npm install 


