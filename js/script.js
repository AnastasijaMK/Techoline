$(document).ready(function() {

    // Корректировка отображения всплывающих окон в мобильных браузерах
    function calcVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    calcVh();


    // Плавная прокрутка к якорю
    $("body").on('click', '[href*="#"]', function(e){
        e.preventDefault();
        const idName = $(this).attr('href').replace('#','');
        let element = document.getElementById(idName);
        let headerOffset = 45;
        let elementPosition = element.getBoundingClientRect().top;
        let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });


	// Маски 
    $("input[type='tel']").mask("+7 (999) 999-99-99");
    // Перенос курсора в начало поля
    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            let range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    $('input[type="tel"]').click(function(){
        if ($(this).val() == "+7 (___) ___-__-__") {
            $(this).setCursorPosition(4);  
        }
    });

    $("input[name='TIME']").click(function(){
        $("input[name='TIME']").mask("99:99");
    });


    // Активация анимации
    new WOW().init();

	setTimeout(()=>{
		$('.page__banner--animation .block--transparent').removeClass('animation');
	}, 1000);


    // Шапка. Поиск
    $('.header__main .icon__search').on('click', function(){
        setTimeout(()=>{
            $('.popup__search--wrap').addClass('active');
            $('.popup__search--wrap input').focus();
        }, 100);
    });

    // Шапка. Поиск. Закрыть
    $(document).on('click', function(e){
        if($('.popup__search--wrap').hasClass('active') &&  (!document.querySelector('.popup__search--wrap').contains(e.target) || document.querySelector('.search__inner--close').contains(e.target))) {
            $('.popup__search--wrap').removeClass('active');
        }
    });


    // Шапка. Распределение разделов в выпадающем списке по столбцам
    $('.header__main .header__main--menu .menu__block').hover(function(){
        if ($(window).width() > 1199 && $(this).find('.menu__list').attr('data-list') == "solutions") {
            makeColumns($('.header__main .menu__list[data-list="solutions"] ul'), 4);
        }
    });


    // Шапка. Открыть меню на планшет и моб версиях
    $('.header__main--burger').on('click', function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.popup__menu').removeClass('active inner--list-opened');
            $('.wrapper__shadow').removeClass('active menu');
            $('header').removeClass('active menu');
            $('.header__main .header__main--phone').show();
            $('body').css('position','');
            $('.popup__menu li.active').removeClass('active');
            $('.popup__menu .popup__menu--back').removeClass('inner--level');
            $('.popup__menu .popup__menu--group ul li').css('display','');
            $('.popup__menu .popup__menu--group ul li span').css('display','');
            $('.popup__menu .popup__menu--group ul').css('display','');
            $('.popup__menu .popup__menu--selection a').css('display', '');
        } else {
            $(this).addClass('active');
            $('.popup__menu').addClass('active');
            $('.wrapper__shadow').addClass('active menu');
            $('header').addClass('active menu');
            $('.header__main .header__main--phone').hide();
            $('body').css('position','fixed');
            checkInnerList();
            $('html, body').scrollTop(0);
            setTimeout(()=>{
                calcVh();
            }, 300);
        }
    });


    // Моб. меню. Находим вложенные пункты
    function checkInnerList() {
        $('.popup__menu .popup__menu--group ul li').each(function(){
            if ($(this).children('ul').length > 0) {
                $(this).addClass('inner--list');
            }
        });
    }


    // Моб. меню. Открытие подпунктов 
    $('.popup__menu li > span').on('click',function() {
        $(this).closest('.popup__menu').find('li.active').removeClass('active');
        $(this).closest('li').addClass('active');
        $(this).closest('.popup__menu').addClass('inner--list-opened');
        if ($(this).parent('li').closest('ul').parent('li').length > 0) {
            $(this).closest('.popup__menu').find('.popup__menu--back').addClass('inner--level');
            $(this).parent('li').closest('ul').parent('li').show();
            $(this).parent('li').closest('ul').show();
            $(this).parent('li').show();
            $(this).parent('li').closest('ul').parent('li').children('span').hide();
        } else {
            $(this).parent('li').children('ul').show();
            $(this).parent('li').parent('ul').children('li').css('display','');
        }
        if ($(this).parent('li').attr('data-section') == "water") {
            $('.popup__menu .popup__menu--selection a[data-type="water"]').css('display', 'flex');
            $('.popup__menu .popup__menu--selection a[data-type="metal"]').css('display', '');
        } else if ($(this).parent('li').attr('data-section') == "metal") {
            $('.popup__menu .popup__menu--selection a[data-type="metal"]').css('display', 'flex');
            $('.popup__menu .popup__menu--selection a[data-type="water"]').css('display', '');
        } else {
            $('.popup__menu .popup__menu--selection a').css('display', '');
        }
    });


    // Моб. меню. Закрытие подпунктов 
    $('.popup__menu .popup__menu--back').on('click',function() {
        if ($('.popup__menu li.active').parent('ul').parent('li').length > 0) {
            $('.popup__menu li.active').parent('ul').parent('li').addClass('active');
            $('.popup__menu li.active').parent('ul').parent('li').children('span').show();
            $('.popup__menu li.active li.active').removeClass('active');
            $(this).removeClass('inner--level');
        } else {
            $(this).closest('.popup__menu').removeClass('inner--list-opened');
            $('.popup__menu li.active').children('ul').hide();
            $('.popup__menu li.active').removeClass('active');
        }
        if ($('.popup__menu li.active').attr('data-section') == "water") {
            $('.popup__menu .popup__menu--selection a[data-type="water"]').css('display', 'flex');
            $('.popup__menu .popup__menu--selection a[data-type="metal"]').css('display', '');
        } else if ($('.popup__menu li.active').attr('data-section') == "metal") {
            $('.popup__menu .popup__menu--selection a[data-type="metal"]').css('display', 'flex');
            $('.popup__menu .popup__menu--selection a[data-type="water"]').css('display', '');
        } else {
            $('.popup__menu .popup__menu--selection a').css('display', '');
        }
    });


	// Слайдер товаров  
    // (предусмотрено расположение нескольких одинаковых слайдеров на одной странице)
    let arrowPrev =  $('.slider__for .slider__for--prev');
    let arrowNext =  $('.slider__for .slider__for--next');
    for (let i = 0; i <= (arrowPrev.length-1); i++) {
        arrowPrev[i].setAttribute('data-prev', i);
        arrowNext[i].setAttribute('data-next', i);
    }

    $('.slider__for--inner').each(function(index) {
        if ($(this).find('.slider__for--slide').length > 1) {
        	$(this).slick({
            	slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                prevArrow: $('.slider__for--prev[data-prev="'+ index + '"]'),
                nextArrow: $('.slider__for--next[data-next="'+ index + '"]'),
                fade: true,
                infinite: true
            });
        } else {
            $(this).closest('.slider__for').find('.slider__for--next').hide();
            $(this).closest('.slider__for').find('.slider__for--prev').hide();
        }
    });

    // Выравнивание пунктов в нумерованных списках
    function listPointPosition() {
    	$('.list--point').each(function(){
    		let pointNumberHeight = $(this).find('.list--count').outerHeight(true);
    		let pointTextHeight = $(this).find('.list--text').outerHeight(true);
    		if (pointTextHeight > pointNumberHeight) {
    			$(this).css('align-items','flex-start');
    		} else {
    			$(this).css('align-items','center');
    		}
    	});
    }

    listPointPosition();
    $(window).resize(function(){
    	listPointPosition();
    });


    // Ползунок
    function checkRange() {
        $('input[type=range]').each(function() {
            let progressWidth = (100/($(this).attr('max')-1)) * ($(this).val()-1);
            let progressShift = progressWidth/100 * 20;
            $(this).closest('.range--wrap').next('.range--hint').text($(this).val().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f'));
            let hintShift = ($(this).closest('.range--wrap').next('.range--hint').outerWidth(true) - 20)/2;
            $(this).next('.range--progress').css('width', 'calc(' + progressWidth + '% - ' + progressShift +"px");
            $(this).closest('.range--wrap').next('.range--hint').css('left', 'calc(' + progressWidth + '% - ' + progressShift +"px - " + hintShift + 'px');
        });
    }
    checkRange();
    $('input[type=range]').on('input', function() {
        checkRange();
    });


    // Подбор реагентов. Распределение блоков по двум столбцам
    if ($(window).width() > 767) {
        makeColumns($('.reagent--wrap form > .form__fields--list'), 2);
    } else {
        $('.reagent--wrap form > .form__fields--list').css('height','');
    }
    $(window).resize(function(){
        if ($(window).width() > 767) {
            makeColumns($('.reagent--wrap form > .form__fields--list'), 2);
        } else {
            $('.reagent--wrap form > .form__fields--list').css('height','');
        }
    });


    // Список разделов. Распределение разделов по столбцам
    if ($(window).width() > 1199) {
        makeColumns($('.catalog_section--wrap .section__list'), 3);
    } else if ($(window).width() > 767) {
        makeColumns($('.catalog_section--wrap .section__list'), 2);
    } else {
        $('.catalog_section--wrap .section__list').css('height','');
    }
    $(window).resize(function(){
        if ($(window).width() > 1199) {
            makeColumns($('.catalog_section--wrap .section__list'), 3);
        } else if ($(window).width() > 767) {
            makeColumns($('.catalog_section--wrap .section__list'), 2);
        } else {
            $('.catalog_section--wrap .section__list').css('height','');
        }
    });


    // Подбор реагентов для подготовки и обработки металла. Отправить
    let timerForSentButton;
    $('.reagent--wrap .form__fields--send button').click(function(e){
        e.preventDefault();
        if($(this).hasClass('sent')) return;
        let nameValue = $(this).closest('.form__fields--send').find('input[name="NAME"]').val();
        let mailValue = $(this).closest('.form__fields--send').find('input[name="EMAIL"]').val();
        let patternMail = /^([a-z0-9_-]+\.)?[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        $(this).closest('.form__fields--send').find('.warning').removeClass('warning');
        if (nameValue.trim() == "" || mailValue.trim() == "" || mailValue.search(patternMail) !== 0) {
            if (nameValue.trim() == "") {
                $(this).closest('.form__fields--send').find('input[name="NAME"]').closest('label').addClass('warning');
            }
            if (mailValue.trim() == "") {
                $(this).closest('.form__fields--send').find('input[name="EMAIL"]').closest('label').addClass('warning');
                $(this).closest('.form__fields--send').find('.warning .input--error').text('Обязательное поле');
            } else {
                if(mailValue.search(patternMail) !== 0) {
                    $(this).closest('.form__fields--send').find('input[name="EMAIL"]').closest('label').addClass('warning');
                    $(this).closest('.form__fields--send').find('input[name="EMAIL"]').next('.input--error').text('Укажите, пожалуйста, корректный email');
                }
            }
            $(this).closest('.form__fields--send').find('.warning .input--error').show();
            $('.popup-for-error').addClass('active');
            setTimeout(()=>{
                $('.popup-for-error').removeClass('active');
                $(this).closest('.form__fields--send').find('.warning .input--error').hide();
            }, 8000);
        } else {
            $(this).closest('.form__fields--send').find('input').val('');
            $(this).text('Отправлено');
            $(this).addClass('sent');
            timerForSentButton = setTimeout(()=>{
                $(this).text('Отправить');
                $(this).removeClass('sent');
            }, 3000);
        }
    });


    $('.reagent--wrap .form__fields--send .form__fields--list label input').on('click', function(){
        $(this).next('.input--error').hide();
        clearTimeout(timerForSentButton);
        $('.reagent--wrap .form__fields--send button').text('Отправить');
        $('.reagent--wrap .form__fields--send button').removeClass('sent');
    });

    
    // Закрытие всплывающих окон
    $('.popup .popup__close, .wrapper__shadow').on('click', function() {
        $('.popup.active .warning').removeClass('warning');
        $('.popup.active').removeClass('active');
        $('.wrapper__shadow.active').removeClass('active');
        $(".dial2").removeClass('knobbed');
        $('.wrapper__shadow').css('z-index', '');
        $('body').css('position','');
        if(document.body.hasAttribute('data-scroll') && document.documentElement.clientWidth < 768) {
            $('html').css('scroll-behavior', 'auto');
            document.documentElement.scrollTop = document.body.getAttribute('data-scroll');
            document.body.removeAttribute('data-scroll');
            $('html').css('scroll-behavior', '');
        }
    });


    // Фильтр. Каталог. Находим внутренние списки
    $('aside .catalog__list ul').children().each(function(){
        if ($(this).find('ul').length > 0) {
            $(this).addClass('inner--list');
            $(this).prepend('<span class="inner--list-open"></span>')
        }
    });


    // Фильтр. Развернуть/скрыть внутренние списки
    $('aside .inner--list-open').on('click', function() {
        if ($(this).closest('li').hasClass('opened')) {
            $(this).closest('li').children('ul').height('');
            $(this).closest('li').removeClass('opened');
        } else {
            $(this).closest('li').addClass('opened');
            let listInnerHeight = 0;
            $(this).closest('li').children('ul').children('li').each(function(){
                listInnerHeight += $(this).outerHeight(true);
            });
            $(this).closest('li').children('ul').height(listInnerHeight);
        }
    });

    let listInnerHeight = 0;
    $('aside .catalog__list li.opened').children('ul').children('li').each(function(){
        listInnerHeight += $(this).outerHeight(true);
    });
    $('aside .catalog__list li.opened').children('ul').height(listInnerHeight);


    // Фильтр. Скрываем длинные фильтры
    function hideLongFilter() {
        $('aside .filter__block[data-filter="checkbox"]').each(function(){
            if ($(this).find('li').length > 5) {
                $(this).find('.filter__block--inner').addClass('show-more');
            }
            let listHeightMax = 0;
            $(this).find('li').each(function(index) {
                if (index <= 4) {
                    listHeightMax += $(this).outerHeight(true);
                } 
            });
            $(this).find('.filter__block--inner').css('height', listHeightMax + 'px');
        });
    }
    hideLongFilter();


    // Фильтр. Свернуть/развернуть
    $('aside .filter__block .filter__block--toggle').on('click', function(){
        if ($(this).hasClass('active')) {
            let listHeightMax = 0;
            $(this).prev('.filter__block--inner').find('li').each(function(index) {
                if (index <= 4) {
                    listHeightMax += $(this).outerHeight(true);
                } 
            });
            $(this).prev('.filter__block--inner').css('height', listHeightMax + 'px');
            $(this).text('Смотреть все');
        } else {
            let listHeightTotal = $(this).prev('.filter__block--inner').find('ul').outerHeight(true);
            $(this).prev('.filter__block--inner').css('height', listHeightTotal + 'px');
            $(this).text('Свернуть');
        }
        $(this).toggleClass('active');
    });


    // Фильтр. Скрыть/показать кнопку сброса фильтров
    $('.catalog__item--list aside .filter__block li input').click(function(){
        if ($(this).closest('.filter__block').attr('data-filter') == "radio" && $(this).is(':checked')) {
            $(this).closest('.filter__block').find('input').prop('checked', false);
            $(this).prop('checked', true);
        }
        if ($('.catalog__item--list aside .filter__block li input:checked').length > 0) {
            $('.catalog__item--list aside .j-filter-reset').show();
        } else {
            $('.catalog__item--list aside .j-filter-reset').hide();
        }
    });


    // Фильтр. Сбросить фильтры
    $('.j-filter-reset').click(function(){
        if ($(this).parent().is('aside')) {
            $(this).closest('aside').find('.filter__block input:checked').prop('checked', false);
        } else {
            $(this).closest('.popup').find('.filter__block input:checked').prop('checked', false);
            $('.popup__filter .j-apply-filter').text('Закрыть');
        }
        $(this).hide();
    });


    // Сортировка
    $('.catalog__item--list .sort__block a').click(function(){
        if ($(this).hasClass('decrease')) {
            $(this).addClass('increase');
            $(this).removeClass('decrease');
        } else if ($(this).hasClass('increase')) {
            $(this).removeClass('increase');
            $(this).addClass('decrease');
        } else {
            $(this).closest('.sort__block').find('a').removeClass('decrease increase');
            $(this).addClass('decrease');
        }
    });


    // Сортировка через select (на моб. версии выравнивание текста по правому краю)
    $('.catalog__item--list .catalog__item--inner select').on('input', function(){
        let selectValue = $(this).val();
        $(this).closest('.sort__select').prepend('<span class="select-hint">'+ selectValue +'</span>');
        let selectWidth = $(this).closest('.sort__select').find('.select-hint').width();
        $(this).width(selectWidth);
        $(this).closest('.sort__select').find('.select-hint').remove()
    });


    // Карточка товара. Если у товара есть параметр, выбираем первое значение активным
    $('.catalog__item').each(function(){
        if ($(this).find('.parameter--list li').length > 0) {
            $(this).find('.parameter--list li').first().find('input').prop('checked', true);
        } else if ($(this).find('.parameter__field').length > 0) {
            let fieldValue = $(this).find('.parameter__field .parameter__field--list label').first().find('span').text();
            $(this).find('.parameter__field .parameter__field--list label').first().addClass('selected');
            $(this).find('.parameter__field .picker__button').val(fieldValue);
        }
    });


    // Карточка товара. Подсчет высоты названия и высоты параметров
    function calcItemNameHeight() {
        let itemTitleMaxHeight = 0;
        let itemParamMaxHeight = 0;
        $('.catalog__items .catalog__item').each(function(index) {
            if ($(window).width() > 767) {
                if (index % 3 == 0) {
                    $('.catalog__item.calculated .catalog__item--heading').height(itemTitleMaxHeight);
                    $('.catalog__item.calculated .catalog__item--parameter').height(itemParamMaxHeight);
                    $('.catalog__item.calculated').removeClass('calculated');
                    itemTitleMaxHeight = 0;
                    itemParamMaxHeight = 0;
                }
            } else {
                if (index % 2 == 0) {
                    $('.catalog__item.calculated .catalog__item--heading').height(itemTitleMaxHeight);
                    $('.catalog__item.calculated .catalog__item--parameter').height(itemParamMaxHeight);
                    $('.catalog__item.calculated').removeClass('calculated');
                    itemTitleMaxHeight = 0;
                    itemParamMaxHeight = 0;
                }
            }
            $(this).find('.catalog__item--heading').height('auto');
            $(this).find('.catalog__item--parameter').height('auto');
            let itemTitleHeight = $(this).find('.catalog__item--heading').height();
            let itemParamHeight = $(this).find('.catalog__item--parameter').height();
            $(this).addClass('calculated');
            itemTitleMaxHeight = itemTitleHeight > itemTitleMaxHeight ? itemTitleHeight : itemTitleMaxHeight;
            itemParamMaxHeight = itemParamHeight > itemParamMaxHeight ? itemParamHeight : itemParamMaxHeight;
            if (index == $('.catalog__item').length -1) {
                $('.catalog__item.calculated .catalog__item--heading').height(itemTitleMaxHeight);
                $('.catalog__item.calculated .catalog__item--parameter').height(itemParamMaxHeight);
                $('.catalog__item.calculated').removeClass('calculated');
            }
        });
    }

    calcItemNameHeight();
    $(window).resize(function(){
        calcItemNameHeight();
    });


    // Карточка товара. В корзину
    $('.j-add-to-cart').click(function(){
        if (!$(this).hasClass('active')) {
            if ($(this).closest('.catalog__item').attr('data-properties') == "multiple") {
                let popupType = $(this).closest('.catalog__item--wrap').attr('data-catalog');
                $('.popup__item--params').attr('data-popup', popupType);
                $(this).closest('.catalog__item').addClass('viewed');
                $('.wrapper__shadow').addClass('active');
                $('.popup__item--params').addClass('active');
                let paramBaseTitle = $(this).closest('.catalog__item').find('.parameter--title').text();
                let paramBaseValue = $(this).closest('.catalog__item').find('.parameter--list input:checked').next('span').text();
                $('.popup__item--params .popup__param').each(function(){
                    if ($(this).find('.popup__param--title').text() == paramBaseTitle) {
                        $(this).find('li').each(function(){
                            if ($(this).find('span').text() == paramBaseValue) {
                                $(this).find('input').prop('checked', true);
                            }
                        });
                    } else {
                        $(this).find('li').each(function(){
                            if ($(this).find('input').attr('disabled') !== "disabled") {
                                $(this).find('input').prop('checked', true);
                                return false;
                            }
                        });
                    }
                });
            } else {
                $(this).addClass('active');
                $(this).text('В корзине');
            }
        }
    });


    // Карточка товара. Добавить в корзину после выбора характеристик
    $('.popup__item--params .j-popup-add-to-cart').click(function(){
        let paramBaseTitle = $('.catalog__item.viewed .parameter--title').text();
        let paramBaseValue = 0;
        $(this).closest('.popup').find('.popup__param').each(function(){
            if ($(this).find('.popup__param--title').text() == paramBaseTitle) {
                paramBaseValue = $(this).find('input:checked').next('span').text();
            }
        });
        $('.catalog__item.viewed .parameter--list input').prop('checked', false);
        $('.catalog__item.viewed .parameter--list li').each(function(){
            if ($(this).find('span').text() == paramBaseValue) {
                $(this).find('input').prop('checked', true);
            }
        });

        $('.catalog__item.viewed .j-add-to-cart').addClass('active');
        $('.catalog__item.viewed .j-add-to-cart').text('В корзине');
        $('.catalog__item.viewed').removeClass('viewed');
        $('.popup__item--params.active').removeClass('active');
        $('.wrapper__shadow.active').removeClass('active');
    });


    // Карточка товара. Изменение количества
    $('.number span').click(function(){
        let itemQuantity = ($(this).closest('.number').find('input').val().split(' '))[0];
        if ($(this).hasClass('number--plus')) {
            itemQuantity++;
        } else {
            if (itemQuantity > 1) {
                itemQuantity--;
            }
        }
        if ($(this).closest('.number').parent().hasClass('basket__row--quantity')) {
            $(this).closest('.number').find('input').val(itemQuantity);
            calcTotalCost();
        } else {
            $(this).closest('.number').find('input').val(itemQuantity + ' шт');
        }
    });


    // Выпадающее окно. Открытие
    $('body').on('click', '.parameter__field > label', function (e) {
        e.preventDefault();
        if ($(this).find('.picker__button').hasClass('active')) {
            $(this).find('.picker__button').removeClass('active');
            $(this).closest('.parameter__field').find('.parameter__field--list').removeClass('active');
            $(this).closest('.parameter__field').find('.parameter__field--list').height(0);
        } else {
            $('body .picker__button.active').removeClass('active');
            $('body .parameter__field--list.active').height('');
            $('body .parameter__field--list.active').removeClass('active');
            $(this).find('.picker__button').addClass('active');
            $(this).closest('.parameter__field').find('.parameter__field--list').addClass('active');
            let filterInnerHeight = $(this).closest('.parameter__field').find('.parameter__field--wrap').outerHeight();
            $(this).closest('.parameter__field').find('.parameter__field--list').height(filterInnerHeight);
        }
        //Проверка на необходиомсть "дымки"
        let filterWrap = $(this).closest('.parameter__field').find('.parameter__field--list .parameter__field--inner').height();
        let filterList = $(this).closest('.parameter__field').find('.parameter__field--list .parameter--list').outerHeight();
        if (filterList > filterWrap) {
            $(this).closest('.parameter__field').find('.parameter__field--list .parameter__field--inner').addClass('hidden');
        }
        setTimeout(()=>{
            checkListVisibility();
        }, 300);
    });


    // Проверка выпадающего списка на видимость в окне 
    function checkListVisibility() {
        let elementList = document.querySelector('.parameter__field .parameter__field--list.active');
        let elementListTop = window.pageYOffset + elementList.getBoundingClientRect().top + elementList.offsetHeight;
        let windowTop = window.pageYOffset + document.documentElement.clientHeight;
        if (elementListTop > windowTop) {
            let scrollValue = window.pageYOffset + (elementListTop - windowTop);
            $('html, body').animate({
                scrollTop: scrollValue + 10
            }, 300);
        }
    }
    

    // Выпадающее окно. Выбор 
    $('body').on('click', '.parameter__field .parameter__field--list label', function(){
        if ($(this).find('input[type="radio"]').length > 0) {
            $(this).closest('.parameter--list').find('.selected').removeClass('selected');
            $(this).addClass('selected');
            let labelVal = $(this).find('span').text();
            $(this).closest('.parameter__field').find('.picker__button').val(labelVal);
            $(this).closest('.parameter__field').find('.picker__button').removeClass('active');
            $(this).closest('.parameter__field--list').removeClass('active');
            $(this).closest('.parameter__field--list').css('height',0);
        } else if ($(this).find('input[type="checkbox"]').length > 0) {
            if ($(this).closest('.parameter__field--list').find('input[type="checkbox"]:checked').length > 0) {
                if (!$(this).closest('.parameter__field').find('.parameter__field--button').hasClass('active')) {
                    $(this).closest('.parameter__field').find('.parameter__field--button').addClass('active');
                    let listHeightWithButtons = $(this).closest('.parameter__field--list').height() + $(this).closest('.parameter__field').find('.parameter__field--button').outerHeight(true);
                    $(this).closest('.parameter__field--list').height(listHeightWithButtons);
                }
            } else {
                $(this).closest('.parameter__field').find('.parameter__field--button').removeClass('active');
                let listHeightWithButtons = $(this).closest('.parameter__field--list').height() - $(this).closest('.parameter__field').find('.parameter__field--button').outerHeight(true);
                $(this).closest('.parameter__field--list').height(listHeightWithButtons);
                $(this).closest('.parameter__field').find('.picker__button').val('показывать все');
                $(this).closest('.parameter__field').removeClass('active');
            }
        }
    });


    // Выпадающее окно. Сбросить
    $('body').on('click', '.parameter__field .clear', function(e){
        e.preventDefault();
        $(this).closest('.parameter__field').find('input[type="checkbox"]').prop('checked', false);
        $(this).closest('.parameter__field').find('.parameter__field--list').height('0');
        $(this).closest('.parameter__field').find('.picker__button').val('показывать все');
        $(this).closest('.parameter__field').find('.picker__button').removeClass('active');  
        $(this).closest('.parameter__field').removeClass('active');
        $(this).closest('.parameter__field').find('.parameter__field--list').removeClass('active');
        $(this).closest('.parameter__field').find('.parameter__field--button').removeClass('active');
    });


    // Выпадающее окно. Применить
    $('body').on('click', '.parameter__field .apply', function(e){
        e.preventDefault();
        let checkedQantity = $(this).closest('.parameter__field').find('input[type="checkbox"]:checked').length;
        if (checkedQantity > 0) {
            $(this).closest('.parameter__field').find('.picker__button').val('(Выбрано ' + checkedQantity + ')');
            $(this).closest('.parameter__field').addClass('active');
        } else {
            $(this).closest('.parameter__field').find('.picker__button').val('показывать все');
            $(this).closest('.parameter__field').removeClass('active');
        }
        $(this).closest('.parameter__field').find('.parameter__field--list').height('0');
        $(this).closest('.parameter__field').find('.picker__button').removeClass('active');  
        $(this).closest('.parameter__field').find('.parameter__field--list').removeClass('active');
    });


    // Выпадающее окно. Действие при скролле
    $('.parameter__field .parameter__field--inner').scroll(function(){
        let scrollTopNav = Math.round($(this).find('.parameter--list').position().top);
        let scrollTopWrap = Math.round($(this).height() - $(this).find('.parameter--list').height());
        if (scrollTopNav == scrollTopWrap) {
            $(this).addClass('scroll-to-end');
        } else {
            $(this).removeClass('scroll-to-end');
        }
    });


    // Выпадающее окно. Закрытие окна при клике вне его 
    $(document).mousedown(function (e){
        let modalClient = $(".parameter__field--list");
        let modalOpen = $(modalClient).closest('.parameter__field').children('label');
        if (modalClient.hasClass('active')) {
            if (!modalClient.is(e.target) && modalClient.has(e.target).length === 0 && !modalOpen.is(e.target) && modalOpen.has(e.target).length === 0){
                $('.parameter__field--list.active').height('0');
                $('.parameter__field--list.active').parent().find('.picker__button').removeClass('active');   
                $('.parameter__field--list.active').removeClass('active');
            }
        }
    });


    // Всплывающее окно фильтра
    $('.j-open-filter').on('click', function(){
        $('.popup__filter').addClass('active');
        let popupType;
        if ($(this).parent().hasClass('example__options')) {
            popupType = 'metal';
        } else {
            popupType = $(this).closest('.catalog__item--wrap').attr('data-catalog');
        }
        $('.popup__filter').attr('data-popup', popupType);
        if ($(window).width() < 768) {
            document.body.setAttribute('data-scroll', document.documentElement.scrollTop);
            $('body').css('position','fixed');
        }
        popupButtonShadow();
    });

    function popupButtonShadow() {
        let buttonTop = $('.popup__filter.active .popup__filter--button').position().top;
        let popupInnerHeight = $('.popup__filter.active .popup__filter--inner').outerHeight();
        if (buttonTop <= popupInnerHeight) {
            $('.popup__filter.active .popup__filter--button').addClass('shadow');
        } else {
            $('.popup__filter.active .popup__filter--button').removeClass('shadow');
        }
    }

    $(window).resize(function(){
        if ($('.popup__filter').hasClass('active')) {
            popupButtonShadow();
        }
    });


    // Всплывающее окно фильтра. Проверка необходимости показывать "Смотреть все"
    $('.popup__filter .filter__block[data-filter="checkbox"]').each(function(){
        let listHeight = $(this).find('ul').outerHeight(true);
        let listHeightMax = $(this).find('.filter__block--inner').css('max-height').replace('px','');
        if (listHeight <= listHeightMax) {
            $(this).find('.filter__block--toggle').hide();
        }
    });


    // Всплывающее окно фильтра. Свернуть/развернуть
    $('.popup__filter .filter__block--toggle').on('click', function(){
        if ($(this).hasClass('active')) {
            $(this).prev('.filter__block--inner').css('max-height', '');
            $(this).text('Смотреть все');
        } else {
            let listHeightTotal = $(this).prev('.filter__block--inner').find('ul').outerHeight(true);
            $(this).prev('.filter__block--inner').css('max-height', listHeightTotal + 'px');
            $(this).text('Свернуть');
        }
        $(this).toggleClass('active');
        setTimeout(()=>{
            popupButtonShadow();
        }, 300);
    });


    // Всплывающее окно фильтра. Применить
    $('.popup__filter .j-apply-filter').click(function(){
        $('.popup__filter').removeClass('active');
        $('body').css('position','');
        if(document.body.hasAttribute('data-scroll') && document.documentElement.clientWidth < 768) {
            $('html').css('scroll-behavior', 'auto');
            document.documentElement.scrollTop = document.body.getAttribute('data-scroll');
            document.body.removeAttribute('data-scroll');
            $('html').css('scroll-behavior', '');
        }
    });


    // Всплывающее окно фильтра. Скрыть/показать кнопку сброса фильтров
    $('.popup__filter .filter__block--inner li input').click(function(){
        if ($(this).closest('.filter__block').attr('data-filter') == "radio" && $(this).is(':checked')) {
            $(this).closest('.filter__block').find('input').prop('checked', false);
            $(this).prop('checked', true);
        }
        if ($('.popup__filter .filter__block li input:checked').length > 0) {
            $('.popup__filter .j-filter-reset').show();
            $('.popup__filter .j-apply-filter').text('Применить');
        } else {
            $('.popup__filter .j-filter-reset').hide();
            $('.popup__filter .j-apply-filter').text('Закрыть');
        }
    });


    // Склонение существительных 
    GetNoun = function(number, one, two, five) {
        number = Math.abs(number);
        number %= 100;
        if (number >= 5 && number <= 20) {
            return five;
        }
        number %= 10;
        if (number == 1) {
            return one;
        }
        if (number >= 2 && number <= 4) {
            return two;
        }
        return five;
    }


    // Корзина. Подсчет стоимости
    function calcTotalCost() {
        let itemPositions = $('.basket__row').length;
        let itemPriceActualSumm = 0;
        let itemPriceOldSumm = 0;
        $('.basket__row').each(function(){
            let itemPriceActual = $(this).find('.price--actual span:first-child').text().replace(/\s/g, '');
            let itemPriceOld = $(this).find('.price--old span:first-child').text().replace(/\s/g, '') ? $(this).find('.price--old span:first-child').text().replace(/\s/g, '') : itemPriceActual;
            let itemQuantity = 0;
            if ($(this).closest('.basket__block').attr('data-block') == "items") {
                itemQuantity = $(this).find('.basket__row--quantity span').text().replace(" шт", "").replace(/\s/g, '');
            } else {
                itemQuantity = $(this).find('.number input').val().trim();
            }
            itemPriceActualSumm += (itemPriceActual * itemQuantity);
            itemPriceOldSumm += (itemPriceOld * itemQuantity);
        });
        let itemSaleSumm = itemPriceOldSumm - itemPriceActualSumm;

        if (itemSaleSumm == 0) {
            $('.basket__total .basket__total--row[data-row="sale"]').hide();
        } else {
            $('.basket__total .basket__total--row[data-row="sale"]').show();
        }

        $('.basket__heading span').text("( добавлено " + itemPositions + " " + GetNoun(itemPositions, 'товар', 'товара', 'товаров') + " )");
        $('.basket__total .basket__total--row[data-row="quantity"] .value').text(itemPositions);
        $('.basket__total .basket__total--row[data-row="summ"] .value span:first-child').text(itemPriceOldSumm.toLocaleString('ru'));
        $('.basket__total .basket__total--row[data-row="sale"] .value span:first-child').text(itemSaleSumm.toLocaleString('ru'));
        $('.basket__total .basket__total--row[data-row="total"] .value span:first-child').text(itemPriceActualSumm.toLocaleString('ru'));
        $('.basket__left .basket__list .basket__list--total .value span:first-child').text(itemPriceActualSumm.toLocaleString('ru'));
    }

    calcTotalCost();


    // Корзина. Удалить товар из корзины
    $('.basket__row .j-basket-delete').on('click', function(){
        $(this).closest('.basket__row').remove();
        calcTotalCost();
        if ($('.basket__row').length == 0) {
            $('.basket__wrap').addClass('empty_bs');
            $('.basket__order .basket__order--info').text('Оставьте, пожалуйста, номер телефона и мы вам перезвоним');
        }
    });


    // Оформление заказа
    $('.order__wrap .basket__inner .j-to-order').on('click', function(e){
        e.preventDefault();
        let nameValue = $('.order__wrap .basket__customer--form label[data-label="name"] input').val();
        let phoneValue = $('.order__wrap .basket__customer--form label[data-label="phone"] input').val();
        let mailValue = $('.order__wrap .basket__customer--form label[data-label="email"] input').val();
        let patternMail = /^([a-z0-9_-]+\.)?[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        let policyCheck = $('.order__wrap .basket__inner .policy__wrap:visible label input').prop('checked');

        $('.basket__inner label.warning').removeClass('warning');
        if (nameValue.trim() == "" || phoneValue.trim() == "" || mailValue.trim() == "" || mailValue.search(patternMail) !== 0 || !policyCheck) {
            if (nameValue.trim() == "") {
                $('.order__wrap .basket__customer--form label[data-label="name"]').addClass('warning');
            }
            if (phoneValue.trim() == "") {
                $('.order__wrap .basket__customer--form label[data-label="phone"]').addClass('warning');
            }
            if (mailValue.trim() == "") {
                $('.order__wrap .basket__customer--form label[data-label="email"]').addClass('warning');
                $('.order__wrap .basket__customer--form label[data-label="email"] .input--error').text('Обязательное поле');
            } else if(mailValue.search(patternMail) !== 0) {
                $('.order__wrap .basket__customer--form label[data-label="email"]').addClass('warning');
                $('.order__wrap .basket__customer--form label[data-label="email"] .input--error').text('Некорректный email');
            }
            if (!policyCheck) {
                $('.order__wrap .basket__inner .policy__wrap:visible label').addClass('warning');
            }
            $('.basket__inner label.warning .input--error').show();
            setTimeout(()=>{
                $('.basket__inner label.warning .input--error').hide();
            }, 3000);

            checkWarningVisibility();
        } else {
            window.location.href = 'thanks_order.html'
        }
    });
    const basketFields = document.querySelectorAll('.order__wrap .basket__inner label input');
    for(let i=0; i<basketFields?.length; i++) {
        basketFields[i].addEventListener('click',()=>{
            basketFields[i].closest('label').classList.remove('warning');
        });
    }


    // Проверка видимости незаполненного блока
    function checkWarningVisibility() {
        let warningBlock = document.querySelectorAll('.basket__inner label.warning')[0];
        let warningBlockParent = warningBlock.closest('.basket__block');
        let warningBlockTop = window.pageYOffset + warningBlock.getBoundingClientRect().top + warningBlock.offsetHeight;
        let windowTop = window.pageYOffset;
        let windowBottom = window.pageYOffset + document.documentElement.clientHeight;
        let scrollValue;

        if (warningBlockTop < windowTop) {
            scrollValue = windowTop + warningBlockParent.getBoundingClientRect().top;
            $('html, body').animate({
                scrollTop: scrollValue - 10
            }, 300);
        } else if (warningBlockTop > windowBottom) {
            scrollValue = warningBlockTop - document.documentElement.clientHeight;
            $('html, body').animate({
                scrollTop: scrollValue + 10
            }, 300);
        }
    }


    // Главная страница. Баннер
    $('.main__page--wrap .page__banner--slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: $('.page__banner--prev'),
        nextArrow: $('.page__banner--next'),
        fade: false,
        infinite: true
    });

    // Анимация для первого слайда
    $(".main__page--wrap .page__banner .slick-current .page__banner--text").addClass("animated wow");
    $(".main__page--wrap .page__banner .slick-current .line--thin").addClass("animated wow");
    // Запуск анимации при смене слайдов
    $('.main__page--wrap .page__banner--slider').on('afterChange', function(){
        $(".main__page--wrap .page__banner .slick-slide").not('.slick-current').find('.wow').removeClass("animated wow");
        $(".main__page--wrap .page__banner .slick-current .page__banner--text").addClass("animated wow");
        $(".main__page--wrap .page__banner .slick-current .line--thin").addClass("animated wow");
        countMainPageSlides();
    });


    // Подсчет количества слайдов в главном баннере
    function countMainPageSlides() {
        let slideQuantity = $('.main__page--wrap .page__banner--slider .slick-slide').not('.slick-cloned').length;
        let slideCurrent = $('.main__page--wrap .page__banner--slider').slick('slickCurrentSlide') + 1;
        $('.main__page--wrap .page__banner .page__banner--count').html('<span></span>');
        $('.main__page--wrap .page__banner .page__banner--count').append(slideQuantity);
        $('.main__page--wrap .page__banner .page__banner--count span').text(slideCurrent + '/');
    }
    countMainPageSlides();
    



    // Слайдер статей, видео, примеров, решений, отзывов
    // (предусмотрено расположение нескольких одинаковых слайдеров на одной странице)
    let arrowPrevSlider =  $('.slider__wrap .slider__arrow--prev:visible');
    let arrowNextSlider =  $('.slider__wrap .slider__arrow--next:visible');
    for (let i = 0; i <= (arrowPrevSlider.length-1); i++) {
        arrowPrevSlider[i].setAttribute('data-prev', i);
        arrowNextSlider[i].setAttribute('data-next', i);
    }

    $('.slider__wrap').each(function(index) {
        if ($(this).attr('data-slider') == "two-pictures") {
            $(this).find('.slider__wrap--body').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                variableWidth: true,
                prevArrow: $('.slider__arrow--prev[data-prev="'+ index + '"]'),
                nextArrow: $('.slider__arrow--next[data-next="'+ index + '"]'),
                infinite: true,
                swipeToSlide: true,
                responsive: [
                    {
                      breakpoint: 1199,
                      settings: {
                        swipeToSlide: true
                        }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                          slidesToShow: 1,
                          adaptiveHeight: true
                        }
                    }
                ]
            });
        } else if ($(this).attr('data-slider') == "three-pictures") {
            $(this).find('.slider__wrap--body').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                variableWidth: true,
                prevArrow: $('.slider__arrow--prev[data-prev="'+ index + '"]'),
                nextArrow: $('.slider__arrow--next[data-next="'+ index + '"]'),
                infinite: true,
                swipeToSlide: true,
                responsive: [
                    {
                      breakpoint: 1199,
                      settings: {
                        swipeToSlide: true,
                        slidesToShow: 2,
                        }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1
                        }
                    }
                ]
            });
        }
    });


    // Слайдер статей, видео, примеров, решений, отзывов
    // Расчет ширины слайдов
    function calcSlideWidth() {
        if ($(window).width() > 767) {
            $('.slider__wrap').each(function() {
                let sliderWrapWidth = $(this).outerWidth(true);
                let slideWidth = 0;
                if ($(this).attr('data-slider') == "two-pictures") {
                    slideWidth = sliderWrapWidth/2 - $(this).find('.slick-slide').css('margin-right').replace('px','') / 2;
                } else if ($(this).attr('data-slider') == "three-pictures") {
                    if ($(window).width() > 1199) {
                        slideWidth = sliderWrapWidth/3 - $(this).find('.slick-slide').css('margin-right').replace('px','') * 2 / 3;
                    } else {
                        slideWidth = sliderWrapWidth/2 - $(this).find('.slick-slide').css('margin-right').replace('px','') / 2;
                    }
                }
                $(this).find('.slick-slide').css('width',slideWidth + 'px');
                $(this).find('.slick-slide').css('min-width',slideWidth + 'px');
                if ($(window).width() < 1199 && $(this).attr('data-theme') == "reviews") {
                    $(this).find('.slick-slide').css('width','');
                    $(this).find('.slick-slide').css('min-width','');
                }
            });
        }
    }
    calcSlideWidth();
    $(window).resize(function(){
        calcSlideWidth();
    });


    // Отзывы. Определение длинных отзывов
    $('.review__block').each(function(){
        let reviewMaxHeight = $(this).find('.review__block--text').css('max-height').replace('px','');
        let reviewHeight = $(this).find('.review__block--text-inner').outerHeight(true);
        if (reviewHeight > reviewMaxHeight) {
            $(this).append('<div class="review__block--toggle">Смотреть все</div>');
        }
    });


    // Отзывы. Смотреть все/Свернуть
    $('.review__block .review__block--toggle').on('click',function(){
        if ($(this).hasClass('active')) {
            $(this).closest('.review__block').find('.review__block--text').css('max-height', '');
            $(this).text('Смотреть все');
        } else {
            let reviewHeightTotal = $(this).closest('.review__block').find('.review__block--text-inner').outerHeight(true);
            $(this).closest('.review__block').find('.review__block--text').css('max-height', reviewHeightTotal + 'px');
            $(this).text('Свернуть');
        }
        $(this).toggleClass('active');
    });


    // Календарь. Выбор даты звонка в форме -->

        // Подстановка даты звонка
        function setDate() {
            moment.locale('ru');
            let callDate = moment().format('DD.MM.yyyy');
            let callTime = moment().add(30, 'minutes').format('HH:mm');
            $('.form__template label[data-label="date"] input').val(callDate);
            $('.form__template label[data-label="date"] input').attr('data-date',callDate);
            $('.form__template label[data-label="time"] input').val(callTime);
        }
        setDate();


        $('body').on('click', '.form__template label[data-label="date"] .datepicker-here', function(){
            // Запоминаем исходное значение, чтобы можно было вернуть его при отмене
            let datepickerVal = $(this).val();

            $(this).datepicker({
                minDate: new Date(),
                changeMonth: true,
                changeYear: true,
                dateFormat: 'dd.mm.yyyy'
            });

            $(this).focus();
            $(this).attr('data-date', datepickerVal);
            $(this).val(datepickerVal);
            if ($('#datepickers-container').find('.datepicker.active').find('.datepicker--buttons').length < 1) {
                $('#datepickers-container').find('.datepicker.active').append('<div class="datepicker--buttons"><button class="apply">Применить</button><button class="cancel">Отмена</button></div>');
            }
            $(this).addClass('active');
            calcDatepickerShift();
        });

        // Прокручиваем окно, если календарь не полностью находится в зоне видимости
        function calcDatepickerShift() {
            let datepicker = document.querySelector('.datepicker.active');
            let datepickerTop = datepicker.getBoundingClientRect().top + datepicker.offsetHeight + pageYOffset;
            let windowHeight = $(window).height() + pageYOffset;

            if (datepickerTop > windowHeight) {
                let windowScroll = pageYOffset + (datepickerTop - windowHeight);
                $('html, body').stop().animate({
                    scrollTop: windowScroll
                }, 500);
            }
        }

        // Кнопка "Применить" в календаре
        $('body').on('click', '.datepicker--buttons .apply', function(){
            $(this).closest('.datepicker').removeClass('active');
            $(this).closest('.datepicker').css('left','-100000px');
            $('body').css('overflow','auto');
            // Запоминаем значение, чтобы можно было вернуть его при отмене
            let datepickerVal = $(this).closest('.datepicker').find('.datepicker--cell.-selected-').text();
            $('.datepicker-here.active').attr('data-date', datepickerVal);
            $('.datepicker-here.active').removeClass('active');
        });

        // Кнопка "Отмена" в календаре
        $('body').on('click', '.datepicker--buttons .cancel', function(){
            $(this).closest('.datepicker').removeClass('active');
            $(this).closest('.datepicker').css('left','-100000px');
            $('body').css('overflow','auto');
            // Возвращаем исходное значение
            let datepickerVal = $('.datepicker-here.active').attr('data-date');
            $('.datepicker-here.active').val(datepickerVal);
            $('.datepicker-here.active').removeClass('active');
        });

    // Календарь. Выбор даты звонка в форме <--


    // Главная. О компании. Анимация
    if ($(window).width() < 767) {
        $(".dial").attr('data-width','160');
        $(".dial").attr('data-height','160');
    }
    $(".dial").knob();
    checkDiadram();
    $(window).scroll(function(){
        checkDiadram();
    });
    function checkDiadram() {
        if (document.querySelector('.about__wrap')) {
            let windowScroll = window.pageYOffset + document.documentElement.clientHeight;
            let element = document.querySelector('.about__wrap .about__graphics--block[data-graphics="experience"]');
            let elementTop = window.pageYOffset + element.getBoundingClientRect().top + element.closest('.about__graphics--block').offsetHeight;
            if (windowScroll >= elementTop && elementTop >  window.pageYOffset) {
                if (!$('.dial').hasClass('knobbed')) {
                    $(".dial").addClass('knobbed');
                    let arcValue = $(".dial").attr('data-current');
                    $({animatedVal: 0}).animate({animatedVal: arcValue}, {
                        duration: 2500,
                        easing: "swing",
                        step: function() {
                            $(".dial").val(Math.ceil(this.animatedVal)).trigger("change");
                        }
                    });
                    let dialValueEnd = 15;
                    countStart(dialValueEnd);
                }
            }
        }
    }
    function countStart(dialValueEnd) {
        let dialValueStart = 0;
        let dialInterval = setInterval(function () {
            $('.value--computed').text(++dialValueStart);
            if (dialValueStart == dialValueEnd) {
                clearInterval(dialInterval);
            }
        }, 2500/dialValueEnd);
    }


    // Спасибо за заказ. Анимация 
    if ($(window).width() < 768) {
        $(".dial1").attr('data-width','155');
        $(".dial1").attr('data-height','155');
    } else if ($(window).width() < 1200) {
        $(".dial1").attr('data-width','181');
        $(".dial1").attr('data-height','181');
    } 
    $(".dial1").knob();
    if (!$('.dial1').hasClass('knobbed')) {
        $(".dial1").addClass('knobbed');
        let arcValue = $(".dial1").attr('data-current');
        $({animatedVal: 0}).animate({animatedVal: arcValue}, {
            duration: 2500,
            easing: "swing",
            step: function() {
                $(".dial1").val(Math.ceil(this.animatedVal)).trigger("change");
            }
        });
    }


    // Видео. Подгрузка видео после клика на него
    $('.video__block').on('click', function (e) {
        e.preventDefault();
        let src = $(this).data('src');
        if (src != undefined) {
            //Ставим на паузу предыдущий играющий ролик
            if($('.video__block--inner.active video').length > 0) {
                $('.video__block--inner.active video').get(0).pause();
            } else if($('.video__block--inner.active iframe').length > 0) {
                let iframeWrap = document.querySelector('.video__block--inner.active');
                let iframe = iframeWrap.getElementsByTagName("iframe")[0].contentWindow;
                iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
            }
            $('.video__block--inner.active').removeClass('active');

            // Запускаем выбранный ролик
            $(this).find('.video__block--inner').addClass('active');
            if (src.indexOf('youtube') > -1) {
                if($(this).find('.video__block--inner iframe').length == 0) {
                    $(this).find('.video__block--inner').prepend('<iframe src="' + src + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                }
                setTimeout(() => {
                    let iframeWrap = document.querySelector('.video__block--inner.active');
                    let iframe = iframeWrap.getElementsByTagName("iframe")[0].contentWindow;
                    iframe.postMessage('{"event":"command","func":"playVideo","args":""}','*');
                }, 100);
            } else {
                if($(this).find('.video__block--inner video').length == 0) {
                    $(this).find('.video__block--inner').prepend('<video class="popup__video--file" controls="controls" autoplay="autoplay"><source src="' + src + '"></video>');
                }
                $(this).find('video').get(0).play();
            }
        }
    });


    // Оставить заявку на звонок
    const phoneRequestButton = document.querySelectorAll('.form__template form button');
    for(let i=0; i<phoneRequestButton?.length; i++) {
        phoneRequestButton[i].addEventListener('click',(e)=>{
            e.preventDefault();
            const phoneRequestForm = phoneRequestButton[i].closest('form');
            const phoneRequestFields = phoneRequestForm.querySelectorAll('input');
            const patternMail = /^([a-z0-9_-]+\.)?[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
            let readyToSent = true;
            for(let k=0; k<phoneRequestFields?.length; k++) {
                if(getComputedStyle(phoneRequestFields[k].closest('label')).display === 'none') continue;
                if(phoneRequestFields[k].hasAttribute('required') && phoneRequestFields[k].value.trim().length === 0) {
                    phoneRequestFields[k].closest('label').classList.add('warning');
                    phoneRequestFields[k].closest('label').querySelector('.input--error').innerText = 'Обязательное поле';
                    readyToSent = false;
                } else if(phoneRequestFields[k].getAttribute('type') === 'email' && phoneRequestFields[k].value.search(patternMail) !== 0) {
                    phoneRequestFields[k].closest('label').classList.add('warning');
                    phoneRequestFields[k].closest('label').querySelector('.input--error').innerText = 'Некорректный Email';
                    readyToSent = false;
                } else if(phoneRequestFields[k].getAttribute('name') === 'TIME' && phoneRequestFields[k].value.trim().length > 0) {
                    const hours = phoneRequestFields[k].value.split(':')[0];
                    const minutes = phoneRequestFields[k].value.split(':')[1];
                    if(hours > 24 || minutes > 59) {
                        phoneRequestFields[k].closest('label').classList.add('warning');
                        phoneRequestFields[k].closest('label').querySelector('.input--error').innerText = 'Неверный формат';
                        readyToSent = false;
                    }
                }
            }
            if(readyToSent) {
                for(let k=0; k<phoneRequestFields?.length; k++) {
                    phoneRequestFields[k].value = '';
                }
                if (!$('.wrapper__shadow').hasClass('active')) {
                    $('.wrapper__shadow').addClass('active');
                }
                if($('.popup.active').attr('data-popup') == "water" || $('.catalog__detail--wrap').attr('data-catalog') == "water") {
                    $('.popup__send').attr('data-popup', 'water');
                }
                $('.popup.active').removeClass('active');
                $('.popup__send').addClass('active');
                // Активация анимации
                if (!$('.dial2').hasClass('knobbed')) {
                    $(".dial2").knob();
                    $(".dial2").addClass('knobbed');
                    let arcValue = $(".dial2").attr('data-current');
                    $({animatedVal: 0}).animate({animatedVal: arcValue}, {
                        duration: 2500,
                        easing: "swing",
                        step: function () {
                            $(".dial2").val(Math.ceil(this.animatedVal)).trigger("change");
                        }
                    });

                    timerOnClosingSentPopup = setTimeout(() => {
                        $('.popup__send').removeClass('active');
                        $('.popup__send').removeAttr('data-popup');
                        $('.wrapper__shadow').removeClass('active');
                        $('.wrapper__shadow').css('z-index', '');
                        $(".dial2").removeClass('knobbed');
                        $('body').css('position', '');
                    }, 3500);
                }
            } else {
                const errorFields = phoneRequestForm.querySelectorAll('label.warning');
                for(let k=0; k<errorFields?.length; k++) {
                    errorFields[k].querySelector('input').addEventListener('click',()=>{
                        errorFields[k].classList.remove('warning');
                    });
                }
                checkWarningFormVisibility();
            }
        });
    }


    // Проверка видимости незаполненного блока
    function checkWarningFormVisibility() {
        let warningBlock = document.querySelectorAll('label.warning')[0];
        let warningBlockParent = warningBlock.closest('form');
        let warningBlockTop = window.pageYOffset + warningBlock.getBoundingClientRect().top + warningBlock.offsetHeight;
        let windowTop = window.pageYOffset;

        if (warningBlockTop < windowTop) {
            let scrollValue = windowTop + warningBlockParent.getBoundingClientRect().top;
            $('html, body').animate({
                scrollTop: scrollValue - 10
            }, 300);
        }
    }


    // Детальная товара. Примеры работ
    setTimeout(()=>{
        let examplesQuantity = $('.item__examples .examples__block').length;
        let examplesListHeight = 0;
        if ($(window).width() < 768) {
            $('.item__examples .examples__block').each(function(index){
                if (index < 4) {
                    examplesListHeight += $(this).outerHeight(true);
                }
            });
            if (examplesQuantity > 4) {
                $('.item__examples .j-show-more').show();
            }
        } else if ($(window).width() < 1200) {
            if (examplesQuantity > 4) {
                $('.item__examples .j-show-more').show();
                examplesListHeight = $('.item__examples .examples__block:nth-child(1)').outerHeight(true) +
                    $('.item__examples .examples__block:nth-child(4)').outerHeight(true);
            }
        } else {
            if (examplesQuantity > 6) {
                $('.item__examples .j-show-more').show();
                examplesListHeight = $('.item__examples .examples__block:nth-child(1)').outerHeight(true) +
                    $('.item__examples .examples__block:nth-child(6)').outerHeight(true);
            } else if ($('.item__examples .examples__block').length < 5 && examplesListHeight == 0) {
                //examplesListHeight = $('.item__examples .examples__block:nth-child(1)').outerHeight(true);
            }
        }
        if (examplesListHeight > 0) {
            $('.item__examples .examples__wrap .examples__list').height(examplesListHeight);
        }
    }, 400);

    


    // Детальная товара. Примеры работ. Показать еще
    $('.item__examples .j-show-more').click(function(){
        $('.item__examples .examples__wrap .examples__list').height('');
        $(this).remove();
    });


    // Детальная страница товара. Слайдер товаров. Основной
    $('.item__card--photo .slider__for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $('.slider__for--wrap .slider__for--arrow-prev'),
        nextArrow: $('.slider__for--wrap .slider__for--arrow-next'),
        fade: true,
        infinite: true,
        asNavFor: $('.item__card--photo .slider__nav'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
        ]
    });

    // Детальная страница товара. Слайдер товаров. Навигация
    $('.item__card--photo .slider__nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: $('.item__card--photo .slider__for'),
        dots: false,
        arrows: true,
        prevArrow: $('.slider__nav--wrap .slider__nav--arrow-prev'),
        nextArrow: $('.slider__nav--wrap .slider__nav--arrow-next'),
        variableHeight: true,
        focusOnSelect: true,
        accessibility: true,
        swipeToSlide: true,
        vertical: true,
        verticalSwiping: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    touchMove: true,
                }
            },
        ]
    });


    // Детальная страница товара. Распределение характеристик по столбцам
    if ($(window).width() > 1199) {
        makeColumns($('.item__descriptions .item__descriptions--inner'), 3);
    } else if ($(window).width() > 767) {
        makeColumns($('.item__descriptions .item__descriptions--inner'), 2);
    } else {
        $('.item__descriptions .item__descriptions--inner').css('height', '');
    }
    $(window).resize(function(){
        if ($(window).width() > 1199) {
            makeColumns($('.item__descriptions .item__descriptions--inner'), 3);
        } else if ($(window).width() > 767) {
            makeColumns($('.item__descriptions .item__descriptions--inner'), 2);
        } else {
            $('.item__descriptions .item__descriptions--inner').css('height', '');
        }
    });

    // Детальная страница товара. Выбираем первое значение параметра активным
    $('.item__card .popup__item--params .popup__param').each(function(){
        $(this).find('li').each(function(){
            if ($(this).find('input').attr('disabled') !== "disabled") {
                $(this).find('input').prop('checked', true);
                return false;
            }
        });
    });
    $('.item__card .popup__item--params .catalog__item--parameter').each(function(){
        let fieldValue = $(this).find('.parameter__field .parameter__field--list label').first().find('span').text();
        $(this).find('.parameter__field .parameter__field--list label').first().addClass('selected');
        $(this).find('.parameter__field .picker__button').val(fieldValue);
    });

    // Распределение по столбцам
    function makeColumns(elem, columns) {
        $(elem).height('auto');
        let listHeight = Math.ceil($(elem).outerHeight()/columns);
        let blockHeightSumm = 0;
        let listMaxHeight = 0;
        $(elem).children().each(function(){
            blockHeightSumm += Math.ceil($(this).outerHeight(true));
            if (blockHeightSumm > listHeight) {
                listMaxHeight = blockHeightSumm > listMaxHeight ? blockHeightSumm : listMaxHeight;
                blockHeightSumm = 0;
            }
        });
        if (listMaxHeight > 0) {
            elem.height(listMaxHeight + 'px');
        }
    }


    // Детальная товара. Подсчет задержки анимации для блока с картинками
    let animationDelay = 0;
    $('.item__photo .item__photo--block').each(function(){
        $(this).attr('data-wow-delay', animationDelay + 's');
        animationDelay += 0.16;
    });


    // Детальная товара. Характеристики. Определение активного столбца таблицы
    function checkTableColumn() {
        if ($(window).width() < 768) {
            let selectVal = $('.item__table select').val();
            $('.item__table table tbody tr td:first-child').each(function () {
                if ($(this).find('.title').text() == selectVal) {
                    $(this).closest('tr').show();
                } else {
                    $(this).closest('tr').hide();
                }
            });
        }
    }
    checkTableColumn();
    $('.item__table select').change(function(){
        checkTableColumn();
    });


    // Детальная товара. Характеристики. Подсчет высоты ячеек
    setTimeout(()=>{
        if ($(window).width() < 1200) {
            let tableRows = document.querySelectorAll('.item__table th').length;
            for (let count = 0; count < tableRows; count++) {
                let cells = document.querySelectorAll('.item__table tbody tr td:nth-child(' + (count + 1) + ')');
                let cellsHeading = document.querySelector('.item__table thead tr th:nth-child(' + (count + 1) + ')');
                let cellHeightMax = 0;
                for (let i = 0; i < cells.length; i++) {
                    cellHeightMax = cells[i].offsetHeight > cellHeightMax ? cells[i].offsetHeight : cellHeightMax;
                }
                cellHeightMax = cellsHeading.offsetHeight > cellHeightMax ? cellsHeading.offsetHeight : cellHeightMax;
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.height = cellHeightMax + 'px';
                }
                cellsHeading.style.height = cellHeightMax + 'px';
            }
        }
    }, 300);


    // Детальная товара. Вкладки
    function makeTabContentActive() {
        let tabActiveTitle ;
        if ($(window).width() > 767) {
            tabActiveTitle = $('.item__tabs .item__tab--link.active').attr('data-link');
        } else {
            tabActiveTitle = $('.item__tabs select option:selected').attr('data-link');
        }
        $('.item__tabs .item__tabs--content').each(function(){
           if ($(this).attr('data-content') == tabActiveTitle) {
               $(this).addClass('active');
           } else {
               $(this).removeClass('active');
           }
        });
    }
    makeTabContentActive();
    $('.item__tabs .item__tab--link').click(function(){
        if (!$(this).hasClass('active')) {
            $('.item__tabs .item__tab--link.active').removeClass('active');
            $(this).addClass('active');
            makeTabContentActive();
        }
    });
    $('.item__tabs select').change(function(){
        makeTabContentActive();
    });


    // Детальная товара. Чередование цвета в вариантах применения
    let workBgGrey = 'rgb(240, 240, 240)';
    let workBgWhite = 'rgb(255, 255, 255)';
    let workBgBlue = 'rgb(226, 235, 240)';
    let workBgPurple = 'rgb(242, 240, 250)';
    if ($('.item__works').css('background-color') == workBgGrey) {
        $('.item__works .item__work').css('background', workBgGrey);
        if ($('.catalog__detail--wrap').attr('data-catalog')=="metal") {
            $('.item__works .item__work:nth-child(2n+3)').css('background', workBgPurple);
        } else {
            $('.item__works .item__work:nth-child(2n+3)').css('background', workBgBlue);
        }
    } else if ($('.item__works').css('background-color') == workBgWhite) {
        $('.item__works .item__work').css('background', workBgWhite);
        $('.item__works .item__work:nth-child(2n+3)').css('background', workBgGrey);
    } else {
        $('.item__works .item__work').css('background', $('.item__works').css('background'));
        $('.item__works .item__work:nth-child(2n+3)').css('background', workBgWhite);
    }


    // Примеры работ и инструкции. Показать все/вода/металл
    $('.example__switch a').click(function(){
        $(this).closest('.example__switch').find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $('.example__switch a').mouseenter(function(){
        let blockWidth = $(this).outerWidth();
        let blockLeft = $(this).position().left;
        $(this).closest('.example__switch').find('.example__switch--bg').width(blockWidth + 'px');
        $(this).closest('.example__switch').find('.example__switch--bg').css('left', blockLeft + 'px');
        if(!$(this).hasClass('active')) {
            $(this).closest('.example__switch').find('.active').css('color','#3A2781');
        }
    });
    $('.example__switch a').mouseleave(function(){
        setExampleSwitchBg();
    });
    if($('.example__switch').length > 0) {
        setTimeout(()=>{
            setExampleSwitchBg();
        }, 100);
    }
    function setExampleSwitchBg() {
        let activeBlockWidth = $('.example__switch .active').outerWidth();
        let activeBlockLeft = $('.example__switch .active').position().left;
        $('.example__switch .example__switch--bg').width(activeBlockWidth + 'px');
        $('.example__switch .example__switch--bg').css('left', activeBlockLeft + 'px');
        $('.example__switch a').css('color','');
        $('.example__switch .active').css('color','');
    }



    // Слайдер фото на всю ширину экрана
    // (предусмотрено расположение нескольких одинаковых слайдеров на одной странице)
    let arrowGalleryPrev =  $('.item__gallery .item__gallery--arrow-prev');
    let arrowGalleryNext =  $('.item__gallery .item__gallery--arrow-next');
    for (let i = 0; i <= (arrowGalleryPrev.length-1); i++) {
        arrowGalleryPrev[i].setAttribute('data-prev', i);
        arrowGalleryNext[i].setAttribute('data-next', i);
    }

    $('.item__gallery--slider').each(function(index) {
        if ($(this).find('.item__gallery--slide').length > 1) {
            $(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                variableWidth: true,
                dots: true,
                arrows: true,
                prevArrow: $('.item__gallery--arrow-prev[data-prev="'+ index + '"]'),
                nextArrow: $('.item__gallery--arrow-next[data-next="'+ index + '"]'),
                infinite: true
            });
        } else {
            $(this).closest('.item__gallery').find('.item__gallery--arrow-next').hide();
            $(this).closest('.item__gallery').find('.item__gallery--arrow-prev').hide();
        }
    });

    function showCurrentSlideTitle() {
        $('.item__gallery--slider').each(function() {
            let slideTitle = $(this).find('.slick-current img').attr('title');
            $(this).closest('.item__gallery').find('.item__gallery--hint span').text(slideTitle);
        });
    }
    showCurrentSlideTitle();
    $('.item__gallery--slider').on('beforeChange', function(){
        $(this).closest('.item__gallery').find('.item__gallery--hint span').css('opacity','0');
        setTimeout(()=>{
            let slideTitle = $(this).find('.slick-current img').attr('title');
            $(this).closest('.item__gallery').find('.item__gallery--hint span').text(slideTitle);
            $(this).closest('.item__gallery').find('.item__gallery--hint span').css('opacity','1');
        }, 100);
    });


    // Заказать звонок
    let timerOnClosingSentPopup;
    function upCall() {
        clearTimeout(timerOnClosingSentPopup);
        setDate();
        $('.wrapper__shadow').addClass('active');
        if ($(window).width() < 768) {
            document.body.setAttribute('data-scroll', document.documentElement.scrollTop);
            $('body').css('position','fixed');
        }
        $('.popup__call').addClass('active');
        if($('.reagent--wrap').hasClass('reagent--water')) {
            $('.popup__call').attr('data-popup','water');
        }
        if ($('.popup__menu').hasClass('active')) {
            $('.wrapper__shadow').removeClass('menu');
            $('.wrapper__shadow').css('z-index', '14');
        }
        $('.popup__call .popup__title').html('Обратная связь');
    }
    $('.j-request-a-call').click(function() {
        upCall();
    });
    $('.j-get-consult').click(function() {
        upCall();
    });

    $('.open-examples').on('click', function () {
        const example = document.getElementById('scroll_complex_solution_detail');
        example.scrollIntoView({block: "start", inline: "center"});
    })

});


document.addEventListener('DOMContentLoaded', function() {
    // Статьи и новости. Подсчет высоты списка тем новостей
    const themeList = document.querySelector('.aside__list');
    if(themeList && window.innerWidth < 1200) {
        themeList.style.height = themeList.querySelector('.aside__item').offsetHeight + 'px';

        const themeListButton = document.querySelector('.aside__list_switch');
        themeListButton?.addEventListener('click',()=>{
            if(themeListButton.classList.contains('active')) {
                themeList.style.height = themeList.querySelector('.aside__item').offsetHeight + 'px';
                themeListButton.classList.remove('active');
                themeListButton.querySelector('span').innerText = 'Развернуть';
            } else {
                const themeListItems = themeList.querySelectorAll('.aside__item');
                let themeListHeight = 0;
                for(let i=0; i<themeListItems.length; i++) {
                    themeListHeight += themeListItems[i].offsetHeight;
                }
                themeList.style.height = themeListHeight + 'px';
                themeListButton.classList.add('active');
                themeListButton.querySelector('span').innerText = 'Свернуть';
            }
        });
    }
});

