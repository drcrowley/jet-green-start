(function() {
  $('.add-new-card .js-show-answer').on('click', function(event) {
    if ($(window).outerWidth() > 768) {
      return false;
    }

    event.preventDefault();
    const $window = $(window);
    const $this = $(this);
    const $answer = $this.closest('.link-question').children('.link-question__answer');
    const $answerPointer = $answer.children('.link-question__pointer');
    const thisOffset = $this.offset();
    const currPos = thisOffset.left + $answer.outerWidth() + 20;

    if (currPos > $window.outerWidth() || $answer.offset().left + $answer.outerWidth() > $window.outerWidth()) {
      $answer.css({
        left: $window.outerWidth() - currPos - 20
      });

      $answerPointer.css({
        left: Math.abs(parseInt($answer.css('left'), 10))
      });
    }
  });
}());
