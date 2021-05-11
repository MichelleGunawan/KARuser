import React, {useState} from "react";
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

const SearchResults =(props) =>{
    const typeState = useState(null);
    const [price, setPrice] = useState(0);
    

    const route = useRoute();
    const navigation = useNavigation();
    
    //console.log(route.params);
    const {destinationPlace} = route.params;    
    const {originPlace} = route.params;

    var d = getDistance(
            {latitude: originPlace.details.geometry.location.lat, longitude: originPlace.details.geometry.location.lng},
            {latitude: destinationPlace.lat, longitude: destinationPlace.lng},
          );
    var distance = d/1000;
    console.log("distance")
    console.log(distance);

    const onSubmit = async() =>{       
        
        const[type]=typeState;
        //const[price]=priceState;

        if(!type){
            return;
        }

        console.log("type")
        console.log(type)
        if(type=="KarS"){
            setPrice(types[0].price);
            console.log("price")
            console.log(price);
        }
        else if(type=="KarX"){
            setPrice(types[2].price);
            console.log("price")
            console.log(price);
        }
        else{
            setPrice(types[1].price);
            console.log("price")
            console.log(price);
        }


        //submit to server
        try{
            const userInfo = await Auth.currentAuthenticatedUser();
            console.log("user info");
            console.log(userInfo);
            console.log(originPlace)
            console.log(destinationPlace);
            console.log("price2")
            console.log(price)

            const date = new Date();
            
            const input = {
                createdAt: date.toISOString(),
                type,
                originLatitude: originPlace.details.geometry.location.lat,
                originLongitude: originPlace.details.geometry.location.lng,
                
                destLatitude: destinationPlace.lat,
                destLongitude: destinationPlace.lng,

                distance,
                price: price,

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

            console.log(response);
            navigation.navigate('OrderPage', {id: response.data.createOrder.id, originPlace, destinationPlace,})
           // Alert.alert("Hurraay", "Your order has been placed!",[{text:"Go home", onPress:() => navigation.navigate('Home')}])
        }
        catch(e){
            console.error(e);
        }
    }

    return(
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
        <View style={{height: Dimensions.get('window').height - 360}}>
            <RouteMap origin={originPlace} destination={destinationPlace} />
        </View>

        <View style={{height:400, marginTop: -27}}>
            <TransportTypes typeState={typeState} distance={distance} onSubmit={onSubmit}/>
        </View>
        </View>
    )
}

export default SearchResults;