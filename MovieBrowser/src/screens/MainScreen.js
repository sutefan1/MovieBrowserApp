import React, { Component } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform
} from "react-native";
import { ImageBackground, Tile, Title, Heading } from "@shoutem/ui";
import DiscoverMovies from "../DiscoverMovies.json";
import DiscoverTVShows from "../DiscoverTV.json";
import {
  ROOT_URL,
  TYPE_MOVIE,
  TYPE_SHOW,
  COLOR,
  KEY_EXTRACTOR
} from "../Constants";

class MainScreen extends Component {
  static navigationOptions = {
    headerTitle:
      Platform.OS === "android" ? (
        <Heading
          style={{ color: "white", paddingLeft: 20, paddingVertical: 10 }}
        >
          MovieBrowser
        </Heading>
      ) : (
        <Heading style={{ color: "white" }}>MovieBrowser</Heading>
      ),
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: COLOR.NAVBAR
    }
  };

  renderRowItem = (item, type) => {
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
              {type === TYPE_MOVIE ? item.title : item.name}
            </Title>
            <Heading>
              {item.vote_average}
              /10
            </Heading>
          </Tile>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  renderRowMovieItem = ({ item }) => {
    return this.renderRowItem(item, TYPE_MOVIE);
  };

  onPress = (item, type) => {
    this.props.navigation.navigate("detail", { item, type });
  };

  renderRowShowItem = ({ item }) => {
    return this.renderRowItem(item, TYPE_SHOW);
  };

  renderHorizontalList = ({ title, data, renderItem }) => {
    return (
      <View>
        <Title style={{ color: "white", paddingLeft: 20, paddingVertical: 10 }}>
          {title}
        </Title>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => (
            <View style={{ width: 10, height: 250 }} />
          )}
          data={data}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={KEY_EXTRACTOR}
        />
      </View>
    );
  };

  renderListItem = ({ item }) => {
    return this.renderHorizontalList(item);
  };

  render() {
    const listData = [
      {
        title: "Discover Movies",
        data: DiscoverMovies.results,
        renderItem: this.renderRowMovieItem
      },
      {
        title: "Discover Shows",
        data: DiscoverTVShows.results,
        renderItem: this.renderRowShowItem
      }
    ];
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.BACKGROUND }}>
        <StatusBar backgroundColor="#111" />
        <FlatList
          data={listData}
          renderItem={this.renderListItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={KEY_EXTRACTOR}
        />
      </View>
    );
  }
}

export default MainScreen;
