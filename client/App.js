import React from 'react';
import { View,StyleSheet,TouchableHighlight,Text} from 'react-native';
import SendNotification from './components/sendNotification'
import Login from './components/login';
import Signup from './components/signup';
// import {AppIntro} from 'react-native-app-intro';


export default class App extends React.Component {
    constructor(props) {
        super (props);
  
        this.state = { 
            flag: 'main'
        };
    }

    changeFlag (component) {
        this.setState({flag: component});
    }

    render() {

         if (this.state.flag === 'main')
        {
            return (
                <View style={styles.container}>
                    <TouchableHighlight 
                        style = {styles.addButton}
                        onPress = {() => {
                            this.changeFlag('login');
                        }}
                    >
                        <Text>LOGIN</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style = {styles.addButton}
                        onPress = {() => {
                            this.changeFlag('signup');
                        }}
                    >
                        <Text>SIGN UP</Text>
                    </TouchableHighlight>
                </View>
            );
        }else if (this.state.flag === 'login') {
            return (
                <Login changeFlag = {this.changeFlag.bind(this)}/>
            );
        }else if (this.state.flag === 'signup') {
            return (
                <Signup changeFlag = {this.changeFlag.bind(this)}/>
            );
        }else if (this.state.flag === 'sendNotification') {
            return (
                <SendNotification changeFlag = {this.changeFlag.bind(this)}/>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8B0000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor : '#ccc',
        width :410 ,
        height : 40,
        justifyContent : 'center',
        elevation : 8,
    },
    signup :{
        width : 300 ,
        height : 100
    }
  
});

