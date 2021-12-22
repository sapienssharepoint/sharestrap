


// -----------------------------------
// Slidebars
// Version 0.8.2
// http://plugins.adchsm.me/slidebars/
//
// Written by Adam Smith
// http://www.adchsm.me/
//
// Released under MIT License
// http://plugins.adchsm.me/slidebars/license.txt
//
// ---------------------
// Index of Slidebars.js
//
// 001 - Default Settings
// 002 - Feature Detection
// 003 - User Agents
// 004 - Setup
// 005 - Animation
// 006 - Operations
// 007 - API
// 008 - Window Resizes
// 009 - User Input

;(function($) {

    $.slidebars = function(options) {

        // ----------------------
        // 001 - Default Settings

        var settings = $.extend({
            siteClose: true, // true or false - Enable closing of Slidebars by clicking on #sb-site.
            disableOver: false, // integer or false - Hide Slidebars over a specific width.
            hideControlClasses: false // true or false - Hide controls at same width as disableOver.
        }, options);

        // -----------------------
        // 002 - Feature Detection

        var test = document.createElement('div').style, // Create element to test on.
        supportTransition = false, // Variable for testing transitions.
        supportTransform = false; // variable for testing transforms.

        // Test for CSS Transitions
        if (test.MozTransition === '' || test.WebkitTransition === '' || test.OTransition === '' || test.transition === '') supportTransition = true;

        // Test for CSS Transforms
        if (test.MozTransform === '' || test.WebkitTransform === '' || test.OTransform === '' || test.transform === '') supportTransform = true;

        // -----------------
        // 003 - User Agents

        var ua = navigator.userAgent, // Get user agent string.
        android = false; // Variable for storing android version.

        if (ua.match(/Android/)) { // Detect for Android in user agent string.
            android = parseFloat(ua.slice(ua.indexOf('Android')+8)); // Get version of Android.
            if (android < 3) $('html').addClass('sb-android'); // Add 'sb-android' helper class for unfixing elements.
        }

        // -----------
        // 004 - Setup

        // Site Container
        if (!$('#sb-site').length) $('body').children().wrapAll('<div id="sb-site" />'); // Check if content is wrapped with sb-site, wrap if it isn't.
        var $site = $('#sb-site'); // Cache the selector.
        if (!$site.parent().is('body')) $site.appendTo('body'); // Check its location and move if necessary.
        $site.addClass('sb-slide'); // Add animation class.

        // Left Slidebar    
        if ($('.sb-left').length) { // Check if the left Slidebar exists.
            var $left = $('.sb-left'), // Cache the selector.
            leftActive = false; // Used to check whether the left Slidebar is open or closed.
            if (!$left.parent().is('body')) $left.appendTo('body'); // Check its location and move if necessary.
            if (android && android < 3) $left.addClass('sb-static'); // Add static class for older versions of Android.
            if ($left.hasClass('sb-width-custom')) $left.css('width', $left.attr('data-sb-width')); // Set user custom width.
        }

        // Right Slidebar
        if ($('.sb-right').length) { // Check if the right Slidebar exists.
            var $right = $('.sb-right'), // Cache the selector.
            rightActive = false; // Used to check whether the right Slidebar is open or closed.
            if (!$right.parent().is('body')) $right.appendTo('body'); // Check its location and move if necessary.
            if (android && android < 3) $right.addClass('sb-static'); // Add static class for older versions of Android.
            if ($right.hasClass('sb-width-custom')) $right.css('width', $right.attr('data-sb-width')); // Set user custom width.
        }
        
        // Set Minimum Heights
        function setMinHeights() {
            $site.css('minHeight', ''); // Remove any min-height set.
            if ($left) $left.css('minHeight', ''); // Remove any min-height set.
            if ($right) $right.css('minHeight', ''); // Remove any min-height set.
            var minHeight = $('html').css('height'); // Get minimum height of the page.
            $site.css('minHeight', minHeight); // Set minimum height to the site.
            if ($left && $left.hasClass('sb-static')) $left.css('minHeight', minHeight);  // Set minimum height to the left Slidebar.
            if ($right && $right.hasClass('sb-static')) $right.css('minHeight', minHeight);  // Set minimum height to the right Slidebar.
        }
        setMinHeights(); // Set them.
        
        // Control Classes
        var $controls = $('.sb-toggle-left, .sb-toggle-right, .sb-open-left, .sb-open-right, .sb-close');

        // Initialise
        function initialise() {
            var windowWidth = $(window).width(); // Get the window width.
            if (!settings.disableOver || (typeof settings.disableOver === 'number' && settings.disableOver >= windowWidth)) { // False or larger than window size. 
                this.init = true; // User check, returns true if Slidebars has been initiated.
                $('html').addClass('sb-init'); // Add helper class.
                if (settings.hideControlClasses) $controls.show();
            } else if (typeof settings.disableOver === 'number' && settings.disableOver < windowWidth) { // Less than window size.
                this.init = false; // User check, returns true if Slidebars has been initiated.
                $('html').removeClass('sb-init'); // Remove helper class.
                if (settings.hideControlClasses) $controls.hide(); // Hide controls
                if (leftActive || rightActive) close(); // Close Slidebars if open.
            }
        }
        initialise();

        // ---------------
        // 005 - Animation

        var animation, // Animation type.
        $slide = $('.sb-slide'); // Cache all elements to animate.

        // Set Animation Type
        if (supportTransition && supportTransform) { // Browser supports css transitions and transforms.
            animation = 'translate'; // Translate for browsers that support it.
            if (android && android < 4.4) animation = 'side'; // Android supports both, but can't translate any fixed positions, so use left instead.
        } else {
            animation = 'jQuery'; // Browsers that don't support css transitions and transitions.
        }

        $('html').addClass('sb-anim-type-' + animation); // Add animation type class.

        // Animate Mixin
        function animate (selector, amount, side) {
            if (animation === 'translate') {
                selector.css({
                    'transform': 'translate(' + amount + ')'
                });
            } else if (animation === 'side') {
                selector.css(side, amount);
            } else if (animation === 'jQuery') {
                var properties = {};
                properties[side] = amount;
                selector.stop().animate(properties, 400);
            }
        }

        // ----------------
        // 006 - Operations

        // Open a Slidebar
        function open(side) {
            // Check to see if opposite Slidebar is open.
            if (side === 'left' && $left && rightActive || side === 'right' && $right && leftActive) { // It's open, close it, then continue.
                close();
                setTimeout(proceed, 400);
            } else { // Its not open, continue.
                proceed();
            }

            // Open
            function proceed() {
                if (this.init && side === 'left' && $left) { // Slidebars is initiated, left is in use and called to open.
                    var leftWidth = $left.css('width'); // Get the width of the left Slidebar.
                    $('html').addClass('sb-active sb-active-left'); // Add active classes.
                    animate($slide, leftWidth, 'left'); // Animation
                    setTimeout(function() { leftActive = true; }, 400); // Set active variables.
                } else if (this.init && side === 'right' && $right) { // Slidebars is initiated, right is in use and called to open.
                    var rightWidth = $right.css('width'); // Get the width of the right Slidebar.
                    $('html').addClass('sb-active sb-active-right'); // Add active classes.
                    animate($slide, '-' + rightWidth, 'left'); // Animation
                    setTimeout(function() { rightActive = true; }, 400); // Set active variables.
                }
            }
        }
            
        // Close either Slidebar
        function close(link) {
            if (leftActive || rightActive) { // If a Slidebar is open.
                leftActive = false; // Set active variable.
                rightActive = false; // Set active variable.
                animate($slide, '0px', 'left'); // Animation
                setTimeout(function() { // Wait for closing animation to finish.
                    $('html').removeClass('sb-active sb-active-left sb-active-right'); // Remove active classes.
                    if (link) window.location = link; // If a link has been passed to the function, go to it.
                }, 400);
            }
        }
        
        // Toggle either Slidebar
        function toggle(side) {
            if (side === 'left' && $left) { // If left Slidebar is called and in use.
                if (leftActive) {
                    close(); // Slidebar is open, close it.
                } else if (!leftActive) {
                    open('left'); // Slidebar is closed, open it.
                }   
            } else if (side === 'right' && $right) { // If right Slidebar is called and in use.
                if (rightActive) {
                    close(); // Slidebar is open, close it.
                } else if (!rightActive) {
                    open('right'); // Slidebar is closed, open it.
                }
            }
        }

        // ---------
        // 007 - API

        this.open = open; // Maps user variable name to the open method.
        this.close = close; // Maps user variable name to the close method.
        this.toggle = toggle; // Maps user variable name to the toggle method.

        // --------------------
        // 008 - Window Resizes

        function resize() {
            setMinHeights(); // Reset the minimum heights.
            initialise(); // Check new screen sizes to see if Slidebars should still operate.
            if (leftActive) { // Left Slidebar is open whilst the window is resized.
                open('left'); // Running the open method will ensure the slidebar is the correct width for new screen size.
            } else if (rightActive) { // Right Slidebar is open whilst the window is resized.
                open('right'); // Running the open method will ensure the slidebar is the correct width for new screen size.
            }
        }
        $(window).resize(resize);

        // ----------------
        // 009 - User Input
        
        function eventHandler(event, selector) {
            event.stopPropagation(); // Stop event bubbling.
            event.preventDefault(); // Prevent default behaviour
            //if (event.type === 'touchend') selector.off('click'); // If event type was touch turn off clicks to prevent phantom clicks.
        }
        
        // Toggle Left Slidebar
        $('.sb-toggle-left').on('touchend click', function(event) {
            eventHandler(event, $(this)); // Handle the event.
            if ($left && leftActive !== true) { // If using left Slidebar and its closed.
                open('left'); // Its closed, open it.
            } else {
                close(); // Its open, close it.
            }
        });
        
        // Toggle Right Slidebar
        /*$('.sb-toggle-right').on('touchend click', function(event) {
            eventHandler(event, $(this)); // Handle the event.
            if ($right && rightActive !== true) { // If using right Slidebar and its closed.
                open('right'); // Its closed, open it.
            } else {
                close(); // Its open, close it.
            }
        });*/
        
        // Open Left Slidebar
        $('.sb-open-left').on('touchend click', function(event) {
            eventHandler(event, $(this)); // Handle the event.
            if ($left && leftActive !== true) open('left'); // If using left Slidebar and its closed.
        });
        
        // Open Right Slidebar
        /*$('.sb-open-right').on('touchend click', function(event) {
            eventHandler(event, $(this)); // Handle the event.
            if ($right && rightActive !== true) open('right'); // If using right Slidebar and its closed.
        });*/
        
        // Close a Slidebar
        $('.sb-close').on('touchend click', function(event) {
            eventHandler(event, $(this)); // Handle the event.
            if (leftActive || rightActive) close(); // If left or right Slidebar is open, close it.
        });
        
        // Close Slidebar via Link
        $('.sb-slidebar a').not('.sb-disable-close').on('click', function(event) {
            eventHandler(event, $(this)); // Handle the event.
            if (leftActive || rightActive) close( $(this).attr('href') ); // If left or right Slidebar is open, close it and pass link.
        });
        
        // Close Slidebar via Site
        /* $site.on('touchend click', function(event) {
            if (settings.siteClose && (leftActive || rightActive)) { // If settings permit closing by site and left or right Slidebar is open.
                eventHandler(event, $(this)); // Handle the event.
                close(); // Close it.
            }
        });*/
        
    }; // End slidebars function.

}) (jQuery);




if(typeof(document.querySelectorAll) == 'function')
{
    var elements = document.querySelectorAll("li.flyout");
    Array.prototype.forEach.call(elements, function(el, i){
        el.addEventListener("click", navClicked);
    })
}
function navClicked(e)
{
    this.classList.add('hover');
    document.addEventListener("click", docClicked);
}
function docClicked(e)
{
    var elements = document.querySelectorAll("li.flyout.hover");
    Array.prototype.forEach.call(elements, function(el, i){
        if(isContained(e.target, el) === false)
            el.classList.remove('hover');
    })
}

function isContained(child, parent){
    var current = child;    
    while (current) {
        if(current === parent) return true;
        current = current.parentNode;
    }
    return false;
}




var Detector = function() {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};



(function($) {
        $(document).ready(function() {

             //set the starting bigestHeight variable  
            var biggestHeight = 0;  
            //check each of them  
            $('.index__box__desc').each(function(){  
                //if the height of the current element is  
                //bigger then the current biggestHeight value  
                if($(this).height() > biggestHeight){  
                    //update the biggestHeight with the  
                    //height of the current elements  
                    biggestHeight = $(this).height();  
                }  
            });  
            //when checking for biggestHeight is done set that  
            //height to all the elements  
            $('.index__box__desc').height(biggestHeight);  


          $.slidebars({
            siteClose: true, // true or false
            disableOver: 799, // integer or false
            hideControlClasses: true // true or false
          });



          $('.sb-toggle-submenu').off('click') // Stop submenu toggle from closing Slidebars.
            .on('click', function() {
            $submenu = $(this).parent().children('.sb-submenu');
            $(this).add($submenu).toggleClass('sb-submenu-active'); // Toggle active class.
            
            if ($submenu.hasClass('sb-submenu-active')) {
                $submenu.slideDown(200);
            } else {
                $submenu.slideUp(200);
            }
            });



           var detective = new Detector();
           if(!detective.detect('Segoe UI')){
                  WebFontConfig = {
                    google: { families: [ 'Open+Sans:300,400,700:latin' ] }
                  };
                  (function() {
                    var wf = document.createElement('script');
                    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                    wf.type = 'text/javascript';
                    wf.async = 'true';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(wf, s);
                  })(); 
           }



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
                    accordion('#trigger16');
                    accordion('#trigger17');
                    accordion('#trigger18');
                    accordion('#trigger19');
                    accordion('#trigger20');
                    accordion('#trigger21');


        });
      }) (jQuery);


(function(){
    var btnPeriodYear;
    var btnPeriodMonth;
    var btnCurrencyUSD;
    var btnCurrencyEUR;
    var btnLicenseTypeSite;
    var btnLicenseTypeTenant;
    jQuery(document).ready(function ($) {

        btnPeriodYear = $(".btn_pricing_period_year");
        btnPeriodMonth = $(".btn_pricing_period_month");

        btnCurrencyUSD = $(".btn_pricing_currency_usd");
        btnCurrencyEUR = $(".btn_pricing_currency_eur");

        btnLicenseTypeSite = $(".btn_pricing_licensetype_site");
        btnLicenseTypeTenant = $(".btn_pricing_licensetype_tenant");

        if(btnPeriodYear.length > 0){
            btnPeriodYear.click(onPricingControlChange);
            btnPeriodMonth.click(onPricingControlChange);
            btnCurrencyUSD.click(onPricingControlChange);
            btnCurrencyEUR.click(onPricingControlChange);
            btnLicenseTypeSite.click(onPricingControlChange);
            btnLicenseTypeTenant.click(onPricingControlChange);

            jQuery.getJSON('https://api.ipstack.com/check?access_key=0fabbfbe6ac0e18b6d1c7e112036aff1', function (location) {
                jQuery.getJSON('https://addins.sharepointsapiens.com/licensing/CurrencyService.svc/GetCurrency/' + location.country_code, function (result) {
                    onPricingControlChange({ target: $(".btn_pricing_currency_" + result.toLowerCase()) });
                });
            }).fail(function () {
                onPricingControlChange({ target: $(".btn_pricing_currency_usd") });
            });
        }
    });

    function onPricingControlChange(args) {
        var sender = args.target;
        if (sender) {
            jQuery("a[data-pricing-filter='" + jQuery(sender).attr("data-pricing-filter") + "']").removeClass("btn-pricing_period_active");
            jQuery(sender).addClass("btn-pricing_period_active")
        }
        var period = btnPeriodMonth.hasClass("btn-pricing_period_active") ? "month" : "year";
        var currency = btnCurrencyEUR.hasClass("btn-pricing_period_active") ? "eur" : "usd";
        var licenseType = btnLicenseTypeTenant.hasClass("btn-pricing_period_active") ? "tenant" : "site";

        jQuery(".pricing-body").hide();
        jQuery(".pricing-body-loading").hide();
        jQuery(".pricing-body[data-currency='" + currency + "'][data-period='" + period + "'][data-license='" + licenseType + "']").show();
        
        return false;
    }
})();


(function(){
    jQuery(document).ready(function($){
        setTimeout(function(){
            var i = 1;
            $("img").each(function(){
                var thisImg = this;
                reloadImage(thisImg,  50 * (i++), true)
            });
        }, 2000);
    });
    function reloadImage(img, timeout, firstTry){
        var isLoaded = img.complete && img.naturalHeight !== 0;
        if(!isLoaded){
            setTimeout(function(){
                isLoaded = img.complete && img.naturalHeight !== 0;
                if(!isLoaded){
                    var src = jQuery(img).attr("src");
                    src = src.replace(/^(?:\/\/|[^\/]+)*\//, "/");
                    jQuery(img).attr("src", "");
                    jQuery(img).attr("src", src);
                    if(firstTry) reloadImage(img, timeout * 2, false);
                }
            }, timeout);
        }
    }
})();

(function(){
    jQuery(document).ready(function($){
        $("a.btn--download").each(function() {
            var href = $(this).attr("href");
            if (href && href.indexOf("?") === -1) {
                href += "?t=" + new Date().getTime();
                $(this).attr("href", href);
            }
        });
    });
})();


