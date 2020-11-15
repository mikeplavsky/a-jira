Flask App

ab -n 1000 -c 250 http://localhost:8080/api/products

Percentage of the requests served within a certain time (ms)

50%    950
66%   1013
75%   1898
80%   1954
90%   4789
95%   7359
98%   7513
99%   8550
100%   8571 (longest request)

Gevent WSGIServer

ab -n 1000 -c 250 http://localhost:8080/api/products 

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
