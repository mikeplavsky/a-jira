docker build -t wdio .
docker run -ti --rm -v $(pwd):/tests \
-host \
-w /tests wdio bash
