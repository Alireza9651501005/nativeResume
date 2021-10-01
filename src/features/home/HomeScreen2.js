import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SectionList,
  Animated,
  RefreshControl,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";

import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  ParentViewActionBar,
  ContentList,
  GradientImageButton,
  CustomPending,
  CustomText,
  CustomCarousel, HorizontalList
} from "../../common/components";
import { theme, strings } from "../../common/constants";
import { homeRequest } from "./action/HomeAction";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserInfo from "./components/UserInfo";
import HomeHeader from "./components/HomeHeader";
import StickyHeader from "react-native-stickyheader";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollY: new Animated.Value(0) };
    this.data = [];
    for (let index = 0; index < 100; index++) {
      this.data.push(index);
    }
  }

  list = (row, i) => {
    if (row.items ? row.items.length > 0 : false)
      switch (row.type) {
        case "banner":
          return (
            <CustomCarousel
              key={i.toString()}
              v_padding={row.v_padding}
              h_padding={row.h_padding}
              full={row.full}
              height={row.height}
              data={row.items}
            />
          ); //SnapCarousel
        case "item-list":
          return (
            <HorizontalList
              key={i.toString()}
              itemLayout={row.item_layout}
              btnTitle={row.button_title}
              title={row.title}
              data={row.items}
              buttonAction={row.button_action}
            />
          );
      }
  };
  componentDidMount() {
    !this.props.logoutMode ? this.props.homeRequest() : null;
  }
  render() {
    const {
      failed,
      pending,
      contents,
      tokenData,
      homeRequest,
      data,
    } = this.props;
    return (
      <ParentViewActionBar
        style={{ backgroundColor: theme.colors.bgGray }}
        // onPullDown={()=>homeRequest}
        // scroll
        navigation={this.props.navigation}
        menu
      >
        <View style={styles.container}>
          <Animated.ScrollView
            refreshControl={
              this.props.homeRequest ? (
                <RefreshControl refreshing={false} onRefresh={() => this.props.homeRequest()} />
              ) : null
            }
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: this.state.scrollY } },
                },
              ],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={1}
          >
            {/* <StickyHeader
              stickyHeaderY={200}
              stickyScrollY={this.state.scrollY}
            >
              {failed == true || pending == true ? (
                <CustomPending
                  style={styles.pending}
                  pending={pending}
                  retryAction={() => this.props.homeRequest()}
                />
              ) : data.user ? (
                <UserInfo userInfo={data.user} />
              ) : (
                <HomeHeader navigation={this.props.navigation} />
              )}
            </StickyHeader> */}
              {data.user ? 
              <StickyHeader
              stickyHeaderY={wp(59.6)}
              stickyScrollY={this.state.scrollY}
            >
              {failed == true || pending == true ? (
                <CustomPending
                  style={styles.pending}
                  pending={pending}
                  retryAction={() => this.props.homeRequest()}
                />
              ) : data.user ? (
                <UserInfo userInfo={data.user} />
              ) : (
                null
              )}
            </StickyHeader> : 
            <HomeHeader navigation={this.props.navigation} />
            
            }
            {contents && contents.length > 0
              ? contents.map((row, i) => this.list(row, i))
              : null}

          <View style={{ height: wp(20) }} />
          </Animated.ScrollView>
        </View>
      </ParentViewActionBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  pending: {
    position: "relative",
    marginTop: wp(40),
  },
});

const mapStateToProps = (state) => ({
  pending: state.home.homePending,
  failed: state.home.failed,
  contents: state.home.contents,
  tokenData: state.authenticationReducer.tokensData,
  data: state.home.data,
  logoutMode: state.profileReducer.logOutMode,
});

const mapDispatchToProps = {
  homeRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
