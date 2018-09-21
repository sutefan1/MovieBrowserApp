import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import {
  Button,
  Icon,
  ImageBackground,
  Tile,
  Overlay,
  Title,
  Subtitle,
  Heading,
  Text,
  ListView
} from "@shoutem/ui";
import DiscoverMovies from "../DiscoverMovies.json";
import DiscoverTVShows from "../DiscoverTV.json";
import { ROOT_URL, TYPE_MOVIE, TYPE_SHOW, COLOR, SHADOW } from "../Constants";

class MainScreen extends Component {
  static navigationOptions = {
    title: "MovieBrowser",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: COLOR.NAVBAR
    }
  };

  renderRowMovie = item => {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 20, backgroundColor: COLOR.BACKGROUND }}
        onPress={() => this.onPress(item, TYPE_MOVIE)}
      >
        <ImageBackground
          style={{ width: 180, height: 250 }}
          source={{
            uri: ROOT_URL.IMAGE + item.poster_path
          }}
        >
          <Tile>
            <Title styleName="md-gutter-top">{item.title}</Title>
            <Heading>
              {item.vote_average}
              /10
            </Heading>
          </Tile>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  onPress = (item, type) => {
    this.props.navigation.navigate("detail", { item, type });
  };

  renderRowShow = item => {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 20, backgroundColor: COLOR.BACKGROUND }}
        onPress={() => this.onPress(item, TYPE_SHOW)}
      >
        <View style={[{ borderRadius: 2, border }, SHADOW]}>
          <ImageBackground
            style={{
              width: 180,
              height: 250
            }}
            source={{
              uri: ROOT_URL.IMAGE + item.poster_path
            }}
          >
            <Tile>
              <Title styleName="md-gutter-top">{item.name}</Title>
              <Heading>
                {item.vote_average}
                /10
              </Heading>
            </Tile>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.BACKGROUND }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title
            style={{ color: "white", paddingLeft: 20, paddingVertical: 10 }}
          >
            Discover Movies
          </Title>
          <ListView
            data={DiscoverMovies.results}
            renderRow={this.renderRowMovie}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Title
            style={{ color: "white", paddingLeft: 20, paddingVertical: 10 }}
          >
            Discover Shows
          </Title>
          <ListView
            data={DiscoverTVShows.results}
            renderRow={this.renderRowShow}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    );
  }
}

export default MainScreen;
