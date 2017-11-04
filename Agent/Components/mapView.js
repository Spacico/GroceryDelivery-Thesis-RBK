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
          latitude: props.latitude,
  	      longitude: props.longitude,
  	      changeLocation:props.changeLocation,
  	      getLocation: props.getLocation,
          listLocation: props.listLocation,
  	      error: null
        };
    }

    render() {
        return (
          <View style ={styles.container}>
            <MapView
               style={styles.map}
               region={{
                 latitude: this.state.listLocation.latitude,
                 longitude: this.state.listLocation.longitude,
                 latitudeDelta: 0.0009,
                 longitudeDelta: 0.04999,
               }}
             >
                <MapView.Marker coordinate={{latitude:this.state.listLocation.latitude,longitude:this.state.listLocation.longitude}}/>

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
