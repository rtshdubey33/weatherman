const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.get("/",function(req,res){
//  res.sendFile(__dirname+"/index.html");
//openweather api = 625879e4b4a01b1bcc90df29a2e82ce7

res.sendFile(__dirname+"/index.html");

//res.send("Server is up and running!"); Only 1 res.send allowed in one response
});

app.post("/",function(req,res){


  const query = req.body.cityName;
  const apiKey = "625879e4b4a01b1bcc90df29a2e82ce7";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      //console.log("data");//weather details received in Hexadecimal form here
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feels = weatherData.main.feels_like;
      const tempMax = weatherData.main.temp_max;
      const tempMin = weatherData.main.temp_min;
      const humid = weatherData.main.humidity;
      const visible = weatherData.visibility;
      console.log(temp);
      const desc = weatherData.weather[0].description;
      console.log(desc);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<body style='background-color: #ade498;font-family: Merriweather, serif;text-align: center;'>");
      res.write("<h1 style='text-align:center; display:block;color:#24a1ae;font-size:3rem;font-family:Merriweather, serif;margin:auto;padding:30px;'> WeatherMan!</h1>")
            res.write("<h3 style='text-align:center; color:#3282b8;font-size:1.5rem;font-family:Merriweather, serif;margin:auto;padding:20px 20px 10px;'>Current weather conditions : "+desc+"!</h3>");
            res.write("<img style='align:center' src="+ imageURL +">");
      res.write("<h3 style='text-align:center; display:block;color:#0f4c75;font-size:1.5rem;font-family:Merriweather, serif;margin:auto;padding:10px;'>Temperature in "+ query +" : "+temp+" degree Celsius</h3>");
      res.write("<h3 style='text-align:center; display:block;color:#41444b;font-size:1.5rem;font-family:Merriweather, serif;margin:auto;padding:10px;'>Feels Like : "+feels+" degree Celsius</h3>");//can have multiple res.write but only 1 res.send
    //  res.write("<h3 style='text-align:center; display:block;color:#322f3d;font-size:1.5rem;font-family:Merriweather, serif;margin:auto;padding:10px;'>Max. Temp : "+tempMax+" degree Celsius</h3>");
    //  res.write("<h3 style='text-align:center; display:block;color:#222831;font-size:1.5rem;font-family:Merriweather, serif;margin:auto;padding:10px;'>Min. Temp : "+tempMin+" degree Celsius</h3>");
      res.write("<h3 style='text-align:center; display:block;color:#41444b;font-size:1.5rem;font-family:Merriweather, serif;margin:auto;padding:10px;'>Humidity : "+humid+" %</h3>");
      res.write("<h3 style='text-align:center; display:block;color:#0f4c75;font-size:1.5rem;font-family:Merriweather, serif;margin:auto;padding:10px;'>Visibility : "+visible+" </h3>");
      //res.write();
  //    res.write("<button type='button' style='background-color:#848ccf;border:1px solid #93b5e1;display:inline-block;cursor:pointer;color:#fff;font-family:Merriweather;font-size:1.5rem;width:10%;padding:10px 5px;margin:30px;text-decoration:none;text-shadow:0px 1px 0px #2f6627;'>Go</button>");
      res.write("<footer style='font-family:Merriweather;text-align: center;font-size:1.5rem;color:#24a1ae;font-weight: bold;padding:10px 15px;margin:20px;'>--- Utility Apps by <em>Ritesh Dubey ---</em></footer>");
      res.write("</body>");
      res.send();
      //JSON converts the gibberish format received into proper JSON
      //JSON.parse converts string into JSON object on receiving from server
      //console.log(weatherData);
  /*    const obj = {
        name : "Ritesh",
        favouriteFood : "Pizza"
      }
      console.log(JSON.stringify(obj));
      //JSON.stringify converts existing JS object into string to be sent to server

    */


    })
  });
});
//weather query ; https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=625879e4b4a01b1bcc90df29a2e82ce7&units=metric

app.listen(process.env.PORT || 3000, function(){ //process is an object defined by heroku
  console.log("Server is running on port 3000");
});
