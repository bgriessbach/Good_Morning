var items=[["52.075,-0.7333", "Walthamstow", "Hour_Home"], ["51.5188,0.0814","Work", "Hour_Work"], ["51.612789,-0.017634", "Chingford", "Hour_Charity"]];
var APIKEY=[KEY];

for (var i=0; i<items.length; i++){
    weather(items[i][0], APIKEY, items[i][1], items[i][2]);
}


function weather (geo, APIKEY, ID, H_ID) {
    $.getJSON(
    "https://api.darksky.net/forecast/"+APIKEY+"/"+geo+"?exclude=minutely,daily,alerts,flags&units=si",
    {},
    function(object) {
        var hour="<b>Forecast: </b>"+JSON.stringify(object.hourly.summary)+"<br>";
        var h_temp=[]
        var h_time=[]
        for (var y=0; y<object.hourly.data.length; y+=2){
            h_temp.push(JSON.stringify(object.hourly.data[y].temperature)+" \xB0"+"C");
            var convert=timeconvert(JSON.stringify(object.hourly.data[y].time));
            h_time.push(convert);
            if (h_time.length>7){
                break;
            }
            
        }
        
        var table=document.getElementById(H_ID);
        var row0= table.insertRow(0)
        var row1= table.insertRow(1)
        for (var z=0; z<h_temp.length; z++){
            var cell_t=row0.insertCell(z);
            var cell_te=row1.insertCell(z);
            cell_t.innerHTML=h_time[z];
            cell_te.innerHTML=h_temp[z];
        }

        var timestamp=timeconvert(JSON.stringify(object.currently.time));
        document.getElementById(ID).innerHTML =
'<b>Time: </b>' +timestamp+ "<br>" +
'<b>Summary: </b>' + JSON.stringify(object.currently.summary)+"<br>" +
'<b>Temperature: </b>'+ JSON.stringify(object.currently.temperature)+' \xB0'+'C'+"<br>"+hour;
}

);
}

function timeconvert(unix_timestamp){
var date = new Date(unix_timestamp*1000);
var hours = ("0"+ date.getHours()).substr(-2);
var minutes = ("0" + date.getMinutes()).substr(-2);
var seconds = ("0" + date.getSeconds()).substr(-2);
return hours + ':' + minutes+ ':' + seconds
}
