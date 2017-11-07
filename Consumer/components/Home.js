import React from 'react';
import {
  StatusBar,
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput
} from 'react-native';
import SendNotification from './sendNotification';
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

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };
  constructor(props) {
    super(props);
    this.state = {
      changeFlag: this.props.changeFlag,
      lists: '',
      error: null,
      latitude: 31.7777,
      longitude: 35.8375
    };
  }

  changeLocation(obj) {
    this.setState({
      latitude: obj.latitude,
      longitude: obj.longitude
    });
    alert(this.state.latitude);
  }

  getLocation() {
    return { latitude: this.state.latitude, longitude: this.state.longitude };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        //alert(position.coords.latitude)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200 }
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => {
            navigate('SendNotification', {
              latitude: this.state.latitude,
              longitude: this.state.longitude
            });
          }}>
          <Text>Create a list</Text>
        </TouchableHighlight>
        <Text>{'\n'}</Text>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => {
            navigate('CurrentList');
          }}>
          <Text>Current List</Text>
        </TouchableHighlight>
        <Text>{'\n'}</Text>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => {
            navigate('History');
          }}>
          <Text>History</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  content: {
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textShadowColor: '#252525',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    marginBottom: 20
  },
  listInfoContainer: {
    backgroundColor: '#B5B5B5',
    padding: 5,
    margin: 5
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
