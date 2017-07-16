var items=[["52.075,-0.7333", "Walthamstow"], ["51.5188,0.0814","Work"], ["51.612789,-0.017634", "Chingford"]];
var APIKEY=[KEY];

for (var i=0; i<items.length; i++){
    weather(items[i][0], APIKEY, items[i][1]);
}


function weather (geo, APIKEY, ID) {
    $.getJSON(
    "https://api.darksky.net/forecast/"+APIKEY+"/"+geo+"?exclude=minutely,daily,alerts,flags&units=si",
    {},
    function(object) {
        var hour="<b>Forecast: </b>"+JSON.stringify(object.hourly.summary)+"<br>";
        for (var y=0; y<object.hourly.data.length; y+=4){
            if (y+4<object.hourly.data.length){
                hour+=JSON.stringify(object.hourly.data[y].temperature)+" \xB0"+"C"+" ,";}
            else{
                hour+=JSON.stringify(object.hourly.data[y].temperature)+" \xB0"+"C";
            }    
        }

        document.getElementById(ID).innerHTML =
'<b>Time: </b>' + JSON.stringify(object.currently.time)+ "<br>" +
'<b>Summary: </b>' + JSON.stringify(object.currently.summary)+"<br>" +
'<b>Temperature: </b>'+ JSON.stringify(object.currently.temperature)+' \xB0'+'C'+"<br>"+hour;
}

);
}
