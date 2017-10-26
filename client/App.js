/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
 Image,Dimensions,Platform,View,StyleSheet,TouchableHighlight,Text
} from 'react-native';

import { SearchBar,Tabs, Tab, Icon,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';
import SendNotification from './components/sendNotification'
import Login from './components/login';
import Signup from './components/signup';
import Mapview from './components/mapView';


export default class App extends Component {

  constructor(props) {
    super(props);
    //alert(MapView.Marker());
    this.state = {
       flag: 'main',
      error: null,
      latitude:31.9863,
      longitude:35.8375,
      selectedTab: 'profile'
    };
  }
changeFlag (component) {
        this.setState({flag: component});
    }
    changeLocation(obj){
      alert(this.state.latitude)
        this.setState({
            latitude:obj.latitude,
            longitude:obj.longitude
        })
    }

getLocation () {
  return {latitude: this.state.latitude, longitude: this.state.longitude}
}

changeTab (selectedTab) {
  this.setState({selectedTab})
}

  render() {

    const { selectedTab } = this.state
   if (this.state.flag === 'mapview'){
    return (
        <Mapview 
          changeLocation = {this.changeLocation.bind(this)} 
          changeFlag = {this.changeFlag.bind(this)} 
          latitude = {this.state.latitude}
          longitude = {this.state.longitude}
          getLocation = {this.getLocation.bind(this)}
        />
);
       }else if (this.state.flag === 'main')
        {
            return (
                <View style={styles.container}>
<SearchBar
  noIcon
  // onChangeText={someMethod}
  placeholder='Type Here...' />

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
                <SendNotification 
                  changeLocation = {this.changeLocation.bind(this)} 
                  changeFlag = {this.changeFlag.bind(this)} 
                  latitude = {this.state.latitude} 
                  longitude = {this.state.longitude}/>
            );
        }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: 1000,
    // height: height,
  },
  arrow:{
    width: 40,
    height: 20,
  }
});


 
 
