import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Linking,
  Image,
} from "react-native";
import {
  ParentViewActionBar,
  ContentList,
  GradientImageButton,
  CustomPending,
  CustomText,
  MediumButtonWhite,
  RippleEffect,
  CustomTextInput,
} from "../../common/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomCarousel } from "../../common/components";

import { headerTxt } from "./texts";
import { theme } from "../../common/constants";
import { getLesson, likeLesson } from "./actions/lessonAction";
import { getLessonData } from "../../utils/api/Url";
import CommentsScreen from "../comments/CommentsScreen";
import {
  changeCommentVisible,
  saveSelectedComment,
} from "../comments/actions/commentsAction";
import LessonButton from "./components/LessonButton";
import { sizes } from "../../common/constants/theme";
import { fontSize12 } from "../../utils/helper/responsiveSizes";
import LikeButton from "./components/LikeButton";
import LessonTopButtons from "./components/LessonTopButtons";

class LessonScreen extends React.Component {
  
  constructor(props) {
    super(props);
        this.CourseId = this.props.route.params.item.id;
        this.courseTitle = this.props.route.params.item.title;
    this.state = {
        lessonData: {
          loadig: false,
          data: { images: [], title: this.courseTitle },
        },
        likeLessonData: {
          isLike: false,
          likes: 0,
        },
        interactive: false,
        video: false,
      };
 }

 setShowReply = (value) => {
  this.props.dispatch(changeCommentVisible(value))
}


  setLessonData = (value) => {
    this.setState({ lessonData: value });
  };

  setLikeLesson = (value) => {
    this.setState({ likeLessonData: value });
  };

  componentDidMount() {
    this.callLessonData();
    // this.setState({ ...this.state, CourseId: this.props.route.params.item.id });
  }

  callLessonData = () => {
    let url = getLessonData + this.props.route.params.item.id;
    this.props.dispatch(getLesson(url, this.apiHandle));
  };

  apiHandle = (value) => {
    let lessonData = this.state.lessonData;

    if (value === "pending") {
      this.setLessonData({ ...lessonData, loading: true });
    } else if (value === "error") {
      this.setLessonData({ ...lessonData, loading: false });
    } else {
      this.setLessonData({
        ...lessonData,
        loading: false,
        data: value,
        CourseId: this.state.CourseId,
      });
      this.setLikeLesson({
        isLike: value.user_liked_lesson,
        likes: value.likes,
      });
      this.setState({
        ...this.state,
        interactive: value.interactive,
        video: value.video,
      });
    }
  };

  renderPageContent = () => {
    let interactive = this.state.interactive
    let video = this.state.video
    // //console.log('=======', likeLessonData)
    return (
        <View
            style={{ flex: 1 }}
        >

            <LessonTopButtons
                route={this.props.route}
                apiHandle={this.apiHandle}
                lessonData={this.state.lessonData}
                getLessonData={getLessonData}
                navigation={this.props.navigation}
                video={this.state.video}
                interactive={this.state.interactive} />

            <View style={{ flexDirection: 'row', padding: sizes.globalMargin }}>
                <LikeButton
                    isLike={this.state.likeLessonData.isLike}
                    likes={this.state.likeLessonData.likes}
                    lessonId={this.CourseId}
                />

                <RippleEffect onPress={() => {
                    this.setShowReply(true)
                    this.props.dispatch(saveSelectedComment(false, false))
                }}
                    style={{}}>
                    <Image
                        source={require('../../assets/comment/comment.png')}
                        style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }}
                    />
                </RippleEffect>
            </View>


        </View>
    );
};

  render() {
    return (
      <ParentViewActionBar
        // scroll
        titleColor={theme.colors.headerTitleColor}
        navigation={this.props.navigation}
        title={this.state.lessonData.data.title}
        back
      >
        {this.state.lessonData.loading == true ? (
          <CustomPending
            // style={styles.pending}
            pending={this.state.lessonData.loading}
            // pending={false}

            retryAction={() => this.callLessonData()}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <CommentsScreen
              showReply={this.props.showReply}
              setShowReply={this.setShowReply}
              headerComponent={this.renderPageContent}
              lessonId={this.CourseId}
            />
          </View>
        )}
        {/* {console.log("likeLessonData is======================::::::::", this.state.likeLessonData)} */}
      </ParentViewActionBar>
    );
  }
}

const mapStateToProps = (state) => ({
  showReply: state.commentsReducer.showReply,
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
