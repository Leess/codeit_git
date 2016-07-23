$( function() {   
    $('section:in-viewport').addClass('animated');    
    checkVisibleSections();
    scrollToElem();    
    fixHeader();
    initPhoneMask();
    validateForms();
    initPopup();    
    initAccordion();   
    initSlider();
});


$(window).load(function(){
    checkVisibleSections();
});
$(window).scroll(function(){
    checkVisibleSections();
});

function initSlider() {
    $('.main__slider').cycle({
        slides: '> .main__slide',
        fx: 'fade',
        speed: 2000,
        timeout: 4000,
        
    });
}
//function initTabsFaq() {
//
//    $('.faq__tab').click(function(e){
//        $('.faq__tab').removeClass('active');
//        $('#faq_answers').removeClass('active');
//        $('#faq_questions').removeClass('active');
//        $(this).addClass('active');
//        var href = $(this).attr('href'); 
//        $(href).addClass('active');
//        e.preventDefault();
//    });
//}


function initAccordion() {
    var $block = $('#sidebar');
    var $headers = $block.find('dt a');
    var $content = $block.find('dd');
    $content.not('.active + dd').hide();

    $headers.click(function(e){
        var isActive = $(this).parent().hasClass('active');
        if(isActive) {
            $(this).parent().next().slideUp();
            $(this).parent().removeClass('active');
        } else {
            $content.stop().slideUp();
            $headers.parent().removeClass('active');
            $(this).parent().next().stop().slideDown();
            $(this).parent().addClass('active');
        }
        e.preventDefault();
    });
}

function initPhoneMask() {
    $('input[type="tel"]').mask("+38 (999) 999-99-99");
}

function checkVisibleSections() {
    $('section:in-viewport').addClass('animated');      


    var visiblePercent = $(window).height() / 100 * 49;
    var $sections = $([]);

    $('nav a').each(function(){
        $sections = $sections.add($(this.hash));
    });
    var $menuItems = $('nav li');
    if(!$sections.filter(':in-viewport(' + visiblePercent +')').length) return;

    $sections.removeClass('visible');
    $menuItems.find('a').removeClass('active');
    $sections.filter(':in-viewport(' + visiblePercent +')').addClass('visible');

    var id = "#" + $sections.filter('.visible').attr('id');
    $menuItems.find('a[href="' + id + '"]').closest('a').addClass('active');
}
/*function initSliderComments() {
    $('.commnets__wrap-slider').each(function() {
        var next = $(this).siblings('.arrow__right');
        var prev = $(this).siblings('.arrow__left');
        $(this).cycle({
            slides: ' > .comments__wrap',
            fx: 'scrollHorz',          
            next: next,
            prev: prev,                  
            speed: 3000,
            timeout: 3000,
            paused: false
        });
    });
}*/
/*function initMap() {
    if(typeof ymaps == 'undefined') return;
    $('#location__map').html('');
    var myMap, 
        myPlacemark;

    function init(){ 
        myMap = new ymaps.Map("location__map", {
            center:[55.841426,37.452512],
            zoom: 16

        }); 

        myMap.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark([55.841426,37.452512], {}, {
             iconLayout: 'default#image',
            iconImageHref: '',
            iconImageSize: [51, 57],
            iconImageOffset: [-11, -53]
        });

        myMap.geoObjects.add(myPlacemark);
    }
    ymaps.ready(init);
}*/

function scrollToElem() {
    $('nav a').click(function(e){
        var href = this.hash;
        if(!$(href).length) return;

        var distance = $(window).scrollTop() - ($(href).offset().top);
        var speed = (distance > 0) ? distance / 4 : distance * -1 / 4;

        var headerOffset = $('nav').outerHeight();

        $('html, body').animate({scrollTop: ($(href).offset().top - headerOffset)}, speed);
        e.preventDefault();
    });
}



/*function scrollToUp() {
    $(".button-up").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
    });
}*/







function initPopup() {
    $('.order_call, .buy_one_click, .order_btn, .add_comments' ).fancybox({

        minHeight:500,

        tpl: {
            wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin" style="background:none; box-shadow:none; padding:0;"><div class="fancybox-outer"><div class="fancybox-inner" ></div></div></div></div>',

        },
    });

}


function validateForms() {
    $.extend($.validator.messages, {
        required: "Это поле необходимо заполнить.",
        remote: "Пожалуйста, введите правильное значение.",
        email: "Пожалуйста, введите корректный адрес электронной почты.",
        url: "Пожалуйста, введите корректный URL.",
        date: "Пожалуйста, введите корректную дату.",
        dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
        number: "Пожалуйста, введите число.",
        digits: "Пожалуйста, вводите только цифры.",
        creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
        equalTo: "Пожалуйста, введите такое же значение ещё раз.",
        extension: "Пожалуйста, выберите файл с правильным расширением.",
        maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
        minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
        rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
        range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
        max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
        min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
    });

    $('form').each(function(){
        $(this).validate({
            validClass: 'valid',
            errorElement: 'div',
            submitHandler: function(form){
                handleSubmitForm({}, $(form) );
                $(form).trigger('reset');
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error').removeClass('valid');

            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error').addClass('valid');
            },
            errorPlacement: function(error, element) {
                return true;
            },
        });
    });
}


function handleSubmitForm(event, el) {
    var form = $(el);
    var popupTnx = $(form).hasClass('comments__form') ? $('#popup__tnx-comments') : $('#popup__tnx');

    console.log(popupTnx);
   
    $.ajax({
        type: 'post',
        url: form.attr('action'),
        data: form.serialize(),
        beforeSend: function(){            
            $.fancybox(popupTnx,{
                tpl: {
                    wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin" style="background:none; box-shadow:none; padding:0;"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                    closeBtn : '<a title="Close" class="fancybox-item fancybox-close thx" href="javascript:;"></a>',
                }
            });                
            $('form').trigger('reset');


        },
        success: function(msg) {
            if (msg == 'ok') {} else {}
        }
    });
}

/*
function handleSubmitForm(event, el) {
    var form = $(el);
    form.ajaxSubmit({
        url: form.attr('action'),
        data: form.formSerialize(),
        beforeSubmit: function(){
            $.fancybox('#popup__tnx',{
                minHeight:400,
                tpl: {
                    wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin" style="background:none; box-shadow:none; padding:0;"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                },
            });

            form.resetForm();

        }
    });
}
*/




function fixHeader() {
    $(window).scroll($.debounce(0, function(){

        if($(window).scrollTop() > 1) {
            $('#header__menu').addClass('scrolled');
            $('#header').addClass('hide');
        } else {
            $('#header__menu').removeClass('scrolled');
            $('#header').removeClass('hide');
        }

    }));

}















