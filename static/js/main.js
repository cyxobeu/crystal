$(document).ready(function () {

  // ВАЛИДАЦИЯ ТЕЛЕФОНА
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


  $('.plans_content_block .navigation_img_block').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.plans_content_block .main_img_block'
  });
  $('.plans_content_block .main_img_block').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: false
  });


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


  var $percent = parseInt($('.status_text .percent').text());
  $('.done_graph').css('width', $percent + '%');

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

  $('.tender_container').slick({
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false
  });

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

  //        СКРОЛЛ ДО ВЕРХА
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
        $cell.addClass('hidden');
        $('.plans_content_block .plans_content_cell[data-room-number=' + $data_info + ']').removeClass('hidden');
      }
    }
  })
});

