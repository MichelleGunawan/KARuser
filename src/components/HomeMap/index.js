import React, {useState, useEffect} from "react";
import {View, Text, Image} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import {API, graphqlOperation} from 'aws-amplify';
import {listCars} from '../../graphql/queries';

//import cars from '../../assets/data/cars';

const HomeMap =(props) =>{
    const[cars, setCars] = useState([]);
    const[initialRegion, setInitialRegion] =useState(null);


    const fetchCars = async () => {
        try {
          const response = await API.graphql(
            graphqlOperation(
              listCars
            )
          )
          
          //console.log(response);

          setCars(response.data.listCars.items);
        } catch (e) {
          console.error(e);
        }
      };

      const getCurrentLocation= async (event) => {
        navigator.geolocation.getCurrentPosition(
            position => {
            let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: .12,
                    longitudeDelta: .10
                };
                setInitialRegion(region);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 1000
            }
        );
    }

    useEffect(() => {                        
        fetchCars();
        getCurrentLocation();
        }, [])

    const getImage = (type) => {
        if(type==='Kar')
        {
            return require('../../assets/images/top-kar.png')
        }
        if(type==='KarS')
        {
            return require('../../assets/images/top-karS.png')
        }
        if(type=="KarX")
        {
            return require('../../assets/images/top-karX.png')
        }
    }

    //console.log(initialRegion);
    //console.log(initialRegion.latitude);

    return(
        <MapView
        style={{width: '100%', height: '100%'}}
        provider={ PROVIDER_GOOGLE }
        showUserLocation={true}
        initialRegion={initialRegion}>

        {/* <Marker
            coordinate={{latitude: initialRegion.Latitude, longitude:initialRegion.Longitude}}
            title={'Current Location'}
            pinColor={"tan"}
            /> */}
            
         {cars.map((car)=>(
             <Marker key={car.id} coordinate={{ latitude : car.latitude,  longitude : car.longitude, }}>

             <Image 
             style={
                {width:45, height: 45, 
                resizeMode: 'contain',
                transform:[{
                    rotate:`${car.heading}deg`
                }]
                }} 
             source={getImage(car.type)}
             />
 
             </Marker>
         ))}          
                
        </MapView>
        
    )
}

export default HomeMap;