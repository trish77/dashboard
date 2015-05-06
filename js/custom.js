

$(document).ready(function () {

    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    /*    var miniNav = $("body").addClass("mini-navbar");
        $(".navbar-default").hover(function(){
            $("body").toggleClass("mini-navbar");
        });
*/

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').click( function() {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').click( function() {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').click( function() {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').click(function(){
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').click(function(){
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').click( function(){
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls
    //$.get("skin-config.html", function (data) {
    //    if (!$('body').hasClass('no-skin-config'))
    //        $('body').append(data);
    //});

    // Minimalize menu
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $(function() {
        $("[data-toggle='tooltip']").tooltip({

        }).on('shown.bs.tooltip', function () {

           $('.tooltip').fadeOut(999);

        });

    });


    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");

    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh){
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }

    }
    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $(document).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function() {
    if (localStorageSupport) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if(body.hasClass('fixed-sidebar')) {
                if(!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if(!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
});

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
}



// constructs the suggestion engine
var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                // the typeahead jQuery plugin expects suggestions to a
                // JavaScript object, refer to typeahead docs for more info
                matches.push({ value: str });
            }
        });

        cb(matches);
    };
};
var dealers = [
    "A & L Motors",
    "A & L Motors BMW",
    "A & L Motors Jaguar",
    "A & T Chevrolet",
    "A & T Subaru",
    "A C Collins Ford",
    "A Crivelli Buick GMC",
    "Acura & Volvo of Athens",
    "Acura 101 West" ,
    "Acura At Oxmoor" ,
    "Acura Bay Shore" ,
    "Acura By Executive",
    "Acura Carland" ,
    "Bay Mitsubishi",
    "Bay Ridge Ford" ,
    "Bay Ridge Honda" ,
    "Bay Ridge Lexus",
    "Bay Ridge Nissan",
    "Bay Ridge Subaru",
    "Baydo Chevrolet" ,
    "BMW Of Annapolis" ,
    "BMW Of Asheville" ,
    "BMW Of Atlantic City",
    "BMW Of Austin" ,
    "Cadillac Of Fayetteville",
    "Cadillac Of Greenwich" ,
    "Cadillac Of Knoxville",
    "Cadillac Of La Quinta" ,
    "Cadillac of Lake Lanier",
    "Dodge Chrysler Jeep of Winter Haven",
    "Dodge Chrysler Jeep Ram City",
    "Dodge Chrysler Jeep Ram Of Vacaville",
    "Dodge Of Burnsville",
    "Dodge Ram Country",
    "Dodge Ram Of Blaine",
    "Dodge Ram Town",
    "Executive Jeep",
    "Executive Kia",
    "Executive Mitsubishi",
    "Executive Nissan",
    "Exeter Subaru",
    "Exit 132 Buick GMC",
    "Exotic Classics",
    "Experience Suzuki Of North Aurora",
    "Expo Motorcars",
    "Expressway Chevrolet Buick GMC",
    "Expressway Chrysler Dodge Jeep Ram",
    "Expressway Dodge Ram",
    "Expressway FIAT Of Evansville",
    "Expressway Ford",
    "Expressway Mitsubishi",
    "Expressway Motors",
    "Ford Of Moses Lake",
    "Ford Of Murfreesboro",
    "Ford Of Northampton",
    "Ford Of Orange",
    "Ford Of Port Richey",
    "Ford Of Rantoul",
    "Ford Of Slidell",
    "Gulf Coast Mitsubishi",
    "Gulf Coast Nissan",
    "Gulf Coast Toyota Scion",
    "Gulfgate Dodge Chrysler Jeep",
    "Gulfgate Dodge Chrysler Jeep Ram",
    "Gullo Ford",
    "Gullo Ford Of Conroe",
    "Gullo Mazda Of Conroe",
    "Gullo Toyota Scion",
    "Hall Ford Elizabeth City",
    "Hall Ford Lincoln Newport News",
    "Hall Honda Elizabeth City",
    "Hall Honda Virginia Beach",
    "Hall Hyundai Chesapeake",
    "Honda Cars Of Aiken",
    "Honda Cars Of Bellevue",
    "Honda Cars Of Boston",
    "Honda Cars Of Corona",
    "Honda Cars Of Katy",
    "Honda Cars of McKinney",
    "Honda Cars of Rock Hill",
    "Jaguar Tysons Corner",
    "Jaguar Ventura",
    "Jaguar Waukesha",
    "Jaguar Webster",
    "Jaguar Wellesley",
    "Jaguar West Ashley",
    "Jaguar West Chester",
    "Kia Of Muncie",
    "Kia Of New Bern",
    "Kia Of Orange Park",
    "Kia Of Puyallup",
    "Kia Of Saco",
    "Kia Of Santa Rosa",
    "Kia Of Shreveport-Bossier",
    "Kia Of Silver Spring",
    "Kia Of Somersworth",
    "Kia Of St Cloud",
    "Land Rover Orlando",
    "Land Rover Palm Beach",
    "Land Rover Paramus",
    "Land Rover Parsippany",
    "Land Rover Pasadena",
    "Land Rover Peabody",
    "Land Rover Peoria",
    "Land Rover Portland",
    "Mercedes-Benz Of South Charlotte",
    "Mercedes-Benz Of South Mississippi",
    "Mercedes-Benz Of South Orlando",
    "Mercedes-Benz Of Southampton",
    "Mercedes-Benz Of Spokane",
    "Mercedes-Benz Of St Charles",
    "Mercedes-Benz Of State College",
    "Mercedes-Benz Of Sugar Land",
    "Porsche Of Peoria",
    "Porsche Of Princeton",
    "Porsche Of Quad Cities",
    "Porsche Of Roanoke",
    "Porsche Of Rochester",
    "Porsche Of Rockville",
    "Porsche Of Roslyn",
    "Porsche Of San Antonio",
    "Porsche Of San Diego",
    "Porsche Of Spokane",
    "Rick Hendrick Chevrolet - Charleston",
    "Rick Hendrick Chevrolet - Duluth",
    "Rick Hendrick Chevrolet - Norfolk",
    "Rick Hendrick Chevrolet Buick GMC",
    "Rick Hendrick Chevrolet of Buford",
    "Rolls-Royce Motor Cars Atlanta",
    "Rolls-Royce Motor Cars Beverly Hills",
    "Rolls-Royce Motor Cars Miami",
    "Rolls-Royce Motor Cars Naples",
    "Rolls-Royce Motor Cars Palm Beach",
    "Rolls-Royce Motor Cars Pasadena",
    "Rolls-Royce Motor Cars St Louis",
    "Rolls-Royce Motor Cars Tampa Bay",
    "Subaru Of Richmond",
    "Subaru Of San Bernardino",
    "Subaru Of Santa Cruz",
    "Subaru Of Santa Monica",
    "Subaru Of Spokane",
    "Subaru Of Wakefield",
    "Subaru Of Wichita",
    "Subaru Of Winchester",
    "Subaru Pacific",
    "Toyota Scion Of The Desert",
    "Toyota Scion Of Turnersville",
    "Toyota Scion Of Vallejo",
    "Toyota Scion Of Vero Beach",
    "Toyota Scion Of Vineland",
    "Toyota Scion Of Waldorf",
    "Toyota Scion Of Wallingford",
    "Toyota Scion Of Wasau",
    "Toyota Scion Of Whittier"
];


/*
$('#the-basics .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 2
    },
    {
        name: 'dealers',
        displayKey: 'value',
        // `ttAdapter` wraps the suggestion engine in an adapter that
        // is compatible with the typeahead jQuery plugin
        source: substringMatcher(dealers)
    });
*/

