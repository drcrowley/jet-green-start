(function() {
  const $navTop = $('.header__nav_top .js-nav-list-top');
  const $items = $navTop.children('.nav__item-top');
  const $tabletNav = $('.header__nav_top .nav__tablet-list');

  const $navSub = $('.header__nav_top .js-nav-list-sub');
  const $subItems = $navSub.children('.nav__item-sub');
  const $subTabletNav = $('.header__nav_top .js-tablet-nav-sub');

  const $navFix = $('.header_fixed .js-nav-list-top');
  const $fixItems = $navFix.children('.nav__item-top');
  const $fixTabletNav = $('.header_fixed .nav__tablet-list');


  topNav($navTop, $items, $tabletNav);
  topNav($navSub, $subItems, $subTabletNav);
  topNav($navFix, $fixItems, $fixTabletNav);

  tabletNavState($('.header__nav_top .js-tablet-nav-top'), $('.header__nav_top .js-tablet-nav-open'));
  tabletNavState($('.header__nav_top .js-tablet-nav-sub'), $('.header__nav_top .js-tablet-nav-open-sub'));
  tabletNavState($('.header_fixed .js-tablet-nav-top'), $('.header_fixed .js-tablet-nav-open'));


  function topNav($nav, $items, $tabletNav) {
    if ($nav.length === 0 || $items.length === 0 || $tabletNav === 0) {
      return false;
    }

    const $tabletNavItems = $tabletNav.children('.nav__item');
    const $openTabletNav = $nav.next('.nav__tablet-list-wrap').children('.nav__tablet-open');
    let arrItems = ($(window).outerWidth() < 1160) ? assemblyDeskNavItems($items) : [];

    let currentWindowWidth = $(window).outerWidth();

    $(window).on('load', () => {
      const windowWidth = $(window).outerWidth();
      let countHiddenNavItem = 0;

      if (windowWidth > 1160) {
        showNav($nav);

        return false;
      }

      if (arrItems.length === 0) {
        arrItems = assemblyDeskNavItems($items);
      }

      countHiddenNavItem = hideShowNavItems(arrItems, $tabletNavItems, true, windowWidth);
      showHideNavOpen($openTabletNav, countHiddenNavItem);
      showNav($nav);
    });

    $(window).on('resize', () => {
      const windowWidth = $(window).outerWidth();
      const isWindowReduse = currentWindowWidth > windowWidth;
      let countHiddenNavItem = 0;

      if (windowWidth > 1160) {
        return false;
      }

      if (arrItems.length === 0) {
        arrItems = assemblyDeskNavItems($items);
      }

      countHiddenNavItem = hideShowNavItems(arrItems, $tabletNavItems, isWindowReduse, windowWidth);
      showHideNavOpen($openTabletNav, countHiddenNavItem);
      currentWindowWidth = windowWidth;
    });
  }

  function showNav($nav) {
    $nav.css({
      opacity: 1
    });
  }

  function showHideNavOpen($navOpen, showNavOpen) {
    showNavOpen ? $navOpen.addClass('active') : $navOpen.removeClass('active');
  }

  function hideShowNavItems(arrItems, $tabletNavItems, isWindowReduse, windowWidth) {
    let i = 0;
    const countItems = arrItems.length;
    const widthTabletNavOpen = 95;

    for (; i < countItems; i++) {
      const $item = arrItems[i];
      const itemOffsetLeft = $item.offsetLeft;

      if (isWindowReduse) {
        if (itemOffsetLeft + $item.width + widthTabletNavOpen > windowWidth) {
          $item.link.addClass('hide');
          $item.isHide = true;
          $tabletNavItems.eq(i).removeClass('hide');
        }
      } else {
        if (itemOffsetLeft + $item.width + widthTabletNavOpen < windowWidth) {
          $item.link.removeClass('hide');
          $item.isHide = false;
          $tabletNavItems.eq(i).addClass('hide');
        }
      }
    }

    return arrItems.filter((item) => { return item.isHide === true; }).length;
  }

  function assemblyDeskNavItems($items) {
    const countItems = $items.length;
    const arrItems = [];
    let i = 0;

    for (; i < countItems; i++) {
      const $item = $items.eq(i);
      const itemObj = {};

      itemObj.link = $item;
      itemObj.isHide = false;
      itemObj.width = $item.outerWidth();
      itemObj.offsetLeft = $item.offset().left;

      arrItems.push(itemObj);
    }

    return arrItems;
  }

  function tabletNavState($tabletNav, $btn) {
    $btn.on('click', function(event) {
      event.preventDefault();

      if (!$tabletNav.hasClass('active')) {
        $tabletNav.addClass('active');
      }
    });

    $(document).on('mouseup touchstart', (event) => {
      if (!$tabletNav.is(event.target) && $tabletNav.has(event.target).length === 0) {
        $tabletNav.removeClass('active');
      }
    });
  }
}());
