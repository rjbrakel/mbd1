function Location(){

	var callback = null;
	var lon = 0;
	var lat = 0;

	var onSuccess = function(position) {
		lon = position.coords.longitude;
		lat = position.coords.latitude;

		$.getJSON(baseUrl + '/forecast?lat=' + lat + '&lon=' + lon + '' + varUrl())
			.done(function(json){
				if(json.list[0].rain != null && json.list[0].rain['3h'] != null && json.list[0].rain != undefined && json.list[0].rain['3h'] != undefined)
				{
					if(parseFloat(json.list[0].rain['3h']) > 0){
						callback(null, [lon, lat], json.list[0].rain['3h']);
					}
					else{
						callback(null, [lon, lat], 0);
					}
				}
				else{
					callback(null, [lon, lat], 0);
				}
			})
			.fail(function(){
				callback(null, [lon, lat], 0);
			});
	};
	
	function onError(err) {
		window.localStorage.removeItem('mainList');
		alert('Foutje in location.js: ' + err);
		callback(err, null, 0);
	}
	
	this.get = function(cb){
		callback = cb;
		var options = { enableHighAccuracy: true };
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	}
}
