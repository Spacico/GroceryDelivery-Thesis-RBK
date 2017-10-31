import React from 'react';
import {Image,Dimensions,Platform,View,StyleSheet,TouchableHighlight,Text} from 'react-native';
import MapView from 'react-native-maps';


const {width,height}=Dimensions.get('window');
const ASPECT_RATION=width/height;
const LONGTUDEDELTA=0.922*ASPECT_RATION

export default class Mapo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          changeFlag: props.changeFlag,
          listLocation: props.listLocation,
  	      error: null
          // getLocation: this.props.getLocation,
          // changeLocation: this.props.changeLocation
        };
    }

    render() {
        return (
          <View style ={styles.container}>
            <MapView
               style={styles.map}
               region={{
                 latitude: this.state.getLocation().latitude,
                 longitude: this.state.getLocation().longitude,
                 latitudeDelta: 0.0009,
                 longitudeDelta: 0.04999,
               }}
               onPress = {(e) => {
                 this.state.changeLocation({
                 	latitude: e.nativeEvent.coordinate.latitude,
                   longitude: e.nativeEvent.coordinate.longitude
               })
              }}
             >
             <MapView.Marker coordinate={{latitude:this.state.listLocation.latitude,longitude:this.state.listLocation.longitude}}/>
             <MapView.Marker coordinate={{latitude:this.state.getLocation().latitude,longitude:this.state.getLocation().longitude}} pinColor="green"/>

             </MapView>
           </View>
        );
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
    height: height,
  },
  arrow:{
    width: 40,
    height: 20,
  }
});
