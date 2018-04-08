'use strict';

var userDialog = document.querySelector('.setup');
var similarList = userDialog.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// unHidden result
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Get Random
var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Create data
var createWizards = function (quantity, names, lastNames, coatColors, eyeColors) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    var wizard = {};
    wizard.name = getRandom(names) + ' ' + getRandom(lastNames);
    wizard.coatColor = getRandom(coatColors);
    wizard.eyesColor = getRandom(eyeColors);
    wizards[i] = wizard;
  }
  return wizards;
};

// Mocks
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var quantity = 4;

// Generate data
var wizardsData = createWizards(quantity, names, lastNames, coatColors, eyeColors);

// Create Wizzard
var createWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};


// Create Fragment
var fragment = document.createDocumentFragment();
for (var i = 0; i < quantity; i++) {
  fragment.appendChild(createWizard(wizardsData[i]));
}

similarList.appendChild(fragment);
