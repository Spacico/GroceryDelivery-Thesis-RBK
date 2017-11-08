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
import SocketIOClient from 'socket.io-client';
import PushNotification from 'react-native-push-notification';
export default class sendNotification extends React.Component {
  static navigationOptions = {
    title: 'Create a list',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#333'
    },
    headerStyle: {
      backgroundColor: '#81c784'
    },
    headerTintColor: {
      /*  */
    }
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

  onClickButton(navigate) {
    if (
      this.state.budget !== '' &&
      this.state.storeInfo !== '' &&
      this.state.items !== ''
    ) {
      fetch('https://serverna.herokuapp.com/sendNotification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(response => {
          var message = 'Hi I make event';
          this.socket.emit('sendList', message);
          return response.json();
        })
        .then(responseJson => {
          alert('your list sucessfuly sent !! \n' + 'wait for response .....');
          navigate('Home');
        })
        .catch(error => {
          alert('Error !!!  Please try again   ' + error);
        });
    } else {
      alert('Please make sure that you filled all fields.');
    }
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
    navigator.geolocation.getCurrentPosition(
      position => {
        // alert(
        //   'Lat: ' +
        //     position.coords.latitude +
        //     '\nLon: ' +
        //     position.coords.longitude
        // );
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200 }
    );
  }

  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar backgroundColor="#336e3e" />

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
          onChangeText={val => this.setState({ budget: val })}
          style={styles.items}
          placeholder="Budget....."
          value={this.state.budget}
          noIcon
        />
        <Text>{'\n'}</Text>

        <SearchBar
          lightTheme
          onChangeText={val => this.setState({ storeInfo: val })}
          style={styles.items}
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
          onPress={() => this.onClickButton(navigate)}>
          <Text style={styles.text}> Send List </Text>
        </TouchableHighlight>
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
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center'
  },
  map: {
    flex: 1,
    width: width,
    height: height
  },
  touchable: {
    width: 300,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#519657',
    alignItems: 'center',
    justifyContent: 'center'
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
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
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
    height: 60,
    borderRadius: 10,
    backgroundColor: '#519657',
    alignItems: 'center',
    justifyContent: 'center'
  },
  location: {
    backgroundColor: '#519657',
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
