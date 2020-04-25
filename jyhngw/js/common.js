(function (doc, win) {
    let a = false
    $(".burger").click(function(event){
        event.stopPropagation()
        a = !a;
        if(a){
            $(".nav").slideDown()
            // $(".bg").show()
        }else{
            $(".nav").slideUp()
            // $(".bg").hide()
        }
    })
    $(document).click(function(){
        if(a){
            a = !a
            $(".nav").slideUp()
        }
    })
    
    var docEl = doc.documentElement;
    
    let width = $(".swiper-container").width()
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function (wid) {
        $('.nav').attr('style', '')
        $(".bg").attr('style', '')
        
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth <= 750) {
            console.log(width)
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
        console.log(width,99)
        recalc(width);
    }
    window.onload = function () {
        recalc();
    }
    recalc();
})(document, window);