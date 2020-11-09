#!/bin/bash

echo hello

echo What should the version be?
read VERSION

docker build -t ysamp87/reactgraphql:$VERSION .
docker push ysamp87/reactgraphql:$VERSION

sudo ssh -i /mnt/c/Users/ysampoerno/aws/aws-first-key.pem ubuntu@54.151.184.243 "docker pull ysamp87/reactgraphql:$VERSION && docker tag ysamp87/reactgraphql:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
"
