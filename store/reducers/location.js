import {
  LOCATION_ERROR,
  LOCATION_REVERSE,
  LOCATION_GEO,
  LOCATION_START,
} from "../actions/location";

const initialState = {
  location: null,
  reverseGeocode: null,
  loading: false,
  success: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_START:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case LOCATION_GEO:
      return {
        ...state,
        loading: false,
        success: true,
        location: action.payload,
      };
    case LOCATION_REVERSE:
      return {
        ...state,
        loading: false,
        success: true,
        reverseGeocode: action.payload,
      };
    case LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
      };
    default:
      return state;
  }
};
