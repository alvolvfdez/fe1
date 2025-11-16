/**
 * custom jquery library
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.forcontuFadeout = {
    attach: function (context) {

      // find elements with class .fadeout
      $('.fadeout', context).once('forcontuFadeout').each(function () {

        // apply fadeout effect
        $(this).fadeOut(2000); // 2 seconds

      });
    }
  };

})(jQuery, Drupal);
