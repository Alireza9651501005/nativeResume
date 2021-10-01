import React from 'react';
import {Animated, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UserInfo from './UserInfo';
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HEADER_HEIGHT = hp(40);

const AnimatedHeader = ({animatedValue}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 55],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={{
        // position: 'relative',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 1000,
        // zIndex: 500,
        height: headerHeight,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // marginBottom: 600,
      }}>
      
      <UserInfo />
    </Animated.View>
  );
};

export default AnimatedHeader;
