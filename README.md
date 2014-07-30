
```js
var System = require('epicjs');
```


## Installation

```bash
    $ npm install epicjs
```

## Usage


```js
var $ = require('epicjs').Linq;
var query = $([]).where('e => e > 1').any();
```

or

```js
require('epicjs');
var query = [].asQueryable();
```

or

```js
require('epicjs');
var query = [].Linq();
```

## Features

  * any
  * first
  * last
  * count
  * select
  * selectmany
  * where
  * each

## Contributors
  
  Author: [S](http://github.com/slightboy)  

## License

MIT
