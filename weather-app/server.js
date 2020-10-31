const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

const apiKey = "266162d0cd197c1e3c341f48cf5a3f43";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { weather: null, error: null });
});

app.post("/", function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "Error, please try again" });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error:"Error, NO MATCH FOUND WITH YOUR INPUT, please try again with correct name of the place!",
        });
      } else {
        let cel = ((weather.main.temp - 32) * 5) / 9; //converting into celsius!
        let weatherText = `It's ${weather.main.temp} degrees(Fahrenheit) in ${weather.name} and in "Celsius" ${cel} degrees.`;
        // let greet = "Have a Good Day";
        // Cel=(32°(weather.main.temp) − 32) × 5/9;
        res.render("index", { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(5000, function () {
  console.log("Listening on port 5000!");
});
// https://home.openweathermap.org/api_keys   -> for apikey!
