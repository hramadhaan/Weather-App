import axios from "axios";
import Weather from "../../models/Weather";

export const WEATHER_START = "WEATHER_START";
export const WEATHER_DAILY = "WEATHER_DAILY";
export const WEATHER_HOURLY = "WEATHER_HOURLY";
export const WEATHER_ERROR = "WEATHER_ERROR";

const successDaily = (payload) => {
  return (dispatch) => {
    const loadedDaily = [];
    payload.forEach((item, index) => {
      loadedDaily.push(
        new Weather(
          item.dt,
          item.humidity,
          item.wind_speed,
          item.weather,
          item.temp,
          item.feels_like
        )
      );
    });
    dispatch({
      type: WEATHER_DAILY,
      payload: loadedDaily,
    });
  };
};

const successHourly = (payload) => {
  return (dispatch) => {
    const loadedHourly = [];
    payload.forEach((item, index) => {
      loadedHourly.push(
        new Weather(
          item.dt,
          item.humidity,
          item.wind_speed,
          item.weather,
          item.temp,
          item.feels_like
        )
      );
    });
    dispatch({
      type: WEATHER_HOURLY,
      payload: loadedHourly,
    });
  };
};

export const fetchingWeather = (lat, long) => {
  return async (dispatch) => {
    dispatch({
      type: WEATHER_START,
    });

    const app_id = "248ebe1b97f14a6f16023a07b44610b2";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${app_id}`;

    try {
      const response = await axios.get(url);
      const resData = response.data;
      dispatch(successDaily(resData?.daily));
      dispatch(successHourly(resData?.hourly));
    } catch (err) {
      console.log("err: ", err);
    }
  };
};
