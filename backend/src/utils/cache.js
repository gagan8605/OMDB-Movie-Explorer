const NodeCache = require('node-cache');

// Cache configuration:
// stdTTL: (Standard Time To Live) The default time in seconds that a cache entry will be stored. 3600s = 1 hour.
// checkperiod: How often the cache will check for expired entries. 120s = 2 minutes.
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

module.exports = cache;