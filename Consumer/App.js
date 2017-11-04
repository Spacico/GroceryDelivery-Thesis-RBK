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
import About from './components/aboutUs';
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
            source = {require('./images/login3.jpg')}
            >

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
  <Text>{'\n'}</Text>


                    <TouchableHighlight 
                        style = {styles.addButton}
                        onPress = {() => {
                            this.changeFlag('signup');
                        }}
                    >
                        <Text>SIGN UP</Text>
                    </TouchableHighlight>
  <Text>{'\n'}</Text>
                      <TouchableHighlight 
                        style = {styles.addButton}
                        onPress = {() => {
                            this.changeFlag('about');
                        }}
                    >
                        <Text>ABOUT US</Text>
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
        }else if (this.state.flag === 'about') {
            return (
                <About 
                  
                  changeFlag = {this.changeFlag.bind(this)} 
                  />
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
  addButton:{
     width: 300,
        height : 40,
        backgroundColor:"#DF5900",
       //  // color:"#FFFFFF",
       alignItems : "center",
       justifyContent: 'center',
       // fontWeight : "700"
  }
  // profile :{
  // // marginTop:0,
   
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // position: 'absolute',
  //    // bottom: 0
  // },
  // img:{
  //   // backgroundColor: '#F7B50C',
  // width: 100,
  //   height: 150,
  //   position: 'absolute',
  //   top: 252,
  //   left: 314,
  // },
  // sign:{
  //   width: 50,
  //   height: 50,
  //   top: 60,
  //   left: -10,

  // },
  // log:{
  //   // backgroundColor: '#F7B50C',
  //   width: 50,
  //   height: 50,
  //   // position: 'absolute',
  //   // top: -180,
  //   // left: 150,
  // },
  // about:{
  //   width: 50,
  //   height: 50,
  //   // top: -350,
  //   // left: 5,
  // },
  // location:{
  //    width: 50,
  //   height: 50,
  //   // top: -295,
  //   // left: 5,
  // },
  // touch:{
  //   flex:1
  // }

});


 
 
