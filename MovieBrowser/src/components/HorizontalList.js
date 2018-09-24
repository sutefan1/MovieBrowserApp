import React, { Component } from "react";
import _ from "lodash";
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  YellowBox
} from "react-native";
import { ImageBackground, Title, Tile, Heading } from "@shoutem/ui";
import DiscoverMovies from "../DiscoverMovies.json";
import DiscoverTVShows from "../DiscoverTV.json";
import {
  ROOT_URL,
  TYPE_MOVIE_DISCOVER,
  TYPE_SHOW_DISCOVER,
  COLOR,
  KEY_EXTRACTOR
} from "../Constants";
import * as API from "../ApiUtil";

const TYPE_TO_CONTENT_MAPPING = {
  [TYPE_MOVIE_DISCOVER]: {
    title: "Discover Popular Movies",
    apiCall: API.DiscoverMoviesByPopularity,
    data: DiscoverMovies.results
  },
  [TYPE_SHOW_DISCOVER]: {
    title: "Discover Popular TVShows",
    apiCall: API.DiscoverShowsByPopularity,
    data: DiscoverTVShows.results
  }
};

class HorizontalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...TYPE_TO_CONTENT_MAPPING[props.type],
      renderItem: ({ item }) => this.renderRowItem(item, props.type),
      apiCallPage: 1
    };
  }

  componentDidMount = async () => {
    const { apiCall, apiCallPage } = this.state;
    try {
      const {
        data: { results }
      } = await apiCall(apiCallPage);

      this.setState({ data: results, apiCallPage: apiCallPage + 1 });
    } catch (err) {}
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
  };

  onPress = (item, type) => {
    this.props.navigation.navigate("detail", { item, type });
  };

  render() {
    const { title, data, renderItem } = this.state;
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
  }
}

export default HorizontalList;
