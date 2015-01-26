/* Thanks to http://jakearchibald.com/2014/es7-async-functions/ */
(function () {
  'use strict';
  angular.module('angular-es6-async', [])
    .factory('spawn', spawn);

function spawn() {
    return function (generatorFunc) {
      function continuer(verb, arg) {
        var result;
        try {
          result = generator[verb](arg);
        } catch (err) {
          return Promise.reject(err);
        }
        if (result.done) {
          return result.value;
        } else {
          return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
      }

      var generator = generatorFunc.apply(this, arguments);
      var onFulfilled = continuer.bind(continuer, "next");
      var onRejected = continuer.bind(continuer, "throw");
      return onFulfilled();
    };
  }
