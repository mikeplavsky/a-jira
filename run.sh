docker rm a-jira
docker run -ti -d \
    --name a-jira \
    -v $(pwd):/a-jira \
    -v /a-jira/node_modules \
    -p 4200:4200 \
    -w /a-jira a-jira \
    bash ./server.sh