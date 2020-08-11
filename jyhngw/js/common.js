(function (doc, win) {
    function getCookie(c_name) {
        if(document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");//获取字符串的起点
            if(c_start != -1) {
                c_start = c_start + c_name.length + 1;//获取值的起点
                c_end = document.cookie.indexOf(";", c_start);//获取结尾处
                if(c_end == -1) c_end = document.cookie.length;//如果是最后一个，结尾就是cookie字符串的结尾
                return decodeURIComponent(document.cookie.substring(c_start, c_end));//截取字符串返回
            }
        }
        return "";
    }
    let user =getCookie('user')
    let name = user?JSON.parse(user).feedbackName:null;
    if(name){
        $('.login-user').html(name)
    }

    let a = false
    let isShow = true
    $(".burger").click(function(event){
        event.stopPropagation()
        a = !a;
        if(a){
            $(".nav").slideDown()
        }else{
            $(".nav").slideUp()
        }
    })
    $(".nav").click(function(){
        event.stopPropagation();
    })
    $(document).click(function(){
        if(a){
            a = !a
            $(".nav").slideUp()
        }
        isShow = true
        $(".nav-child").slideUp()
    })

    var docEl = doc.documentElement;

    let width = $(".swiper-container").width()
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function (wid) {
        isShow = true
        $(".nav-child").slideUp()

        $('.nav').attr('style', '')
        $(".bg").attr('style', '')

        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth <= 750) {
            $(".pro-menu-list").eq(0).children().css({"display":"none",color:"#fff"})
            $(".pro-menu-list").eq(1).children().css({"display":"none",color:"#969696"})
            $(".spec").children().css({"display":"none"})
            $(".goods").children().css({"display":"block"})
            $(".swiper-container").height(wid / 2)
            docEl.style.cssText = 'font-size:' + 100 * (clientWidth / 750) + 'px !important';
        } else if (clientWidth <= 1100 && clientWidth > 750) {
            $(".swiper-container").height(wid / 2.6)
            docEl.style.cssText = 'font-size:' + 100 * (clientWidth / 1200) + 'px !important';
        } else {
            $(".swiper-container").height(wid / 3)
            docEl.style.cssText = 'font-size:' + 100 * (clientWidth / 1366) + 'px !important';
            if (100 * (clientWidth / 1366) >= 100) {
                docEl.style.cssText = 'font-size:' + 100 + 'px !important';

            }
        }
    }
    window.onresize = function () {
        width = $(".swiper-container").width()
        recalc(width);
    }
    window.onload = function () {
        recalc();
    }

    $(".nav-li").on("click",function(){
        isShow = !isShow
        if(!isShow){
            $(this).children(".nav-child").slideDown()
        }else{
            $(this).children(".nav-child").slideUp()
        }

    })
    recalc();
})(document, window);
