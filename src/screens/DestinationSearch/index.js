import React, {useEffect, useState} from "react";
import {View, Text, TextInput, SafeAreaView, Pressable} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';

import styles from './styles.js';
import PlaceRow from'./PlaceRow';


const homePlace = {
description: 'Home',
geometry: { location: { lat: 34.068921, lng: -118.4451811 } },
};
const workPlace = {
description: 'Work',
geometry: { location: { lat: 34.0099, lng: -118.4960 } },
};
  

const DestinationScreen =(props) =>{
    const[originPlace, setOriginPlace] = useState(null);
    const[destinationPlace, setDestinationPlace]=useState(null)

    const [message, onChangeMessage] = React.useState(" ");

    const navigation = useNavigation();

    const checkNavigation = () => {
        if(originPlace && destinationPlace){
            navigation.navigate('SearchResults',{originPlace,destinationPlace,});
        }
    }

    const goToResults = () => {
        console.log("pressed");
        console.log(message);
        if(originPlace && destinationPlace){
            navigation.navigate('SearchResults',{originPlace,destinationPlace, message});
        }
    }

    // useEffect(() => {
    //     checkNavigation();
    //   }, [originPlace, destinationPlace]);

    return(
        <SafeAreaView>
            <View style={styles.container}>         

            <GooglePlacesAutocomplete
            placeholder="Where From?"
            onPress={(data, details = null) => {
                setOriginPlace({data, details});
            }}

            suppressDefaultStyles
            styles={{
                textInput: styles.textInput,
                container:styles.autocompleteContainer,
                listView:styles.listView
                
            }} 
            enablePoweredByContainer={false}
            
            fetchDetails={true}
            query={{
                key: 'AIzaSyBkqeiDhW2DiRb_tZfrueJnyJFc2LecSgY',
                language: 'en',
            }}
            
            currentLocation={true}
            currentLocationLabel='Current location'
            
            renderRow={(data) => <PlaceRow data={data}/>}
            renderDescription={(data) => data.description || data.vicinity}
            predefinedPlaces={[homePlace]}
            // ,workPlace
            />

            <GooglePlacesAutocomplete
            placeholder="Where To?"
            onPress={(data, details = null) => {
                setDestinationPlace(details.geometry.location);
            }}

            suppressDefaultStyles
            styles={{
                textInput: styles.textInput,
                container:{
                    ...styles.autocompleteContainer,
                    top:65,
                },
                listView:{...styles.listView, top: 118}
            }}             
            enablePoweredByContainer={false}

            fetchDetails={true}
            query={{
                key: 'AIzaSyBkqeiDhW2DiRb_tZfrueJnyJFc2LecSgY',
                language: 'en',
            }}
            
            currentLocation={true}
            currentLocationLabel='Current location'
            renderRow={(data) => <PlaceRow data={data}/>}
            renderDescription={(data) => data.description || data.vicinity}
            predefinedPlaces={[homePlace]}
            // ,workPlace
           />

            <View style = {{top: 100, marginLeft: 15, marginRight: 30}}>
            <TextInput
                placeholder="Message (optional)"
                placeholderTextColor="#909090"
                style={styles.inputBox}
                onChangeText={onChangeMessage}
                // value={message}                
            />
            </View>


            {/* cicle */}
            <View style={styles.circle}/>
            {/* line */}
            <View style={styles.line}/>
            {/* square */}
            <View style={styles.square}/>

            {/* go triangle */}
            <Pressable style={styles.go} onPress={goToResults}/>
            
            
            </View>
        </SafeAreaView>        
    )
}

export default DestinationScreen;