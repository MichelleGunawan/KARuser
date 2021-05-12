import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, Alert} from "react-native";

import RouteMap from '../../components/RouteMap'
import TransportTypes from '../../components/TransportTypes';
import HomeSearch from '../../components/HomeSearch'
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import{API, graphqlOperation, Auth} from 'aws-amplify';
import{createOrder} from '../../graphql/mutations';
import {listOrders} from '../../graphql/queries';
import {getDistance} from 'geolib';
import OrdersRow from '../../components/OrdersRow';

import { useRoute, useNavigation } from '@react-navigation/native';

import types from '../../assets/data/types';

const UserOrders =(props) =>{
  const route = useRoute();
  const navigation = useNavigation();

  const orderState = useState({});

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const userData = await Auth.currentAuthenticatedUser();
            const ordersData = await API.graphql(
              graphqlOperation(
                listOrders,
                { filter: { 
                  userId: { eq: userData.attributes.sub}, 
                  and:{ 
                    or:[
                      {status: { eq: 'NEW'}},
                      {status: { eq: 'PICKING_UP'}}
                    ]
                  }}}
                )
            );
            // console.log("ordersData")
            // console.log(ordersData);
            setOrders(ordersData.data.listOrders.items);
            console.log("orders data");
            console.log(orders);
        } catch (e) {
          console.log(e);
        }
      }
    
      useEffect(() => {
        fetchOrders();
      }, []);

      const onSubmit = async(order) => {
        // const[order]=orderState;

        if(!order){
            return;
        }

        console.log("opening user order:");
        console.log(order);

        const origin = {
            latitude: order.originLatitude,
            longitude: order.originLongitude
        }

        const destination = {
            latitude: order.destLatitude,
            longitude: order.destLongitude
        }


        navigation.navigate('OrderPage', {id: order.id, origin, destination})
    }

    return(
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
        <OrdersRow orders={orders} orderState={orderState} onSubmit={onSubmit}/>
        </View>
    )
}

export default UserOrders;