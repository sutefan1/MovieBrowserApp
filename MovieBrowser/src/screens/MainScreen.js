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
import * as API from "../ApiUtil";
YellowBox.ignoreWarnings(["Require cycle:"]);

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

  state = {
    discoverMovies: DiscoverMovies,
    discoverShows: DiscoverTVShows,
    isRefreshing: false
  };

  listRefs = {};

  componentDidMount = async () => {
    this.setState({ isRefreshing: true });
    try {
      const { data: discoverMovies } = await API.DiscoverMoviesByPopularity(1);
      const { data: discoverShows } = await API.DiscoverShowsByPopularity(1);

      this.setState({ discoverMovies, discoverShows });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isRefreshing: false });
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

  renderHorizontalList = ({ title, data, renderItem, getRef }) => {
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
          ref={getRef}
          keyExtractor={KEY_EXTRACTOR}
        />
      </View>
    );
  };

  renderListItem = ({ item }) => {
    return this.renderHorizontalList(item);
  };

  onRefresh = async () => {
    this.setState({ isRefreshing: true });
    try {
      const { data: discoverMovies } = await API.DiscoverMoviesByPopularity(1);
      const { data: discoverShows } = await API.DiscoverShowsByPopularity(1);

      this.setState({ discoverMovies, discoverShows });
    } catch (err) {
      console.log(err);
    } finally {
      _.forOwn(this.listRefs, function(value, key) {
        console.log(key);
        value.scrollToOffset({ animated: true, offset: 0 });
      });
      this.setState({ isRefreshing: false });
    }
  };

  render() {
    const { discoverShows, discoverMovies } = this.state;
    const listData = [
      {
        title: "Discover Movies",
        data: discoverMovies.results,
        renderItem: this.renderRowMovieItem,
        getRef: ref => {
          if (!this.listRefs[TYPE_MOVIE] && ref) {
            this.listRefs[TYPE_MOVIE] = ref;
          }
        }
      },
      {
        title: "Discover Shows",
        data: discoverShows.results,
        renderItem: this.renderRowShowItem,
        getRef: ref => {
          if (!this.listRefs[TYPE_SHOW] && ref) {
            this.listRefs[TYPE_SHOW] = ref;
          }
        }
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
          onRefresh={this.onRefresh}
          ref={ref => (this.overallListRef = ref)}
          refreshing={this.state.isRefreshing}
        />
      </View>
    );
  }
}

export default MainScreen;
