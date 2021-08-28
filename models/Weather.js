class Weather {
  constructor(dt, humidity, wind_speed, weather, temp, feels_like) {
    this.dt = dt;
    this.humidity = humidity;
    this.wind_speed = wind_speed;
    this.weather = weather; //Didalemnya ada iconnya
    this.temp = temp;
    this.feels_like = feels_like;
  }
}

export default Weather;
