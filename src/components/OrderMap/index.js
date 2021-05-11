import React from "react";
import { Image } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBkqeiDhW2DiRb_tZfrueJnyJFc2LecSgY'

const OrderMap = ({ car, origin, destination }) => {

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

    const [region,setRegion] = React.useState(null);
   
    React.useEffect(()=>{
        const originLocation=
        {
            latitude: origin.details.geometry.location.lat,
            longitude: origin.details.geometry.location.lng,
        }

        const destinationLocation={
            latitude: destination.lat,
            longitude: destination.lng,
        }        

        let mapRegion = {
            latitude: (originLocation.latitude + destinationLocation.latitude)/2,
            longitude: (originLocation.longitude + destinationLocation.longitude)/2,
            latitudeDelta: Math.abs(originLocation.latitude-destinationLocation.latitude)*2,
            longitudeDelta: Math.abs(originLocation.longitude - destinationLocation.longitude)*2,
        }
    
        setRegion(mapRegion);
    },[])

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={region}>
          {/* <MapViewDirections
            origin={{
                latitude: origin.details.geometry.location.lat,
                longitude: origin.details.geometry.location.lng}}
            destination={{
                latitude: destination.lat,
                longitude: destination.lng}}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#9cbe85"
            />  */}
            <Marker
            coordinate={{latitude: destination.lat,
                longitude: destination.lng}}
            title={"Destination"}
            pinColor={"tan"}
            />

      {car && (<Marker
        coordinate={{latitude: car.latitude, longitude: car.longitude}}
      >
        <Image
          style={{
            width: 70,
            height: 70,
            resizeMode: 'contain',
            transform: [{
              rotate: `${car.heading}deg`
            }]
          }}
          source={getImage(car.type)}
        />
      </Marker>)}
    </MapView>
  );
};

export default OrderMap;