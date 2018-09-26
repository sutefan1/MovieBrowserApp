import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import { ImageBackground, Title, Tile, Heading } from "@shoutem/ui";
import { ROOT_URL, TYPE_MOVIE_DISCOVER } from "../Constants";
class CoverItem extends PureComponent {
  onPress = (item, type) => {
    this.props.navigation.navigate("detail", { item, type });
  };

  render() {
    const { item, type } = this.props;
    return (
      <TouchableOpacity onPress={() => this.onPress(item, type)}>
        <ImageBackground
          style={{ width: 180, height: 250 }}
          source={{
            uri: ROOT_URL.IMAGE + item.poster_path
          }}
        >
          <Tile>
            <Title styleName="md-gutter-top">
              {type === TYPE_MOVIE_DISCOVER ? item.title : item.name}
            </Title>
            <Heading>
              {item.vote_average}
              /10
            </Heading>
          </Tile>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default CoverItem;
