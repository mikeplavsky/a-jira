set -e
set -o pipefail

echo "running back-end"

cd jira-proxy
./run.sh jira-svc-rm

echo "runnigng front-end"
cd ..
./run.sh 


