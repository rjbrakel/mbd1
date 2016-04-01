function Detail(){


	var cityid = "";

	this.initialize = function(id){
		cityid = id.attr('cityid');

		$.getJSON(baseUrl + '/forecast?id=' + cityid + '' + varUrl())
			.done(function(json){
				$('#detail .ui-title').text(json.city.name);
				$('#mapsLink').attr('href', 'geo:' + json.city.coord.lat + ',' + json.city.coord.lon);
				$('#externLink').attr('href', 'http://openweathermap.org/city/' + json.city.id);

				$('#contentTable').html('');
				$('#contentTable').append('<tr> <td colspan="2"><b>Huidig weer - ' + json.city.name + '</b></td></tr>');
				$('#contentTable').append('<tr> <td>Temperatuur</td> <td>' + Math.round(json.list[0].main.temp) + ' ' + getUnit() + '</td></tr>');
				$('#contentTable').append('<tr> <td>Min. Temp.</td> <td>' + Math.round(json.list[0].main.temp_min) + ' ' + getUnit() + '</td></tr>');
				$('#contentTable').append('<tr> <td>Max. Temp.</td> <td>' + Math.round(json.list[0].main.temp_max) + ' ' + getUnit() + '</td></tr>');
				$('#contentTable').append('<tr class="marginBottom"> <td>Omschrijving</td> <td>' + json.list[0].weather[0].description + '</td></tr>');
				if(json.list[0].rain != null && json.list[0].rain['3h'] != null && json.list[0].rain != undefined && json.list[0].rain['3h'] != undefined){
					$('#contentTable').append('<tr> <td>Regen (3h)</td> <td>' + json.list[0].rain["3h"] + ' mm</td></tr>');
				}
				else{
					$('#contentTable').append('<tr> <td>Regen (3h)</td> <td>0 mm</td></tr>');
				}
				$('#contentTable').append('<tr> <td>Vochtigheid</td> <td>' + json.list[0].main.humidity + '%</td></tr>');
				$('#contentTable').append('<tr  class="marginBottom"> <td>Bewolktheid</td> <td>' + json.list[0].clouds.all + '%</td></tr>');

				// Forecast table
				$('#forecastTable').html('');
				$('#forecastTable').append('<div><b>Vooruitzicht per 3 uur </b></div>');

				var items = [];
				$.each(json.list, function(key, val){
					var item = '<div class="forecastItem"><span class="date">' + getFormattedDate(val.dt_txt) + '</span>';
					item += '<span class="temp">' + Math.round(val.main.temp) + ' ' + getUnit() + '</span>';

					if(val.rain != null && val.rain['3h'] != null && val.rain != undefined && val.rain['3h'] != undefined){
						item += '<span class="rain">Regen: ' + val.rain["3h"] + ' mm</span>';
					}
					else{
						item += '<span class="rain">Regen: 0 mm</span>';	
					}
					item += '<span class="description">' + val.weather[0].description + '</span>';
					item += '</div>';
					items.push(item);
				});
				$('#forecastTable').append(items);

			})
			.fail(function(err){
				$.mobile.changePage('home');
			});
	}	
}