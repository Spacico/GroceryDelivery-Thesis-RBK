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
    title: 'Welcome'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => {
            navigate('Login');
          }}>
          <Text>LOGIN</Text>
        </TouchableHighlight>
        <Text>{'\n'}</Text>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => {
            navigate('Signup');
          }}>
          <Text>Sign Up</Text>
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
    height: 40,
    backgroundColor: '#DF5900',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
