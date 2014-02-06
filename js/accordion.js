
jQuery(document).ready(function ($){
    // Collapsible Menu
    function accordion(trigger) {

        //variables
        var $button = $(trigger),//trigger firing the event
            visible = true;//flag for wayfinding

            $button.hover().css({'cursor': 'pointer'}); // give the trigger a pointer on :hover

        //event
        $button.click(function() {

            if ( ! visible ) {
                $button.removeClass('active');

                $('.panel-title .icon').html('+');

                $(this).next().slideUp('fast',function() {
                    $(this).addClass('visuallyhidden').slideDown(0);
                    $('.panel-content').attr( 'aria-expanded','false' );
                });
            }else {
                $button.addClass('active');

                $('.panel-title.active .icon').html('<span style="padding:0 2px 0 3px;">&ndash;</span>');

                $(this).next().slideUp(0, function() {
                    $('.panel-content').attr( 'aria-expanded','true' );
                    $(this).removeClass('visuallyhidden').slideDown('fast');
                });
            }

            // the flag visibility dude
            visible = ! visible;
            return false
        });
    }

    //call to widget trigger1
    accordion('#trigger1');
    //call to widget trigger2
    accordion('#trigger2');
    //call to widget trigger3
    accordion('#trigger3');
    accordion('#trigger4');
    accordion('#trigger5');
    accordion('#trigger6');
    accordion('#trigger7');
    accordion('#trigger8');
    accordion('#trigger9');
    accordion('#trigger10');
    accordion('#trigger11');
    accordion('#trigger12');
    accordion('#trigger13');
    accordion('#trigger14');
    accordion('#trigger15');



});//end document.ready()
