import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, Alert} from "react-native";

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

const SearchResults =(props) =>{
    const [clientSecret, setClientSecret]= useState(null);
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const typeState = useState(null);

    // const [carPrice, setCarPrice] = useState(0);
    const [tip, setTip] = useState(0);
    

    const route = useRoute();
    const navigation = useNavigation();
    
    // console.log("route.params")
    // console.log(route.params);
    const {destinationPlace} = route.params;    
    const {originPlace} = route.params;
    const {message} = route.params;

    var d = getDistance(
            {latitude: originPlace.details.geometry.location.lat, longitude: originPlace.details.geometry.location.lng},
            {latitude: destinationPlace.lat, longitude: destinationPlace.lng},
          );
    var distance = d/1000;
    // console.log("distance")
    // console.log(distance);

    const getPrice = (type) => {  
        if(type==='KarS')
        {
            return types[0].price;
        }
        if(type=="KarX")
        {
            return types[2].price
        }
        else
        {
            return types[1].price;
        }
    }
    
    // console.log("typestate");
    // console.log(typeState[0])
    // const price = (getPrice(typeState[0])*distance)+1;

    //handle payment
    // const totalCoins = Math.ceil(total*100);
    
    // useEffect(() => {
    //     fetchPaymentIntent();
    //   }, []);
    
    //   useEffect(() => {
    //     if (clientSecret) {
    //       initializePaymentSheet();
    //     }
    //   }, [clientSecret]);
    
      const fetchPaymentIntent = async () => {
        const response = await API.graphql(
          graphqlOperation(createPaymentIntent, {totalCoins}),
        );
        console.log('totalCoins')
        console.log(totalCoins)
        console.log("fetch payment intent success!")
        setClientSecret(response.data.createPaymentIntent.clientSecret);
      };
    
      const initializePaymentSheet = async () => {
        if (!clientSecret) {
          return;
        }
        const {error} = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
        });
        console.log('init payment sheet success');
        if (error) {
          Alert.alert(error);
        }
      };
    
      const openPaymentSheet = async () => {
        if (!clientSecret) {
          return;
        }
        const {error} = await presentPaymentSheet({clientSecret});
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          saveOrder();
          Alert.alert('Success', 'Your payment is confirmed!');
        }
      };

   


    const onSubmit = () =>{       
        
        const[type]=typeState;

        if(!type){
            return;
        }
        console.log("typestate: ",typeState)
        console.log("type: ", type)
        console.log("tip: ")
        console.log(tip)

        const carPrice = getPrice(type);
        console.log("car price: ")
        console.log(carPrice)
        

        const orderTotal = Number(carPrice*distance)+1+Number(tip)
        const totalCoins = Math.floor(orderTotal*100);

        console.log("orderTotal: ", orderTotal)
        console.log("total coins: ", totalCoins)
        

        navigation.navigate("CheckoutPage", {originPlace,destinationPlace, message, type, distance, price: orderTotal, totalCoins, carPrice})
        


        //submit to server
        // try{
        //     const userInfo = await Auth.currentAuthenticatedUser();
        //     // console.log("user info");
        //     // console.log(userInfo);
        //     // console.log(originPlace)
        //     // console.log(destinationPlace);

        //     const date = new Date();
            
        //     const input = {
        //         createdAt: date.toISOString(),
        //         type,
        //         originLatitude: originPlace.details.geometry.location.lat,
        //         originLongitude: originPlace.details.geometry.location.lng,
                
        //         destLatitude: destinationPlace.lat,
        //         destLongitude: destinationPlace.lng,

        //         message,

        //         distance,
        //         price: getPrice(type),

        //         username: userInfo.username,

        //         userId: userInfo.attributes.sub,
        //         carId: "1",
        //         status: "NEW",
        //     };

        //     const response = await API.graphql(
        //         graphqlOperation(
        //             createOrder,{
        //                 input
        //             }
        //         )
        //     );

        //     const origin={
        //         latitude: originPlace.details.geometry.location.lat,
        //         longitude: originPlace.details.geometry.location.lng,}

        //     const destination={
        //         latitude: destinationPlace.lat,
        //         longitude: destinationPlace.lng,
        //     }

        //     console.log(response);
        //     navigation.navigate('OrderPage', {id: response.data.createOrder.id, origin, destination})
        //    // Alert.alert("Hurraay", "Your order has been placed!",[{text:"Go home", onPress:() => navigation.navigate('Home')}])
        // }
        // catch(e){
        //     console.error(e);
        // }
    }

    return(
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
        <View style={{height: (Dimensions.get('window').height)-390}}>
            {/* <RouteMap origin={originPlace} destination={destinationPlace} /> */}
        </View>

        <View style={{height:400, marginTop: -27, backgroundColor: "#fff"}}>
            <TransportTypes typeState={typeState} distance={distance} onSubmit={onSubmit} tip={tip} setTip={setTip}/>
        </View>
        </View>
    )
}

export default SearchResults;