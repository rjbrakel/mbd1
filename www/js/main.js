function Main () {
	
	this.initialize = function(){
		$('#mainList').html('');
		if(window.localStorage.getItem('mainList') == null || ((new Date() - Date.parse(window.localStorage.getItem('sessionTime'))) / 1000) > sessionExpirationTime) {
			window.localStorage.setItem('mainList', '[]');
			window.localStorage.setItem('sessionTime', new Date());
			this.getCurrentLocation();
			this.getLocations();
			console.log('Data from API');
		}
		else{
			var data = JSON.parse(window.localStorage.getItem('mainList'));
			$.each(data, function(key,val){
				$('#mainList').append(val);
			});
			console.log('Data from cache');
		}
	}

	this.getCurrentLocation = function(){
		var location = new Location();
    	location.get(function(err, data, rainAlert) {

    		if(rainAlert != null && parseFloat(rainAlert) > 0)
    		{
    			navigator.notification.alert(
			    	'Het gaat binnen 3 uur ' + rainAlert + 'mm regenen op uw locatie!',  // message
			    	function(){},         // callback
			   		'Let op! Regen onderweg!',            // title
			    	'Ik pak mijn paraplu vast!'                  // buttonName
				);
    		}
    		else{
    			navigator.notification.alert(
			    	'Het gaat binnen 3 uur niet regenen op uw locatie!',  // message
			    	function(){},         // callback
			   		'Buitenspeeltijd!',            // title
			    	'Ik ga lekker naar buiten!'                  // buttonName
				);
    		}
    		

    		if (err) {
    			window.localStorage.removeItem('mainList');
    			alert('Error while getting location!');
    			return;
    		} else if(!data) {
    			window.localStorage.removeItem('mainList');
    			alert('Andere oops!');
    			return;
    		}

    		$.getJSON(baseUrl + '/weather?lat=' + data[1] + '&lon=' + data[0] + '' + varUrl())
    			.done(function(json){
    				var item = '<li class="location"><a cityid="' + json.id + '">' + json.name + '  ' + Math.round(json.main.temp) + ' ' + getUnit() +' - ' + json.weather[0].description + '</a></li>'; 
    				$('#mainList').append(item);

    				var locData = JSON.parse(window.localStorage.getItem('mainList'));
    				locData.push(item);
    				window.localStorage.setItem('mainList', JSON.stringify(locData));
    			})
    			.fail(function(jqxhr, textStatus, error ){
	    			var err = textStatus + ", " + error;
    				window.localStorage.removeItem('mainList');
    				alert('Request failed: (location) ' + err);
    			});
    	});
	}

	this.getLocations = function(){

		$.getJSON(baseUrl + '/group?id=' + locationList + '' + varUrl())
	    	.done(function(json){
	    		var items = [];
	    		var locData = JSON.parse(window.localStorage.getItem('mainList'));

	    		$.each( json.list, function(key, val) {
	    			var item = '<li><a cityid="' + val.id + '">' + val.name + '  ' + Math.round(val.main.temp) + ' ' + getUnit() +' - ' + val.weather[0].description + '</a></li>';
    				items.push(item);
    				locData.push(item);
				});

				$('#mainList').append(items);
				window.localStorage.setItem('mainList', JSON.stringify(locData));
	    	})
	    	.fail(function(jqxhr, textStatus, error ){
	    		var err = textStatus + ", " + error;
	    		alert('Request failed (cityid): ' + err)
	    		window.localStorage.removeItem('mainList');
	    	});
	}
}