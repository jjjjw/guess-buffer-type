Determine the data format of a given readable stream.

Current supported data types are:
- json
- ldjson
- csv

## usage

```js
var guessType = require('guess-buffer-type')
var type = guessType(buffer, opts)
// type is either an Error or a string of the data type
```
