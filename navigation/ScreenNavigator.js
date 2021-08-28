import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import DailyWeatherPage from "../screens/DailyWeatherPage";
import HomePage from "../screens/HomePage";

const RootNavigator = createSharedElementStackNavigator();

export const RootStackNavigator = () => {
  return (
    <RootNavigator.Navigator
      headerMode="none"
      initialRouteName="HomePage"
      screenOptions={() => ({
        gestureEnabled: false,
        transitionSpec: {
          open: { animation: "timing", config: { duration: 350 } },
          close: { animation: "timing", config: { duration: 350 } },
        },
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      })}
    >
      <RootNavigator.Screen name="HomePage" component={HomePage} />
      <RootNavigator.Screen
        name="DailyWeatherPage"
        component={DailyWeatherPage}
      />
    </RootNavigator.Navigator>
  );
};
