### Throttle-end

Yet another throttle/debounce function. This one has these properties, where f() is your function and t() is the throttled function:

- f() is called immediately the first time t() is called.
- when t() is called, if it has been more than X seconds since f() was called, it is called immediately
- if it has been less than that long, the call is queued, but will be skipped if t() is called again in the meantime.
- calling t.flush() calls a queued f() if there is one immediately, and clears that queue.

It's useful in a situation like a user dragging a pin on a map where there is an expensive network request to make. You want the request to happen every 200ms or so,
you're happy for some of those calls to never happen, and when they stop dragging, you want to be able to immediately fire off the last request.

### Usage:

```js
const throttle = require('throttle-end');
const myfuncThrottled = throttle(myfunc, 500);

thing.on('drag', myfuncThrottled);

thing.on('dragend', myfuncThrottled.flush);
```

### Credits
Created by Steve Bennett (Github user: @stevage).