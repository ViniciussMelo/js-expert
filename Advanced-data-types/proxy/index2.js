console.log("[1]: Executing something...");

setTimeout(() => {
  console.log('[3]: Running at the end of next tick!');
}, 0)

process.nextTick(() => {
  console.log('[2]: Running as soon as possible!');
});

// output:
// [1]: Executing something...
// [2]: Running as soon as possible!
// [3]: Running at the end of next tick!