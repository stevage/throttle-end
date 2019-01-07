function throttle(fn, delay) {
  let last, storedFunc;
  const throttled = function(...args) {
    if (!last || Date.now() - last > delay) {
        last = Date.now();
        storedFunc = null;
      return fn.apply(this, args);
    } else {
      storedFunc = function() {
        last = Date.now();
        return fn.apply(this, args);
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