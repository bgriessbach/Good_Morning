var location_data=[["52.075,-0.7333", "Home", "Hour_Home"], ["51.5188,0.0814","Work", "Hour_Work"], ["51.612789,-0.017634", "Charity", "Hour_Charity"]];
var APIKEY="5b4fe673c6e4ab2092645198014f0dff";

for (var i=0; i<location_data.length; i++){
    createWeather(location_data[i][0], APIKEY, location_data[i][1], location_data[i][2]);
}



function createWeather (geo_location, APIKEY, p_ID, table_ID) {
    $.getJSON(
    "https://api.darksky.net/forecast/"+APIKEY+"/"+geo_location+"?exclude=minutely,daily,alerts,flags&units=si",
    {},
    function(weather_data) {
        createWeatherTable(weather_data, table_ID);
        createCurrentWeather(weather_data, p_ID);
    }
    );
}


function createCurrentWeather(weather_data, p_ID){
    var hourly_summary="<b>Forecast: </b>"+'<span id='+p_ID+'forecast></span>'+"<br>";       
    var timestamp=timeconvert(JSON.stringify(weather_data.currently.time));
    document.getElementById(p_ID).innerHTML =
    '<b>Time: </b>' +timestamp+"<br>" +
    '<b>Summary: </b>' + '<span id='+p_ID+'summary></span>'+"<br>" +
    '<b>Temperature: </b>'+ '<span id='+p_ID+'temperature></span>'+' \xB0'+'C'+"<br>"+hourly_summary;
    document.getElementById(p_ID+'summary').innerText=JSON.stringify(weather_data.currently.summary);
    document.getElementById(p_ID+'temperature').innerText= JSON.stringify(weather_data.currently.temperature);
    document.getElementById(p_ID+'forecast').innerText=JSON.stringify(weather_data.hourly.summary);
}

function createWeatherTable(weather_data, table_ID){
        var weather_temperature="";
        var weather_time="";
        for (var y=0; y<weather_data.hourly.data.length; y+=2){
            weather_temperature+="<td>"+JSON.stringify(weather_data.hourly.data[y].temperature)+" \xB0"+"C"+"</td>";
            var convert=timeconvert(JSON.stringify(weather_data.hourly.data[y].time));
            weather_time+="<td>"+convert+"</td>";
            if (y>10){
                break;
            }
            
        }
        
        document.getElementById(table_ID).innerHTML=
        "<tr><td><b>Time</b></td>"+weather_time+
        "<tr><td><b>Temperature</b></td>"+weather_temperature;

}

function timeconvert(unix_timestamp){
    var date = new Date(unix_timestamp*1000);
    var hours = ("0"+ date.getHours()).substr(-2);
    var minutes = ("0" + date.getMinutes()).substr(-2);
    return hours + ':' + minutes
}
