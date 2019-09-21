
Firstly run back-end jira-proxy by:

```
cd jira-proxy
./run.sh jira account 
```

Then start front end:
```
cd ..
./run.sh
```

Now app should be served from http://localhost:4200

For tests: 

Back-end:

```
docker exec -ti jira-proxy sh
pytest -n 5
```

Quick front-end: 

```
# working directory a-jira
docker exec -ti a-jira bash
./test.sh
```

Protractor: 
```
cd e2e
./chromedriver.sh
docker exec -ti a-jira bash 
cd e2e
./run.sh
```

Gauge: 
```
./node_modules/.bin/gauge run specs
```

Jest:
```
./node_modules/.bin/jest jest-tests
```









