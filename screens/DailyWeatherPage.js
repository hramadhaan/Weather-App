import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Animated,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Directions,
  FlingGestureHandler,
  State,
} from "react-native-gesture-handler";
import HeaderComponent from "../components/HeaderComponent";
import { useSelector } from "react-redux";
import { WeatherIcons } from "../constants/WeatherIcons";
import { fahrenheitToCelcius } from "../utils/FahrenheitToCelcius";
import moment from "moment";

const { width, height } = Dimensions.get("screen");

const DailyWeatherPage = (props) => {
  const { top } = useSafeAreaInsets();
  const weather = useSelector((state) => state.weather);

  const items = weather?.daily?.[0] ?? {};

  console.log("Items: ", items);
  return (
    <FlingGestureHandler
      key="bottom"
      direction={Directions.DOWN}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          props.navigation.goBack();
        }
      }}
    >
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <SharedElement style={styles.containerTop} id="general.container">
          <View
            style={[
              styles.containerTop,
              {
                shadowColor: "#3a7bd5",
                shadowOffset: {
                  width: 2,
                  height: 12,
                },
                shadowOpacity: 0.75,
                shadowRadius: 14.78,
                elevation: 22,
              },
            ]}
          >
            <LinearGradient
              colors={["#00d2ff", "#3a7bd5"]}
              style={[styles.containerTop, { paddingTop: Math.round(top, 16) }]}
            >
              <HeaderComponent back navigation={props.navigation} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Image
                  source={WeatherIcons[items.weather?.[0]?.main].icon}
                  style={{ width: 140, height: 120 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 28,
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: "bold",
                    }}
                  >
                    Today
                  </Text>
                  <Text
                    style={{ fontSize: 50, color: "white", fontWeight: "bold" }}
                  >
                    {fahrenheitToCelcius(items.temp.day)}°C
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      textTransform: "capitalize",
                      fontWeight: "700",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {items.weather?.[0]?.description}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: width,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginTop: 25,
                }}
              >
                <Animated.View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Feather name="cloud" size={22} color="white" />
                  <Text
                    style={{ color: "white", marginTop: 6, fontWeight: "700" }}
                  >
                    {fahrenheitToCelcius(items?.feels_like?.day)}°C
                  </Text>
                  <Text style={{ color: "white" }}>Feels Like</Text>
                </Animated.View>
                <Animated.View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Feather name="wind" size={22} color="white" />
                  <Text
                    style={{ color: "white", marginTop: 6, fontWeight: "700" }}
                  >
                    {items?.wind_speed}m/s
                  </Text>
                  <Text style={{ color: "white" }}>Wind Speed</Text>
                </Animated.View>
                <Animated.View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="water-outline" size={22} color="white" />
                  <Text
                    style={{ color: "white", marginTop: 6, fontWeight: "700" }}
                  >
                    {items?.humidity}%
                  </Text>
                  <Text style={{ color: "white" }}>Humidity</Text>
                </Animated.View>
              </View>
            </LinearGradient>
          </View>
        </SharedElement>
        <FlatList
          data={weather?.daily.slice(1, 8)}
          keyExtractor={(item) => `item-daily-${item.dt}`}
          style={{ marginTop: 20 }}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 20 }} />;
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 22,
                  height: 50,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {moment.unix(item.dt).format("dddd")}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={WeatherIcons[item.weather?.[0]?.main].icon}
                    style={{ height: 40, width: 40 }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 16,
                      textTransform: "capitalize",
                    }}
                  >
                    {item.weather?.[0]?.description}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 16,
                      textTransform: "capitalize",
                    }}
                  >
                    {fahrenheitToCelcius(item.temp.day)}°/
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: "bold",
                      fontSize: 16,
                      textTransform: "capitalize",
                    }}
                  >
                    {fahrenheitToCelcius(item.feels_like.day)}°
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </FlingGestureHandler>
  );
};

// DailyWeatherPage.sharedElements = (route, otherRoute, showing) => {
//   return [{ id: "general.container" }];
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerTop: {
    height: height * 0.4,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    overflow: "hidden",
  },
});

export default DailyWeatherPage;
