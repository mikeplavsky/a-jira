docker build -t wdio .
docker run -ti --rm -v $(pwd):/wdio \
-host \
-w /wdio wdio bash
