import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, Alert, Pressable} from "react-native";

import RouteMap from '../../components/RouteMap'
import TransportTypes from '../../components/TransportTypes';
import HomeSearch from '../../components/HomeSearch'
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import{API, graphqlOperation, Auth} from 'aws-amplify';
import{createOrder} from '../../graphql/mutations';
import {getDistance} from 'geolib';

import { useRoute, useNavigation } from '@react-navigation/native';

import types from '../../assets/data/types';

import {createPaymentIntent} from '../../graphql/mutations';
import {useStripe} from '@stripe/stripe-react-native';

const CheckoutScreen =(props) =>{
    const [clientSecret, setClientSecret] = useState(null);
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const typeState = useState(null);
    

    const route = useRoute();
    const navigation = useNavigation();
    
    // console.log("route.params")
    // console.log(route.params);
    const {destinationPlace} = route.params;    
    const {originPlace} = route.params;
    const {message} = route.params;
    const {type} = route.params;
    const {distance} = route.params;
    const {carPrice} = route.params;
    const {deliveryPrice} = route.params;
    const {tip} = route.params;
    const {orderTotal} = route.params;
    const {totalCoins} = route.params;

    console.log(orderTotal)
    console.log(parseFloat(orderTotal.toFixed(2)))


    //////////////////////////////////////////////
    //handle payment
    
    
    useEffect(() => {
        console.log("here");
        fetchPaymentIntent();
      }, []);

    useEffect(()=>{
        if(clientSecret){
            initializePaymentSheet();
        }
    }, [clientSecret])
      
    
    const fetchPaymentIntent = async() => {
        const response = await API.graphql(
            graphqlOperation(createPaymentIntent, {totalCoins})
        )
        console.log('success')
        setClientSecret(response.data.createPaymentIntent.clientSecret);
    }

    const initializePaymentSheet = async() =>{
    if(!clientSecret){
        return;
    }
    const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      console.log("success2")
      if(error){
          Alert.alert(error);
        }
    };

    const openPaymentSheet = async() => {
        const { error } = await presentPaymentSheet({ clientSecret });

        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } 
        else {
            saveOrder();
            Alert.alert('Success', 'Your order is confirmed!');
        }
      };

    /////////////////////////////////////////////////


    const onSubmit = () =>{    
        
        openPaymentSheet();
    }

    const saveOrder = async () => {
        //submit to server
        try{
            const userInfo = await Auth.currentAuthenticatedUser();
            // console.log("user info");
            // console.log(userInfo);
            // console.log(originPlace)
            // console.log(destinationPlace);

            const date = new Date();
            
            const input = {
                createdAt: date.toISOString(),
                type,
                originLatitude: originPlace.details.geometry.location.lat,
                originLongitude: originPlace.details.geometry.location.lng,
                
                destLatitude: destinationPlace.lat,
                destLongitude: destinationPlace.lng,

                message,

                distance,
                carPrice, 
                deliveryPrice: parseFloat(deliveryPrice.toFixed(2)),
                tip: parseFloat(tip.toFixed(2)), 
                orderTotal: parseFloat(orderTotal.toFixed(2)),

                username: userInfo.username,

                userId: userInfo.attributes.sub,
                carId: "1",
                status: "NEW",
            };

            const response = await API.graphql(
                graphqlOperation(
                    createOrder,{
                        input
                    }
                )
            );

            const origin={
                latitude: originPlace.details.geometry.location.lat,
                longitude: originPlace.details.geometry.location.lng,}

            const destination={
                latitude: destinationPlace.lat,
                longitude: destinationPlace.lng,
            }

            console.log(response);
            navigation.navigate('OrderPage', {id: response.data.createOrder.id, origin, destination})
           // Alert.alert("Hurraay", "Your order has been placed!",[{text:"Go home", onPress:() => navigation.navigate('Home')}])
        }
        catch(e){
            console.error(e);
        }
    }

    return(
        <View style={{width: '100%', height: '100%', justifyContent:'flex-start'}}>
            <View style={{marginBottom: 10, 
            display: 'flex', flexDirection: 'row', justifyContent:'space-between', 
            borderBottomWidth: 1, borderBottomColor: "#b5cc88"
            }}>
                <Text style={{fontSize: 35, margin: 10, marginTop: 50, color: '#b5cc88'}}>KARGO</Text>
            </View>

            <View style={{marginTop: 5, marginBottom: -10, marginLeft: 20, 
            display: 'flex', flexDirection: 'row', justifyContent:'space-between', 
            }}>
                <Text style={{fontSize: 25, color: '#a4a4a4'}}>Order Total</Text>
            </View>

            <View style={{width: '90%', height: 200, margin: 10, borderWidth: 2, borderRadius: 20, borderColor: '#e4e4e4', justifyContent: 'flex-start', marginRight: 'auto', marginLeft: 'auto', }}>
            
                <View style={{margin: 20,
                display: 'flex', flexDirection: 'row', justifyContent:'space-between', 
                }}>
                    <Text style={{fontSize: 20, color: '#a4a4a4'}}>Delivery: </Text>
                    <Text style={{fontSize: 20, color: '#a4a4a4'}}>${deliveryPrice.toFixed(2)}</Text>
                </View>

                <View style={{margin: 20, marginTop:0,
                display: 'flex', flexDirection: 'row', justifyContent:'space-between', 
                }}>
                    <Text style={{fontSize: 20, color: '#a4a4a4'}}>Tip: </Text>
                    <Text style={{fontSize: 20, color: '#a4a4a4'}}>${tip.toFixed(2)}</Text>
                </View>

                <View style={{width: '90%', borderTopWidth: 0.2, borderTopColor: '#a4a4a4', marginBottom: 20, marginRight: 'auto', marginLeft: 'auto'}}>
                </View>

                <View style={{margin: 20, marginTop:0,
                display: 'flex', flexDirection: 'row', justifyContent:'space-between', 
                }}>
                    <Text style={{fontSize: 20, color: '#a4a4a4', fontWeight: 'bold'}}>Total: </Text>
                    <Text style={{fontSize: 20, color: '#a4a4a4', fontWeight: 'bold'}}>${orderTotal.toFixed(2)}</Text>
                </View>

            </View>

            <Pressable 
            onPress={onSubmit}
            style={{backgroundColor:'#b5cc88', padding: 10, margin: 20, alignItems:'center', width: '80%', borderRadius: 5, marginRight: 'auto', marginLeft: 'auto'}}>
                <Text style={{color:"white", fontWeight: 'bold', fontSize: 20}}>
                    Checkout
                </Text>
            </Pressable> 
        </View>
    )
}

export default CheckoutScreen;