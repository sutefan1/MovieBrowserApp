import React, { Component } from "react";
import _ from "lodash";
import { TouchableOpacity, TextInput, FlatList, View } from "react-native";
import { Title, Heading } from "@shoutem/ui";
import {
  COLOR,
  TYPE_MOVIE_DISCOVER,
  KEY_EXTRACTOR,
  TYPE_SHOW_DISCOVER
} from "../Constants";
import { SearchForMovieByName, SearchForShowByName } from "../ApiUtil";
import CoverItem from "../components/CoverItem";

class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const searchText = navigation.getParam("searchText", "");
    const onChangeText = navigation.getParam("onChangeText", () => {});
    return {
      headerTitle: (
        <TextInput
          placeholder="Enter here..."
          placeholderTextColor="#ccc"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderColor: "#ccc",
            color: "white",
            fontSize: 18,
            flex: 1,
            marginHorizontal: 15
          }}
          input={searchText}
          onChangeText={onChangeText}
        />
      ),
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: COLOR.NAVBAR
      },
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.goBack()}
        >
          <Title style={{ color: "white" }}>Back</Title>
        </TouchableOpacity>
      ),
      headerLeft: null
    };
  };
  state = {
    searchText: "test",
    results: []
  };

  onChangeText = async searchText => {
    this.setState({ searchText });
    this.props.navigation.setParams({ searchText });
    if (searchText.length < 3) {
      return;
    }
    try {
      const movieResponse = await SearchForMovieByName(searchText);
      const showResponse = await SearchForShowByName(searchText);

      if (movieResponse.status === 200 && showResponse.status === 200) {
        const maxLength = _.min([
          movieResponse.data.results.length,
          showResponse.data.results.length
        ]);
        const movies = movieResponse.data.results.filter(
          (item, index) => index < maxLength
        );
        const shows = showResponse.data.results.filter(
          (item, index) => index < maxLength
        );

        const results = _.zipWith(movies, shows, (movie, show) => ({
          left: movie,
          right: show
        }));
        this.setState({
          results
        });
      }
    } catch (err) {}
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onChangeText: this.onChangeText,
      searchText: ""
    });
  }

  renderRow = ({ item: { left, right } }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <CoverItem
          item={left}
          type={TYPE_MOVIE_DISCOVER}
          navigation={this.props.navigation}
        />
        <CoverItem
          item={right}
          type={TYPE_SHOW_DISCOVER}
          navigation={this.props.navigation}
        />
      </View>
    );
  };

  renderHeaderItem = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          paddingHorizontal: 10
        }}
      >
        <Heading>Movies</Heading>
        <Heading>Shows</Heading>
      </View>
    );
  };

  render() {
    const { results } = this.state;

    return (
      <FlatList
        style={{ flex: 1, backgroundColor: COLOR.BACKGROUND }}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => this.renderHeaderItem()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={this.renderRow}
        data={results}
        initialNumToRender={2}
        keyExtractor={KEY_EXTRACTOR}
      />
    );
  }
}

export default SearchScreen;
