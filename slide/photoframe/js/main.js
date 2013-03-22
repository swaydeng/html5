(function($){

    var tab1 = $('#tab1'),
        triggers = $('ul.tab-triggers li', tab1),
        boxes = $('ul.tab-boxes li', tab1);
    tab1.delegate('ul.tab-triggers li', 'click', function(ev){
        ev.preventDefault();
        var n, currentNode, oldClz, t = $(this);
        if(t.hasClass('current')) return;

        triggers.removeClass('current');
        t.addClass('current');
        n = triggers.index(this);
        currentNode = boxes.eq(n);
        oldClz = currentNode.attr('class');
        currentNode.attr('class', 'trans-keyframe');
        $.later(300, this, function(){
            tab1.find('ul li.tab-layer-1').attr('class', oldClz);
            currentNode.attr('class', 'tab-layer-1');
        });
    });

    triggers.eq(0).click();

})(jQuery);