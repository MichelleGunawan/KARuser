import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import MessageScreen from "../screens/MessageScreen";

const Stack = createStackNavigator();

const OrdersNavigator = (props) => {
    return(
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"MessageScreen"} component={MessageScreen} />
      </Stack.Navigator>
    )
};

export default OrdersNavigator;