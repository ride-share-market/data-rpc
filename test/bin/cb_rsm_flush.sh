#!/bin/sh

BUCKET="rsm_test"

echo "Dropping Indexes"
curl -v http://127.0.0.1:8093/query/service -d "statement=DROP PRIMARY INDEX ON ${BUCKET}"

echo "Flushing bucket"
curl -X POST -u Administrator:123456 http://localhost:8091/pools/default/buckets/${BUCKET}/controller/doFlush

echo "Restarting Docker"
sudo docker restart couchbase

echo "Sleep 15"
sleep 15

echo "Creating Indexes"
curl -v http://127.0.0.1:8093/query/service -d "statement=CREATE PRIMARY INDEX ON ${BUCKET} USING GSI"
