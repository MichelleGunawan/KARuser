import React from "react";
import {View, Text, Pressable} from "react-native";
import {Auth} from 'aws-amplify';

import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  // console.log("auth")
  // console.log(Auth.user.username)
  // console.log(Auth.user)

  const capitalize = (str) => {  
    return str.charAt(0).toUpperCase() + str.slice(1);
}

    return(
        <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#d5d5d5', padding: 15}}>

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
            <Text style={{color: '#9cbe85', fontSize: 30}}>{capitalize(Auth.user.username)}</Text>
            {/* <Text style={{color: '#fff'}}>5.00 *</Text> */}
          </View>
        </View>

        {/* Messages Row */}
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#a5a5a5',
          borderTopWidth: 1,
          borderTopColor: '#a5a5a5',
          paddingVertical: 10,
          marginVertical: 10,
        }}>
          <Pressable
            onPress={() => {console.warn('Messages')}}>
            <Text style={{color: '#a0a0a0', paddingVertical: 5,}}>Drive a KÄR</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => {Auth.signOut()}}>
          <Text style={{color: '#a0a0a0', paddingVertical: 5}}>Logout</Text>
        </Pressable>

      </View>

      <DrawerItemList {...props} />

    </DrawerContentScrollView>
    )
}

export default CustomDrawer;