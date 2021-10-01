import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  Image
} from "react-native";
import { CustomText, ListItem, CustomTouchableText } from ".";
import { fontSize16, fontSize18 } from '../../utils/helper/responsiveSizes';
import { theme } from "../constants";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import NavigationService from "../../utils/NavigationService";
import { GeneralListItem } from "./GeneralListItem";
import { DownloadListItem } from "./DownloadListItem";

const DownloadList = (props) => {
  const onPress = (buttonAction) => () => {
    // NavigationService.push(navigation[buttonAction.type], buttonAction)
  };
  const { listLoading } = props;

  return (
    <View style={styles.container}>
      {!props.listData.length ? (
        <View style={styles.notfile}>
        <Image source={require('../../assets/lesson/group.png')} style={styles.txt} />
        <Text style={styles.txt2}>در حال حاضر فایلی موجود نمی باشد</Text>
        </View>
      ) : (
        <FlatList
          scrollEnabled={false}
          style={{ paddingTop: hp(2) }}
          contentContainerStyle={{ paddingBottom: hp(2) }}
          data={props.listData}
          keyExtractor={(_, i) => i.toString()}
          renderItem={(item) => (
            <DownloadListItem item={item} itemLayout={props.itemLayout} />
          )}
          // ListFooterComponent={()=><ListFooter loading={listLoading}/>}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: theme.sizes.verticalMargin10,
    // borderWidth:1
  },
  line: {
    marginHorizontal: theme.sizes.horizontalMargin15,
    height: hp(0.3),
    marginTop: hp(0.6),
    marginBottom: theme.sizes.verticalMargin10,
    backgroundColor: theme.colors.primary,
  },
  textBox: {
    marginHorizontal: theme.sizes.horizontalMargin15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  item: {
    paddingBottom: theme.sizes.verticalMargin10,
    paddingRight: theme.sizes.horizontalMargin15,
  },
  lastItem: {
    paddingBottom: theme.sizes.verticalMargin10,
    paddingHorizontal: theme.sizes.horizontalMargin15,
  },
  notfile: {
    width: wp(30),
    marginTop: hp(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
      width: wp(30),
      height: hp(15),
      color: 'red',      
  },
  txt2: {
    width: wp(70),
    height: hp(15),
    color: '#232A47', 
    fontSize: fontSize16,
    marginTop: hp(2),
    fontWeight: 'bold',
    textAlign: 'center'
}
});
export { DownloadList };
