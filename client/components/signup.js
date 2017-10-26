import React from 'react';
import {StatusBar,Image, StyleSheet, Text, View,TextInput,TouchableHighlight, Alert,AppRegistry,TouchableOpacity } from 'react-native';
// import sendNotification from "./components/sendNotification"
import {TabBar,SearchBar,Tabs, Tab, Icon,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';

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
        fetch('http:192.168.2.99:1128/consumerSignup', {//192.168.1.7
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
             


            <Image style={styles.container}
            source = {require('../images/login3.jpg')}
            >

            <StatusBar
            backgroundColor ="#DF5900"
            />

           

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
                    >SIGNUP</Text>
                </TouchableHighlight>
            </Image>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7B50C',
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
