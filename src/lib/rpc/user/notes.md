sudo docker run -d --name couchbase -p 8091:8091 -p 11210:11210 -p 11212:11212 couchbase:community-4.0.0

curl -X POST -u Administrator:123456 http://localhost:8091/pools/default/buckets/rsm/controller/doFlush