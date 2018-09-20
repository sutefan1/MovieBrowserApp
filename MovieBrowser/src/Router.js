import { createStackNavigator } from "react-navigation";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "@shoutem/ui";
import MainScreen from "./screens/MainScreen";

class Router extends Component {
  render() {
    const StackNavigator = createStackNavigator(
      {
        main: {
          screen: MainScreen
        }
      },
      {}
    );
    return <StackNavigator />;
  }
}

export default Router;
