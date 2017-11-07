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
import { NavigationApp } from '../App';

export default class login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);

    this.state = {
      consumerName: '',
      password: ''
    };
  }

  onLogin(navigate) {
    fetch('https://serverna.herokuapp.com/consumerLogin', {
      //192.168.1.7
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        consumerName: this.state.consumerName,
        password: this.state.password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson === true) {
          navigate('Home');
        } else {
          alert(responseJson.message);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image style={styles.container} source={require('../images/main.jpg')}>
          <StatusBar backgroundColor="#777" />
          <Text
            style={{
              marginTop: 180,
              textAlign: 'right',
              fontWeight: 'bold',
              fontSize: 20
            }}>
            {' '}
            User Name{' '}
          </Text>
          <SearchBar
            lightTheme
            onChangeText={val => {
              this.setState({ consumerName: val });
            }}
            style={styles.input}
            placeholder="username .... "
            noIcon
          />
          <Text>{'\n'}</Text>
          <Text style={styles.label}> Password </Text>
          <SearchBar
            lightTheme
            onChangeText={val => this.setState({ password: val })}
            style={styles.input}
            placeholder="password....."
            noIcon
            secureTextEntry
          />
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <TouchableHighlight
            style={styles.login}
            icon={{ name: 'cached' }}
            onPress={() => {
              this.onLogin(navigate);
            }}>
            <Text style={styles.text}> Log in </Text>
          </TouchableHighlight>
        </Image>
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
  input: {
    width: 300,
    height: 40
  },
  text: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20
  },
  label: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 20
  },
  login: {
    width: 300,
    height: 40,
    backgroundColor: '#8C0000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
