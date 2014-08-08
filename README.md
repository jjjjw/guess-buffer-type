Determine the data format of a given readable stream.

Current supported data types are:
- json
- ldjson
- csv

## usage

```js
var cast = require('streamcast')
var type = cast(buffer, opts)
// type is either an Error or a string of the data type
```
