import React from "react";
import {View, Text, Image, Pressable, ScrollView} from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign';
import OrderRow from './Row';
import styles from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";

import Row from './Row';

const OrdersRow =({orders, orderState, onSubmit}) =>{

    console.log("orders here")
    console.log(orders)
    // const[selectedType, setSelectedType] = typeState;

    const[selectedType, setSelectedType] = orderState;

    const getImage = (order) => {
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

    const handlePress = (order) => {
        setSelectedType(order); 
        console.log("selected type");
        console.log(selectedType)
        onSubmit(order);
    }
        

    return(
        <View>
            <View style={[styles.container, {padding: 5, backgroundColor: '#ddd'}]}>
            
            <View style={[styles.middleContainer], {paddingLeft: 40}}>
                <Text style={styles.header}>Order Details</Text>
            </View>

            <View style={[styles.rightContainer, {paddingRight: 5}]}>
                <Text style={styles.header}>Status</Text>
            </View>

            </View>

            <ScrollView>
                {orders.map(order => 
                <Row 
                order={order}
                key={order.id} 
                isSelected={order===selectedType}
                onPress={() => {handlePress(order)}}
            />
                )}
            </ScrollView>
            
        </View>
    )
}

export default OrdersRow;