import React, { Component } from "react";
// import { ScrollView, TouchableOpacity } from "react-native";
import {
  Button,
  View,
  Icon,
  ImageBackground,
  Tile,
  Overlay,
  Title,
  Subtitle,
  Heading,
  Text,
  ListView,
  ScrollView
} from "@shoutem/ui";
import DiscoverMovies from "../DiscoverMovies.json";
import DiscoverTVShows from "../DiscoverTV.json";
import { ROOT_URL, SHADOW, TYPE_MOVIE_DISCOVER } from "../Constants";

class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const { item, type } = state.params;

    return {
      title:
        type === TYPE_MOVIE_DISCOVER ? item.original_title : item.original_name
    };
  };

  render() {
    const item = this.props.navigation.getParam("item", {});
    const type = this.props.navigation.getParam("type", TYPE_MOVIE_DISCOVER);

    return (
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          styleName="large-portrait"
          source={{
            uri: ROOT_URL.IMAGE + item.poster_path
          }}
        >
          <Tile>
            <Title styleName="md-gutter-top">
              {type === TYPE_MOVIE_DISCOVER ? item.title : item.name}
            </Title>
          </Tile>
        </ImageBackground>
        <Text>
          <Text styleName="bold">Release Date: </Text>
          {type === TYPE_MOVIE_DISCOVER
            ? item.release_date
            : item.first_air_date}
        </Text>
        <Title>
          <Title styleName="bold">Overview: </Title>
          {item.overview}
        </Title>
      </ScrollView>
    );
  }
}

export default DetailScreen;
