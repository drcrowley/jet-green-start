(function() {
  $(document).on('click', '.js-waterbody-show', function(event) {
    event.preventDefault();
    const $this = $(this);
    const $waterbodyItem = $this.closest('.about-waterbody__item');

    const defaultHeight = ($this.closest('.featherlight').length > 0) ? 100 : 110;

    $this.toggleClass('open');

    if ($this.hasClass('open')) {
      $waterbodyItem.css({
        height: $waterbodyItem[0].scrollHeight
      });

      $waterbodyItem.one('transitionend', function() {
        $(this).css({
          overflow: 'visible'
        });
      });
    } else {
      $waterbodyItem.css({
        overflow: 'hidden'
      });

      $waterbodyItem.css({
        height: defaultHeight
      });
    }
  });

  $(document).on('click', '.js-payment-descr', function() {
    if ($(window).outerWidth() > 1160) {
      return false;
    }

    const $answer = $(this).next();
    $answer.addClass('active');
  });

  $(document).on('touchstart', function(event) {
    const $answer = $('.link-question.active');

    if (!$answer.is(event.target) && $answer.has(event.target).length === 0) {
      $answer.removeClass('active');
    }
  });
}());
