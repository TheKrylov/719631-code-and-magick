'use strict';
window.setup = (function () {


  // Const
  var WIZZARD_VARIABLES = {
    coatColors: window.data.coatColors,
    eyeColors: window.data.eyeColors,
    fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // Vars
  var setupPlayer = document.querySelector('.setup-player');
  var setupEyes = setupPlayer.querySelector('.wizard-eyes');
  var setupEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
  var setupFireballColor = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupFireballColorInput = setupPlayer.querySelector('input[name="fireball-color"]');
  var setupShop = document.querySelector('.setup-artifacts-shop');
  var setupArtifacts = document.querySelector('.setup-artifacts');
  var draggedItem;


  var setArtifactsDropable = function (bool) {
    if (bool) {
      setupArtifacts.setAttribute('style', 'outline: 2px dashed red');
    } else {
      setupArtifacts.removeAttribute('style');
    }
  };

  var setArtifactsCellDropable = function (bool, evt) {
    if (bool) {
      evt.target.setAttribute('style', 'background-color: yellow');
    } else {
      evt.target.removeAttribute('style');
    }
  };

  var isArtifactExist = function (evt) {
    return evt.target.closest('.setup-artifacts-cell').firstChild;
  };

  // Events handlers
  setupEyes.addEventListener('click', function () {
    var color = window.utils.getRandom(WIZZARD_VARIABLES.eyeColors);
    setupEyes.style.fill = color;
    setupEyesInput.value = color;
  });

  setupFireballColor.addEventListener('click', function () {
    var color = window.utils.getRandom(WIZZARD_VARIABLES.fireballColors);
    setupFireballColor.style.backgroundColor = color;
    setupFireballColorInput.value = color;
  });


  setupShop.addEventListener('dragstart', function (evt) {
    draggedItem = evt.target.cloneNode(true);
    setArtifactsDropable(true);
  });

  setupShop.addEventListener('dragend', function () {
    setArtifactsDropable(false);
  });

  setupArtifacts.addEventListener('dragstart', function (evt) {
    draggedItem = evt.target;
    setArtifactsDropable(true);
  });

  setupArtifacts.addEventListener('dragenter', function (evt) {
    if (!isArtifactExist(evt)) {
      setArtifactsCellDropable(true, evt);
    }
  });

  setupArtifacts.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    if (isArtifactExist(evt)) {
      evt.dataTransfer.dropEffect = 'none';
    }
  });

  setupArtifacts.addEventListener('dragleave', function (evt) {
    setArtifactsCellDropable(false, evt);
  });

  setupArtifacts.addEventListener('drop', function (evt) {
    evt.preventDefault();

    setArtifactsDropable(false);
    setArtifactsCellDropable(false, evt);

    if (!isArtifactExist(evt)) {
      evt.target.appendChild(draggedItem);
    }
  });

  setupArtifacts.addEventListener('dragend', function () {
    setArtifactsDropable(false);
  });


})();
