docker run -ti --network host --rm --name rc-apps \
  -v  $PWD:/apps -w /apps debdutdeb/rc-apps "$@"