import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { Provider } from "react-redux";

import AppNavigation from "./navigation/AppNavigation";
// REDUX
import weatherRedux from "./store/reducers/weather";
import locationRedux from "./store/reducers/location";

export default function App() {
  const rootReducer = combineReducers({
    weather: weatherRedux,
    location: locationRedux,
  });
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </Provider>
    </>
  );
}
