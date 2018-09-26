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
  Text,
  ListView,
  ScrollView
} from "@shoutem/ui";
import { ROOT_URL, SHADOW, TYPE_MOVIE_DISCOVER } from "../Constants";
import { GetGenreNameById } from "../ApiUtil";

class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const { item, type } = state.params;

    return {
      title:
        type === TYPE_MOVIE_DISCOVER ? item.original_title : item.original_name
    };
  };

  state = {
    genres: [],
    item: this.props.navigation.getParam("item", {}),
    type: this.props.navigation.getParam("type", TYPE_MOVIE_DISCOVER)
  };

  async componentDidMount() {
    const {
      item: { genre_ids },
      type
    } = this.state;
    const isMovie = type === TYPE_MOVIE_DISCOVER;
    try {
      let genres = await Promise.all(
        genre_ids.map(id => GetGenreNameById(id, isMovie))
      );
      console.log(genres);
      this.setState({ genres });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { item, type, genres } = this.state;
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
        <Text>
          <Text styleName="bold">Genres: </Text>
          {genres.map(genre => (
            <Text key={genre}>{genre}, </Text>
          ))}
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
