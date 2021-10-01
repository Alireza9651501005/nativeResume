import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CustomText } from "../../../common/components";
import { colors } from "../../../common/constants/theme";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
import { fontSize16, fontSize14 } from "../../../utils/helper/responsiveSizes";
// import { colors, sizes } from '../../../common/constants/theme';
import * as Progress from "react-native-progress";

export default function CircleItem({ item, index }) {
  const [courceLevel, setCourceLevel] = useState(320);
  useEffect(() => {
    switch (index) {
      case 0:
        setCourceLevel(320);
      case 1:
        setCourceLevel(160);
      case 2:
        setCourceLevel(80);
      case 3:
        setCourceLevel(40);
      default:
        setCourceLevel(320);
    }
  }, []);

  let prognumber;
  {
    item.total_score
      ? (prognumber = ((item.total_score * 100) / courceLevel).toFixed(2))
      : (prognumber = 0);
  }
  {
    prognumber - Math.floor(prognumber) == 0
      ? (prognumber = Math.floor(prognumber))
      : prognumber;
  }
  return (
    // <View>
    //     < View style={styles.container} >
    //         <View style={styles.innerCircleBackground}>
    //             < View style={styles.contentCircle} >
    //                 <CustomText style={
    //                     {
    //                         color: colors.textBlue,
    //                         fontFamily: iranSansMedium,
    //                         fontSize:fontSize16
    //                     }
    //                 } >{item.total_score}</CustomText>
    //             </View>
    //         </View>

    //         <View style={styles.halfCircle} />

    //     </View>

    // </View>
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        top: 0,
      }}
    >
      <View
        style={{ borderRadius: wp(20), backgroundColor: colors.componentWhite }}
      >
        <Progress.Circle
          size={wp(16)}
          thickness={wp(0.7)}
          color={colors.borderBlue2}
          unfilledColor={colors.componentWhite}
          borderWidth={0}
          // fill={white}
          progress={(item.total_score / courceLevel).toFixed(2)}
          // progress={0.0}
        />
      </View>

      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          width: wp(14),
          height: wp(14),
          borderRadius: wp(7),
          backgroundColor: "lightblue",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText bold style={{ fontSize: fontSize14, color: "#000" }}>
              {prognumber}
            </CustomText>
            <CustomText style={{ fontSize: fontSize14, top: 4, color: "#000" }}>
              {" "}
              %
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(16),
    height: wp(16),
    borderBottomEndRadius: wp(8),
    borderBottomStartRadius: wp(8),
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  halfCircle: {
    backgroundColor: colors.borderGray,
    width: wp(16),
    height: wp(8),
    position: "absolute",
    bottom: 0,
    left: 0,
    borderBottomEndRadius: wp(7.9),
    borderBottomLeftRadius: wp(7.9),
  },
  innerCircleBackground: {
    width: wp(15.4),
    height: wp(15.4),
    borderRadius: wp(7.7),
    backgroundColor: colors.background,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  contentCircle: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: colors.componentWhite,
    borderWidth: 5,
    borderColor: colors.borderBlue2,
    alignItems: "center",
    justifyContent: "center",
  },
});
