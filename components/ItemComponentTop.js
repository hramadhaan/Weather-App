import React from "react";
import { View, Text, Dimensions, Image, Animated } from "react-native";
import moment from "moment";
import "moment/locale/id";
import { Feather, Ionicons } from "@expo/vector-icons";

import { WeatherIcons } from "../constants/WeatherIcons";
import { fahrenheitToCelcius } from "../utils/FahrenheitToCelcius";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("screen");

const WIDTH_CARD = width;
const HEIGHT_CARD = height * 0.55 - 20;

const ItemComponentTop = (props) => {
  const { item, scrollX, index } = props;

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-20, 0, 50],
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [70, 0, 70],
  });

  const translateXDown = scrollX.interpolate({
    inputRange,
    outputRange: [-50, 0, 50],
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <View
      style={{
        height: HEIGHT_CARD,
        width: WIDTH_CARD,
        alignItems: "center",
      }}
    >
      <Animated.Image
        style={{
          width: 300,
          height: 200,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.78,
          transform: [{ scale }, { translateX }],
        }}
        source={WeatherIcons[item.weather?.[0]?.main].icon}
      />
      <Animated.Text
        style={{
          fontWeight: "bold",
          marginTop: 8,
          fontSize: 60,
          color: "white",
          opacity,
          transform: [{ translateX }],
        }}
      >
        {fahrenheitToCelcius(item?.temp)}°C
      </Animated.Text>
      <Animated.Text
        style={{
          fontSize: 32,
          color: "white",
          textTransform: "capitalize",
          marginTop: 8,
          fontWeight: "700",
          opacity,
          transform: [{ translateX: translateXDown }],
        }}
      >
        {item?.weather?.[0]?.description}
      </Animated.Text>
      <Animated.Text
        style={{ fontSize: 13, color: "white", marginTop: 8, opacity }}
      >
        {moment.unix(item?.dt).format("LLL").replace(" pukul ", " ")} WIB
      </Animated.Text>
      <View
        style={{
          width: width,
          height: 90,
          marginTop: 18,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Animated.View
          style={{
            alignItems: "center",
            transform: [{ translateY }, { scale }],
            opacity,
          }}
        >
          <Feather name="cloud" size={22} color="white" />
          <Text style={{ color: "white", marginTop: 6, fontWeight: "700" }}>
            {fahrenheitToCelcius(item?.feels_like)}°C
          </Text>
          <Text style={{ color: "white" }}>Feels Like</Text>
        </Animated.View>
        <Animated.View
          style={{
            alignItems: "center",
            transform: [{ translateY }, { scale }],
            opacity,
          }}
        >
          <Feather name="wind" size={22} color="white" />
          <Text style={{ color: "white", marginTop: 6, fontWeight: "700" }}>
            {item?.wind_speed}m/s
          </Text>
          <Text style={{ color: "white" }}>Wind Speed</Text>
        </Animated.View>
        <Animated.View
          style={{
            alignItems: "center",
            transform: [{ translateY }, { scale }],
            opacity,
          }}
        >
          <Ionicons name="water-outline" size={22} color="white" />
          <Text style={{ color: "white", marginTop: 6, fontWeight: "700" }}>
            {item?.humidity}%
          </Text>
          <Text style={{ color: "white" }}>Humidity</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default ItemComponentTop;
