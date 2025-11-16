/**
 * custom js library
 */
(function ($, Drupal) {
  'use strict';

  // load message
  console.log(Drupal.t('Loading JS custom library'));

})(jQuery, Drupal);

// function that returns a color for each weekday
function colorDia(dia) {
  var colors = [
    '#FF0000', // 1 lunes - red
    '#FF7F00', // 2 martes - orange
    '#FFFF00', // 3 miercoles - yellow
    '#00FF00', // 4 jueves - green
    '#0000FF', // 5 viernes - blue
    '#4B0082', // 6 sabado - indigo
    '#9400D3'  // 7 domingo - violet
  ];

  return colors[dia - 1];
}

(function ($, Drupal) {
  'use strict';

  // function in global scope, so declare again here if needed
  window.colorDia = colorDia;

  $(document).ready(function () {

    // get current day (0 = domingo, 1 = lunes...)
    var today = new Date().getDay();

    // convert JS day to our system (lunes = 1)
    var dia = today === 0 ? 7 : today;

    // get color for this day
    var color = colorDia(dia);

    // change header background
    $('header.site-header').css('background-color', color);
  });

})(jQuery, Drupal);

