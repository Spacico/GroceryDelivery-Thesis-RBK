import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    AppRegistry,Alert
} from 'react-native';

import Signup from './Components/Signup';
import Login from './Components/Login';
import Getlists from './Components/getlists';
import PushNotification from 'react-native-push-notification'
import SocketIOClient from 'socket.io-client';
export default class App extends Component {
    constructor(props) {

        super(props);

        this.state = {
            flag: 'main',
            lists:[]
        };
        this.socket = SocketIOClient('http://192.168.1.4:1128',{jsonp:false});
         this.socket.on('sendlist',() => {
            //Alert.alert('message arrive')
            PushNotification.localNotification({
                message: "there is new consumer" })
          //   //alert('lest')
           })
        //alert('xx')
        
  //var oldMessages = this.state.messages;
  // React will automatically rerender the component when a new message is added.
  //this.setState({ messages: oldMessages.concat(message) });

        //alert(this.socket)
    }
    changeFlag(sth) {
        this.setState({ flag: sth });
    }
    componentDidMount() {
       
        //alert(this.socket.on)
        
    
                
    //     // //alert('inside the mount')
    //     // setInterval(function(){ fetch('http:192.168.1.4:5000/checkAvailableLists')
    //     //     .then(response => response.json())
    //     //     .then(data => {
    //     //         // if(this.state.lists.length>data.length)
    //     //         // length=this.state.lists.length;
    //     //         // else
    //     //         //     length=data.length;
    //     //         // for(var i=0;i<length;i++){
    //     //         //     if(this.state.lists.indexOf(data[i])===-1){
    //     //         //         newData.push(data[i]);
    //     //         //     }
    //     //         // }
    //     //         if(data.length != this.state.lists.length){
    //     //             PushNotification.localNotification({

    //     //             message: "there is nwe consumer" })
    //     //         }
    //     //         this.setState({ lists: data });

    //     //     })
    //     //     .catch(err => {
    //     //         throw err;
    //     //     }); }, 3000);
        

            };
    
    
    render() {

        if (this.state.flag === 'main') {
            return (
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.changeFlag('signup');
                            }}
                        >
                            <Text style={styles.buttonText}>SIGNUP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.changeFlag('login');
                            }}
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <View />
                    </View>
                </View>
            );
        } else if (this.state.flag === 'login') {
            return <Login changeFlag={this.changeFlag.bind(this)} />;
        } else if (this.state.flag === 'signup') {
            return <Signup changeFlag={this.changeFlag.bind(this)} />;
        } else if (this.state.flag === 'getLists') {
            return <Getlists changeFlag={this.changeFlag.bind(this)} />;
        }
    }
}

AppRegistry.registerComponent('App', () => App);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    content: {
        alignItems: 'center'
    },
    logo: {
        color: 'white',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textShadowColor: '#252525',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 15,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        margin: 20,
        marginBottom: 0,
        padding: 20,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 20,
        padding: 20,
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    input: {
        fontSize: 16,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)'
    }
});
