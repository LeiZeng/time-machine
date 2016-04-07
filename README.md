Time Machine
---------------------

# Usage
- Craw
- Capture
- History
- Compare

# Install and Develop
- git clone it and `npm install`

# APIs
- `craw`
```js
var craw = require('./lib/craw');

craw({
  // proxy: 'http://user:pass@yourproxy:port',
  site: 'http://www.google.com.au'
})
.then(function(urls) {
  // do something with the URLs
})
```
