import React, { Component } from 'react';
import {Menu, Modal, StyleSheet, TouchableHighlight, View, Text, AppRegistry, Button } from 'react-native';
const SideMenu = require('react-native-side-menu');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: ''
        };
    }
    getCurrentList () {
      return fetch('http:192.168.2.90:1128/checkCurrentList')
        .then(response => response.json())
        .then(data => {
            this.setState({ list: data });
        })
        .catch(err => {
            throw err;
        });
    }

    render()
    const menu = <Menu navigator={navigator}/>;
        return (
          <SideMenu menu={menu}>
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to React Native!
              </Text>
              <Text style={styles.instructions}>
                To get started, edit index.ios.js
              </Text>
              <Text style={styles.instructions}>
                Press Cmd+R to reload,{'\n'}
                Cmd+Control+Z for dev menu
              </Text>
            </View>
          </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center'
  },
  listInfoContainer: {
    backgroundColor: '#B5B5B5',
    padding: 5,
    margin: 5
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

AppRegistry.registerComponent('Profile', () => Profile);
