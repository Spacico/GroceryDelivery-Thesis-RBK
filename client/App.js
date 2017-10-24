/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,Platform,View,StyleSheet,TouchableHighlight,Text
} from 'react-native';

import MapView from 'react-native-maps';
import SendNotification from './components/sendNotification'
import Login from './components/login';
import Signup from './components/signup';
const {width,height}=Dimensions.get('window');
const ASPECT_RATION=width/height;
const LONGTUDEDELTA=0.922*ASPECT_RATION
export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//       </View>
//     );
//   }
// }



  constructor(props) {
    super(props);
    //alert(MapView.Marker());
    this.state = {
       flag: 'main',
      latitude: 31.9863,
      longitude: 35.8375,
      error: null
    };
  }
changeFlag (component) {
        this.setState({flag: component});
    }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null
  //       });
  //     },
  //     (error) => this.setState({ error: error.message }),
  //     { enableHighAccuracy: true, timeout: 200}
  //   );
  // }

  render() {
   if (this.state.flag === 'mapview'){
    return (
        <View style ={styles.container}>

          <MapView
            onPress = {(e) => {
              this.setState({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              })
              alert('latitude:' + this.state.latitude + '   longitude' + this.state.longitude)
            }}
              style={styles.map}
              region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.04999
          }}
          >
          <MapView.Marker coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}/>


          </MapView>
        </View>
);
       }else if (this.state.flag === 'main')
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

// let { width, height } = Dimensions.get('window');
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
    width: width,
    height: height,
  },
});


 
 
