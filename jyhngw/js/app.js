$(document).ready(function(){
    let pruTop = $(".app").offset().top
    $(document).scroll(function(){
        let scrollTop = $(document).scrollTop()
        if(pruTop <= scrollTop){
            $(".app").css({position:"fixed",top:"60px",})
            $("scrollTopBox").show()
        }else{
            $(".app").css({position:"",})
            $("scrollTopBox").hide()
        }
    });
})