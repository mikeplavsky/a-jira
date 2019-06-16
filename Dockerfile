FROM node

WORKDIR  /a-jira
COPY *.json /a-jira/ 

RUN npm install

COPY *.sh /a-jira/