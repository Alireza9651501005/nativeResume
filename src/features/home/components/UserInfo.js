import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  DeviceEventEmitter,
  BackHandler,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'
import {
  CustomText,
  RatingStars,
  RippleEffect,
} from "../../../common/components";
import { theme } from "../../../common/constants";
import {
  font16,
  fontSize14,
  fontSize16,
} from "../../../utils/helper/responsiveSizes";
import { changeRankType } from "../../userLeaderBoard/actions/userLeaderBoardAction";
import { monthlyEnText, yearlyEnText } from "../../userLeaderBoard/texts";
import * as NavigationService from "../../../utils/NavigationService";
import { useSelector, useDispatch } from "react-redux";
import ScoreButton from "./ScoreButton";
import RankingButton from "./RaninkgButton";
import {
  montlyRankGuidDescription,
  montlyRankGuidTitle,
  networkingGuidDescription,
  networkingGuidTitle,
  scientificGuidDescription,
  scientificGuidTitle,
  yearlyRankGuidDescription,
  yearlyRankGuidTitle,
} from "../texts";
import { changeHomeAppTour } from "../../../store/globalActions";
import { store } from "../../../store/store";
import HomeStickyHeader from "./HomeStickyHeader";
const UserInfo = ({ userInfo, navigation }) => {
  let info = userInfo.info,
    profileData,
    yearlyRank,
    monthlyRank,
    networkScores,
    scientificScores,
    profileReducer,
    starCount,
    profileReducerV;
  // const [showView, setShowView] = useState(true)
  // const [isFocus, setIsFocus] = useState(false)
  let appTourTargets = [];
  const dispatch = useDispatch();
  const states = useSelector((state) => state);
  let sequenceStepListener = null;
  let finishSequenceListener = null;
  let homeAppTour = states.globalReducer.homeAppTour;
  let currentRouteName = states.globalReducer.currentRouteName;

  profileReducerV = states.profileReducer;
  yearlyRank = profileReducerV.yearlyRank;
  monthlyRank = profileReducerV.monthlyRank;
  networkScores = profileReducerV.networkScores;
  scientificScores = profileReducerV.scientificScores;
  starCount = profileReducerV.starCount;
  profileData = profileReducerV.profileData;
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={[
          styles.container,
          Platform.OS === "ios" ? { height: hp(25) } : null,
        ]}
      >
        <View style={styles.row1}>
          <CustomText style={{ color: theme.colors.white }}>
            {info.title.replace("@username", profileData.username)}
          </CustomText>
        </View>

        <View style={styles.row2}>
          <View style={styles.row2Right}>
            <ScoreButton
              addAppTourTarget={(appTourTarget) => {
                appTourTargets.push(appTourTarget);
              }}
              tourProps={{
                order: 1,
                title: networkingGuidTitle,
                description: networkingGuidDescription,
                outerCircleColor: "#3f52ae",
                descriptionTextSize: fontSize14,
                titleTextSize: fontSize16,
                titleTextAlignment: "Right",
                targetCircleColor: "#00000000",
                descriptionTextAlignment: "Right",
                // targetRadius:5,
                // cancelable: false,
                // backgroundPromptColor:'#f00'
              }}
              score={networkScores}
              key={"NetWork"}
              title={"شبکه سازی"}
              onPress={() => NavigationService.navigate("NetworkingScreen")}
            />
          </View>

          <View style={styles.row2Center}>
            <RippleEffect
              rippleSize={hp(0.1)}
              onPress={() => NavigationService.navigate("ProfileScreen")}
              style={styles.profileImageWrapper}
            >
              <Image
                source={
                  profileData
                    ? { uri: profileData.image }
                    : require("../../../assets/profile.png")
                }
                style={styles.profileImage}
              />
            </RippleEffect>
          </View>

          <View style={styles.row2Left}>
            <ScoreButton
              addAppTourTarget={(appTourTarget) => {
                appTourTargets.push(appTourTarget);
              }}
              tourProps={{
                order: 2,
                title: scientificGuidTitle,
                description: scientificGuidDescription,
                outerCircleColor: "#3f52ae",
                // cancelable: false,
                descriptionTextSize: fontSize14,
                titleTextSize: fontSize16,
                titleTextAlignment: "Right",
                targetCircleColor: "#00000000",
                descriptionTextAlignment: "Right",
              }}
              score={scientificScores}
              key={"Scientific"}
              title={"مهارت علمی"}
              onPress={() =>
                NavigationService.navigate("userGainHistoryScreen")
              }
            />
          </View>
        </View>

        <View style={styles.row3}>
          <RatingStars type={"profile"} rate={starCount} />
        </View>

        <View style={styles.row4}>
          <RankingButton
            key={"Yearly Rank"}
            onPress={() => {
              dispatch(changeRankType(yearlyEnText));
              NavigationService.navigate("UserLeaderBoardScreen");
              // dispatch(updateFcmTokenRequest(store.getState().globalReducer.fbToken))
            }}
            rank={yearlyRank}
            addAppTourTarget={(appTourTarget) => {
              appTourTargets.push(appTourTarget);
            }}
            direction={"right"}
            title={"رتبه سالانه"}
            tourProps={{
              order: 3,
              title: yearlyRankGuidTitle,
              description: yearlyRankGuidDescription,
              outerCircleColor: "#3f52ae",
              // cancelable: false,
              descriptionTextSize: fontSize14,
              titleTextSize: fontSize16,
              titleTextAlignment: "right",
              descriptionTextAlignment: "right",
              targetCircleColor: "#00000000",
            }}
          />
          <View style={styles.row4Separator} />
          <RankingButton
            key={"Monthly Rank"}
            onPress={() => {
              dispatch(changeRankType(monthlyEnText));
              NavigationService.navigate("UserLeaderBoardScreen");
            }}
            rank={monthlyRank}
            addAppTourTarget={(appTourTarget) => {
              appTourTargets.push(appTourTarget);
            }}
            direction={"left"}
            title={"رتبه ماهانه"}
            tourProps={{
              order: 4,
              title: montlyRankGuidTitle,
              description: montlyRankGuidDescription,
              outerCircleColor: "#3f52ae",
              // cancelable: false,
              descriptionTextSize: fontSize14,
              descriptionTextAlignment: "Right",
              titleTextSize: fontSize16,
              titleTextAlignment: "Right",
              targetCircleColor: "#00000000",
            }}
          />
        </View>
        {/* {Platform.OS === "ios" ? <HomeStickyHeader /> : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: wp(12),
    backgroundColor: theme.colors.darkBlue,
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    // borderBottomStartRadius: wp(5),
    // marginTop: wp(4),
    width: wp(100),
    height: hp(40),
  },
  row1: {
    marginBottom: hp(2),
  },
  row2: {
    width: wp(80),
    alignSelf: "center",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around",
  },
  row3: {
    marginTop: Platform.OS === "ios" ? wp(7) : wp(9),
    marginBottom: hp(.5),
  },
  row4: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: hp(2),
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    resizeMode: "cover",
    borderRadius: wp(3),
  },
  profileImageWrapper: {
    padding: 5,
    backgroundColor: theme.colors.blue,
    // borderRadius:wp(5),
    // overflow:'hidden'
  },
  row2Right: {
    alignItems: "center",
    // flex:2
  },
  row2Center: {
    // flex:1,
    borderRadius: wp(5),
    overflow: "hidden",
    borderWidth: 5,
    borderColor: theme.colors.lightBlue,
  },
  row2Left: {
    alignItems: "center",
    // flex:2
  },
  row4Separator: {
    borderRightWidth: 2,
    borderColor: theme.colors.lightBlue,
    height: hp(2),
    margin: 5,
  },
});

export default UserInfo;
