import React from 'react';
import { Image,Dimensions,Platform,View,StyleSheet,TouchableHighlight,Text} from 'react-native';
import SendNotification from './sendNotification'
import MapView from 'react-native-maps';


const {width,height}=Dimensions.get('window');
const ASPECT_RATION=width/height;
const LONGTUDEDELTA=0.922*ASPECT_RATION

export default class login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          changeFlag: props.changeFlag,
          latitude: props.latitude,
	      longitude: props.longitude,
	      changeLocation:props.changeLocation,
	      getLocation: props.getLocation,
	      error: null
        };
    }


    
    render() {
        return (
             <View style ={styles.container}>
        <TouchableHighlight 
                        style = {styles.addButton}
                        onPress = {() => {
                            this.state.changeFlag('sendNotification');
                        }}
                    >
                      <Image 
            style = {styles.arrow}
            source = {require('../images/arrow.png')}
            
            />  
                    </TouchableHighlight>
        
          <MapView
            onPress = {(e) => {
              this.state.changeLocation({
              	latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
            })
              
              alert('latitude:' + this.state.getLocation().latitude + '   longitude' + this.state.getLocation().longitude)
            }}
              style={styles.map}
              region={{
	            latitude: this.state.latitude,
	            longitude: this.state.longitude,
	            latitudeDelta: 0.000922,
	            longitudeDelta: 0.04999
          }}
          >
          <MapView.Marker coordinate={{latitude:this.state.getLocation().latitude,longitude:this.state.getLocation().longitude}}/>


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



