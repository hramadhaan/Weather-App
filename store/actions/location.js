import * as Location from "expo-location";
import * as Permission from "expo-permissions";

export const LOCATION_START = "LOCATION_START";
export const LOCATION_GEO = "LOCATION_GEO";
export const LOCATION_REVERSE = "LOCATION_REVERSE";
export const LOCATION_ERROR = "LOCATION_ERROR";

export const fetchingLocation = () => {
  return async (dispatch) => {
    dispatch({
      type: LOCATION_START,
    });

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        dispatch({ type: LOCATION_ERROR, error: "Permission not granted!" });
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();

      dispatch({
        type: LOCATION_GEO,
        payload: coords,
      });

      if (coords) {
        const { latitude, longitude } = coords;
        const responseReverse = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        dispatch({
          type: LOCATION_REVERSE,
          payload: responseReverse,
        });
      }
    } catch (err) {
      console.log("Err: ", err);
      dispatch({
        type: LOCATION_ERROR,
        error: err,
      });
    }
  };
};
