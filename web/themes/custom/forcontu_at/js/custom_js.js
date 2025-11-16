/**
 * custom js library
 */
(function (Drupal) {
  'use strict';

  console.log(Drupal.t('Loading JS custom library'));

})(Drupal);

/**
 * global utilities for javascript exercises
 * shared functions for all behaviors
 */
window.ForcontuUtils = {

  // return color for weekday number (1-7)
  colorDia: function (dia) {
    var colors = [
      '#FF0000', // 1 lunes
      '#FF7F00', // 2 martes
      '#FFFF00', // 3 miercoles
      '#00FF00', // 4 jueves
      '#0000FF', // 5 viernes
      '#4B0082', // 6 sabado
      '#9400D3'  // 7 domingo
    ];
    return colors[dia - 1];
  },

  // return weekday name
  diaSemana: function (dia) {
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
  },

  // return todays weekday number (1-7)
  getToday: function () {
    var today = new Date().getDay();
    return today === 0 ? 7 : today;
  }
};

/**
 * behavior for applying header color on load
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.forcontuColorHeader = {
    attach: function (context) {

      var header = context.querySelector('header#masthead');
      if (!header) return;

      var dia = ForcontuUtils.getToday();
      var color = ForcontuUtils.colorDia(dia);

      header.style.backgroundColor = color;

      console.log('Applying header color: ' + color);
    }
  };

})(Drupal);

/**
 * behavior for printing weekday next to site title
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.forcontuDiaSemana = {
    attach: function (context) {

      var siteBranding = context.querySelector('div.site-branding');
      if (!siteBranding) return;

      var dia = ForcontuUtils.getToday();

      var span = document.createElement('span');
      span.className = 'semana';
      span.textContent = ' (Hoy es ' + ForcontuUtils.diaSemana(dia) + ')';

      siteBranding.insertAdjacentElement('afterend', span);
    }
  };

})(Drupal);

/**
 * behavior for changing header color on site-name click
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.forcontuEventosColor = {
    attach: function (context) {

      var siteName = context.querySelector('.site-branding__name-link');
      var header = context.querySelector('#masthead');

      if (!siteName || !header) return;

      // start at todays color
      var dia = ForcontuUtils.getToday();

      siteName.addEventListener('click', function () {

        header.style.backgroundColor = ForcontuUtils.colorDia(dia);

        dia++;
        if (dia > 7) {
          dia = 1;
        }
      });
    }
  };

})(Drupal);
