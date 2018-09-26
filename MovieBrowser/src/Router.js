import { createStackNavigator } from "react-navigation";
import React, { Component } from "react";
import MainScreen from "./screens/MainScreen";
import DetailScreen from "./screens/DetailScreen";
import SearchScreen from "./screens/SearchScreen";

class Router extends Component {
  render() {
    const StackNavigator = createStackNavigator(
      {
        main: {
          screen: MainScreen
        },
        detail: {
          screen: DetailScreen
        },
        search: {
          screen: SearchScreen
        }
      },
      {}
    );
    return <StackNavigator />;
  }
}

export default Router;
