import React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomText } from "../../../common/components";
import { colors } from "../../../common/constants/theme";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
import { fontSize14 } from "../../../utils/helper/responsiveSizes";
import { useSelector, useDispatch } from "react-redux";
import CToast from "../../../common/components/CToast";
import Clipboard from "@react-native-community/clipboard";
import * as Progress from "react-native-progress";

export default function ScoreItem({ item, index, ...props }) {
  const states = useSelector((state) => state);
  let inviteCode = states.networkingReducer.networking.invite_code;
  return (
    <View style={styles.container}>
      {/* < View style={styles.contentCircle} >
                <CustomText style={
                    {
                        color: colors.textBlue,
                        fontFamily: iranSansMedium,
                        fontSize: fontSize16
                    }
                } >{props.score}</CustomText>
            </View> */}
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          top: 0,
        }}
      >
        <View
          style={{
            borderRadius: wp(20),
            backgroundColor: colors.componentWhite,
          }}
        >
          <Progress.Circle
            size={wp(24)}
            thickness={wp(0.7)}
            color={colors.borderBlue2}
            unfilledColor={colors.componentWhite}
            borderWidth={0}
            // fill={white}
            progress={(props.score / 600).toFixed(2)}
            // progress={0.0}
          />
        </View>

        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: wp(22),
            height: wp(22),
            borderRadius: wp(11),
            backgroundColor: "lightblue",
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText bold style={{ fontSize: fontSize14, color: "#000" }}>
                {props.score ? (props.score * 100 / 600).toFixed(2) : 0}
              </CustomText>
              <CustomText
                style={{ fontSize: fontSize14, top: 4, color: "#000" }}
              >
                {" "}
                %
              </CustomText>
            </View>
          </View>
        </View>
      </View>
      <CustomText
        style={{
          color: colors.textBlue,
          fontFamily: iranSansMedium,
          marginTop: 8,
        }}
      >
        مجموع امتیازات شما
      </CustomText>
      <CustomText
        onPress={() => {
          Clipboard.setString(inviteCode);
          CToast("کد معرف شما کپی شد", "success");
        }}
        style={{
          color: colors.textBlue,
          fontFamily: iranSansMedium,
          marginTop: hp(2),
        }}
      >
        {inviteCode}: کد معرف شما
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  contentCircle: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(11),
    backgroundColor: colors.componentWhite,
    borderWidth: 7,
    borderColor: colors.borderBlue2,
    alignItems: "center",
    justifyContent: "center",
  },
});
