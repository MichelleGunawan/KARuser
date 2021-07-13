import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        padding: 10,
        height: '100%',
    },
    textInput:{
        padding: 10,
        backgroundColor: "#ddd",
        marginVertical: 5,
        marginLeft: 25
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    iconContainer:{
        backgroundColor: '#b5cc88',
        borderRadius: 50,
        padding: 5,
        marginRight: 15,

    },
    locationText:{

    },
    listView:{
        position:'absolute',
        top: 173,

    },
    autocompleteContainer:{
        position: 'absolute',
        top:10,
        left: 10,
        right: 10
    },

    circle:{
        backgroundColor:'#b5cc88',
        width: 10,
        height: 10,
        position: 'absolute',
        top: 32,
        left:12,
        borderRadius: 50
    },
    line:{
        backgroundColor:'#b5cc88',
        width: 1,
        height: 60,
        position: 'absolute',
        top: 32,
        left:16,
    },
    square:{
        backgroundColor:'#b5cc88',
        width: 10,
        height: 10,
        position: 'absolute',
        top: 92,
        left:12,

    },
    go:{
        top: 57,
        left: '94.5%',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 13,
        borderRightWidth: 13,
        borderBottomWidth: 21,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor:'#b5cc88',
        transform: [
            { rotate: '90deg' }
        ],
        margin: 0,
        marginLeft: -6,
        borderWidth: 0,
    },
    inputBox:{
        backgroundColor: "#ddd",
        height: 50,
        padding: 10,
        margin:10,
        marginTop: 17,
        flexDirection: 'row', //line contents horizontally
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});

export default styles;