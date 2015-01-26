# angular-es6-async-services
Services to utilize the power of ES6 Generators. 

Write your async code in a synchronous fashion and feel like a human again using the `spawn` tool. 

## Setup
Add this simple file to your project with the dependency `"angular-es6-async"`.

## Example
`spawn()` simply wraps around your `function*(){}` and runs the generator until it is complete. Use a `try{}` `catch(e){}` block for better error handling.

```
function example (var1, var2) {
   spawn(function* () {
    try {
      yield first();
      var secondDependency = yield getData(var1);
      
      yield Promise.all(
        second(secondDependency),
        third(),
        fourth()
      );
      
      console.log('second, third & fourth have completed.')
      
      yield Promise.race(
        fifth(),
        sixth(),
        seventh()
      );
      
      console.log('one of fifth, sixth or seventh has completed.');
      
    }
    catch (error) {
      console.error(error);
    }
   }
}
```
  Order of operations:
   1. `first` is called
   2. wait for the `secondDependency` to get a value
   3. `second`, `third`, & `fourth` are called simultaneously, wait for all to finish
   4. when those three have completed, console.log
   5. `fifth`, `sixth` & `seventh` are called simultaneously, wait for any to finish
   6. when any of those three has finished, console.log
   
It's even easier than it looks. Read more about ES6 Generators:
- [David Walsh: ES6 Generators](http://davidwalsh.name/es6-generators)
- [MDN function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [Synchronizing Asynchronous JavaScript ES7](http://www.joezimjs.com/javascript/synchronizing-asynchronous-javascript-es7/)

Note: `done()` does not need to be called after `spawn` has finished. Spawned functions aren't intended to return anything beyond `undefined`.
