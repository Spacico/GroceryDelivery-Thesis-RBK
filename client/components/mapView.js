import React from 'react';
import { StatusBar , Image,Dimensions,Platform,View,StyleSheet,TouchableHighlight,Text} from 'react-native';
import SendNotification from './sendNotification'
import MapView from 'react-native-maps';
import {TabBar,SearchBar,Tabs, Tab, Icon,SideMenu, List, ListItem } from 'react-native-elements';



const {width,height}=Dimensions.get('window');
const ASPECT_RATION=width/height;
const LONGTUDEDELTA=0.922*ASPECT_RATION

export default class mapView extends React.Component {
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

            <StatusBar
            backgroundColor ="#3A5F0B"
            />

 <View style={styles.m}>
        
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
<View style={styles.tab}>
          <Tabs style={styles.tabs} >

  <Tab
    titleStyle={{fontWeight: 'bold', fontSize: 10 }}
    renderIcon={() => <Icon containerStyle={{ justifyContent: 'center', alignItems: 'center'}} color={'#000000'} name='home' size={40} />}
    renderSelectedIcon={() => <Icon  color={'#000000'} name='home' size={50} />}
   onPress={()=>{this.state.changeFlag('main')}}
   >
  </Tab>
  <Tab
    titleStyle={{fontWeight: 'bold', fontSize: 10}}
    // selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
    // selected={selectedTab === 'profile'}
    // title={selectedTab === 'profile' ? 'PROFILE' : null}
    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center'}} color={'#000000'} name='person' size={40} />}
    renderSelectedIcon={() => <Icon color={'#000000'} name='person' size={50} />}
    onPress={()=>{this.state.changeFlag('login')}}
    >
  </Tab>
    <Tab
    titleStyle={{fontWeight: 'bold', fontSize: 10}}
    // selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
    // selected={selectedTab === 'profile'}
    // title={selectedTab === 'profile' ? 'PROFILE' : null}
    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center'}} color={'#000000'} name='arrow-back' size={40} />}
    renderSelectedIcon={() => <Icon color={'#000000'} name='arrow-back' size={50} />}
    onPress={()=>{this.state.changeFlag('sendNotification')}}
    >
  </Tab>
 
</Tabs>

</View>
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
    height: 6000,
  },
  arrow:{
    width: 40,
    height: 20,
  },
  tabs:{
    flex: 1,
     width: 500,
        height : 50,
        top:50
},
tab:{
   flex: 1,
},
m:{
  width: 400,
        height : 700,
}
});



