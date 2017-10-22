import React from 'react';
import {Image, StyleSheet, Text, View,TextInput, Button,TouchableHighlight, Alert,AppRegistry,TouchableOpacity } from 'react-native';
// import sendNotification from "./components/sendNotification"


 export default class signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeFlag: props.changeFlag,
      userName : '',
      password : ''
    }
  }


  onClickButton(){
        fetch('http:192.168.2.57:1128/login', {//192.168.1.7
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

        this.state.changeFlag('main');
    }


  render() {
    return (
      <View  KeyboardAvoidingView behavior="padding" style={styles.container}>
             <View style = {styles.logoContainer}>
            <Image 
            style = {styles.logo}
            source = {require('../images/Grocery.png')}
            />
            <Text
            style = {styles.title}
            > Grocery Shop</Text>
            </View>

            <TextInput 
                    onChangeText = {(val) => this.setState({userName : val})}
                    style = {styles.input} placeholder = 'userName'
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                />

                <TextInput 
                    onChangeText = {(val) => this.setState({password : val})}
                    style = {styles.input} placeholder = 'password'
                    secureTextEntry
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                />

                <TouchableHighlight
                    onPress={
                        this.onClickButton.bind(this)
                    }
                > 
                    <Text
                    style = {styles.buttonText}
                    >SIGNUP</Text>
                </TouchableHighlight>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor : "#ccc",
    width : 90 ,
    height : 40,
    justifyContent : "center",
    elevation : 8,
  },
  input: {
        width : 200 ,
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
    fontWeight : "700"
}
  
});
