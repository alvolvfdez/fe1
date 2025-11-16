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

(function (Drupal) {
  'use strict';

  Drupal.behaviors.forcontuColorHeader = {
    attach: function (context) {

      // prevent duplicate execution
      if (!context.querySelector || !context.querySelector('header.1-pr')) {
        return;
      }

      var header = context.querySelector('header.1-pr');

      // get current day (0 = domingo)
      var today = new Date().getDay();

      // convert 0 to 7
      var dia = today === 0 ? 7 : today;

      // get color
      var color = colorDia(dia);

      // apply background
      header.style.backgroundColor = color;

      console.log('Applying header color: ' + color);
    }
  };

})(Drupal);

(function (Drupal) {
  'use strict';

  // array with weekday names
  function diaSemana(dia) {
    var dias = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo'
    ];
    return dias[dia - 1];
  }

  Drupal.behaviors.forcontuDiaSemana = {
    attach: function (context) {

      var siteName = context.querySelector('div.site-branding');

      if (!siteName) {
        return;
      }

      // get day
      var today = new Date().getDay();
      var dia = today === 0 ? 7 : today;

      // create span
      var span = document.createElement('span');
      span.className = 'semana';
      span.textContent = ' (Hoy es ' + diaSemana(dia) + ')';

      // insert after the site name
      siteName.insertAdjacentElement('afterend', span);
    }
  };

})(Drupal);

