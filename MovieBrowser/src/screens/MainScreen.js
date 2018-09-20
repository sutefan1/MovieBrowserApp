import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "@shoutem/ui";

class MainScreen extends Component {
  static navigationOptions = {
    title: "MovieBrowser"
  };

  render() {
    return (
      <View>
        <Text>MainScreen</Text>
      </View>
    );
  }
}

export default MainScreen;
