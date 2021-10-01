import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { RippleEffect, CustomText } from "../../../common/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../common/constants";
import {
  fontSize10,
  fontSize12,
  fontSize14,
  fontSize16,
  fontSize18,
  fontSize20,
  fontSize22,
} from "../../../utils/helper/responsiveSizes";
import { iranSansMedium, iranSans } from "../../../utils/helper/commonVariables";
import { useDispatch, useSelector } from "react-redux";
import { currentMessage } from "../actions/userInboxAction";
import * as NavigationService from "../../../utils/NavigationService";

export default function MessageItem({ navigation, item, index }) {
  const dispatch = useDispatch();
  const states = useSelector((state) => state);
  let userInboxReducer;
  userInboxReducer = states.userInboxReducer;
  // useEffect=(() => {

  // }, [])
  // //console.log('item', item)
  const { textInuteTitleColor, seenMEssage } = theme.colors;
  let textColor = item ? (item.read ? seenMEssage : textInuteTitleColor) : null;
  // let textColor = item ? item.read ? seenMEssage : textInuteTitleColor : null
  const showMessage = () => {
    let seenMessage;
    // //console.log('userInboxReducer.listData[item.id]', userInboxReducer.listData[index].read = true)
    console.log("QQQQQQQQQQQQQ==========", item);
    dispatch(currentMessage(item));
    NavigationService.navigate("FullMessageScreen", {
      id: item.id,
      title: item.title,
      index: index,
    });
  };
  return (
    <RippleEffect
      onPress={showMessage}
      style={{
        backgroundColor: theme.colors.componentWhite,
        width: wp(86),
        borderRadius: theme.sizes.globalRadius,
        alignSelf: "center",
      }}
    >
      {ShowMessageDateAndTimeComponent(
        showMessage,
        item ? item.date : null,
        item ? item.hour : null,
        item ? item.title : null,
        item ? item.short_description : null,
        item,
        false
      )}
    </RippleEffect>
  );
}
export const ShowMessageDateAndTimeComponent = (
  onPress,
  date,
  time,
  title,
  description,
  item,
  show
) => {
  const { textInuteTitleColor, seenMEssage } = theme.colors;
  let textColor = item ? (item.read ? seenMEssage : textInuteTitleColor) : null;
  if (show) {
    //   =============================== FullScreen ==========================//
    return (
      // <View style={styles.container2}>
      //   <View
      //     style={[
      //       styles.containerChildStyle,
      //       { width: wp(16), marginTop: hp(3), alignItems: "flex-end" },
      //     ]}
      //   >
      //     <View style={styles.messageDateAndTimeStyle}>
      //       <CustomText
      //         numberOfLines={1}
      //         style={{
      //           fontFamily: iranSansMedium,
      //           color: textColor,
      //           fontSize: fontSize16,
      //         }}
      //       >
      //         {date}
      //       </CustomText>
      //     </View>
      //     <View style={[styles.messageDateAndTimeStyle]}>
      //       <CustomText
      //         style={{
      //           fontSize: fontSize16,
      //           fontFamily: iranSansMedium,
      //           color: textColor,
      //         }}
      //       >
      //         {time}
      //       </CustomText>
      //     </View>
      //   </View>
      //   <View style={[styles.parentTitle]}>
      //     <View style={styles.fullscreenTitle}>
      //       <CustomText
      //         numberOfLines={1}
      //         style={{
      //           fontSize: fontSize20,
      //           fontFamily: iranSansMedium,
      //           color: textColor,
      //           borderWidth: 0,
      //           top: hp(0),
      //           flexShrink: 1,
      //         }}
      //       >
      //         {title}
      //       </CustomText>
      //     </View>
      //     <View
      //       style={[
      //         styles.messageContainerStyle,
      //         { flexDirection: "row", justifyContent: "flex-end" },
      //       ]}
      //     >
      //       <CustomText
      //         numberOfLines={1}
      //         style={{
      //           fontSize: fontSize20,
      //           color: textColor,
      //           fontFamily: iranSansMedium,
      //           borderWidth: 0,
      //           top: hp(2),
      //           marginBottom: -hp(6),
      //         }}
      //       >
      //         {description}
      //       </CustomText>
      //     </View>
      //   </View>
      // </View>
      <View
        style={{
          flexDirection: "row",
          width: wp(86),
          alignItems: "flex-start",
          marginLeft: wp(7.5),
          // backgroundColor: "red",
          // textAlign: "left",
          padding: 0,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.messageDateAndTimeStyle22}>
          <CustomText
            numberOfLines={1}
            style={{
              fontFamily: iranSans,
              color: textColor,
              fontSize: fontSize14,
            }}
          >
            {` , ${date}`}
          </CustomText>
          <CustomText
            style={{
              fontSize: fontSize14,
              fontFamily: iranSans,
              color: textColor,
            }}
          >
            {time}
          </CustomText>
        </View>
        <CustomText
          style={{
            fontSize: fontSize16,
            fontFamily: iranSansMedium,
            color: textColor,
            width: wp(55),
            // backgroundColor: "yellow",
          }}
        >
          {title}
        </CustomText>
      </View>
    );
  } else {
    //   ===================================== list items==========================//
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.containerChildStyle,
            { width: wp(17) },
          ]}
        >
          <View style={styles.messageDateAndTimeStyle}>
            <CustomText
              numberOfLines={1}
              style={{
                fontFamily: iranSansMedium,
                color: textColor,
                fontSize: fontSize12,
              }}
            >
              {date}
            </CustomText>
          </View>
          <View style={[styles.messageDateAndTimeStyle]}>
            <CustomText
              style={{
                fontSize: fontSize12,
                fontFamily: iranSansMedium,
                top: hp(0.4),
                color: textColor,
              }}
            >
              {time}
            </CustomText>
          </View>
        </View>
        <View style={[styles.containerChildStyle]}>
          <View style={styles.messageContainerStyle}>
            <CustomText
              numberOfLines={1}
              style={{
                fontFamily: iranSansMedium,
                fontSize: fontSize16,
                color: textColor,
                borderWidth: 0,
                // top: hp(0.5),
              }}
            >
              {title}
            </CustomText>
          </View>
          <View
            style={[
              styles.messageContainerStyle,
              // { flexDirection: "row" },
            ]}
          >
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: fontSize14,
                color: textColor,
                fontFamily: iranSansMedium,
                borderWidth: 0,
                top: hp(0.4),
                // marginRight: 0,
                // padding: 0,
              }}
            >
              {description}
            </CustomText>
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    height: hp(12),
    width: wp(86),
    borderRadius: theme.sizes.globalRadius,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
    justifyContent: "center",
  },
  container2: {
    height: hp(15),
    width: wp(89),
    borderRadius: theme.sizes.globalRadius,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
    justifyContent: "flex-end",
  },
  containerChildStyle: {
    width: wp(62),
    // backgroundColor: "lightblue"
    // height: hp(5.4),
    // alignSelf: "center",
    // justifyContent: "center",
    // marginRight: hp(2),
    // backgroundColor: "#d6d6d6"
  },
  parentTitle: {
    width: wp(62),
    height: hp(8),
    alignSelf: "center",
    justifyContent: "center",
    // padding: 30,
    // borderWidth: 2,
    // marginBottom: 20,
  },
  itemTwo: {
    width: wp(20),
    height: hp(5.4),
    alignSelf: "center",
    justifyContent: "center",
  },
  messageContainerStyle: {
    height: hp(3.2),
    borderColor: "red",
  },
  fullscreenTitle: {
    // color: 'red',
    height: hp(3.2),
    // flexShrink: 1,
    // width: wp(80),
    // marginTop: 50,
  },
  messageDateAndTimeStyle: {
    // height: hp(3.2),
    // flexDirection: "row-reverse",
    justifyContent: "flex-end",
    width: wp(16),
    alignItems: "center",
  },
  messageDateAndTimeStyle22: {
    // height: hp(3.2),
    flexDirection: "row",
    justifyContent: "center",
    width: wp(30),
    height: hp(3),
    alignItems: "center",
    // marginLeft: wp(4.5),
    borderRadius: wp(1.5),
    padding: wp(3.5),
    backgroundColor: '#d6d6d6',
    paddingHorizontal: wp(3),
    marginTop: hp(0.5)
  },
});
