$(function() {
    var page = 1; //当前第一页
    var i = 4; //一页放4个li
    var $parent = $('.showpic');
    var $showpic = $parent.find('ul.piclist');
    var $content = $parent.find('div.content');
    var $v_width = $content.width();
    var len = $showpic.find('li').length;
    var page_count = Math.ceil(len / i); //计算总共页数
    function nextscroll() {
        if (!$showpic.is(':animated')) { //如果不在运动中
            if (page == page_count) {
                $showpic.animate({
                    left: '0'
                }, 'slow'); //回到第一页
                page = 1;
            } else {
                $showpic.animate({
                    left: '-=' + $v_width
                }, 'slow'); //按一页的宽度滚动
                page++;
            }
            $parent.find('span').eq((page - 1)).addClass('current') //圆点一起滚
                .siblings().removeClass('current');
        }
    }

    function prevscroll() {
        if (!$showpic.is(':animated')) { //如果不在运动中
            if (page == 1) {
                $showpic.animate({
                    left: '-=' + $v_width * (page_count - 1)
                }, 'slow'); //
                page = page_count;
            } else {
                $showpic.animate({
                    left: '+=' + $v_width
                }, 'slow'); //按一页的宽度滚动
                page--;
            }
            $parent.find('span').eq((page - 1)).addClass('current') //圆点一起滚
                .siblings().removeClass('current');
        }
    }
    $('.next').on('click', nextscroll);
    $('.prev').on('click', prevscroll);
    //定时器
    runscroll();
    var interval = null;
    function runscroll() {
        interval = setInterval(nextscroll, '1500');
    }
    $('.content').mouseover(function(){
        clearInterval(interval);
    },function() {
        runscroll();
    })
});