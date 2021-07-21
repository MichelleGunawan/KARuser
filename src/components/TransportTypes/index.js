import React, {useState} from "react";
import {View, Text, Pressable, TextInput} from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign';
import TransportTypeRow from '../TransportTypeRow'

import types from '../../assets/data/types';

const TransportTypes =({typeState, distance, onSubmit, tip, setTip}) =>{

    const[selectedType, setSelectedType] = typeState;

    // console.log(tip, setTip)

    const[giveTip, setGiveTip] = useState(false);
    const leaveTip = () => {
        setGiveTip(!giveTip);
    }

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

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                
            {giveTip? 

            <View style ={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 0, margin: 10, alignItems: 'center', width: '40%', borderWidth: 0.2, borderColor:'#b5cc88', borderRadius: 5}}> 
            <TextInput 
            style={{width: '100%', height: 40, backgroundColor: '#eee', borderRadius: 5, color: '#b5cc88'}}
            placeholder="Tip Amount: "
            placeholderTextColor="#b5cc88"
            value={tip}
            onChangeText={setTip}
            keyboardType='numeric'
            ></TextInput>
            </View>

            :
            
            <Pressable 
            onPress={leaveTip} 
            style={{backgroundColor:'#b5cc88', padding: 10, margin: 10, alignItems:'center', width: '40%', borderRadius: 5}}>
                <Text style={{color:"white", fontWeight: 'bold'}}>
                    Leave a Tip!
                </Text>
            </Pressable> 

            }
               
                
                              
            
                <Pressable 
            onPress={onSubmit} 
            style={{backgroundColor:'#b5cc88', padding: 10, margin: 10, alignItems:'center', width: '40%', borderRadius: 5}}>
                <Text style={{color:"white", fontWeight: 'bold'}}>
                    Confirm KÄR
                </Text>
            </Pressable>
            </View>
            
            
        </View>
    )
}

export default TransportTypes;