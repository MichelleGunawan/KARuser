import React from "react";
import {View, Image, Text, Pressable} from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import { useRoute, useNavigation } from '@react-navigation/native';


const Row =(props) =>{
    // console.log("props")
    // console.log(props);

    const{order, isSelected, onPress} = props;

    console.log("order")
    console.log(order)

    const getImage = () => {
        if(order.type==='Kar')
        {
            return require('../../assets/images/kar.png')
        }
        if(order.type==='KarS')
        {
            return require('../../assets/images/karS.png')
        }
        if(order.type=="KarX")
        {
            return require('../../assets/images/karX.png')
        }
    }

    // const onPress = (order) => {
    //     const originPlace = {
    //         latitude: order.originLatitude,
    //         longitude: order.originLongitude
    //     }

    //     const destinationPlace = {
    //         latitude: order.destLatitude,
    //         longitude: order.destLongitude
    //     }

    //     navigation.navigate('OrderPage', {id: order.id, originPlace, destinationPlace,})
    // }

    return(
        <Pressable
        onPress={onPress}
        style={[styles.container, {backgroundColor: isSelected?'#efefef':'#f4f4f4'}]}
        >
            <Image 
            style={styles.image} 
            source={getImage()}
            />
            
            <View style={styles.middleContainer}>
                <Text style={styles.details}>
                    {(order.distance).toFixed(1)} mi    ${(order.price).toFixed(2)}
                </Text>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.details}>
                    {order.status}
                </Text>
            </View>
        </Pressable>
    )
}

export default Row;