import React, { Component } from "react";
import _ from "lodash";
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  YellowBox,
  Image
} from "react-native";
import { ImageBackground, Title, Tile, Heading, Spinner } from "@shoutem/ui";
import DiscoverMovies from "../DiscoverMovies.json";
import DiscoverTVShows from "../DiscoverTV.json";
import {
  ROOT_URL,
  TYPE_MOVIE_DISCOVER,
  TYPE_SHOW_DISCOVER,
  COLOR,
  KEY_EXTRACTOR
} from "../Constants";
import PlusSign from "../../assets/plus.png";
import CoverItem from "../components/CoverItem";
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
      actualApiCallPage: 1,
      isFetchingData: false
    };
  }

  onListRefresh = () => {
    new Promise(async (resolve, reject) => {
      const { apiCall } = this.state;
      try {
        const { status, data } = await apiCall(1);
        if (status === 200) {
          const { results } = data;
          this.listRef.scrollToOffset({ animated: true, offset: 0 });
          this.setState({ data: results, actualApiCallPage: 1 });
          resolve();
        } else {
          reject(status);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  fetchNewData = async () => {
    this.setState({ isFetchingData: true });
    const { apiCall, actualApiCallPage } = this.state;
    try {
      const newActualApiCallPage = actualApiCallPage + 1;
      const { status, data } = await apiCall(newActualApiCallPage);
      if (status === 200) {
        const { results } = data;
        this.setState({
          data: _.concat(this.state.data, results),
          actualApiCallPage: newActualApiCallPage
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isFetchingData: false });
    }
  };

  onEndReached = async () => {
    await this.fetchNewData();
  };

  renderRowItem = (item, type) => {
    return (
      <CoverItem item={item} type={type} navigation={this.props.navigation} />
    );
  };

  renderFooterItem = isFetchingData => {
    return (
      <View
        style={{
          width: 180,
          height: 250,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {isFetchingData ? (
          <Spinner style={{ size: "large" }} />
        ) : (
          <TouchableOpacity onPress={() => this.fetchNewData()}>
            <Image
              style={{ width: 180, height: 250, resizeMode: "center" }}
              source={PlusSign}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render() {
    const { title, data, renderItem, isFetchingData } = this.state;
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
          ListFooterComponent={() => this.renderFooterItem(isFetchingData)}
          data={data}
          renderItem={renderItem}
          horizontal
          ref={ref => (this.listRef = ref)}
          showsHorizontalScrollIndicator={false}
          keyExtractor={KEY_EXTRACTOR}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }
}

export default HorizontalList;
