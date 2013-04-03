/*
 * @Author      Sway Deng
 * @Email       shiwei.dengsw@alibaba-inc.com
 * @Date        13-4-2 下午4:03
 * @Description 要求slide的父节点是position:relative; slide是position:absolute, top: 0, left: 0。
 *  slide 中包含一张图片，图片外面可选包裹一个链接，若是链接则需要是 block 的。形如：
 *  <ul>
 *      <li>
 *          <a href="#"><img src="http://img.china.alibaba.com/cms/upload/2013/100/539/935001_823742341.png" alt="" /></a>
 *      </li>
 *      <li>
 *          <a href="#"><img src="http://img.china.alibaba.com/cms/upload/2013/100/539/935001_823742341.png" alt="" /></a>
 *      </li>
 *  </ul>
 * !!cmd:compress=true
 * !!cmd:conv2unicode=true
 */

;(function ( $, window, document, undefined ) {

    var pluginName = 'magicSlide',
        defaults = {
            isAutoPlay: false,
            event: 'click',
            titleSelector: '.f-ms-title',
            slideSelector: '.f-ms-slide',
            selected: 0,
            effect: 'blind'  // 'mosaic', ''
        },
        blindNumber = 15;

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );

        this._nodeCache = {};

        // =====
        this.slides = $.makeArray($(this.options.slideSelector, this.element));
        this.length = this.slides.length;

        var demoSlide = $(this.slides[0]);
        this.slideWidth = demoSlide.width();
        this.slideHeight = demoSlide.height();
        this.slideContainer = demoSlide.parent();

        this.titleElements = typeof this.options.titleSelector == 'string' ?
            $(this.options.titleSelector, element) :
            this.options.titleSelector;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            this.bindEvent();
            this.titleElements.eq(this.options.selected).trigger(this.options.event);
        },

        bindEvent: function () {
            var self = this;
            self.titleElements.on(this.options.event, function (ev) {
                var index = self.titleElements.index(this);
                self.show(index);
            });
        },

        getSlide: function ( number ) {
            var slide = this._nodeCache['_slide_node_' + number],
                img, anchor, imgUrl,
                html = [],
                backgroundValue,
                width = this.slideWidth/blindNumber,
                height = this.slideHeight,
                transition = 'transition: width 1s, margin-left 1s, margin-right 1s, opacity 1s;';
            if (slide) {
                slide.find('a div').css({ width: width, marginLeft: 0, marginRight: 0, opacity: 1 })
                    .end().show();
                return slide;
            }

            slide = $(this.slides[number]);
            img = $('img', slide);
            anchor = $('a', slide);
            imgUrl = img.attr('src');
            transition = '-moz-' + transition + '-webkit-' + transition + transition;
            for (var i= 0; i<blindNumber; i++) {
                backgroundValue = 'background:url(' + imgUrl + ') no-repeat -' + i*width + 'px 0';
                html.push('<div style="float:left;' + backgroundValue + '; width:' + width + 'px;height: ' + height + 'px; opacity: 1; ' + transition + '"></div>');
            }
            img.remove();
            anchor.append(html.join(''));
            this._nodeCache['_slide_node_' + number] = slide;
            return slide;
        },

        show: function ( number ) {
            console.log('show: ' + number);

            var self = this,
                currentSlide = self.currentSlide,
                targetSlide,
                width = self.slideWidth / blindNumber / 2,
                timer;
            if (currentSlide) { // 不是第一次显示
                if (number == self.currentIndex) {
                    return;
                }
                targetSlide = self.getSlide(number);
                targetSlide.insertBefore(currentSlide);
                $('a div', currentSlide).css({ width: 0, marginLeft: width, marginRight: width, opacity: 0 });
                timer = window.setTimeout(function () {
                    currentSlide.hide();
                    self.currentIndex = number;
                    self.currentSlide = targetSlide;
                    window.clearTimeout(timer);
                }, 1000);
            } else {
                this.currentIndex = number;
                this.currentSlide = this.getSlide(number);
                this.slideContainer.append(this.currentSlide);
            }
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );