function Settings(){
	
	this.initialize = function(){

		// Default localStorage
		if(window.localStorage.getItem('unit') == null){
    		window.localStorage.setItem('unit', 'metric');
    	}

    	this.configureRadioButtons();
  
    	// Close button
    	$('#settings #close').on('tap', function(){
            window.localStorage.setItem('unit', $('.radioUnit:checked').val());
            window.localStorage.removeItem('mainList');
            var main = new Main();
            main.initialize();
            $.mobile.changePage('#home', { transition: "slideup" });
    	});
    	
	}

	this.configureRadioButtons = function(){
		$('.radioUnit').removeAttr('checked');
    	if(window.localStorage.getItem('unit') == 'metric'){
    		$('#metric').attr('checked','true');
    	}
    	else{
    		$('#imperial').attr('checked', 'true');
    	}
	}
}