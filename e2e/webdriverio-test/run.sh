docker build -t wdio .
docker run -ti --rm -v $(pwd):/wdio/tests \
-host \
-w /wdio/tests wdio bash
