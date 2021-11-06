docker run \
    -ti \
    --network=host \
    --rm \
    -v  $PWD:/apps \
    -w /apps \
    debdutdeb/rc-apps deploy
