import React from 'react';
import { Image,View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
import SendNotification from './sendNotification'
import List from './list'


export default class login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changeFlag: props.changeFlag,
            obj : "" 
                  };
    }
    render() {
        return (
          <View>
               <Text>
                 {this.state.obj}
               </Text>
                </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor : '#ccc',
        width : 90 ,
        height : 40,
        justifyContent : 'center',
        elevation : 8,
    },
    input: {
        width: 200,
        height : 40,
        marginBottom : 20,
        color : "#FFF",
        paddingHorizontal : 10
    },
    logoContainer :{
        alignItems : 'center',
        flexGrow : 1,
        justifyContent : 'center'
    },
    logo : {
        width: 200,
        height:100
    },
    title: {
        color : '#FFF',
        marginTop:10,
        textAlign:'center',
        opacity:.5
    },
    buttonText :{
    textAlign:'center',
    color : "#FFFFFF",
    fontWeight : "700",
    opacity:.02
}
});


