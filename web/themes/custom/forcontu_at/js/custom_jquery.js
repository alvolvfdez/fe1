(function ($, Drupal, once) {
  'use strict';

  Drupal.behaviors.forcontuFadeout = {
    attach: function (context) {

      once('forcontuFadeout', '.fadeout', context).forEach(function (el) {
        $(el).fadeOut(2000);
      });

    }
  };

})(jQuery, Drupal, once);

