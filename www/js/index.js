var baseUrl = 'http://api.openweathermap.org/data/2.5';
var locationList = '2747351,2750053,5128638,2759794,524901';
var sessionExpirationTime = 5;

var varUrl = function(){
    return '&units=' + window.localStorage.getItem('unit') +'&lang=nl&APPID=f82bc7a0785cb8749616049189df1757';
}

var getFormattedDate = function(date){
    var parts = date.split(/[-\/\ ]/);
    var timeParts = parts[3].split(':');
    return parts[1] + '-' + parts[2] + ' ' + timeParts[0] + ':' + timeParts[1];
}

var getUnit = function(){
    var unit = '&deg;';
    if (window.localStorage.getItem('unit') == 'metric'){ unit += 'C'; }
    else { unit += 'F';}
    return unit;
}

var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        try
        {
            swipeNavigation();

            var settings = new Settings();
            settings.initialize();

            var main = new Main();
            main.initialize();

            $(document.body).on('tap', '#mainList li a', function(){
                navigator.vibrate(500);
                var detail = new Detail();
                detail.initialize($(this));
                $.mobile.changePage('#detail', { transition: 'slideup' });
            });  
        }
        catch(err){
            Alert('Error, er is iets fout gegaan!');
        }
    }
};

function swipeNavigation(){
    $(document).on("pagecreate","body",function(){
        $("#detail").on("swiperight",function(){
            $.mobile.changePage('#home', { transition: 'slideup' });
        });   
         $("#settings").on("swipeleft",function(){
            $.mobile.changePage('#home', { transition: 'slideup' });
        });  
        $("#home").on("swiperight",function(){
            $.mobile.changePage('#settings', { transition: 'slideup' });
        });                     
    });
}

