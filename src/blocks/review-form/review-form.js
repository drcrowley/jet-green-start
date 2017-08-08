
(function() {
  let $relationInput;

  $(document).on('change', '.form__input_file', function() {
    const $this = $(this);
    const fileName = $this.val().replace(/.*\\/, '');
    const file = this.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const $error = $this.closest('label').find('.form__error-msg');

    $relationInput = $this.closest('.review-form__inner-label').find('.js-input-file-value');

    if (file.size > MAX_FILE_SIZE) {
      $error.addClass('active');
      $relationInput.addClass('form__input_error');

      return false;
    }

    $error.removeClass('active');
    $relationInput.removeClass('form__input_error');

    $relationInput.val(fileName);
    $relationInput.attr('placeholder', '');
  });
}());
