const { aggregate } = require('./agg_response_helper');
import { bucketHelper } from './bucket_helper';
import { getNotifications } from '../services';
export function sankeyProvider(resp) {
  // When 'Show missing values' and/or 'Group bucket' is checked then
  // group the inputs in different arrays
  let missingValues = [];
  let groupBucket = [];
  resp.aggs.aggs.forEach((bucket) => {

    if (bucket.params.missingBucket) {
      missingValues.push({[bucketHelper(resp, bucket, bucket.params.missingBucketLabel).id]: bucket.params.missingBucketLabel});

    }
    if (bucket.params.otherBucket) {
      groupBucket.push({[bucketHelper(resp, bucket, bucket.params.otherBucket).id]: bucket.params.otherBucketLabel});
    }
  });

  if (resp.columns.length > 2) {
    if (resp.rows && resp.rows.length > 0) {
      return {
        slices: aggregate({
          rows: resp.rows,
          missingValues,
          groupBucket
        }), totalHits: resp.totalHits, aggs: resp.aggs, newResponse: true
      };
    } else {
      return {
        slices: { nodes: [], links: [] }, totalHits: resp.totalHits, aggs: resp.aggs, newResponse: true
      };
    }
  } else {
    getNotifications().toasts.addWarning({title: 'Warning', text: 'Minimum two sub aggs needed.'});
    return {
      slices: { nodes: [], links: [] }, totalHits: resp.totalHits, aggs: resp.aggs, newResponse: true
    };
  }
}
