import React from "react";
import {View, Image, Text, Pressable} from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';


const TransportTypeRow =(props) =>{
    console.log(props);
    const{type, distance, onPress, isSelected} = props;

    // console.log("transport distance")
    // console.log(distance)

    const getImage = () => {
        if(type.type==='Kar')
        {
            return require('../../assets/images/kar.png')
        }
        if(type.type==='KarS')
        {
            return require('../../assets/images/karS(white).png')
        }
        if(type.type=="KarX")
        {
            return require('../../assets/images/karX(white).png')
        }
    }

    return(
        <Pressable 
        onPress={onPress} 
        style={[styles.container, {backgroundColor: isSelected?'#efefef':'#fff'}]}
        >
            <Image 
            style={styles.image} 
            source={getImage()}
            />
            
            <View style={styles.middleContainer}>
                <Text style={styles.type}>
                    {type.type} {' '}
                    <Feather name={'package'} size={17}/>
                    <Text style={styles.limit}>{type.limit}</Text>
                </Text>
                <Text style={styles.time}>
                    {distance.toFixed(1)} mi
                </Text>
            </View>

            <View style={styles.rightContainer}>
                <Ionicons name={'pricetag'} size={18} color={'#b5cc88'}/>
                <Text style={styles.price}>est ${Number((type.price*distance)+1).toFixed(2)}</Text>
            </View>
        </Pressable>
    )
}

export default TransportTypeRow;