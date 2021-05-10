import React from "react";
import {View, Text, Image, FlatList} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBkqeiDhW2DiRb_tZfrueJnyJFc2LecSgY'

const RouteMap =({origin, destination}) =>{
    const [originLoc, setOriginLoc] = React.useState(null);
    const [destinationLoc, setDestinationLoc] = React.useState(null);
    const [region,setRegion] = React.useState(null);
    console.log("origin")
    console.log(origin);
    console.log("destination")
    console.log(destination);

    console.log("origin lat")
    console.log(origin.details.geometry.location.lat)
    console.log("origin lng")
    console.log(origin.details.geometry.location.lng)


    React.useEffect(()=>{
        const originLocation=
        {
            // latitude: 28.450627,
            // longitude: -16.263045,
            // latitude: 33.4936391,
            // longitude: -117.1483648,
            latitude: origin.details.geometry.location.lat,
            longitude: origin.details.geometry.location.lng,
        }

        const destinationLocation={
            // latitude: 28.450827,
            // longitude: -16.263945,
            // latitude: 33.5539143,
            // longitude: -117.2139232,
            latitude: destination.lat,
            longitude: destination.lng,
        }        

        let mapRegion = {
            latitude: (originLocation.latitude + destinationLocation.latitude)/2,
            longitude: (originLocation.longitude + destinationLocation.longitude)/2,
            latitudeDelta: Math.abs(originLocation.latitude-destinationLocation.latitude)*2,
            longitudeDelta: Math.abs(originLocation.longitude - destinationLocation.longitude)*2,
        }
    
        setOriginLoc(originLocation);
        setDestinationLoc(destinationLocation);
        setRegion(mapRegion);
    },[])

    return(
        <MapView
        style={{width: '100%', height: '100%', flex:1}}
        provider={ PROVIDER_GOOGLE }
        showsUserLocation={true}
        initialRegion={region}>     
            <MapViewDirections
            origin={originLoc}
            destination={destinationLoc}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#9cbe85"
            /> 
            <Marker
            coordinate={originLoc}
            title={'Origin'}
            pinColor={"tan"}
            />
            <Marker
            coordinate={destinationLoc}
            title={"Destination"}
            pinColor={"tan"}
            />
        </MapView>
        
    )
}

export default RouteMap;