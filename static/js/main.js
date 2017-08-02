$(document).ready(function () {
  $('.menu_button').click(function (e) {
    e.preventDefault();
    $('.menu').toggleClass('active');
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
  })
});

