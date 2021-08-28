import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootStackNavigator } from "./ScreenNavigator";

const AppNavigation = (props) => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
