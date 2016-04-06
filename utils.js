exports.loop = function loop(promise, fn) {
  return promise.then(fn).then(wrapper => {
    return !wrapper.done ? loop(Promise.resolve(wrapper.value), fn): wrapper.value;
  });
};
