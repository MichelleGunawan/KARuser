import React from "react";
import {View, Text, Pressable} from "react-native";
import {Auth} from 'aws-amplify';

import {DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import {StackActions} from "@react-navigation/native";

// import Entypo from 'react-native-vector-icons/Entypo';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const CustomDrawer = (props) => {
  // console.log("auth")
  // console.log(Auth.user.username)
  // console.log(Auth.user)

  const onPress = (props, name) => {
    
    props.navigation.dispatch(StackActions.popToTop());
    props.navigation.navigate(name);

  }


  const capitalize = (str) => {  
    return str.charAt(0).toUpperCase() + str.slice(1);
}

    return(
        <DrawerContentScrollView {...props}>
        <View style={{backgroundColor: '#e4e4e4', padding: 15, top:-5, borderBottomRightRadius:20}}>

        {/* User Row */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>          
          
          {/* 
          // user profile picture
          <View style={{
            backgroundColor: '#9cbe85',
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }}/> */}

          <View>
            <Text style={{color: '#b5cc88', fontSize: 30}}>{capitalize(Auth.user.username)}</Text>
            {/* <Text style={{color: '#fff'}}>5.00 *</Text> */}
          </View>
        </View>

        {/* Home Location Row */}
        {/* <View style={{
          borderTopWidth: 1,
          borderTopColor: '#a5a5a5',
          paddingTop: 10,
          marginTop: 10,
          flexDirection: 'row',
        }}>
          <Pressable
            onPress={() => {console.warn('App Store: KARGO Driver')}}>
            <Entypo name='home' size={20} color={'#b5cc88'}/>
          </Pressable>
        </View> */}

        {/* Drive KAR Row */}
        <View style={{
          borderTopWidth: 1,
          borderTopColor: '#a5a5a5',
          paddingTop: 10,
          marginTop: 10
        }}>
          <Pressable
            onPress={() => {console.warn('App Store: KARGO Driver')}}>
            <Text style={{color: '#a0a0a0', paddingVertical: 5,}}>Drive a KÄR</Text>
          </Pressable>
        </View>

        <Pressable style={{
          borderTopWidth: 1,
          borderTopColor: '#a5a5a5',
          paddingTop: 10,
          marginTop: 10}} 
          onPress={() => {Auth.signOut()}}>
          <Text style={{color: '#a0a0a0', paddingVertical: 5}}>Logout</Text>
        </Pressable>

      </View>

      <DrawerItem
        label="Home"
        activeBackgroundColor="#9cbe85"
        onPress={() => onPress(props, 'Home')}
      />

      <DrawerItem
        label="Orders"
        activeBackgroundColor="#9cbe85"
        onPress={() => onPress(props, 'Orders')}
      />

      <DrawerItem
        label="Messages"
        activeBackgroundColor="#9cbe85"
        onPress={() => onPress(props, 'Messages')}
      />

      {/* <DrawerItemList {...props} /> */}
      

      <View style={{marginTop: '135%', marginLeft: "45%"}}> 
      <Text style={{color:"#a4a4a4"}}>swipe to open drawer</Text>
      </View>


    </DrawerContentScrollView>
    )
}

export default CustomDrawer;