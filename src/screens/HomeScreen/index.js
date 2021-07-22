import React from "react";
import {View, Text, Dimensions, Pressable} from "react-native";
import {useNavigation } from '@react-navigation/native';

import HomeMap from '../../components/HomeMap'
import CovidMessage from '../../components/CovidMessage';
import HomeSearch from '../../components/HomeSearch'

import DrawerButton from '../../components/DrawerButton';
import Entypo from "react-native-vector-icons/Entypo";

const HomeScreen =(props) =>{
    const navigation = useNavigation();

    return(
        <View>            

            <View style = {{height: (Dimensions.get('window').height)*.94 }}>
                <HomeMap />
            </View>
            
            <View style = {{height: (Dimensions.get('window').height)*.2, marginTop: -85, backgroundColor: '#f2f2f2', borderTopLeftRadius: 10, borderTopRightRadius:10}}>
                {/* <CovidMessage/> */}
                <HomeSearch/>
            </View>

            <Pressable  
            onPress = {()=>navigation.openDrawer()} 
            style={{position:'absolute',
            backgroundColor:'white',
            padding: 10,
            borderRadius: 50, top: 10, left: 10}}>
                <Entypo name={"menu"} size={24} color="#a4a4a4"/>
            </Pressable>
            
        </View>
    )
}

export default HomeScreen;
