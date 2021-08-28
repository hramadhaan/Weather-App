import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";

// REDUX
import * as locationActions from "../store/actions/location";
import * as weatherActions from "../store/actions/weather";

const HeaderComponent = (props) => {
  const { back, navigation } = props;

  const location = useSelector((state) => state.location);

  const dispatch = useDispatch();

  const getLocation = useCallback(() => {
    dispatch(locationActions.fetchingLocation());
  }, []);

  const updateData = () => {
    getLocation();
    dispatch(
      weatherActions.fetchingWeather(
        location?.location?.latitude,
        location?.location?.longitude
      )
    );
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        {back ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="grid-outline" size={25} color="white" />
        )}
        {location.loading ? (
          <View>
            <LottieView
              autoPlay
              loop
              source={require("../assets/Lottie/loading.json")}
              style={{ width: 200, height: 70 }}
            />
          </View>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {location?.reverseGeocode?.[0]?.city ?? "Unknown"}
          </Text>
        )}
        <Ionicons name="ellipsis-vertical" size={25} color="white" />
      </View>
      {(!back && !location.loading) && (
        <TouchableOpacity
          onPress={() => updateData()}
          style={{
            alignSelf: "center",
            paddingVertical: 4,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 12, color: "white" }}>
            Refresh
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default HeaderComponent;
