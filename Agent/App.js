import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AppRegistry
} from 'react-native';
import { StackNavigator, Tabs } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import SocketIOClient from 'socket.io-client';

import Home from './Components/Home';
import Login from './Components/Login';
import CurrentList from './Components/CurrentList';
import AvailableLists from './Components/availableLists';
import History from './Components/History';
import WelcomePage from './Components/WelcomePage';
import Signup from './Components/Signup';


// import Profile from './Components/myProfile';

const NavigationApp = StackNavigator({
  WelcomePage: { screen: WelcomePage },
  Signup: { screen: Signup },
  Home: { screen: Home },
  CurrentList: { screen: CurrentList },
  AvailableLists: { screen: AvailableLists },
  History: { screen: History },
  Login: { screen: Login }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('https://serverna.herokuapp.com/', { jsonp: false });
    this.socket.on('sendlist', () => {
      PushNotification.localNotification({
        message: 'there is new consumer'
      });
    });
    this.state = {
      flag: 'main',
      isOpen: false,
      currentList: {
        _id: '59f18c0e734d1d0e5abf6221',
        consumerName: 'Hussen',
        items: 'Potato 1kg, Orange 2.5kg, Eggs 1-board',
        storeInfo: 'Sameh mall, Tabarbuor',
        available: false,
        location: { latitude: 31.982615, longitude: 35.833657 },
        agentName: 'osamaths'
      },
      historyLists: [
        {
          _id: '59f18c20734d1d0e5abf6226',
          consumerName: 'Hamshari',
          items: 'Ships Lase 1jd, Orange 2.5kg, Eggs 1-board',
          storeInfo: 'Mecca mall, Mecca st.',
          available: true,
          location: { latitude: 31.982688, longitude: 35.833999 },
          agentName: 'osamaths',
          paid: 5
        },
        {
          _id: '59f986306d784e556d0c75b3',
          items: 'potato 5kg, Pepsi 2l, Burger 1000g',
          storeInfo: 'Amman',
          consumerName: 'Doaa',
          available: true,
          location: { latitude: 31.982115, longitude: 35.833057 },
          agentName: 'osamaths',
          paid: 7,
          __v: 0
        }
      ]
    };

    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  onLearnMore = currentList => {
    this.props.navigation.navigate('CurrentList', { currentList });
  };

  // Current list methods
  getCurrentList() {
    return this.state.currentList;
  }
  setCurrentList(list) {
    this.setState({ list: list });
  }
  // Lists history
  getHistoryLists() {
    return this.state.historyLists;
  }
  addListToHistory(list) {
    this.setState({ list: this.state.list.concat([list]) });
  }
  // Menu side
  onSideMenuChange(isOpen: boolean) {
    this.setState({
      isOpen: isOpen
    });
  }
  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  changeFlag(sth) {
    this.setState({ flag: sth });
  }

  render() {

      return <NavigationApp />;
    }
}
AppRegistry.registerComponent('App', () => App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
