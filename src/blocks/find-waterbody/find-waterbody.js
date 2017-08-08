(function() {
  const $pageView = $('.page__view');
  const $switchers = $('.js-view-page');

  if ($pageView.length === 0) {
    return false;
  }

  $switchers.on('click', function(event) {
    event.preventDefault();
    const view = $(this).data('view');

    $switchers.removeClass('active');
    $switchers.siblings(`[data-view="${view}"]`).addClass('active');

    $('.page__view').removeClass('active');
    $(`.page__view[data-view="${view}"]`).addClass('active');
  });
}());
