docker rm -f a-jira
docker run -ti -d \
    --name a-jira \
    -v $(pwd):/a-jira \
    -v /a-jira/node_modules \
    -p 4200:4200 \
    -p 9229:9229 \
    -p 9876:9876 \
    -w /a-jira a-jira \
    bash
#    ./server.sh