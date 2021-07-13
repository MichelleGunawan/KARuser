import React from "react";
import {View, Text, Dimensions, Pressable} from "react-native";

import HomeMap from '../../components/HomeMap'
import CovidMessage from '../../components/CovidMessage';
import HomeSearch from '../../components/HomeSearch'

import DrawerButton from '../../components/DrawerButton';

const HomeScreen =(props) =>{
    return(
        <View>
            <View style={{top: 25, left: 25, position: 'absolute'}}>
                 <DrawerButton/>
            </View>

            <View style = {{height: (Dimensions.get('window').height)*.94 }}>
                {/* <HomeMap /> */}
            </View>
            
            <View style = {{height: (Dimensions.get('window').height)*.2, marginTop: -85, backgroundColor: '#f2f2f2', borderTopLeftRadius: 10, borderTopRightRadius:10}}>
                {/* <CovidMessage/> */}
                <HomeSearch/>
            </View>
            
        </View>
    )
}

export default HomeScreen;
