import React, { useState, useEffect } from "react";
import { View, Dimensions, Text, Pressable } from "react-native";
import OrderMap from "../../components/OrderMap";
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { getOrder, getCar } from '../../graphql/queries';
import { onOrderUpdated, onCarUpdated } from './subscriptions';

const OrderScreen = (props) => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);

  const route = useRoute();
  console.log(route.params.id);
  
  console.log(route.params);
  const {destinationPlace} = route.params;    
  const {originPlace} = route.params;

  // Fetch order on initial render
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await API.graphql(
          graphqlOperation(getOrder, { id: route.params.id })
        );
        setOrder(orderData.data.getOrder);
      } catch (e) {

      }
    }
    fetchOrder();
  }, [])

  // Subscribe to order updates
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onOrderUpdated, { id: route.params.id })
    ).subscribe({
      next: ({ value }) => setOrder(value.data.onOrderUpdated),
      error: error => console.warn(error)
    })

    return () => subscription.unsubscribe();
  }, [])

  // Fetch Car data when order is updated
  useEffect(() => {
    if (!order?.carId || order.carId === '1') {
      return;
    }

    const fetchCar = async () => {
      try {
        const carData = await API.graphql(
          graphqlOperation(getCar, { id: order.carId })
        );
        console.log(carData);
        setCar(carData.data.getCar);
      } catch (e) {

      }
    }
    fetchCar();
  }, [order])

  // Subscribe to car updates
  useEffect(() => {
    if (!order?.carId || order.carId === '1') {
      return;
    }

    const subscription = API.graphql(
      graphqlOperation(onCarUpdated, { id: order.carId })
    ).subscribe({
      next: ({ value }) => setCar(value.data.onCarUpdated),
      error: error => console.warn(error)
    })

    return () => subscription.unsubscribe();
  }, [order])

    return(
        <View>
          <View style={{height: Dimensions.get('window').height - 100}}>
            <OrderMap car={car} origin={originPlace} destination={destinationPlace} />
          </View>
          <View style={{
            height: 500, 
            backgroundColor: "#f2f2f2",
            marginTop: -30,
            padding: 15,
            borderTopLeftRadius:15,
            borderTopRightRadius: 15,
            flex: 1,
            alignItems: "center"}}>
            <Text style={{fontSize: 15, color:"#555"}}>Order status: {order?.status}</Text>            
            <Text style={{fontSize: 15, color:"#555"}}>Order price: {order?.price}</Text>
          </View>          
        </View>
    )
}

export default OrderScreen;
