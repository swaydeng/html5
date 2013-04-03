/*
 * @Author      Sway Deng
 * @Email       shiwei.dengsw@alibaba-inc.com
 * @Date        13-4-2 обнГ4:20
 * @Description 
 * !!cmd:compress=true
 * !!cmd:conv2unicode=true
 */
(function ($) {

    $(function () {

        $('div.slide').magicSlide({
            titleSelector: $('div.trigger-container img'),
            selected: 3
        });

    });

})(jQuery);