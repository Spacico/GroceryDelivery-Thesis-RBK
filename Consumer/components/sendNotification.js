import React from 'react';
import {
  Modal,
  Dimensions,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  AppRegistry,
  TouchableOpacity
} from 'react-native';
// import sendNotification from "./components/sendNotification"
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
import { Header, Container, Button } from 'native-base';
import MapView from 'react-native-maps';
// import Login from './components/login'
// import MapView from 'react-native-maps';
import SocketIOClient from 'socket.io-client';
import PushNotification from 'react-native-push-notification';
export default class sendNotification extends React.Component {
  static navigationOptions = {
    title: 'Create a list'
  };
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('https://serverna.herokuapp.com/', {
      jsonp: false
    });
    this.socket.on('acceptlist', () => {
      // Alert.alert('message arrive');
      PushNotification.localNotification({
        message: 'your list accpted'
      });
      //   //alert('lest')
    });
    this.state = {
      budget: '',
      storeInfo: '',
      items: '',
      latitude: 31.9893815,
      longitude: 35.8334493,
      error: '',
      mapModal: false
    };
  }

  onClickButton() {
    fetch('https://serverna.herokuapp.com/sendNotification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => {
        alert('inside sendnotification');
        var message = 'Hi I make event';
        this.socket.emit('sendList', message);
        return response.json();
      })
      .then(responseJson => {
        alert('your list sucessfuly sent !! \n' + 'wait for response .....');
      })
      .catch(error => {
        alert('Error !!!  Please try again   ' + error);
      });
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        // alert(
        //   'Lat: ' +
        //     position.coords.latitude +
        //     '\nLon: ' +
        //     position.coords.longitude
        // );
        try {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        } catch (e) {
          throw e;
        }
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200 }
    );
  }
  loc(state) {
    var oldLatitude = state.params.getLocation().latitude;
    navigator.geolocation.getCurrentPosition(
      position => {
        // alert(
        //   'Lat: ' +
        //     position.coords.latitude +
        //     '\nLon: ' +
        //     position.coords.longitude
        // );
        state.params.changeLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200 }
    );
    // alert(
    //   'latitude' + state.params.getLocation().latitude + '\n' + oldLatitude
    // );
  }

  // _onRefresh(){
  //         alert("current Location  detected <> ");

  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image style={styles.container} source={require('../images/main.jpg')}>
          <StatusBar backgroundColor="#66023c" />

          <Text
            style={{
              marginTop: 100,
              textAlign: 'right',
              fontWeight: 'bold',
              fontSize: 20
            }}>
            {' '}
          </Text>

          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ Budget: val })}
            style={styles.input}
            placeholder="Budget....."
            value={this.state.Budget}
            noIcon
          />
          <Text>{'\n'}</Text>

          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ storeInfo: val })}
            style={styles.input}
            placeholder="Store Info....."
            value={this.state.storeInfo}
            noIcon
          />
          <Text>{'\n'}</Text>

          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ items: val })}
            style={styles.items}
            placeholder="Items....."
            noIcon
            value={this.state.items}
            multiline={true}
          />
          <Text>{'\n'}</Text>
          <TouchableHighlight onPress={() => this.setState({ mapModal: true })}>
            <Text>Current Location</Text>
          </TouchableHighlight>
          <Text>{'\n'}</Text>

          <Icon
            reverse
            name="md-locate"
            type="ionicon"
            color="#777"
            onPress={() => {
              this.setState({ mapModal: true });
            }}
            style={styles.location}
          />

          <Text>{'\n'}</Text>

          <TouchableHighlight
            style={styles.sendlist}
            icon={{ name: 'cached' }}
            onPress={() => this.onClickButton()}>
            <Text style={styles.text}> Send List </Text>
          </TouchableHighlight>
        </Image>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.mapModal}
            onRequestClose={() => {
              this.setState({ mapModal: false });
            }}>
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
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421
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
          </Modal>
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
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
  addButton: {
    backgroundColor: '#ccc',
    width: 90,
    height: 40,
    justifyContent: 'center',
    elevation: 8
  },
  input: {
    width: 300,
    height: 40
  },
  items: {
    width: 300,
    height: 100
  },
  signup: {
    width: 300,
    height: 40,
    backgroundColor: '#DF5900',
    //  // color:"#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
    // fontWeight : "700"
  },
  text: {
    textAlign: 'left',
    // color : "#CF0063",
    fontWeight: 'bold',
    fontSize: 20
    // opacity:.02
  },
  label: {
    textAlign: 'right',
    // color : "#CF0063",
    fontWeight: 'bold',
    fontSize: 20
    // opacity:.02
  },
  sendlist: {
    width: 300,
    height: 40,
    backgroundColor: '#66023c',
    //  // color:"#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
    // fontWeight : "700"
  },
  location: {
    backgroundColor: '#CD7584',
    width: 50,
    height: 50,
    //  // color:"#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    flex: 1,
    width: 500,
    height: 30
  }
});
