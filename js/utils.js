'use strict';

window.utils = (function () {
  return {
    key: {
      esc: 27,
      entet: 13,
    },
    getRandom: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
  };
})();
