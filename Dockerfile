FROM node

RUN npm install -g @angular/cli@8.3.21
RUN ng new a-jira

WORKDIR /a-jira

RUN npm install @ngrx/store@8.6.0
RUN npm install @ngrx/effects@8.6.0
RUN npm install @ngrx/store-devtools@8.6.0
RUN ng add @angular/material@8.2.3

