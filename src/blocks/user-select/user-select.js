(function() {
  initUserSelect();

  let currentSelectId = null;
  let currentListObj = null;

  function initUserSelect() {
    assemblyUserSelects($('.user-select'));

    $(document).on('click', '.js-open-select, .js-input-select', activedUserSelect);

    $(document).on('click', '.js-select-place', choiseItem);

    $(document).on('keyup', '.js-input-select', autocompleter);
  }

  function activedUserSelect(event) {
    event.preventDefault();

    const $this = $(this);
    const $userSelect = $this.closest('.user-select');
    // const $curInput = $userSelect.find('.user-select__input');

    _openUserSelect($userSelect);
    _clickOutside($userSelect);
  }

  function _clickOutside($userSelect) {
    $(document).on('mouseup', (event) => {
      if ($userSelect.has(event.target).length === 0) {
        _closeUserSelect($userSelect);
      }
    });
  }

  function _openUserSelect($userSelect) {
    if (!$userSelect.hasClass('active')) {
      $userSelect.addClass('active');
    } else {
      return false;
    }
  }

  function _closeUserSelect($userSelect) {
    $userSelect.removeClass('active');
  }

  function choiseItem(event) {
    event.preventDefault();

    const $this = $(this);
    const $userSelect = $this.closest('.user-select');
    const currentText = $this.html();
    const $curInput = $userSelect.find('.user-select__input');

    _insertItemText(currentText, $userSelect);
    $userSelect.siblings('.form__error-msg').remove();
    $curInput.removeClass('error');

    $(document).trigger('item-select', [$curInput.attr('name'), currentText]);
  }

  function _insertItemText(currentText, $userSelect) {
    const $inputField = $userSelect.children('.user-select__input');

    $inputField.attr('placeholder', '');
    $inputField.val(currentText);
    $inputField.trigger('change');
    _closeUserSelect($userSelect);
  }

  function autocompleter(event) {
    const value = event.target.value.toLowerCase().replace(' ', '');
    const thisSelectId = $(this).closest('.user-select').data('id');
    const $userSelect = $(this).closest('.user-select');
    const $userSelectList = $userSelect.children('.user-select__list');

    let thisList = [];
    let visibleItems = [];
    let commonArrSelects = [];

    let i = 0;

    $userSelect.siblings('.form__error-msg').remove();

    if (value.length !== 0) {
      _openUserSelect($userSelect);
    } else {
      _closeUserSelect($userSelect);
    }

    if (thisSelectId !== currentSelectId) {
      commonArrSelects = assemblyUserSelects($('.user-select'));

      currentListObj = commonArrSelects.find((item) => {
        return item.id === thisSelectId;
      });

      currentSelectId = thisSelectId;
    }

    thisList = currentListObj.innerList;

    for (const listLength = thisList.length; i < listLength; i++) {
      const item = thisList[i];

      item.link.addClass('hide');
    }

    visibleItems = thisList.filter((item) => {
      const currentItem = item;
      currentItem.search = currentItem.text.toLowerCase().indexOf(value);

      return currentItem.text.toLowerCase().indexOf(value) >= 0;
    });

    visibleItems.sort((a, b) => {
      return a.search - b.search;
    });

    for (let j = 0; j < visibleItems.length; j++) {
      visibleItems[j].link.removeClass('hide');
      visibleItems[j].link.detach().appendTo($userSelectList);
    }

    _listIsEmpty($userSelect);
  }

  function assemblyUserSelects($userSelects) {
    const arrUserSelects = [];
    const userSelectsLength = $userSelects.length;

    let i = 0;

    _setDataId($userSelects);

    for (; i < userSelectsLength; i++) {
      const selectObj = {};
      const $item = $userSelects.eq(i);

      selectObj.id = $item.data('id');
      selectObj.innerList = _getInnerList($item);

      arrUserSelects.push(selectObj);
    }

    return arrUserSelects;
  }

  function _setDataId($userSelects) {
    const userSelectsLength = $userSelects.length;

    let i = 0;

    for (; i < userSelectsLength; i++) {
      const $item = $userSelects.eq(i);
      $item.attr('data-id', i);
    }
  }

  function _getInnerList($userSelect) {
    const $userSelectList = $userSelect.find('.user-select__item');
    const arrInnerList = [];
    const userSelectListLength = $userSelectList.length;

    let i = 0;

    for (; i < userSelectListLength; i++) {
      const $item = $userSelectList.eq(i);
      const itemObj = {};

      itemObj.link = $item;
      itemObj.text = $item.text().replace(' ', '');

      arrInnerList.push(itemObj);
    }

    return arrInnerList;
  }

  function _listIsEmpty($userSelect) {
    const $emptyInfo = $userSelect.find('.user-select__empty-info');
    const $itemsList = $userSelect.find('.user-select__item');
    const itemLength = $itemsList.length;

    let countHiddenItems = 0;

    for (let i = 0; i < itemLength; i++) {
      const $item = $itemsList.eq(i);

      if ($item.hasClass('hide')) {
        countHiddenItems += 1;
      }
    }

    if (countHiddenItems === itemLength) {
      $emptyInfo.removeClass('hide');
    } else {
      $emptyInfo.addClass('hide');
    }
  }
}());
