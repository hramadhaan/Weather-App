import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import moment from "moment";

import { WeatherIcons } from "../constants/WeatherIcons";
import { fahrenheitToCelcius } from "../utils/FahrenheitToCelcius";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");

const ItemComponentBottom = (props) => {
  const { item, index, indexPage } = props;

  return (
    <View
      style={{
        height: height * 0.2,
        width: 120,
        marginRight: 20,
        borderRadius: 30,
      }}
    >
      <LinearGradient
        colors={
          index === indexPage
            ? ["#3a7bd5", "#00d2ff"]
            : ["transparent", "transparent"]
        }
        style={{
          height: height * 0.2,
          width: 120,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "space-around",
          padding: 12,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.15)",
        }}
      >
        <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
          {fahrenheitToCelcius(item?.temp)}°C
        </Text>
        <Image
          source={WeatherIcons[item.weather?.[0]?.main].icon}
          style={{ width: 90, height: 70 }}
        />
        <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>
          {moment.unix(item?.dt).format("LT")}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ItemComponentBottom;
