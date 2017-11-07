import React from 'react';
import {
  StatusBar,
  Image,
  Dimensions,
  Platform,
  View,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';
import SendNotification from './sendNotification';
import MapView from 'react-native-maps';
import {
  TabBar,
  SearchBar,
  Tabs,
  Tab,
  Icon,
  SideMenu,
  List,
  ListItem
} from 'react-native-elements';

const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width / height;
const LONGTUDEDELTA = 0.922 * ASPECT_RATION;
export default class mapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      latitude: this.props.navigation.state.params.latitude,
      longitude: this.props.navigation.state.params.longitude
    };
  }
  // state.params.changeLocation({
  //   latitude: e.nativeEvent.coordinate.latitude,
  //   longitude: e.nativeEvent.coordinate.longitude
  // });
  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#3A5F0B" />

        <View style={styles.m}>
          <MapView
            onPress={e => {
              this.setState({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              });
              alert(
                'latitude: ' +
                  this.state.latitude +
                  '\nlongitude: ' +
                  this.state.longitude
              );
            }}
            style={styles.map}
            region={{
              latitude: state.params.getLocation().latitude,
              longitude: state.params.getLocation().longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}>
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }}
            />
          </MapView>
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
    alignItems: 'center'
  },
  map: {
    flex: 1,
    width: width,
    height: height
  },
  arrow: {
    width: 40,
    height: 20
  },
  tabs: {
    flex: 1,
    width: 500,
    height: 50,
    top: 50
  },
  tab: {
    flex: 1
  },
  m: {
    width: 400,
    height: 700
  }
});
