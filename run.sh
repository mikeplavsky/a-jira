docker build -t a-jira .
docker run -ti --rm -v $(pwd)/src:/a-jira/src \
    -p 4200:4200 \
    -w /a-jira a-jira bash 