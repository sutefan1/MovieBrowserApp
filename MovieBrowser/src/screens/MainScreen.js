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

import { Heading, Title, Icon } from "@shoutem/ui";
import DiscoverMovies from "../DiscoverMovies.json";
import DiscoverTVShows from "../DiscoverTV.json";
import {
  ROOT_URL,
  TYPE_MOVIE_DISCOVER,
  TYPE_SHOW_DISCOVER,
  TYPE_GENRE_MOVIE,
  COLOR,
  KEY_EXTRACTOR,
  CAPITALIZE_FIRST_LETTER
} from "../Constants";
import * as API from "../ApiUtil";
import HorizontalList from "../components/HorizontalList";

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
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
      },
      headerRight: (
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={() => navigation.navigate("search")}
        >
          <Icon name="search" style={{ color: "white" }} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    isRefreshing: false,
    listData: []
  };

  horizontalListRefs = {};

  componentDidMount = async () => {
    const listData = [
      {
        type: TYPE_MOVIE_DISCOVER,
        title: "Discover Popular Movies",
        getRef: ref => {
          if (!this.horizontalListRefs[TYPE_MOVIE_DISCOVER] && ref) {
            this.horizontalListRefs[TYPE_MOVIE_DISCOVER] = ref;
          }
        },
        apiCall: API.DiscoverMoviesByPopularity,
        data: DiscoverMovies.results
      },
      {
        type: TYPE_SHOW_DISCOVER,
        title: "Discover Popular TVShows",
        getRef: ref => {
          if (!this.horizontalListRefs[TYPE_SHOW_DISCOVER] && ref) {
            this.horizontalListRefs[TYPE_SHOW_DISCOVER] = ref;
          }
        },
        apiCall: API.DiscoverShowsByPopularity,
        data: DiscoverTVShows.results
      }
    ];
    // try {
    //   const {
    //     status,
    //     data: { genres }
    //   } = await API.GetGenreList(true);
    //   if (status === 200) {
    //     _.forEach(genres, genre => {
    //       const entry = {
    //         type: TYPE_GENRE_MOVIE,
    //         title: "Movie Genre " + CAPITALIZE_FIRST_LETTER(genre.name),
    //         args: genre.id,
    //         getRef: ref => {
    //           if (
    //             !this.horizontalListRefs[TYPE_GENRE_MOVIE + genre.id] &&
    //             ref
    //           ) {
    //             this.horizontalListRefs[TYPE_GENRE_MOVIE + genre.id] = ref;
    //           }
    //         },
    //         apiCall: API.DiscoverMoviesByPopularity,
    //         data: []
    //       };
    //       listData.push(entry);
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    this.setState({ listData });
  };

  renderHorizontalList = item => {
    return (
      <HorizontalList
        {...item}
        ref={item.getRef}
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
    const { listData } = this.state;
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
          initialNumToRender={2}
        />
      </View>
    );
  }
}

export default MainScreen;
