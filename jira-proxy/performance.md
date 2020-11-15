Flask App

ab -n 1000 -c 250 http://localhost:8080/api/products

```
Percentage of the requests served within a certain time (ms)

50%     950
66%    1013
75%    1898
80%    1954
90%    4789
95%    7359
98%    7513
99%    8550
100%   8571 (longest request)
```

ab -n 1000 -c 250 http://localhost:8080/api/products/RMADFE/features/done 

```
Percentage of the requests served within a certain time (ms)
  50%   6586
  66%   7342
  75%   7976
  80%   8459
  90%  10185
  95%  11877
  98%  14134
  99%  15411
 100%  18983 (longest request)
```

Gevent WSGIServer

ab -n 1000 -c 250 http://localhost:8080/api/products 

```
Percentage of the requests served within a certain time (ms)

50%    572
66%    630
75%    672
80%    677
90%   1484
95%   1621
98%   1762
99%   1787
100%  1822 (longest request)
```

ab -n 1000 -c 250 http://localhost:8080/api/products/RMADFE/features/done 

```
Percentage of the requests served within a certain time (ms)
  50%   7948
  66%   8267
  75%   8420
  80%   8588
  90%   9496
  95%  11573
  98%  12936
  99%  13421
 100%  14901 (longest request)
```
