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
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
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
      latitude: 31.9863,
      longitude: 35.8375,
      error: null
    };
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

  render() {
   
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
            latitude: 31.9863,
            longitude: 35.8375,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.04999
          }}
          >
          <MapView.Marker coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}/>


          </MapView>
        </View>
    );
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


 
 
