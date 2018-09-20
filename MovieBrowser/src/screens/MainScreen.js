import React, { Component } from "react";
import { Text } from "react-native";
import { Button, View, Icon } from "@shoutem/ui";

class MainScreen extends Component {
  static navigationOptions = {
    title: "MovieBrowser"
  };

  render() {
    return (
      <View styleName="horizontal flexible">
        <Button styleName="full-width">
          <Icon name="like" />
          <Text>LIKE</Text>
        </Button>
        <Button styleName="full-width">
          <Icon name="comment-full" />
          <Text>COMMENT</Text>
        </Button>
      </View>
    );
  }
}

export default MainScreen;
