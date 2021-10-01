
// =========== THIS IS FUNCTIONAL COMPONENT BUT DOES NOT WORK!! ================

import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, ScrollView, Text, Pressable, Linking } from 'react-native'
import { ParentViewActionBar, ContentList, GradientImageButton, CustomPending, CustomText } from '../../common/components'
import { theme, strings } from '../../common/constants'
import { homeRequest } from './action/HomeAction'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UserInfo from './components/UserInfo';
import HomeHeader from './components/HomeHeader';

const HomeScreen =(props) => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    let pending, failed, contents, tokenData, data, logoutMode;

    pending = state.home.homePending,
    failed = state.home.failed,
    contents = state.home.contents,
    tokenData = state.authenticationReducer.tokensData,
    data = state.home.data,
    logoutMode = state.profileReducer.logOutMode

    useEffect(() => {
        !logoutMode ? dispatch(homeRequest()) : null
    }, [])


        // const { failed, pending, contents, tokenData, homeRequest, data } = this.props;
        return (
            
            <ParentViewActionBar
                style={{ backgroundColor: theme.colors.bgGray }}
                // onPullDown={()=>homeRequest}
                // scroll  
                navigation={props.navigation} menu >
               
                {/* <Buttons props={this.props} /> */}
                {failed == true || pending == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={pending}
                        retryAction={() => dispatch(homeRequest())}

                    /> :
                    <ContentList
                        constantHeader={data.user ? 
                            <UserInfo userInfo={data.user} />
                            :
                            <HomeHeader navigation={props.navigation} />
                        }
                        onPullDown={dispatch(homeRequest())}
                        // scroll={false}
                        contents={contents}
                        userInfo={data.user} 
                         /> 
                }
            </ParentViewActionBar>


        )

}

const styles = StyleSheet.create({
    button: {
        marginRight: wp(5.5)
    },
    buttonView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: theme.sizes.verticalMargin10
    },
    pending: {
        position: 'relative',
        marginTop: hp(34)
    }
})

// const mapStateToProps = (state) => ({
//     pending: state.home.homePending,
//     failed: state.home.failed,
//     contents: state.home.contents,
//     tokenData: state.authenticationReducer.tokensData,
//     data: state.home.data,
//     logoutMode: state.profileReducer.logOutMode,
// })

// const mapDispatchToProps = {
//     homeRequest
// }
export default HomeScreen
