import React from 'react';
import { Image,View,StyleSheet,TouchableHighlight,Text,TextInput} from 'react-native';
import SendNotification from './sendNotification'


export default class login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changeFlag: props.changeFlag,
            consumerName : '',
            password : '',
            list:''
        };
    }

    //http:192.168.1.2:1128/consumerLogin //osama

    onClickButton(){
        fetch('http:192.168.8.124:1128/login', {//192.168.1.7
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                this.state    
            )
        }).then (() => {})
            .catch(()=>{
                
            }); 

        this.state.changeFlag('sendNotification');
    }

    render() {
        return (
            <View style={styles.container}>
            <View style = {styles.logoContainer}>
            <Image 
            style = {styles.logo}
            source = {require('../images/Grocery.png')}
            />
            <Text
            style = {styles.title}
            > Grocery Shop</Text>
            
                   <Text> </Text>
    
                <TextInput 
                    onChangeText = {(val) => this.setState({consumerName : val})}
                    style = {styles.input} placeholder = 'consumerName'
                />

                <TextInput 
                    onChangeText = {(val) => this.setState({password : val})}
                    style = {styles.input} placeholder = 'password'
                    secureTextEntry
                />


                <TouchableHighlight
                    onPress={
                        this.onClickButton.bind(this)
                    }
                > 
                    <Text
                    >Log In</Text>
                </TouchableHighlight>
</View>
            </View>
        );
    }
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


