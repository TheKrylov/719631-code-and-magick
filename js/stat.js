'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var TEXT_COLOR = 'rgba(0, 0, 0, 1)';

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderBar = function (ctx, x, name, time, max) {

  // Name
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(name, x, 265);

  // Bar
  var color = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgb(0, 0, 255, .' + Math.floor(Math.random() * 10) + 1 + ')';
  ctx.fillStyle = color;
  ctx.fillRect(x, 95 + BAR_HEIGHT - BAR_HEIGHT * time / max, BAR_WIDTH, BAR_HEIGHT * time / max);

  // Time
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(time.toFixed(0), x, 85 + BAR_HEIGHT - BAR_HEIGHT * time / max);

};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#FFFFFF');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 40, CLOUD_Y + 30);
  ctx.fillText('Список результатов:', CLOUD_X + 40, CLOUD_Y + 50);

  // Best time
  for (var j = 0, bestTime = 0; j < times.length; j++) {
    bestTime = times[j] > bestTime ? times[j] : bestTime;
  }

  // Render Bars
  for (var i = 0, x = CLOUD_X + 40; i < names.length; i++) {
    renderBar(ctx, x, names[i], times[i], bestTime);
    x = x + BAR_WIDTH + BAR_GAP;
  }

};
