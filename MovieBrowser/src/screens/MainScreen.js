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

import { Heading } from "@shoutem/ui";
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
import HorizontalList from "../components/HorizontalList";

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
    isRefreshing: false
  };

  horizontalListRefs = {};

  componentDidMount = async () => {
    await this.onRefresh();
  };

  renderHorizontalList = ({ type, getRef }) => {
    return (
      <HorizontalList
        type={type}
        ref={getRef}
        navigation={this.props.navigation}
      />
    );
  };

  renderListItem = ({ item }) => {
    return this.renderHorizontalList(item);
  };

  onRefresh = async () => {
    this.setState({ isRefreshing: true });
    try {
      const refreshListPromises = [];
      _.forOwn(this.horizontalListRefs, function(value, key) {
        refreshListPromises.push(value.onListRefresh());
      });
      await Promise.all(refreshListPromises);
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isRefreshing: false });
    }
  };

  render() {
    const listData = [
      {
        type: TYPE_MOVIE_DISCOVER,
        getRef: ref => {
          if (!this.horizontalListRefs[TYPE_MOVIE_DISCOVER] && ref) {
            this.horizontalListRefs[TYPE_MOVIE_DISCOVER] = ref;
          }
        }
      },
      {
        type: TYPE_SHOW_DISCOVER,
        getRef: ref => {
          if (!this.horizontalListRefs[TYPE_SHOW_DISCOVER] && ref) {
            this.horizontalListRefs[TYPE_SHOW_DISCOVER] = ref;
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
