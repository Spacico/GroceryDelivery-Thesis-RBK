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

export default class WelcomePage extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
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

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#336e3e" />
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => {
            navigate('Login');
          }}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableHighlight>
        <Text>{'\n'}</Text>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => {
            navigate('Signup');
          }}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableHighlight>
        <Text>{'\n'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    width: 300,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#519657',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222'
  }
});
