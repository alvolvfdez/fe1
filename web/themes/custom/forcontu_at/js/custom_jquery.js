(function ($) {
  'use strict';

  $(document).ready(function() {
    $(".fadeout").delay(2000).fadeOut(3000);
  });
})(jQuery);

(function ($) {
  'use strict';

  $(document).ready(function () {

    // apply border to images inside article content
    $('.node--type-article img').css({
      'border': '2px solid #c34e2e'
    });

  });

})(jQuery);

(function ($) {
  'use strict';

  $(document).ready(function () {

    // select li items in the recent content block
    var items = $('.block-plugin-id--views-block-content-recent-block-1 li');

    // apply par and impar classes
    items.each(function (index) {
      if ((index + 1) % 2 === 0) {
        $(this).addClass('par');
      }
      else {
        $(this).addClass('impar');
      }
    });

    // double font size of the first element
    items.first().css('font-size', '2em');

  });

})(jQuery);
