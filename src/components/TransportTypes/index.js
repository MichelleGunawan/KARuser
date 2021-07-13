import React from "react";
import {View, Text, Pressable} from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign';
import TransportTypeRow from '../TransportTypeRow'

import types from '../../assets/data/types';

const TransportTypes =({typeState, distance, onSubmit}) =>{

    const[selectedType, setSelectedType] = typeState;


    return(
        <View>
            {types.map(type => 
            <TransportTypeRow 
            type={type} 
            distance = {distance}
            key={type.id} 
            isSelected={type.type===selectedType}
            onPress={() => {setSelectedType(type.type)}}
            />
            )}
            
            <Pressable 
            onPress={onSubmit} 
            style={{backgroundColor:'#b5cc88', padding: 10, margin: 10, alignItems:'center'}}>
                <Text style={{color:"white", fontWeight: 'bold'}}>
                    Confirm KÄR
                </Text>
            </Pressable>
        </View>
    )
}

export default TransportTypes;