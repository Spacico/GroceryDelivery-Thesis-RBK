/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import Sidebar from 'react-sidebar';
import {
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
// import OffCanvas3D from '../offcanvas3d'
import {
  Icon,
  TabBar,
  SearchBar,
  Tabs,
  Tab,
  SideMenu,
  List,
  ListItem
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Header, Container, Button } from 'native-base';

import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import PushNotification from 'react-native-push-notification';

import SendNotification from './components/sendNotification';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
import History from './components/History';
import CurrentList from './components/CurrentList';
import MapView from './components/mapView';
import WelcomePage from './components/welcomePage';

export const NavigationApp = StackNavigator({
  WelcomePage: { screen: WelcomePage },
  Home: { screen: Home },
  SendNotification: { screen: SendNotification },
  Login: { screen: Login },
  Signup: { screen: Signup },
  History: { screen: History },
  CurrentList: { screen: CurrentList }
});
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 'main',
      selectedTab: 'profile'
    };
  }

  render() {
    return <NavigationApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 1000,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    width: 1000
  },
  arrow: {
    width: 40,
    height: 20
  },
  containerImg: {
    flex: 1,
    backgroundColor: '#F7B50C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    width: 300,
    height: 40,
    backgroundColor: '#DF5900',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
