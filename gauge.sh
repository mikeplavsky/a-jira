set -eo pipefail

SPECS="specs/"

if [ $2 ]; then
    SPECS=$2
fi

CMD=$1

function ext_gauge() {

    docker run -ti \
        -e CHROME_HOST=host.docker.internal \
        -e CHROME_PORT=8001 \
        -e JIRA_APP=localhost:4200 \
        -v $(pwd)/specs:/a-jira/specs \
        -v $(pwd)/tests:/a-jira/tests \
        -v $(pwd)/reports:/a-jira/reports \
        -w /a-jira \
        --rm gauge bash
        #gauge $@

}

function gauge() {

    docker run -ti \
        -e headless_chrome=true \
        -e JIRA_APP=http://host.docker.internal:4200 \
        -v $(pwd)/specs:/a-jira/specs \
        -v $(pwd)/tests:/a-jira/tests \
        -v $(pwd)/reports:/a-jira/reports \
        -w /a-jira \
        --rm gauge bash
        #gauge $@

}

$CMD

#gauge --version
#gauge run $SPECS 
