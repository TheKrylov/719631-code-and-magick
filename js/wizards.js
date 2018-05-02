'use strict';

window.wizards = (function () {

  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similar = document.querySelector('.setup-similar-list');

  var generate = function (quantity, names, lastNames, coatColors, eyeColors) {
    var wizards = [];
    for (var i = 0; i < quantity; i++) {
      var wizard = {};
      wizard.name = window.utils.getRandom(names) + ' ' + window.utils.getRandom(lastNames);
      wizard.coatColor = window.utils.getRandom(coatColors);
      wizard.eyesColor = window.utils.getRandom(eyeColors);
      wizards[i] = wizard;
    }

    show();
    return wizards;
  };

  var show = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };


  var create = function (wizard) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var data = generate(window.data.quantity, window.data.names, window.data.lastNames, window.data.coatColors, window.data.eyeColors);

  return {
    render: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.quantity; i++) {
        fragment.appendChild(create(data[i]));
      }
      similar.appendChild(fragment);
    }
  };

})();
