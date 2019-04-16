function throttle(fn, delay, thisArg = this) {
  let last, storedFunc;
  const throttled = function(...args) {
    if (!last || Date.now() - last > delay) {
        last = Date.now();
        storedFunc = null;
      return fn.apply(thisArg, args);
    } else {
      storedFunc = function() {
        last = Date.now();
        return fn.apply(thisArg, args);
      }
      let ourFunc = storedFunc;
      setTimeout(() => {
        if (ourFunc === storedFunc) {
          storedFunc();
        }
      }, delay);
    }
  }
  throttled.flush = function() {
    if (storedFunc) {
      storedFunc();
      storedFunc = null;
    }
  }
  return throttled;
}
module.exports = throttle;