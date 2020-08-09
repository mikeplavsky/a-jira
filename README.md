
Firstly run app by:

```
./run_app.sh 
```

Now app should be served from http://localhost:4200

For tests: 

Back-end:

```
docker exec -ti jira-proxy sh
pytest -n 11
```

Quick front-end: 

```
cd e2e
./chromedriver.sh
```

```
cd ..
# working directory a-jira
docker exec -ti a-jira bash
./test.sh
```

If it does not work, says something like `unknown command`, try to download the appropriate version for `chromdriver`: https://chromedriver.chromium.org/downloads It should match the installed desktop vertsion. 

Protractor: 
```
cd e2e
./chromedriver.sh
docker exec -ti a-jira bash 
cd e2e
./run.sh
```

Gauge in the container: 
```
cd specs
./build.sh
cd ..
./gauge.sh run
```
Disclaimer: it is very fragile at the moment ^ 

Gauge in the browser:
```
./chromium.sh
./gauge.sh run_ext
```

Deployment:
```
docker exec -ti a-jira bash
./compile.sh
exit
cd jira-proxy
./build.sh version 
# check with
./a-run.sh jira-svc-rm
```
If it works, then proper docker image version has to be set in Azure portal 









