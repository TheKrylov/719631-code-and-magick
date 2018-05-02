'use strict';

window.dialog = (function () {
  var setup = document.querySelector('.setup');
  var setupPic = setup.querySelector('.setup-user-pic');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var submit = setup.querySelector('.setup-submit');
  var userNameInput = setup.querySelector('.setup-user-name');

  var userDialogPosition = {
    top: setup.style.top,
    left: setup.style.left
  };


  // Esc key handler
  var onPopupEscPress = function (evt) {
    if (document.activeElement !== userNameInput && evt.keyCode === window.utils.key.esc) {
      closePopup();
    }
  };

  // Open Popup
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Close Popup
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    resetUserDialogPosition();
  };

  var resetUserDialogPosition = function () {
    setup.style.top = userDialogPosition.top;
    setup.style.left = userDialogPosition.left;
  };

  setupPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.key.enter) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    if (document.activeElement !== userNameInput) {
      closePopup();
    }
  });

  setupClose.addEventListener('keydown', function () {
    if (document.activeElement !== userNameInput && window.utils.key.enter) {
      closePopup();
    }
  });

  submit.addEventListener('click', function () {
    closePopup();
  });

  submit.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.key.enter) {
      closePopup();
    }
  });

})();
