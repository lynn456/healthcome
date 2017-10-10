require(['config', 'pace', 'funs'], function (config, pace) {



    pace.on("restart ", function () {
        var progress, progressText;

    })

    pace.on("hide", function () {
        TweenMax.to($('.loading_bar'), 0.7, {
            autoAlpha: 1,
            y: -150,
            ease: Back.easeIn,
            delay: 0.5
        })
        TweenMax.to($(".loading"), 0.3, {
            autoAlpha: 0,
            delay: 1
        });
        $('.fadinPage').trigger('pagescroll');
		
		if ($('#videoPlayer').get(0) === undefined || $('#videoPlayer').get(0) === null) {
			//
		}
		else {
			$('#videoPlayer').get(0).play();
		}

    })

    pace.start({
        ajax: false,
        document: false
    });

    $(function () {



        //控制不同頁面置入不同js
        switch (config.pathName) {
            case '':
                require(['index']);
                break;

            case 'index':
			case 'index_test':
                require(['index']);
                break;

            case 'nature':
                require(['nature']);
                break;

            case 'science':
                require(['science']);
                break;
            case 'science_m':
                require(['science_m']);
                break;

            case 'product':
                require(['product']);
                break;

            case 'about':
			case 'about_test':
                require(['about']);
                break;

            default:
                otherPage();
                break;

        }


        //公用js
        publicControl();


    })


    function publicControl() {


        //控制menu
        $('.menu_icon').click(function () {
            $(this).hide().siblings().show();


            if ($(this).hasClass("open")) {
                TweenMax.to($('.main_nav'), 0.5, {
                    right: 0,
                    ease: Power2.easeInOut
                });
                TweenMax.to($('.container, .container-page, .about_video, .video_lightbox'), 0.4, {
                    x: -70,
                    delay: 0.15,
                    ease: Power2.easeInOut
                });
                //                TweenMax.to($('.main, .about_video, .video_lightbox'),0.4,{x:-70,delay:0.15,ease:Power2.easeInOut});

                TweenMax.staggerFromTo(".nav_list a", 0.4, {
                    x: 40,
                    autoAlpha: 0
                }, {
                    x: 0,
                    autoAlpha: 1,
                    delay: 0.2,
                    ease: Power2.easeOut
                }, 0.1);

                TweenMax.to($('.m_bk'), 0.5, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                });

            } else {
                TweenMax.to($('.main_nav'), 0.5, {
                    right: -234,
                    ease: Power2.easeInOut
                });
                TweenMax.to($('.container, .container-page, .about_video, .video_lightbox'), 0.4, {
                    x: 0,
                    delay: 0.15,
                    ease: Power2.easeInOut
                })
                TweenMax.to($('.m_bk'), 0.5, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                });
                //                TweenMax.to($('.main, .about_video, .video_lightbox'),0.4,{x:0,delay:0.15,ease:Power2.easeInOut});
            }
        })

        //控制menu fooer
        if (config.isMobile) {
            $('.menu_footer').addClass('mobile')
        } else {
            $('.menu_footer').removeClass('mobile')
        }
        
        
        //footer share line icon
        if (config.isMobile) {
            $('#share_line').show();
        } else {
            $('#share_line').hide();
        }
        

        //fullimg
        $('.fullImg').tofullBg();

        //        $('#main').smoothState();



        //處理scroll fadein, 只限桌機
        if (!config.isMobile) {
            scrollPageFadeIn();
        }


        //go to top
        $('.top_btn').on("click", function (e) {
            e.preventDefault();
            TweenMax.to(window, 1, {
                scrollTo: {
                    y: 0
                },
                ease: Power3.easeInOut
            });
        })
        if ($(window).scrollTop() >= 150) {
            $('.top_btn').fadeIn(300)
        } else {
            $('.top_btn').fadeOut(300)
        }
        $(window).on("scroll", function () {
            if ($(window).scrollTop() >= 150) {
                $('.top_btn').fadeIn(300)
            } else {
                $('.top_btn').fadeOut(300)
            }
        })
    }




    function scrollPageFadeIn() {
        var windowH;
        var scrollT;

        TweenMax.set($('.fadinPage'), {
            autoAlpha: 0
        })

        $('.fadinPage').bind('pagescroll', function () {
            windowH = $(window).height();
            scrollT = $(window).scrollTop();
            contentT = $(this).offset().top;


            if (windowH + scrollT > contentT + 50) {
                TweenMax.to($(this), 0.2, {
                    autoAlpha: 1,
                    ease: Power2.easeIn
                })
            } else if (windowH + scrollT < contentT) {
                TweenMax.set($(this), {
                    autoAlpha: 0
                })
            }

        })




        $(window).bind('scroll', function () {
            $('.fadinPage').trigger('pagescroll');
        })

        $('.fadinPage').trigger('pagescroll');
    }




    function otherPage() {

    }

})

//分享facebook
function fbShare(winWidth, winHeight) {
    var url = location.href;
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

//分享line
function fbLine() {
    var url = location.href;
    location.href="http://line.me/R/msg/text/?"+url;
}


//打開詳細內容
function openContent(parent_dom,dom) {
    var parentSection = parent_dom;
    
    
    $(dom).slideDown(500);

    if ($(window).width() <= 480) {
        TweenMax.to(window, 1.8, {
            scrollTo: {
                y: $(dom).offset().top - $(".head_bar_m").height()
            },
            ease: Power3.easeInOut
        });
    } else {
        TweenMax.to(window, 1.8, {
            scrollTo: {
                y: $(dom).offset().top
            },
            ease: Power3.easeInOut
        });
    }
    
    
    //fullimg
    $('.fullImg').tofullBg();
    
    
    $(dom).find('.close_btn').one("click",function(){
        $(dom).slideUp(600,function(){$('.fadinPage').trigger('pagescroll');})
        
        TweenMax.to(window, 1.8, {
            scrollTo: {
                y: $(parentSection).offset().top,delay:0.2
            },
            ease: Power3.easeInOut
        });
    })
}
