(function ($) {

    $(function () {
        var container = $('div.slide'),
            slides = $.makeArray($('div.slide-b', container)),
            currentIndex = 0,
            blindNum = 11,
            width = container.width() / blindNum,
            triggers,
            triggersHtml = [],
            triggerClz = 'current';

        $.each(slides, function (index, slide) {
            var triggerClzStr = '';
            slides[index] = $(slides[index]);
            if (index == currentIndex) {
                triggerClzStr = triggerClz;
            } else {
                $(slide).hide();
            }
            triggersHtml.push('<li class=" ' + triggerClzStr + ' "></li>');
            prepareSlide(slide);
        });
        $('div.trigger ul', container).html(triggersHtml.join(''));
        triggers = $('div.trigger ul li', container);

        container.on('click', 'div.trigger ul li', function (ev) {
            var index, destIndex,  el = $(this);
            if (el.hasClass(triggerClz)) return;
            destIndex = triggers.index(el);
            transitTo(destIndex);
        });

        function transitTo (destIndex) {
            var timer,
                currentSlide = slides[currentIndex],
                destSlide = slides[destIndex];
            // transit action
            destSlide.insertBefore(currentSlide);
            $('a div', destSlide).css({ width: width, marginLeft: 0, marginRight: 0, opacity: 1 });
            destSlide.show();
            $('a div', currentSlide).css({ width: 0, marginLeft: width/2, marginRight: width/2, opacity: 0 });
            timer = window.setTimeout(function () {
                currentSlide.hide();
            }, 1000);
            // focus trigger
            triggers.each(function (index) {
                if (index == destIndex) {
                    $(this).addClass(triggerClz);
                    currentIndex = index;
                } else {
                    $(this).removeClass(triggerClz);
                }
            });
        }

        function prepareSlide (slide) {
            var a = $('a', slide),
                img = $('img', a),
                imgUrl = img.attr('src'),
                blinds = $('a div', slide),
                html = [],
                backgroundValue;
            if (blinds.length) return;
            for (var i= 0; i<blindNum; i++) {
                backgroundValue = 'background:url(' + imgUrl + ') no-repeat -' + i*width + 'px 0';
                html.push('<div style="' + backgroundValue + '; width:' + width + 'px;"></div>');
            }
            img.remove();
            a.append(html.join(''));
        }
    });


})(jQuery);
