import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";

import HeaderComponent from "../components/HeaderComponent";

// REDUX
import * as weatherActions from "../store/actions/weather";
import * as locationActions from "../store/actions/location";
import { WeatherIcons } from "../constants/WeatherIcons";
import { fahrenheitToCelcius } from "../utils/FahrenheitToCelcius";
import moment from "moment";
import "moment/locale/id";
import ItemComponentTop from "../components/ItemComponentTop";
import ItemComponentBottom from "../components/ItemComponentBottom";
import {
  Directions,
  FlingGestureHandler,
  State,
} from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";

const { height, width } = Dimensions.get("screen");

const HomePage = (props) => {
  const { top } = useSafeAreaInsets();

  const dispatch = useDispatch();

  const location = useSelector((state) => state.location);
  const weather = useSelector((state) => state.weather);

  //   console.log("Error: ", location.error);

  const topFlatlist = useRef();
  const botFlatlist = useRef();

  const [indexPage, setIndexPage] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const scrollToIndex = (index) => {
    setIndexPage(index);

    topFlatlist?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (120 + 20) - 120 / 2 > width / 2) {
      botFlatlist?.current?.scrollToOffset({
        offset: index * (120 + 20) - width / 2 + 120 / 2,
        animated: true,
      });
    } else {
      botFlatlist?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  useEffect(() => {
    setIndexPage(0);
    dispatch(locationActions.fetchingLocation());
  }, [dispatch]);

  useEffect(() => {
    if (location.success) {
      dispatch(
        weatherActions.fetchingWeather(
          location?.location?.latitude,
          location?.location?.longitude
        )
      );
    }
  }, [location?.location, dispatch]);

  return (
    <FlingGestureHandler
      key="bottom"
      direction={Directions.UP}
      onHandlerStateChange={(ev) => {
        if (
          ev.nativeEvent.state === State.END &&
          weather.daily &&
          weather.hourly
        ) {
          //   alert("Hello");
          props.navigation.navigate("DailyWeatherPage");
        }
      }}
    >
      <View style={styles.container}>
        <SharedElement id="general.container" style={styles.containerTop}>
          <View style={styles.containerTop}>
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
                style={[
                  styles.containerTop,
                  { paddingTop: Math.round(top, 16) },
                ]}
              >
                <HeaderComponent />
                {weather?.loading || location?.loading ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LottieView
                      autoPlay
                      loop
                      source={require("../assets/Lottie/loading.json")}
                      style={{ width: 400, height: 140 }}
                    />
                  </View>
                ) : weather.error || location.error ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "white",
                        alignSelf: "center",
                      }}
                    >
                      Terjadi Kesalahan di Lokasi atau Internet Anda
                    </Text>
                  </View>
                ) : (
                  <Animated.FlatList
                    ref={topFlatlist}
                    data={weather?.hourly.slice(0, 10)}
                    keyExtractor={(item) => `item-${item.dt}`}
                    horizontal
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                      { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    decelerationRate={0.2}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingTop: 20 }}
                    pagingEnabled
                    onMomentumScrollEnd={(ev) =>
                      scrollToIndex(
                        Math.floor(ev.nativeEvent.contentOffset.x / width)
                      )
                    }
                    renderItem={({ item, index }) => {
                      return (
                        <ItemComponentTop
                          item={item}
                          scrollX={scrollX}
                          index={index}
                        />
                      );
                    }}
                  />
                )}
              </LinearGradient>
            </View>
          </View>
        </SharedElement>
        {weather?.loading || location?.loading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              autoPlay
              loop
              source={require("../assets/Lottie/loading.json")}
              style={{ width: 400, height: 140 }}
            />
          </View>
        ) : (
          <FlatList
            ref={botFlatlist}
            data={weather?.hourly.slice(0, 10)}
            keyExtractor={(item) => `item-bottom-${item.dt}`}
            horizontal
            snapToInterval={120 + 20}
            scrollEventThrottle={16}
            decelerationRate={0.2}
            showsHorizontalScrollIndicator={false}
            style={{ paddingTop: 20 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => scrollToIndex(index)}>
                  <ItemComponentBottom
                    item={item}
                    index={index}
                    indexPage={indexPage}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerTop: {
    height: height * 0.75,
    borderRadius: 50,
  },
});

export default HomePage;
