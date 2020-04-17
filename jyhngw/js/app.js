$(document).ready(function(){
    let pruTop = $(".app").offset().top
    $(document).scroll(function(){
        let scrollTop = $(document).scrollTop()
        console.log(pruTop,scrollTop)
        if(pruTop <= scrollTop){
            $(".app").css({position:"fixed",top:0,})
            $("scrollTopBox").show()
        }else{
            $(".app").css({position:"",})
            $("scrollTopBox").hide()
        }
    });
})