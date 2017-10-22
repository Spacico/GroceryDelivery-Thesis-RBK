/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor (props) {
    super (props);
    
    this.socket = io('http://192.168.1.7:1128', {jsonp: false});
    this.state = {
      texto: 'Hi all!'
    }
  }
  socketManager () {
    this.setState({'texto':'Hi nobody!'})
    this.socket.emit ('texto', this.state.texto);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => {
          this.socketManager ();
        }} 
          title={this.state.texto}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
