/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import Sidebar from 'react-sidebar';
import {StatusBar,Image, StyleSheet, Text, View,TextInput,TouchableHighlight, Alert,AppRegistry,TouchableOpacity } from 'react-native';
// import sendNotification from "./components/sendNotification"
// import OffCanvas3D from '../offcanvas3d'
import {Icon,TabBar,SearchBar,Tabs, Tab,SideMenu, List, ListItem } from 'react-native-elements'
import {Header,Container, Button } from 'native-base';

import React, { Component } from 'react';
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

componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //alert(position.coords.latitude)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200}
    );
  }

changeTab (selectedTab) {
  this.setState({selectedTab})
}

  render() {

     var sidebarContent = <b>Sidebar content</b>;

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

  <Image style={styles.containerImg}
            source = {require('./images/login.jpg')}
            >

<View style={styles.profile}>
            <Image style={styles.img}
            source = {require('./images/profile.png')}
            />
</View>

            <StatusBar
            backgroundColor ="#000000"
            />

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
                    </Image>
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
    height: 1000,
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
  },
  containerImg:{
     flex: 1,
    backgroundColor: '#F7B50C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile :{
  // marginTop:0,
   
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
     // bottom: 0
  },
  img:{
  width: 200,
    height: 200,
  }
});


 
 
