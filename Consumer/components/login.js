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
    title: 'Login',
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

    this.state = {
      consumerName: '',
      password: ''
    };
  }

  onLogin(navigate) {
    if (this.state.consumerName !== '' && this.state.password !== '') {
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
    } else {
      alert('Please make sure that you filled all fields.');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#336e3e" />
        <Text
          style={{
            marginTop: 80,
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
          required
        />
        <Text>{'\n'}</Text>
        <Text style={styles.label}> Password </Text>
        <SearchBar
          lightTheme
          onChangeText={val => this.setState({ password: val })}
          style={styles.input}
          placeholder="password....."
          noIcon
          required
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
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
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
    height: 60,
    borderRadius: 10,
    backgroundColor: '#519657',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
