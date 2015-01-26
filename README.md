# angular-es6-async-services
Services to utilize the power of ES6 Generators. 

No more callbacks, write your async code like a human again using the 'spawn' tool. 

## Setup
Add this simple file to your project with the dependency "angular-es6-async"

## Example

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
   1. 'first' is called
   2. wait for the 'secondDependency' to get a value
   3. 'second', 'third', & 'fourth' are called simultaneously, wait for all to finish
   4. when all 2-4 have completed, console.log
   5. 'fifth', 'sixth' & 'seventh' are called simultaneously, wait for any to finish
   6. when one of 5-7 has finished, console.log

Done does not need to be called after spawn has finished.
