import React from "react";
import {View, Text, Pressable} from "react-native";
import {Auth} from 'aws-amplify';

import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  // console.log("auth")
  // console.log(Auth.user.username)
  // console.log(Auth.user)

    return(
        <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#858585', padding: 15}}>

        {/* User Row */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#9cbe85',
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }}/>

          <View>
            <Text style={{color: '#9cbe85', fontSize: 20}}>{Auth.user.username}</Text>
            {/* <Text style={{color: '#fff'}}>5.00 *</Text> */}
          </View>
        </View>

        {/* Messages Row */}
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#a5a5a5',
          borderTopWidth: 1,
          borderTopColor: '#a5a5a5',
          paddingVertical: 5,
          marginVertical: 10,
        }}>
          <Pressable
            onPress={() => {console.warn('Messages')}}>
            <Text style={{color: '#fff', paddingVertical: 5,}}>Messages</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => {console.warn('Drive a KÄR')}}>
          <Text style={{color: '#fff', paddingVertical: 5}}>Drive a KÄR</Text>
        </Pressable>


      </View>

      <DrawerItemList {...props} />

      {/* Make money */}
      <Pressable onPress={() => { Auth.signOut() }}>
        <Text style={{color:'#666', padding: 10, paddingLeft: 20}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
    )
}

export default CustomDrawer;