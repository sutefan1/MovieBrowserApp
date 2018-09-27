import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import { ImageBackground, Title, Tile, Heading } from "@shoutem/ui";
import { ROOT_URL, TYPE_MOVIE_DISCOVER, SHADOW } from "../Constants";
class CoverItem extends PureComponent {
  showDetailView = (item, type) => {
    this.props.navigation.navigate("detail", { item, type });
  };

  state = { uri: { uri: ROOT_URL.IMAGE + this.props.item.poster_path } };
  onPress = () => this.showDetailView(this.props.item, this.props.type);
  render() {
    const { item, type } = this.props;
    const { uri } = this.state;
    return (
      <TouchableOpacity onPress={this.onPress} style={SHADOW}>
        <ImageBackground
          style={{
            width: 180,
            height: 250
          }}
          source={uri}
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
