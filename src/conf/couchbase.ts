'use strict';

import * as couchbase from 'couchbase';

const cluster: any = new couchbase.Cluster('couchbase://localhost');

export const bucket: any = cluster.openBucket('rsm');
