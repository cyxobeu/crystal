$(document).ready(function () {

  // ВАЛИДАЦИЯ ТЕЛЕФОНА
  function phone_validation() {
    $("input[type=tel]").inputmask("+7(999)9999999");
    $(document).on("keydown change", ".phone-mask-input, input[type=tel]", function (e) {
      var $this = $(this);
      var val = $this.val();
      if ((val.indexOf("+7(89") === 0) || (val.indexOf("+7(88") === 0)) {
        var new_val = val.slice(0, 3) + val.slice(4, val.length);
        $this.val(new_val);
        $this.trigger("change", e);
      }
    });
  }
  phone_validation();

  // КНОПКА ОСНОВНОГО МЕНЮ
  $('.menu_button').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.menu').toggleClass('active');
  });

  // ПЛАВНЫЙ СКРОЛЛ ДО ЯКОРЯ
  $(document).on('click', '.menu_item', function (e) {
    e.preventDefault();

    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $('html, body').animate({scrollTop:destination  - 80},400);
  });

  // ОСНОВНОЙ СЛАЙДЕР
  $('.main_slider_navigation').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.main_slider_block'
  });
  $('.main_slider_block').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false,
    asNavFor: '.main_slider_navigation'
  });

  // РАЗВОРАЧИВАЮЩИЙСЯ ТЕКСТ О НАС
  if ($('.about_text').innerHeight() > 190) {
    $('.about_text').addClass('big')
  }
  $(window).resize(function () {
    if ($('.about_text').innerHeight() > 190) {
      $('.about_text').addClass('big')
    } else {
      $('.about_text').removeClass('big')
    }
  });
  $('.about_text .view_more').click(function (e) {
    e.preventDefault();

    $(this).closest('.about_text').toggleClass('active')
  });

  // ПРОГРЕССБАР ХОДА СТРОИТЕЛЬСТВА
  var $percent = parseInt($('.status_text .percent').text());
  $('.done_graph').css('width', $percent + '%');


  // КНОПКА ПОКАЗАТЬ ЕЩЕ В БЛОКЕ ДОКУМЕНТОВ
  $('.documents_block .view_more').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(this).text('Свернуть')
    } else {
      $(this).text('Еще документы')
    }

    $(this).closest('.documents_block').toggleClass('active');
  });

  // СЛАЙДЕР АКЦИЙ
  $('.tender_container').slick({
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false
  });

  // СЛАЙДЕР ОТЗЫВОВ
  $('.reviews_block').slick({
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    infinite: true,
    dots: true,
    fade: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true
        }
      }
    ]
  });

  // СКРОЛЛ ДО ВЕРХА
  $(document).on('click', '.footer_anchor', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0},400);
  });

  // ПЕРЕКЛЮЧЕНИЕ КНОПОК ПЛАНИРОВКИ
  $(document).on('click', '.plans_button', function (e) {
    e.preventDefault();

    var $data_info = $(this).attr('data-room-number');
    var $cell = $('.plans_content_block .plans_content_cell');

    if ($(this).hasClass('all')) {
      $(this).siblings('.plans_button').removeClass('active');
      $(this).addClass('active');
      $cell.removeClass('hidden');
      $('.plans_content_block .plans_content_cell.floor').addClass('hidden');
    } else if ($(this).hasClass('floor')) {
      $(this).siblings('.plans_button').removeClass('active');
      $(this).addClass('active');
      $cell.addClass('hidden');
      $('.plans_content_block .plans_content_cell[data-room-number="floor"]').removeClass('hidden');
    } else {
      $(this).siblings('.plans_button').not('.room').removeClass('active');
      $(this).toggleClass('active');
      if (!$(this).hasClass('active')) {
        $('.plans_content_block .plans_content_cell[data-room-number=' + $data_info + ']').addClass('hidden');
      } else {
        if ($(this).siblings('.room').hasClass('active')) {
          $('.plans_content_block .plans_content_cell[data-room-number=' + $data_info + ']').removeClass('hidden');
        } else {
          $cell.addClass('hidden');
          $('.plans_content_block .plans_content_cell[data-room-number=' + $data_info + ']').removeClass('hidden');
        }
      }

      if (!$('.plans_button').hasClass('active')) {
        $('.plans_button.all').click();
      }
    }
  });

  // ПЕРЕКЛЮЧЕНИЕ КНОПОК СПОСОБА ОПЛАТЫ
  $(document).on('click', '.pay_button', function (e) {
    e.preventDefault();

    var $data_info = $(this).attr('data-pay');
    var $cell = $('.pay_content_container .pay_cell');

    $('.pay_button').removeClass('active');
    $(this).addClass('active');

    $cell.addClass('hidden');
    $('.pay_content_container .pay_cell[data-pay="' + $data_info + '"]').removeClass('hidden');
  });

  // Открытие попапов
  $(document).on('click', '.open_popup', function() {
    var $href = $(this).attr('href');
    var $container = $($href).next();
    var count = false;

    if (window.innerWidth > 1024) {
      $('html').css('overflow', 'hidden');
    }

    if ($(this).hasClass('view_more') && window.innerWidth > 1024) {
      var $clone = $(this).closest('.plans_content_cell').clone();
      $('.popup_overlay').removeClass('active_popup');
      $($href).addClass('active_popup');
      $clone.prependTo($container).attr('class', 'popup_content plans_content');

    } else if ($(this).hasClass('view_more') && window.innerWidth < 1025) {
      $(this).closest('.plans_content_cell').addClass('active');

    } else {
      $('.popup_overlay').removeClass('active_popup');
      $($href).addClass('active_popup');
      phone_validation();
    }
  });

  // Закрытие формы планировки при width < 1025px
  $(document).on('click', '.apartment_form .arrow', function () {
    $(this).closest('.plans_content_cell').removeClass('active');
  });

  // Закрытие попапов, при нажатии на оверлей
  $(document).on('click', '.popup_overlay' , function() {
    if ($(this).hasClass('plans_overlay')) {
      console.log($(this).next().find('popup_content'));
      $(this).next().find('.popup_content').remove();
    }
    $(this).removeClass('active_popup');
    $('html').css('overflow', 'visible');
  });
  $(document).on('click', '.close_popup', function(e) {
    e.preventDefault();
    if ($(this).hasClass('plans_close')) {
      $(this).prev().remove();
    }
    $(this).closest('.popup_container').prev().removeClass('active_popup');
    $('html').css('overflow', 'visible');
  });

  // Переключение картинок в планировке
  $(document).on('click', '.apartment_img_block .small_img', function () {
    var $src = $(this).attr('src');
    $(this).closest('.apartment_img_block').find('.big_img').attr('src', $src);
  });

  // Слайдер планировок для < 480px
  function plans_slider() {
    $('.plans_content_block').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      fade: false,
      mobileFirst: true,
      responsive: [{
        breakpoint: 480,
        settings: 'unslick'
      }]
    });
  }
  plans_slider();
  $(window).resize(function () {
    setTimeout(function () {
      plans_slider();
    }, 100);
  });

  // AJAX обработка для форм
  function ajaxForm($this) {
    var container = $this.closest('.form_container');
    var form_data = $this.serialize();
    $.ajax({
      type: $this.attr('method'),
      url: $this.attr('action'),
      data: form_data,
      success: function() {
        $this.addClass('hidden');
        container.find('.main_form_title').addClass('hidden');
        container.find('.success_message').removeClass('hidden');
      },
      error: function() {
        $this.addClass('hidden');
        container.find('.main_form_title').addClass('hidden');
        container.find('.error_message').removeClass('hidden');
      }
    });
    return false;
  }
  $(document).on('submit', '.form', function (e) {
    e.preventDefault();
    ajaxForm($(this));
  });

  // Переключение навигации месяцев и года в Статусе строительства
  function curentMonth() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var curent_month = $('.month_cell:nth-child(' + month + ')');
    curent_month.nextAll('.month_cell').addClass('disabled');
    curent_month.trigger('click');

    return curent_month;
  }
  curentMonth();

  $(document).on('click', '.month_block .month_cell', function (e) {
   e.preventDefault();

   $(this).siblings('.month_cell').removeClass('active');
   $(this).addClass('active');
  });

  $(document).on('click', '.status_navigation_block .year', function (e) {
    e.preventDefault();

    var text = $(this).text();
    $('.status_main_title').text(text);

    $('.month_block .month_cell').removeClass('disabled active');

    if ($(this).hasClass('prev')) {
      $('.month_block .month_cell:first-child').trigger('click');
      $(this).addClass('hidden');
      $('.status_navigation_block .year.next').removeClass('hidden');
    } else {
      curentMonth();

      $(this).addClass('hidden');
      $('.status_navigation_block .year.prev').removeClass('hidden');
    }
  });


  // Слайдер хода страительства, при Ajax запросе нужно ренициализировать слайдер
  $('.status_content_block').slick({
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    dots: false,
    fade: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          arrows: true
        }
      }
    ]
  });

  // YANDEX MAP
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [59.19903163120821,39.88388209005738],
        zoom: 16
      }, {
        searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Любой текст'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'static/img/map_mark.png',
        // Размеры метки.
        iconImageSize: [87, 83],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -43],
        // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
        //   // Макет содержимого.
          iconContentLayout: MyIconContentLayout
      });

    myMap.geoObjects.add(myPlacemark);
  });
});

