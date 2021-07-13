import React from "react";
import {View,Pressable} from "react-native";
import {useNavigation } from '@react-navigation/native';

const DrawerButton =(props) =>{
    const navigation = useNavigation();

    return(
        <View>
            <Pressable 
            style = {{height: 50, width: 50, borderRadius: 100, backgroundColor: '#fff', }}
            onPress = {()=>navigation.openDrawer()}>
                <View style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 'auto', marginLeft: 'auto', }}>
                <View style = {{width: 25, height: 3, backgroundColor: '#a4a4a4', marginBottom: 5, marginTop: -1}}></View>
                <View style = {{width: 25, height: 3, backgroundColor: '#a4a4a4', marginBottom: 5}}></View>
                <View style = {{width: 25, height: 3, backgroundColor: '#a4a4a4',}}></View>
                </View>
            </Pressable>            
        </View>
    )
}

export default DrawerButton;