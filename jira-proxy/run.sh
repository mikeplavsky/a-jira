docker build -t jira-proxy .

if [ -z $1 ]; then
    echo "Jira account is needed."
    exit 1
fi

JIRA_USER=$1
JIRA_PWD=$(security find-generic-password -a $JIRA_USER -s jira -w)

docker rm -f jira-proxy 
docker run -ti \
    --name jira-proxy \
    -e JIRA_USER=$JIRA_USER \
    -e JIRA_PWD=$JIRA_PWD \
    -e JIRA_HOST=jira.labs.quest.com \
    -e JIRA_PRODUCTS="RMADFE,RMAZ,QMMP,ODRT,IN,IS,ODME,MMAD,AIRGAP" \
    -p 8080:8080 \
    -w /jira-proxy \
    -v "$(pwd)":/jira-proxy \
    jira-proxy \
    bash
    #flask run -p 8080 -h 0.0.0.0
