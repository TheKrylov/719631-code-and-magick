'use strict';
(function () {

  // Mocks
  var mock = {
    names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyeColors: ['black', 'red', 'blue', 'yellow', 'green'],
    quantity: 4
  };

  // Const
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var WIZZARD_VARIABLES = {
    coatColors: mock.coatColors,
    eyeColors: mock.eyeColors,
    fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // Vars
  var userDialog = document.querySelector('.setup');
  var similarList = userDialog.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var submit = userDialog.querySelector('.setup-submit');

  var setupPlayer = document.querySelector('.setup-player');
  var setupEyes = setupPlayer.querySelector('.wizard-eyes');
  var setupEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
  var setupFireballColor = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupFireballColorInput = setupPlayer.querySelector('input[name="fireball-color"]');


  // Esc key handler
  var onPopupEscPress = function (evt) {
    if (document.activeElement !== userNameInput && evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // Open Popup
  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Close Popup
  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

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

    // Show wizzards
    userDialog.querySelector('.setup-similar').classList.remove('hidden');

    return wizards;
  };

  // Generate data
  var wizardsData = createWizards(mock.quantity, mock.names, mock.lastNames, mock.coatColors, mock.eyeColors);

  // Create Wizzard
  var createWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // Render wizards
  var renderWizards = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < mock.quantity; i++) {
      fragment.appendChild(createWizard(wizardsData[i]));
    }
    similarList.appendChild(fragment);
  };

  // Events handlers

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    if (document.activeElement !== userNameInput) {
      closePopup();
    }
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (document.activeElement !== userNameInput && evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  submit.addEventListener('click', function () {
    closePopup();
  });

  submit.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  setupEyes.addEventListener('click', function () {
    var color = getRandom(WIZZARD_VARIABLES.eyeColors);
    setupEyes.style.fill = color;
    setupEyesInput.value = color;
  });

  setupFireballColor.addEventListener('click', function () {
    var color = getRandom(WIZZARD_VARIABLES.fireballColors);
    setupFireballColor.style.backgroundColor = color;
    setupFireballColorInput.value = color;
  });

  // ---- Start ----- //

  renderWizards();

})();
