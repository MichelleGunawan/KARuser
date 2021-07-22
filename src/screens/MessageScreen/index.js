import React from "react";
import {View, Text, Dimensions} from "react-native";
import styles from './styles.js';

import DrawerButton from '../../components/DrawerButton';

const MessageScreen =(props) =>{
    return(
        <View style = {{}}>
        
            <DrawerButton/>
           

            <View style = {{width: '80%', marginLeft: 60, marginRight: 'auto', marginTop: 20, marginBottom: '5%'}}>
               <Text style = {{fontSize: 23, color: '#b5cc88', fontWeight: 'bold'}}>Message your KARGO driver: </Text>
            </View>

            <View style={{
                width: '90%', marginLeft: 'auto', marginRight: 'auto', 
                flexDirection: 'row', 
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                marginVertical: 4}}>
            <View>
                <Text style={{fontSize: 20, color: "#a0a0a0"}}>{'\u2022' + " "}</Text>
            </View>
            <View>
                <Text style={{fontSize: 18, color: "#a0a0a0"}}>Send your message to (951) 999 9029</Text>
            </View>
            </View>

            <View style={{
                width: '90%', marginLeft: 'auto', marginRight: 'auto', 
                flexDirection: 'row', 
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                marginVertical: 4}}>
            <View>
                <Text style={{fontSize: 20, color: "#a0a0a0"}}>{'\u2022' + " "}</Text>
            </View>
            <View>
                <Text style={{fontSize: 18, color: "#a0a0a0"}}>Make sure to include your username and three-digit order number of the corresponding order (found on the order screen) in the text</Text>
            </View>
            </View>

            <View style={{
                width: '90%', marginLeft: 'auto', marginRight: 'auto', 
                flexDirection: 'row', 
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                marginVertical: 4}}>
            <View>
                <Text style={{fontSize: 20, color: "#a0a0a0"}}>{'\u2022' + " "}</Text>
            </View>
            <View>
                <Text style={{fontSize: 18, color: "#a0a0a0"}}>Follow the format below to get your message to your KARGO driver {'\n'}</Text>
            </View>
            </View>
            
            

            <Text style = {{fontSize: 17, color: '#a0a0a0', marginLeft:27, marginBottom: -24}}>Text (657) 999-9029‬</Text>
            <View style = {{height: 120, width:'90%', marginLeft: '5%', marginTop: '5%', backgroundColor: '#e4e4e4', borderRadius:20, paddingTop: 10, paddingLeft: 80}}>
               <Text style = {{color: "#a0a0a0", fontSize: 15, margin: 'auto', marginTop: 5, marginBottom: 5}}>Username: ________________</Text>
               <Text style = {{color: "#a0a0a0", fontSize: 15, margin: 'auto', marginTop: 5, marginBottom: 5}}>Order Number: ____________</Text>
               <Text style = {{color: "#a0a0a0", fontSize: 15, margin: 'auto', marginTop: 5, marginBottom: 5}}>Message: _________________</Text>
            </View>
        </View>
    )
}

export default MessageScreen;
