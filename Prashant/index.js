

var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

const apiKey = '568a5352e301d762097e813514a2d82f'

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/', function (req, res) {
    var city = req.body.text;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city+ '&units=Metric&appid='+apiKey;

    request(url, function (err, response, body) {
        if(err){
            res.send('Error, please try again');
        } else {
            var weather = JSON.parse(body)
            if(weather.main == undefined){
                res.send('Error, please try again');
            } else {
                var weatherText = 'It is '+ weather.main.temp+' degrees in '+ weather.name;
                res.send(weatherText);
            }
        }
    });
})



var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})