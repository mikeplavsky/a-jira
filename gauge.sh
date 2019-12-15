SPECS="specs/"

if [ $1 ]; then
    SPECS=$1
fi

./node_modules/.bin/gauge run $SPECS 
