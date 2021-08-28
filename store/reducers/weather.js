import {
  WEATHER_DAILY,
  WEATHER_START,
  WEATHER_ERROR,
  WEATHER_HOURLY,
} from "../actions/weather";

const INITIAL_STATE = {
  daily: [],
  hourly: [],
  loading: false,
  error: false,
  success: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WEATHER_START:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case WEATHER_DAILY: {
      return {
        ...state,
        loading: false,
        success: true,
        daily: action.payload,
      };
    }
    case WEATHER_HOURLY: {
      return {
        ...state,
        loading: false,
        success: true,
        hourly: action.payload,
      };
    }
    case WEATHER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
