import React, { useState, useEffect } from "react";
import { View, Dimensions, Text, Pressable } from "react-native";
import OrderMap from "../../components/OrderMap";
import { useRoute, useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { getOrder, getCar } from '../../graphql/queries';
import { onOrderUpdated, onCarUpdated } from './subscriptions';

import styles from './styles.js';

const OrderScreen = (props) => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  
  console.log(route.params);
  const destinationPlace = route.params.destination;    
  const originPlace = route.params.origin;
  

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

  const onSubmit = async() =>{  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });     
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'UserOrders' }],
    // });
    //navigation.navigate('Home')  
}

    return(
        <View>
          <View style={{height: Dimensions.get('window').height - 100}}>
            <OrderMap car={car} origin={originPlace} destination={destinationPlace} />
          </View>
          <View style={styles.orderContent}>
            <Text style={styles.orderText}>Order status: {order?.status}</Text>            
            <Text style={styles.orderText}>Order price: ${(order?.price*order?.distance).toFixed(2)}</Text>
            <Pressable 
            onPress={onSubmit} 
            style={{backgroundColor:'#9cbe85', padding: 10, marginTop: 15, margin: 10, alignItems:'center'}}>
                <Text style={{color:"white", fontWeight: 'bold'}}>
                    KÄRGO again
                </Text>
            </Pressable> 
          
          </View>
                   
        </View>
    )
}

export default OrderScreen;
