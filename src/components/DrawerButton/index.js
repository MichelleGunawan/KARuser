import React from "react";
import {View,Pressable} from "react-native";
import {useNavigation } from '@react-navigation/native';
import Entypo from "react-native-vector-icons/Entypo";

const DrawerButton =(props) =>{
    const navigation = useNavigation();

    // onPress = {()=>navigation.openDrawer()} 

    return(
        <View>
        <Pressable 
        onPress = {()=>navigation.openDrawer()} 
            style={{
            position:'absolute',
            backgroundColor:'white',
            padding: 10,
            borderRadius: 50,
            top: 10, left: 10}}>
                <Entypo name={"menu"} size={24} color="#a4a4a4"/>
            </Pressable>          
        </View>
    )
}

export default DrawerButton;