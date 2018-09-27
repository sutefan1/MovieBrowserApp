import React, { PureComponent } from "react";
import _ from "lodash";
import { View, TouchableOpacity, FlatList, Image } from "react-native";
import { Title, Spinner } from "@shoutem/ui";
import { KEY_EXTRACTOR } from "../Constants";
import PlusSign from "../../assets/plus.png";
import CoverItem from "../components/CoverItem";

class HorizontalList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      renderItem: ({ item }) => this.renderRowItem(item, props.type),
      actualApiCallPage: 1,
      isFetchingData: false
    };
  }

  componentDidMount() {
    this.onListRefresh();
  }

  onListRefresh = () => {
    new Promise(async (resolve, reject) => {
      const { apiCall, args } = this.state;
      try {
        const { status, data } = await apiCall(1, args);
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
    const { apiCall, args, actualApiCallPage } = this.state;
    try {
      const newActualApiCallPage = actualApiCallPage + 1;
      const { status, data } = await apiCall(newActualApiCallPage, args);
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

  renderFooterItem = () => {
    const { isFetchingData } = this.state;
    return (
      <View style={styles.footerItemViewStyle}>
        {isFetchingData ? (
          <Spinner style={styles.footerItemSpinnerStyle} />
        ) : (
          <TouchableOpacity onPress={this.fetchNewData}>
            <Image style={styles.footerItemImageStyle} source={PlusSign} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  getItemLayout = (data, index) => {
    return { length: 180, offset: (180 + 10) * index, index: index };
  };

  renderItemSeparator = () => <View style={{ width: 10, height: 250 }} />;

  getRef = ref => (this.listRef = ref);
  render() {
    const { title, data, renderItem } = this.state;
    return (
      <View style={styles.viewStyle}>
        <Title style={styles.titleStyle}>{title}</Title>
        <FlatList
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
          ItemSeparatorComponent={this.renderItemSeparator}
          ListFooterComponent={this.renderFooterItem}
          data={data}
          renderItem={renderItem}
          horizontal
          ref={this.getRef}
          showsHorizontalScrollIndicator={false}
          keyExtractor={KEY_EXTRACTOR}
          onEndReached={this.onEndReached}
          getItemLayout={this.getItemLayout}
        />
      </View>
    );
  }
}

const styles = {
  listStyle: { height: 250 },
  listContainerStyle: { paddingHorizontal: 20 },
  viewStyle: { height: 300 },
  titleStyle: {
    color: "white",
    paddingLeft: 20,
    paddingVertical: 10
  },
  footerItemViewStyle: {
    width: 180,
    height: 250,
    alignItems: "center",
    justifyContent: "center"
  },
  footerItemSpinnerStyle: {
    size: "large"
  },
  footerItemImageStyle: { width: 180, height: 250, resizeMode: "center" }
};
export default HorizontalList;
