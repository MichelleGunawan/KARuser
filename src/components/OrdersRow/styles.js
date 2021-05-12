import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth:1,
        borderColor: '#e4e4e4',
    },
    image:{
        height:50,
        width:50,
        resizeMode:'contain',
        marginRight: 15,
    },
    middleContainer:{
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    type:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
        color:"#000"
    },
    limit:{
        fontSize: 17
    },
    details:{
        color:'#a4a4a4',
        fontSize: 15
    },
    rightContainer:{
        width: 100,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 15
    },
    price:{
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 5
    },
    header:{
        fontSize: 20,
        marginBottom: 3,
        color:"#9cbe85",
        fontWeight: 'bold'
    }
});

export default styles;