import React from "react";
import {View, Text, Dimensions} from "react-native";

import HomeMap from '../../components/HomeMap'
import CovidMessage from '../../components/CovidMessage';
import HomeSearch from '../../components/HomeSearch'

const HomeScreen =(props) =>{
    return(
        <View>
            <View style = {{height: Dimensions.get('window').height - 10 }}>
                {/* <HomeMap /> */}
            </View>
            
            <View style = {{height: 90, marginTop: -85, backgroundColor: '#f2f2f2', borderTopLeftRadius: 10, borderTopRightRadius:10}}>
                {/* <CovidMessage/> */}
                <HomeSearch/>
            </View>
            
        </View>
    )
}

export default HomeScreen;
