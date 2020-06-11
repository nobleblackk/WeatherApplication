const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=43ba7674217d536d1aff4562c9492ab2&units=metric";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.cod) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily[0].weather[0].description +
          " It is currently " +
          body.current.temp +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
