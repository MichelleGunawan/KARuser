import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen';
import DestinationSearch from '../screens/DestinationSearch'
import SearchResults from '../screens/SearchResults';
import OrderScreen from '../screens/OrderScreen';
import UserOrders from '../screens/UserOrders';

const Stack = createStackNavigator();

const OrdersNavigator = (props) => {
    return(
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"UserOrders"} component={UserOrders} />
        <Stack.Screen name={"OrderPage"} component={OrderScreen} />
      </Stack.Navigator>
    )
};

export default OrdersNavigator;