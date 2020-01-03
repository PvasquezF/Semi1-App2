#!/bin/bash
docker build -t app2 .
docker tag app2 demo.goharbor.io/seminario1/app2
docker push demo.goharbor.io/seminario1/app2