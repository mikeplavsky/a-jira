docker run -ti --rm \
    -v $(pwd):/a-jira \
    -v /a-jira/node_modules \
    -p 4200:4200 \
    -w /a-jira a-jira bash 